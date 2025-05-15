import { useEffect, useRef, useState } from 'react';
import {
    EditorState,
    Transaction,
    Plugin
} from 'prosemirror-state';
import {
    EditorView
} from 'prosemirror-view';
import {
    Schema
} from 'prosemirror-model';
import {
    schema as basicSchema
} from 'prosemirror-schema-basic';
import {
    toggleMark
} from 'prosemirror-commands';
import {
    keymap
} from 'prosemirror-keymap';
import {
    baseKeymap
} from 'prosemirror-commands';
import 'prosemirror-view/style/prosemirror.css';

// 1. Define schema with underline + custom <user> node
const mySchema = new Schema({
    nodes: basicSchema.spec.nodes.addToEnd('user', {
        inline: true,
        group: 'inline',
        atom: true,
        selectable: false,
        marks: '',
        attrs: {
            email: {}
        },
        parseDOM: [
            {
                tag: 'user[email]',
                getAttrs(dom: any) {
                    return { email: dom.getAttribute('email') };
                }
            }
        ],
        toDOM(node) {
            const { email } = node.attrs;
            return [
                'user',
                {
                    email,
                    style:
                        'background:#e0f7fa;padding:2px 6px;border-radius:4px;font-family:monospace;color:#006064;cursor:pointer;'
                },
                email
            ];
        }
    }),
    marks: basicSchema.spec.marks.addToEnd('underline', {
        parseDOM: [{ tag: 'u' }],
        toDOM() {
            return ['u', 0];
        }
    })
});

export default function SimpleEditor() {
    const editorRef = useRef<HTMLDivElement | null>(null);
    const viewRef = useRef<EditorView | null>(null);
    const [docJSON, setDocJSON] = useState({});

    useEffect(() => {
        if (!editorRef.current) return;

        const state = EditorState.create({
            schema: mySchema,
            plugins: [
                // Keyboard shortcuts
                keymap({
                    'Mod-b': toggleMark(mySchema.marks.strong),
                    'Mod-i': toggleMark(mySchema.marks.em),
                    'Mod-u': toggleMark(mySchema.marks.underline)
                }),
                keymap(baseKeymap),

                // Plugin for clicking and editing <user>
                new Plugin({
                    props: {
                        handleClick(view, pos, event) {
                            const target = event.target as HTMLElement;
                            if (target.nodeName.toLowerCase() === 'user') {
                                const email = target.getAttribute('email');
                                const newEmail = prompt('Edit email:', email || '');
                                if (newEmail && newEmail !== email) {
                                    const $pos = view.state.doc.resolve(pos);
                                    const node = $pos.nodeAfter;
                                    if (node?.type.name === 'user') {
                                        const tr = view.state.tr.setNodeMarkup(pos, undefined, {
                                            email: newEmail
                                        });
                                        view.dispatch(tr);
                                    }
                                }
                                return true;
                            }
                            return false;
                        }
                    }
                }),

                // Plugin to update doc JSON
                new Plugin({
                    view: () => ({
                        update(view) {
                            setDocJSON(view.state.doc.toJSON());
                        }
                    })
                })
            ]
        });

        const view = new EditorView(editorRef.current, {
            state,
            dispatchTransaction(tr: Transaction) {
                const newState = view.state.apply(tr);
                view.updateState(newState);
                setDocJSON(newState.doc.toJSON());
            }
        });

        viewRef.current = view;
        setDocJSON(state.doc.toJSON());

        return () => {
            view.destroy();
        };
    }, []);

    // Toggle mark
    const applyMark = (markName: string) => {
        const view = viewRef.current;
        if (!view) return;
        const { state, dispatch } = view;
        const mark = mySchema.marks[markName];
        if (mark) {
            toggleMark(mark)(state, dispatch);
            view.focus();
        }
    };

    // Insert <user> node
    const insertUser = (email: string) => {
        const view = viewRef.current;
        if (!view) return;
        const { state, dispatch } = view;
        const { from, to } = state.selection;
        const userNode = mySchema.nodes.user.create({ email });

        dispatch(state.tr.replaceRangeWith(from, to, userNode));
        view.focus();
    };

    return (
        <div style={{ display: 'flex', gap: '20px', padding: '20px' }}>
            {/* Editor Area */}
            <div>
                <h3>ProseMirror Editor</h3>
                <div style={{ marginBottom: '10px' }}>
                    <button onClick={() => applyMark('strong')}>Bold</button>
                    <button onClick={() => applyMark('em')}>Italic</button>
                    <button onClick={() => applyMark('underline')}>Underline</button>
                    <button
                        onClick={() => {
                            const email = prompt('Enter user email');
                            if (email) insertUser(email);
                        }}
                    >
                        Insert User
                    </button>
                </div>
                <div
                    ref={editorRef}
                    style={{
                        border: '1px solid #ccc',
                        padding: '10px',
                        minHeight: '120px',
                        borderRadius: '4px',
                        width: '400px'
                    }}
                />
            </div>

            {/* JSON View */}
            <div>
                <h4>Document JSON</h4>
                <pre
                    style={{
                        background: '#f8f8f8',
                        border: '1px solid #eee',
                        padding: '10px',
                        maxHeight: '300px',
                        width: '400px',
                        overflow: 'auto'
                    }}
                >
                    {JSON.stringify(docJSON, null, 2)}
                </pre>
            </div>
        </div>
    );
}
