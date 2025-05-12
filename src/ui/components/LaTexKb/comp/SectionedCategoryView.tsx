import { useState, useEffect } from "react";
import clsx from "clsx";
import styles from "./../style.module.css";
import type { SectionVm } from "../models/SectionVm";
import type { SectionedCategoryVm } from "../models/SectionedCategoryVm";
import { KeyGroupsView } from "./KeyGroupsView";

type SectionedCategoryViewProps = {
    category: SectionedCategoryVm;
};

function SectionedCategoryView(props: SectionedCategoryViewProps) {
    const { category } = props;
    const { items } = category;
    const [currentSection, setCurrentSection] = useState(items[0]);

    useEffect(() => {
        setCurrentSection(items[0]);
    }, [items]);

    return (
        <>
            <TabItems
                items={items}
                currentSection={currentSection}
                onSelect={setCurrentSection}
            />
            <Body section={currentSection} />
        </>
    );
}

export { SectionedCategoryView };

type TabItemsProps = {
    items: SectionVm[];
    currentSection: SectionVm;
    onSelect: (section: SectionVm) => void;
};

function TabItems(props: TabItemsProps) {
    const { items, currentSection, onSelect } = props;

    return (
        <div className={styles.sectionTabs}>
            {items.map((item) => (
                <div
                    key={item.id}
                    onClick={() => onSelect(item)}
                    className={clsx(styles.sectionTabItem, { [styles.active]: item.id === currentSection.id })}

                >{item.name}</div>
            ))}
        </div>
    );
}

type BodyProps = {
    section: SectionVm;
};

function Body(props: BodyProps) {
    const { section } = props;
    return (<KeyGroupsView items={section.items} />);
}