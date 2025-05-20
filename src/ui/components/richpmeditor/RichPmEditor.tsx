import React, { useEffect, useRef } from 'react';
import { EditorState, TextSelection } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { DOMParser, Fragment, Node as ProseMirrorNode } from 'prosemirror-model';
import { keymap } from 'prosemirror-keymap';
import { baseKeymap } from 'prosemirror-commands';
import { history, undo, redo } from 'prosemirror-history';
import { schema } from './pm/schema';
import { LaTexNodeView } from './pm/LaTexNodeView';
import { DialogEntry, useDialogManager } from '~/ui/widgets/dialogmanager';
import { AiSTTDialog, AiSTTDialogProps } from '../aisttdialog/AiSTTDialog';
import { logger } from '~/core/utils/logger';
import { STT } from '~/infra/utils/stt/STT';
import { ContentToPm } from './utils/ContentToPm';
import { Content } from '~/domain/aistt/models/Content';
import './RichPmEditor.css';
import styles from "./styles.module.css";
import { placeholderPlugin } from './pm/placeholderPlugin';
import { Mic, SquareRadical } from 'lucide-react';
import { LaTexKbProps } from '../LaTexKb/LaTexKbProvider';
import { LatexKb } from '../LaTexKb/LaTexKb';
import { LaTexExpr } from '~/domain/latexkb/models/LaTexExpr';

interface RichPmEditorProps {
    initialContent?: string;
    onChange?: (node: ProseMirrorNode) => void;
    getContent?: () => ProseMirrorNode;
    stt: STT;
    placeholder?: string;
}

