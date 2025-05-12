import { useEffect } from "react";
import { useLaTexKbStore } from "../LaTexKbContext";
import { observer } from "mobx-react-lite";
import styles from "./../style.module.css";
import { AppError } from "~/core/error/AppError";
import { FooterView } from "./FooterView";
import { CategoryView } from "./CategoryView";
import { CategoriesView } from "./CategoriesView";

function KeyboardContainer() {
    const store = useLaTexKbStore();
    useEffect(() => {
        store.loadCategories();
    }, [store]);

    return (<div className={styles.keyboardConatiner}>
        <MainComponent />
        <FooterView />
    </div>);
}

export { KeyboardContainer };

const MainComponent = observer(function Main() {
    const store = useLaTexKbStore();
    const { categoriesState } = store;

    return categoriesState.when({
        init: () => <Loader />,
        loading: () => <Loader />,
        error: (error) => <Error error={error} />,
        loaded: () => <MainKeyboard />,
    });

    function Loader() {
        return <div className={styles.keyboard}></div>;
    }

    function Error({ error }: { error: AppError }) {
        return <div>{error.message}</div>;
    }

});

function MainKeyboard() {
    return (
        <div className={styles.keyboard}>
            <CategoriesView />
            <CategoryView />
        </div>
    );
}