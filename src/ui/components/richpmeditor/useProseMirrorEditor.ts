import React, { useEffect, useRef } from 'react';
import { EditorState, TextSelection } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { Fragment, Node as ProseMirrorNode } from 'prosemirror-model';
import { keymap } from 'prosemirror-keymap';
import { baseKeymap } from 'prosemirror-commands';
import { history, undo, redo } from 'prosemirror-history';
import { RichPmEditorSchema } from './pm/schema';
import { LaTexNodeView, OnClickLaTexNodeView } from './pm/LaTexNodeView';
import { DialogEntry, DialogManagerStore, useDialogManager } from '~/ui/widgets/dialogmanager';
import { AiSTTDialog, AiSTTDialogProps } from '../aisttdialog/AiSTTDialog';
import { logger } from '~/core/utils/logger';
import { ContentToPm } from './utils/ContentToPm';
import { Content } from '~/domain/aistt/models/Content';
import './RichPmEditor.css';
import { placeholderPlugin } from './pm/placeholderPlugin';
import { LaTexKbProps } from '../LaTexKb/LaTexKbProvider';
import { LatexKb } from '../LaTexKb/LaTexKb';
import { LaTexExpr } from '~/domain/latexkb/models/LaTexExpr';
import { RichPmEditorProps } from './RichPmEditor';
import { STT } from '~/infra/utils/stt/STT';

export type UsePmEditorData = {
    onClickEquationButton: () => void;
    onClickLaTexNode: OnClickLaTexNodeView;
    onClickEditableArea: (event: React.MouseEvent<HTMLDivElement>) => void;
    onClickVoiceButton: () => void;
    editorRef: React.RefObject<HTMLDivElement>;
    getContent: () => ProseMirrorNode | null;
    setContent: (doc: ProseMirrorNode) => void;
}


function handleInitData(props: RichPmEditorProps) {
    let docNode: ProseMirrorNode | undefined = undefined;
    if (props.initialContent) {
        docNode = props.initialContent;
    }
    return docNode;
}


function createState(docNode: ProseMirrorNode | undefined, props: RichPmEditorProps) {
    return EditorState.create({
        doc: docNode,
        schema: props.schema,
        plugins: [
            history(),
            keymap({ 'Mod-z': undo, 'Mod-y': redo }),
            keymap(baseKeymap),
            placeholderPlugin(props.placeholder || ""),
        ],
    });
}


type CreateViewProps = {
    props: RichPmEditorProps;
    editorRef: React.RefObject<HTMLDivElement | null>;
    viewRef: React.RefObject<EditorView | null>;
    state: EditorState;
    dialogManager: DialogManagerStore;
}


function createView(props: CreateViewProps) {
    return new EditorView(props.editorRef.current, {
        state: props.state,
        dispatchTransaction: (transaction) => {
            if (!props.viewRef.current) return;
            const newState = props.viewRef.current.state.apply(transaction);
            props.viewRef.current.updateState(newState);
            if (props.props.onChange && transaction.docChanged) {
                props.props.onChange(newState.doc);
            }
        },
        nodeViews: {
            latex(node, viewInstance, getPos) {
                return new LaTexNodeView({
                    node: node,
                    view: viewInstance,
                    getPos: getPos,
                    onClick: (node) => onClickLaTexNode({ node: node, stt: props.props.stt, dialogManager: props.dialogManager }),
                    isInline: true,
                });
            },
            blockLatex(node, viewInstance, getPos) {
                return new LaTexNodeView({
                    node: node,
                    view: viewInstance,
                    getPos: getPos,
                    onClick: (node) => onClickLaTexNode({ node: node, stt: props.props.stt, dialogManager: props.dialogManager }),
                    isInline: false,
                });
            }
        },
        attributes: {
            class: 'richPmEditorContent'
        }
    });
}


const onClickLaTexNode = ({ node, stt, dialogManager }: { node: LaTexNodeView, stt: STT, dialogManager: DialogManagerStore }) => {
    const latex = node.getLaTex();
    const dialogEntry: DialogEntry<LaTexKbProps> = {
        id: 'latex-kb-dialog',
        component: LatexKb,
        props: {
            stt: stt,
            expr: new LaTexExpr({ latex: latex }),
            onDone: (expr: LaTexExpr) => {
                if (expr) {
                    node.updateLaTex(expr.latex);
                }
                node.getView.focus();
                dialogManager.closeById('latex-kb-dialog');
            },
            onClose: () => dialogManager.closeById('latex-kb-dialog'),
        }
    };
    dialogManager.show(dialogEntry);
}




