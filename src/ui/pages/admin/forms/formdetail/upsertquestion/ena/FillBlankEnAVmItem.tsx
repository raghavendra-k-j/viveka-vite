import React, { createRef } from "react";
import { Node as ProseMirrorNode } from "prosemirror-model";
import { RichPmEditorRef } from "~/ui/components/richpmeditor/RichPmEditor";
import { UUIDUtil } from "~/core/utils/UUIDUtil";

export type FillBlankEnAVmItemProps = {
    node: ProseMirrorNode | null;
}

export class FillBlankEnAVmItem {
    uid: string;
    ref: React.RefObject<RichPmEditorRef | null>;
    node: ProseMirrorNode | null;

    constructor(props: FillBlankEnAVmItemProps) {
        this.uid = UUIDUtil.compact;
        this.ref = createRef<RichPmEditorRef | null>();
        this.node = props.node;
    }

    onNodeChanged(node: ProseMirrorNode | null) {
        this.node = node;
    }
}
