import KatexRenderer from "~/ui/widgets/katex/KatexRenderer";
import styles from "./../style.module.css";
import { useLaTexKbStore } from "../LaTexKbContext";
import type { KbKeyVm } from "../models/KbKeyVm";

type KbKeyViewPropsView = {
    item: KbKeyVm;
}

export function KbKeyView(props: KbKeyViewPropsView) {
    const store = useLaTexKbStore();
    return <div
        onClick={() => store.onKeyPress(props.item)}
        className={styles.key}
    >
        <KatexRenderer inline={true} tex={props.item.base.label} />
    </div>;
}