export function insertEquation(view: EditorView, expr: LaTexExpr, schema: RichPmEditorSchema) {
    const { state, dispatch } = view;
    const { from, to } = state.selection;
    let tr = state.tr;

    if (expr.isInline) {
        const latexNodeType = schema.nodes.latex;
        if (!latexNodeType) {
            throw new Error("Inline LaTeX node type is not defined in the schema.");
        }

        const latexNode = latexNodeType.create({ latex: expr.latex });
        const spaceTextNode = schema.text(" ");
        const fragmentToInsert = Fragment.fromArray([latexNode, spaceTextNode]);

        tr = tr.replaceWith(from, to, fragmentToInsert);
        tr = tr.setSelection(TextSelection.create(tr.doc, from + latexNode.nodeSize));
        tr = tr.scrollIntoView();

    } else {
        const blockLatexNodeType = schema.nodes.blockLatex;
        const paragraphNodeType = schema.nodes.paragraph;

        if (!blockLatexNodeType) {
            throw new Error("Block LaTeX node type is not defined in the schema.");
        }
        if (!paragraphNodeType) {
            throw new Error("Paragraph node type is required after block-level insertion.");
        }

        const latexNode = blockLatexNodeType.create({ latex: expr.latex });
        const paragraphNode = paragraphNodeType.createAndFill();

        const fragmentToInsert = Fragment.fromArray([
            latexNode,
            paragraphNode!
        ]);

        tr = tr.replaceWith(from, to, fragmentToInsert);
        tr = tr.setSelection(TextSelection.create(tr.doc, from + latexNode.nodeSize + 1));
        tr = tr.scrollIntoView();
    }

    dispatch(tr);
    view.focus();
}



function focusEditor(view: EditorView | null) {
    if (view) {
        setTimeout(() => {
            view.focus();
        }, 0);
    }
}

function insertVoiceContent(viewRef: React.RefObject<EditorView | null>, content: Content, schema: RichPmEditorSchema) {
    const fragmentToInsert = ContentToPm.convert(content, schema);
    const view = viewRef.current;

    if (!view || !fragmentToInsert) {
        // Handle case where view or fragmentToInsert is null
        if (!view) logger.error("Editor view not available for insertion.");
        if (view && !fragmentToInsert) logger.error("Fragment to insert is unexpectedly null or undefined.");
        if (viewRef.current) {
            focusEditor(viewRef.current);
        }
        return;
    }

    if (fragmentToInsert.size === 0) {
        // Handle case where fragment is empty
        if (content && content.isNotEmpty) {
            logger.warn("Converted ProseMirror fragment is empty, but source 'Content' was not. Check ContentToPm.convert or schema mapping.");
        }
        focusEditor(viewRef.current);
        return;
    }

    const { state, dispatch } = view;
    const { from, to } = state.selection;
    let tr = state.tr.deleteRange(from, to);
    let insertPos = from;
    fragmentToInsert.forEach(node => {
        tr = tr.insert(insertPos, node);
        insertPos += node.nodeSize;
    });
    const newCursorPos = insertPos;
    tr = tr.setSelection(TextSelection.create(tr.doc, newCursorPos));
    tr = tr.scrollIntoView();
    dispatch(tr);
    focusEditor(view);
}


export function usePmEditor(props: RichPmEditorProps) {
    const editorRef = useRef<HTMLDivElement>(null);
    const viewRef = useRef<EditorView | null>(null);
    const dialogManager = useDialogManager();

    useEffect(() => {
        if (!editorRef.current) return;

        // Handle initial content
        const docNode = handleInitData(props);
        const state = createState(docNode, props);

        const view = createView({
            props: props,
            editorRef: editorRef,
            viewRef: viewRef,
            state: state,
            dialogManager: dialogManager,
        });
        viewRef.current = view;

        return () => {
            view.destroy();
            viewRef.current = null;
        };
    }, [dialogManager, props, props.initialContent]);


    const onClickEquationButton = () => {
        const view = viewRef.current;
        if (view) {
            const dialogEntry: DialogEntry<LaTexKbProps> = {
                id: 'latex-kb-dialog',
                component: LatexKb,
                props: {
                    stt: props.stt,
                    onDone: (expr: LaTexExpr) => {
                        if (expr) insertEquation(view, expr, props.schema);
                        dialogManager.closeById('latex-kb-dialog');
                    },
                    onClose: () => dialogManager.closeById('latex-kb-dialog')
                }
            }
            dialogManager.show(dialogEntry);
        }
    };


    const onClickVoiceButton = () => {
        const dialogEntry: DialogEntry<AiSTTDialogProps> = {
            id: 'ai-voice-dialog',
            component: AiSTTDialog,
            props: {
                stt: props.stt,
                onDone: (contentFromDialog: Content) => {
                    dialogManager.closeById('ai-voice-dialog');
                    insertVoiceContent(viewRef, contentFromDialog, props.schema);
                },
                onCancel: () => {
                    dialogManager.closeById('ai-voice-dialog');
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


    // Handle click on editable area
    const onClickEditableArea = (event: React.MouseEvent<HTMLDivElement>) => {
        if (viewRef.current && !viewRef.current.hasFocus()) {
            const pmSurface = editorRef.current?.querySelector('.ProseMirror');
            if (event.target === editorRef.current || event.target === pmSurface) {
                viewRef.current.focus();
            }
        }
    };


    const getContent = () => {
        if (viewRef.current) {
            return viewRef.current.state.doc;
        }
        return null;
    }

    const setContent = (doc: ProseMirrorNode) => {
        if (viewRef.current) {
            const { state, dispatch } = viewRef.current;
            const tr = state.tr.replaceWith(0, state.doc.content.size, doc);
            dispatch(tr);
            focusEditor(viewRef.current);
        }
    };




    return {
        onClickEquationButton: onClickEquationButton,
        onClickLaTexNode: onClickEquationButton,
        onClickEditableArea: onClickEditableArea,
        onClickVoiceButton: onClickVoiceButton,
        editorRef: editorRef,
        getContent: getContent,
        setContent: setContent,
    };
}