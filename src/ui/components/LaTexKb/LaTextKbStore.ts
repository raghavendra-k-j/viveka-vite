import type { MathfieldElement, Selector } from "mathlive";
import { makeAutoObservable, observable, runInAction } from "mobx"
import { AppError } from "~/core/error/AppError";
import { LaTexKbService } from "~/domain/latexkb/services/LaTexKbService";
import { DataState } from "~/ui/utils/DataState";
import { KbKeyVm } from "./models/KbKeyVm";
import { CategoryVm } from "./models/CategoryVm";
import { CategoriesVm } from "./models/CategoriesVm";
import { LaTexExpr } from "~/domain/latexkb/models/LaTexExpr";
import { logger } from "~/core/utils/logger";

type LaTexKbStoreProps = {
    latexKbService: LaTexKbService;
    expr?: LaTexExpr;
    onDone: (expr: LaTexExpr) => void;
    onClose: () => void;
    stt: STT;
}

export class LaTexKbStore {
    latexKbService: LaTexKbService;
    categoriesState: DataState<CategoriesVm>;
    mf: MathfieldElement | null = null;
    rxSelectedCategory: CategoryVm | null = null;
    onDone: (expr: LaTexExpr) => void;
    onClose: () => void;
    expr?: LaTexExpr;
    stt: STT;


    constructor(props: LaTexKbStoreProps) {
        this.latexKbService = props.latexKbService;
        this.categoriesState = DataState.init<CategoriesVm>();
        logger.debug("LaTexKbStore", "onClose", props.onClose);
        this.onDone = props.onDone;
        this.onClose = props.onClose;
        this.expr = props.expr;
        this.stt = props.stt;
        makeAutoObservable(this, {
            categoriesState: observable,
            rxSelectedCategory: observable,
        });
    }

    loadCategories = async () => {
        try {
            const res = (await this.latexKbService.getCategories()).getOrError();
            runInAction(() => {
                const categoriesVm = CategoriesVm.fromCategoriesRes(res);
                this.rxSelectedCategory = categoriesVm.items[0];
                this.categoriesState = DataState.data(categoriesVm);
            });
        }
        catch (error) {
            const appError = AppError.fromAny(error);
            runInAction(() => {
                this.categoriesState = DataState.error(appError);
            });
        }
    }

    get hasMf() {
        return this.mf !== null;
    }

    get selectedCategory(): CategoryVm {
        return this.rxSelectedCategory!;
    }

    get categories(): CategoryVm[] {
        return this.categoriesState.data!.items;
    }

    isCategorySelected(category: CategoryVm): boolean {
        return this.rxSelectedCategory?.id === category.id;
    }


    onSelectCategory(category: CategoryVm) {
        runInAction(() => {
            this.rxSelectedCategory = category;
        });
    }


    onMfReady(mf: MathfieldElement) {
        runInAction(() => {
            this.mf = mf;
        });
        mf.mathVirtualKeyboardPolicy = "manual";
        mf.placeholder = "\\text{Enter a formula}";
        mf.value = this.expr?.latex ?? '';
        mf.focus();
    }

    onKeyPress(item: KbKeyVm): void {
        this.mf?.insert(item.base.latex, {
            focus: true,
        });
    }


    navigateLeft() {
        this.execKeyboardAction("moveToPreviousChar");
    }

    navigateRight() {
        this.execKeyboardAction("moveToNextChar");
    }

    backspace() {
        this.execKeyboardAction("deleteBackward");
    }

    clear() {
        this.execKeyboardAction("deleteAll");
    }

    execKeyboardAction(selector: Selector) {
        if (!this.mf) return;
        this.mf.executeCommand(selector);
        this.mf.focus();
    }

    onClickDone(): void {
        if (!this.mf) return;
        const latex = this.mf.getValue("latex");
        const expr = new LaTexExpr({ latex: latex, isInline: true });
        this.onDone(expr);
    }

    onClickClose(): void {
        if (typeof this.onClose === "function") {
            this.onClose();
        } else {
            console.error("onClose is not a function:", this.onClose);
        }
    }

}