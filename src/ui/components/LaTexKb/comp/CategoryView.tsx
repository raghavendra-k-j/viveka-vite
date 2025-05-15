import { observer } from "mobx-react-lite";
import { useLaTexKbStore } from "../LaTexKbContext";
import { DirectCategoryView } from "./DirectCategoryView";
import { DirectCategoryVm } from "../models/DirectCategoryVm";
import { SectionedCategoryView } from "./SectionedCategoryView";
import { SectionedCategoryVm } from "../models/SectionedCategoryVm";
import React from "react";
import type { CategoryVm } from "../models/CategoryVm";
import styles from "./../style.module.css";
import { CategoryType } from "~/domain/latexkb/models/Category";
import { AllCategoryView } from "./AllCategoryView";

const CategoryView = observer(() => {
    const store = useLaTexKbStore();
    const { selectedCategory } = store;
    return <div className={styles.categoryMain}>
        {renderCategoryView(selectedCategory)}
    </div>;
});

const rendererMap: Record<CategoryType, (category: CategoryVm) => React.JSX.Element> = {
    [CategoryType.DIRECT]: (category) => <DirectCategoryView category={category as DirectCategoryVm} />,
    [CategoryType.SECTIONED]: (category) => <SectionedCategoryView category={category as SectionedCategoryVm} />,
    [CategoryType.ALL]: () => <AllCategoryView />,
};


function renderCategoryView(category: CategoryVm): React.JSX.Element {
    const renderer = rendererMap[category.type];
    return renderer(category);
}

export { CategoryView };
