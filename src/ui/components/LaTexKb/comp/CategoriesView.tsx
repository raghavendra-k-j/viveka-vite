import { observer } from "mobx-react-lite";
import { CategoryVm } from "../models/CategoryVm";
import clsx from "clsx";
import styles from "./../style.module.css";
import { useLaTexKbStore } from "../LaTexKbContext";

export const CategoriesView = observer(() => {
    const store = useLaTexKbStore();
    const handleCategoryClick = (item: CategoryVm) => {
        store.onSelectCategory(item);
    };


    return (
        <div className={styles.categories}>
            {store.categories.map((item) => (
                <CategoryItemView
                    key={item.name}
                    item={item}
                    isSelected={store.isCategorySelected(item)}
                    onClick={handleCategoryClick}
                />
            ))}
        </div>
    );
});

const CategoryItemView = observer((props: {
    item: CategoryVm;
    isSelected: boolean;
    onClick: (item: CategoryVm) => void;
}) => {
    const className = clsx(styles.categoryItem, { [styles.active]: props.isSelected });
    return (<div
        className={className}
        onClick={() => props.onClick(props.item)}
    >
        {props.item.name}
    </div>);
});
