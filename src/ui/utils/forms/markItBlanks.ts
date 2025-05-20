import type MarkdownIt from 'markdown-it';
import { StateInline, Token } from 'markdown-it/index.js';

export default function markItBlanks(md: MarkdownIt): void {
    md.inline.ruler.before('emphasis', 'fill_in_blank', (state: StateInline, silent: boolean): boolean => {
        const start = state.pos;
        const src = state.src;

        if (src[start] !== '[') return false;

        const end = src.indexOf(']', start);
        if (end === -1) return false;

        const content = src.slice(start + 1, end);

        // Match only if the content is all underscores
        if (!/^_+$/.test(content)) return false;

        if (!silent) {
            const token: Token = state.push('blank_input', '', 0);
            token.content = content;
        }

        state.pos = end + 1;
        return true;
    });

    md.renderer.rules.blank_input = function (tokens, idx): string {
        const rawLength = tokens[idx].content.length;
        const cappedLength = Math.min(rawLength, 10);
        const widthEm = (cappedLength * 1).toFixed(2);

        return `<span class="blank" style="display: inline-block; border-bottom: 1px solid #333; width: ${widthEm}em;">&nbsp;</span>`;
    };
}
