import { FilterBar } from "./FilterBar";
import { SearchBar } from "./SearchBar";

export function HeaderView() {
    return (<div className="flex flex-col gap-1 p-4">
        <SearchBar />
        <FilterBar />
    </div>);
}