const RichPmEditor: React.FC<RichPmEditorProps> = (props) => {
    const editorRef = useRef<HTMLDivElement>(null);
    const viewRef = useRef<EditorView | null>(null);
    const dialogManager = useDialogManager();

    useEffect(() => {
        if (!editorRef.current) return;

        // Determine initial document
        let docNode: ProseMirrorNode | undefined = undefined;
        if (props.initialContent) {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = props.initialContent;
            docNode = DOMParser.fromSchema(schema).parse(tempDiv);
        }

        const state = EditorState.create({
            doc: docNode,
            schema: schema,
            plugins: [
                history(),
                keymap({ 'Mod-z': undo, 'Mod-y': redo }),
                keymap(baseKeymap),
                placeholderPlugin(props.placeholder || "Type here..."),
            ],
        });


        const onClickLaTexNode = (node: LaTexNodeView) => {
            logger.debug("LaTexNode clicked:", node);
        }


        const view = new EditorView(editorRef.current, {
            state: state,
            dispatchTransaction: (transaction) => {
                if (!viewRef.current) return;
                const newState = viewRef.current.state.apply(transaction);
                viewRef.current.updateState(newState);
                if (props.onChange && transaction.docChanged) {
                    props.onChange(newState.doc);
                }
            },
            nodeViews: {
                latex(node, viewInstance, getPos) {
                    return new LaTexNodeView({
                        node: node,
                        view: viewInstance,
                        getPos: getPos,
                        onClick: onClickLaTexNode,
                    });
                },
            },
            attributes: {
                class: 'richPmEditorContent'
            }
        });

        viewRef.current = view;

        return () => {
            view.destroy();
            viewRef.current = null;
        };
    }, [props, props.initialContent]);

    const handleAddEquation = () => {
        const view = viewRef.current;
        if (view) {
            const dialogEntry: DialogEntry<LaTexKbProps> = {
                id: 'latex-kb-dialog',
                component: LatexKb,
                props: {
                    stt: props.stt,
                    onDone: (expr: LaTexExpr) => {
                        const { state, dispatch } = view;
                        const { from, to } = state.selection;

                        const latexNodeType = schema.nodes.latex;
                        const latexNode = latexNodeType.create({ latex: expr.latex });

                        // Create a text node containing a single space
                        const spaceTextNode = schema.text("  ");
                        // Create a Fragment containing the latex node followed by the space node
                        const fragmentToInsert = Fragment.fromArray([latexNode, spaceTextNode]);

                        // Start a new transaction
                        let tr = state.tr;

                        // Replace the current selection with the fragment (mention + space)
                        tr = tr.replaceWith(from, to, fragmentToInsert);

                        // Calculate the desired selection position: right after the latex node,
                        // which is 'from' (original start of selection) + size of the latex node.
                        const selectionPos = from + latexNode.nodeSize;

                        // Set the selection to be at this position (before the space)
                        tr = tr.setSelection(TextSelection.create(tr.doc, selectionPos));

                        // Ensure this part of the document is scrolled into view

                        // Dispatch the transaction
                        dispatch(tr);
                        view.focus(); // Re-focus the editor
                        dialogManager.closeById('latex-kb-dialog');
                    },
                    onClose: () => {
                        dialogManager.closeById('latex-kb-dialog');
                    }
                }
            }
            dialogManager.show(dialogEntry);
        }
    };

    const handleVoiceButtonClick = () => {
        const dialogEntry: DialogEntry<AiSTTDialogProps> = {
            id: 'ai-voice-dialog',
            component: AiSTTDialog,
            props: {
                stt: props.stt,
                onDone: (contentFromDialog: Content) => { // contentFromDialog is your custom Content type
                    dialogManager.closeById('ai-voice-dialog'); // Close dialog first

                    // 1. Convert your custom Content object to a ProseMirror Fragment
                    const fragmentToInsert = ContentToPm.convert(contentFromDialog, schema);

                    const view = viewRef.current;

                    // 2. Check if the view and fragment are valid
                    if (view && fragmentToInsert) {
                        if (fragmentToInsert.size === 0) {
                            // Log if the source content was not empty but the fragment is
                            if (contentFromDialog && contentFromDialog.isNotEmpty) {
                                logger.warn("Converted ProseMirror fragment is empty, but source 'Content' was not. Check ContentToPm.convert or schema mapping.");
                            }
                            // Even if nothing was inserted, ensure editor is focused after dialog closes
                            setTimeout(() => {
                                if (viewRef.current) viewRef.current.focus();
                            }, 0);
                            return;
                        }

                        // 3. Perform the ProseMirror transaction to insert the fragment
                        const { state, dispatch } = view;
                        const { from, to } = state.selection; // Get current selection or cursor position

                        // Insert each node from the fragment individually
                        let tr = state.tr.deleteRange(from, to);
                        let insertPos = from;
                        fragmentToInsert.forEach(node => {
                            tr = tr.insert(insertPos, node);
                            insertPos += node.nodeSize;
                        });

                        // 4. Optionally, move the cursor to the end of the inserted content
                        const newCursorPos = insertPos;
                        tr = tr.setSelection(TextSelection.create(tr.doc, newCursorPos));

                        // 5. Ensure the newly inserted content is scrolled into view
                        tr = tr.scrollIntoView();

                        dispatch(tr); // Apply the transaction

                        // 6. Re-focus the editor (using setTimeout for reliability)
                        setTimeout(() => {
                            if (viewRef.current) { // Re-check viewRef in case component unmounted
                                viewRef.current.focus();
                            }
                        }, 0);

                    } else {
                        if (!view) logger.error("Editor view not available for insertion.");
                        // If view exists but fragment is somehow null/undefined (should be Fragment.empty from ContentToPm)
                        if (view && !fragmentToInsert) logger.error("Fragment to insert is unexpectedly null or undefined.");

                        // Fallback: try to focus the editor even if insertion failed
                        if (viewRef.current) {
                            setTimeout(() => {
                                if (viewRef.current) viewRef.current.focus();
                            }, 0);
                        }
                    }
                },
                onCancel: () => {
                    dialogManager.closeById('ai-voice-dialog');
                    // Optionally re-focus the editor on cancel as well
                    setTimeout(() => {
                        if (viewRef.current) {
                            viewRef.current.focus();
                        }
                    }, 0);
                },
                allowAi: true,
                enableAi: true,
            },
        };
        dialogManager.show(dialogEntry);
    };


    const handleEditableAreaClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (viewRef.current && !viewRef.current.hasFocus()) {
            const pmSurface = editorRef.current?.querySelector('.ProseMirror');
            if (event.target === editorRef.current || event.target === pmSurface) {
                viewRef.current.focus();
            }
        }
    };


    return (
        <div className={styles.richPmEditor}>
            <div className={styles.toolbar}>
                <button className={styles.button} onClick={handleAddEquation} title="Add Equation">
                    <SquareRadical className={styles.icon} /> Equation
                </button>
                <button className={styles.button} onClick={handleVoiceButtonClick} title="Voice Input">
                    <Mic className={styles.icon} /> Voice
                </button>
            </div>
            <div
                data-placeholder="Type here..."
                className={styles.editorContent}
                onClick={handleEditableAreaClick}
                ref={editorRef}
            ></div>
        </div>
    );
};

export default RichPmEditor;