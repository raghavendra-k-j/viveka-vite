import React, { useEffect, useRef } from 'react';
import { EditorState, TextSelection } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { DOMParser, Fragment, Node as ProseMirrorNode } from 'prosemirror-model';
import { keymap } from 'prosemirror-keymap';
import { baseKeymap, toggleMark } from 'prosemirror-commands';
import { history, undo, redo } from 'prosemirror-history';

import { schema } from './pm/schema';
import { UserMentionNodeView } from './pm/UserMentionNodeView';

import './RichPmEditor.css'; // We'll create this for basic styling

interface RichPmEditorProps {
    initialContent?: string; // HTML string for initial content
    onChange?: (content: ProseMirrorNode) => void; // Callback for content changes
}

const RichPmEditor: React.FC<RichPmEditorProps> = ({ initialContent, onChange }) => {
    const editorRef = useRef<HTMLDivElement>(null);
    const viewRef = useRef<EditorView | null>(null); // To store the EditorView instance

    useEffect(() => {
        if (!editorRef.current) return;

        // Determine initial document
        let docNode: ProseMirrorNode | undefined = undefined;
        if (initialContent) {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = initialContent;
            docNode = DOMParser.fromSchema(schema).parse(tempDiv);
        }

        const state = EditorState.create({
            doc: docNode,
            schema: schema,
            plugins: [
                history(),
                keymap({ 'Mod-z': undo, 'Mod-y': redo }),
                keymap(baseKeymap),
                keymap({
                    'Mod-b': toggleMark(schema.marks.strong),
                    'Mod-i': toggleMark(schema.marks.em),
                    'Mod-u': toggleMark(schema.marks.underline),
                }),
            ],
        });

        const view = new EditorView(editorRef.current, {
            state,
            dispatchTransaction(transaction) {
                if (!viewRef.current) return;
                const newState = viewRef.current.state.apply(transaction);
                viewRef.current.updateState(newState);
                if (onChange && transaction.docChanged) {
                    onChange(newState.doc);
                }
            },
            nodeViews: {
                user_mention(node, viewInstance, getPos) {
                    return new UserMentionNodeView(node, viewInstance, getPos);
                },
            },
        });

        viewRef.current = view;

        // Cleanup on unmount
        return () => {
            view.destroy();
            viewRef.current = null;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initialContent]); // Rerun if initialContent changes (optional, depends on desired behavior)

    const handleBold = () => {
        const view = viewRef.current;
        if (view) {
            view.focus();
            toggleMark(schema.marks.strong)(view.state, view.dispatch);
        }
    };

    const handleItalic = () => {
        const view = viewRef.current;
        if (view) {
            view.focus();
            toggleMark(schema.marks.em)(view.state, view.dispatch);
        }
    };

    const handleUnderline = () => {
        const view = viewRef.current;
        if (view) {
            view.focus();
            toggleMark(schema.marks.underline)(view.state, view.dispatch);
        }
    };

    const handleAddUser = () => {
        const view = viewRef.current;
        if (view) {
            const email = prompt('Enter user email:'); // Consider a nicer dialog
            if (email) {
                const { state, dispatch } = view;
                const { from, to } = state.selection; // Get current selection range

                const userMentionNodeType = schema.nodes.user_mention;
                const userMentionNode = userMentionNodeType.create({ email: email });

                // Create a text node containing a single space
                const spaceTextNode = schema.text(" ");

                // Create a Fragment containing the user mention node followed by the space node
                const fragmentToInsert = Fragment.fromArray([userMentionNode, spaceTextNode]);

                // Start a new transaction
                let tr = state.tr;

                // Replace the current selection with the fragment (mention + space)
                tr = tr.replaceWith(from, to, fragmentToInsert);

                // Calculate the desired selection position: right after the userMentionNode,
                // which is 'from' (original start of selection) + size of the userMentionNode.
                const selectionPos = from + userMentionNode.nodeSize;

                // Set the selection to be at this position (before the space)
                tr = tr.setSelection(TextSelection.create(tr.doc, selectionPos));

                // Ensure this part of the document is scrolled into view
                tr = tr.scrollIntoView();

                // Dispatch the transaction
                dispatch(tr);
                view.focus(); // Re-focus the editor
            }
        }
    };

    return (
        <div className="rich-pm-editor-wrapper w-full">
            <div className="toolbar">
                <button onClick={handleBold} title="Bold (Ctrl+B)">B</button>
                <button onClick={handleItalic} title="Italic (Ctrl+I)">I</button>
                <button onClick={handleUnderline} title="Underline (Ctrl+U)">U</button>
                <button onClick={handleAddUser} title="Add User Mention">@ User</button>
            </div>
            <div ref={editorRef} className="editor-content w-full"></div>
        </div>
    );
};

export default RichPmEditor;