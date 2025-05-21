import type MarkdownIt from 'markdown-it';
import katex from 'katex';
import { StateBlock, StateInline } from 'markdown-it/index.js';

/**
 * Markdown-it plugin to render LaTeX math using KaTeX.
 * Supports:
 *  - Inline math with $...$
 *  - Block math with $$...$$
 */

export default function markItLaTex(md: MarkdownIt): void {

    // ---------------- INLINE MATH ----------------
    md.inline.ruler.after('escape', 'math_inline', (state: StateInline, silent: boolean): boolean => {
        const start = state.pos;
        if (state.src[start] !== '$') return false;

        let match = start + 1;

        while ((match = state.src.indexOf('$', match)) !== -1) {
            // Ignore escaped dollar signs
            if (state.src[match - 1] !== '\\') break;
            match++;
        }

        if (match === -1 || match === start + 1) return false;

        const content = state.src.slice(start + 1, match);

        if (!silent) {
            const token = state.push('math_inline', 'math', 0);
            token.content = content.trim();
        }

        state.pos = match + 1;
        return true;
    });

    // ---------------- BLOCK MATH ----------------
    md.block.ruler.after('blockquote', 'math_block', (state: StateBlock, startLine: number, endLine: number, silent: boolean): boolean => {
        const startPos = state.bMarks[startLine] + state.tShift[startLine];
        const maxPos = state.eMarks[startLine];
        const firstLine = state.src.slice(startPos, maxPos).trim();

        if (!firstLine.startsWith('$$')) return false;

        let nextLine = startLine + 1;
        let found = false;
        let content = '';

        while (nextLine < endLine) {
            const nextStart = state.bMarks[nextLine] + state.tShift[nextLine];
            const nextMax = state.eMarks[nextLine];
            const nextLineText = state.src.slice(nextStart, nextMax).trim();

            if (nextLineText.endsWith('$$')) {
                content = state.getLines(startLine + 1, nextLine, 0, true).trim();
                content += '\n' + nextLineText.replace(/\$\$$/, '').trim();
                found = true;
                break;
            }

            nextLine++;
        }

        if (!found) return false;
        if (silent) return true;

        const token = state.push('math_block', 'math', 0);
        token.block = true;
        token.content = content.trim();
        token.map = [startLine, nextLine + 1];

        state.line = nextLine + 1;
        return true;
    });

    // ---------------- RENDERERS ----------------
    md.renderer.rules.math_inline = (tokens, idx): string => {
        try {
            return katex.renderToString(tokens[idx].content, {
                throwOnError: false,
            });
        } catch (err) {
            console.error('KaTeX inline render error:', err);
            return tokens[idx].content;
        }
    };

    md.renderer.rules.math_block = (tokens, idx): string => {
        try {
            return katex.renderToString(tokens[idx].content, {
                throwOnError: false,
                displayMode: true,
            });
        } catch (err) {
            console.error('KaTeX block render error:', err);
            return `<pre>${tokens[idx].content}</pre>`;
        }
    };
}
