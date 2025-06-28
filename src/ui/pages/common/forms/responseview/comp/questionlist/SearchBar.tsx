import { FInput } from "~/ui/widgets/form/input/FInput";
import { useResponseViewStore } from "../../ResponseViewContext";

export function SearchBar() {
    const store = useResponseViewStore();
    return (<FInput
        placeholder="Search Questions"
        type="search"
        onChange={(e) => store.onSearchQueryChanged(e.target.value)}
    />);
}