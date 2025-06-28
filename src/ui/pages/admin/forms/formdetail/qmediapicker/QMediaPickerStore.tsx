import { action, computed, makeObservable, observable, runInAction } from "mobx";
import { QMedia } from "~/domain/forms/models/qmedia/QMedia";
import { QMediaTile } from "~/domain/forms/models/qmedia/QMediaTile";
import { QMediaType } from "~/domain/forms/models/qmedia/QMediaType";
import { QMediaService } from "~/domain/forms/services/QMediaService";
import { AppStore } from "~/ui/pages/_layout/AppStore";
import { DataState } from "~/ui/utils/DataState";
import { DialogManagerStore } from "~/ui/widgets/dialogmanager";
import { QMediaQueryResponseVm } from "./models/QMediaQueryResponseVm";
import { AppError } from "~/core/error/AppError";
import { PageInfo } from "~/domain/common/models/PageInfo";
import { showErrorToast } from "~/ui/widgets/toast/toast";
import { QMediaExtension } from "~/domain/forms/models/qmedia/QMediaExtension";
import { FileSizeFmt } from "~/core/utils/FileSizeFmt";
import { createDebounce } from "~/core/utils/debouce";


export type QMediaPickerStoreProps = {
    onClose: () => void;
    onSelect: (items: QMediaTile) => void;
    appStore: AppStore;
    dialogManage: DialogManagerStore;
}

export enum QMediaPickerCurrentTab {
    BROWSE = "Media Library",
    UPLOAD = "Upload File",
}

export class QMediaPickerStore {
    onClose: () => void;
    onSelect: (items: QMediaTile) => void;
    appStore: AppStore;
    qMediaService: QMediaService;
    dialogManage: DialogManagerStore;
    currentTab: QMediaPickerCurrentTab = QMediaPickerCurrentTab.BROWSE;
    tabs: QMediaPickerCurrentTab[] = [
        QMediaPickerCurrentTab.UPLOAD,
        QMediaPickerCurrentTab.BROWSE,
    ];
    searchQuery: string = "";
    loadState: DataState<QMediaQueryResponseVm> = DataState.init();
    currentPage: number = 1;
    pageSize: number = 100;
    // TODO: Implement pagination
    selectedItem: QMedia | null = null;
    uploadState: DataState<QMedia> = DataState.init();

    uploadSupportedExtensions: string[] = [
        QMediaExtension.extensionJpeg,
        QMediaExtension.extensionPng,
        QMediaExtension.extensionJpg,
        QMediaExtension.extensionMp4,
    ]

    debouncedLoadFiles: () => void;

    constructor(props: QMediaPickerStoreProps) {
        this.onClose = props.onClose;
        this.onSelect = props.onSelect;
        this.appStore = props.appStore;
        this.qMediaService = new QMediaService();
        this.dialogManage = props.dialogManage;
        makeObservable(this, {
            currentTab: observable,
            isBrowseTab: computed,
            isUploadTab: computed,
            setCurrentTab: action,
            searchQuery: observable,
            onSearchQueryChange: action,
            currentPage: observable,
            pageSize: observable,
            loadState: observable.ref,
            uploadState: observable.ref,
            selectedItem: observable.ref,
            selectMedia: action,
            isConfirmDisabled: computed,
            isUploadButtonDisabled: computed,
        });
        this.debouncedLoadFiles = createDebounce(() => this.loadFiles(), 400);
    }

    onSearchQueryChange(query: string) {
        this.searchQuery = query;
        this.currentPage = 1;
        this.debouncedLoadFiles();
    }

    get queryResponse(): QMediaQueryResponseVm {
        return this.loadState.data!;
    }

    get items(): QMedia[] {
        return this.queryResponse.items;
    }

    get pageInfo(): PageInfo {
        return this.queryResponse.pageInfo;
    }

    get isBrowseTab() {
        return this.currentTab === QMediaPickerCurrentTab.BROWSE;
    }

    get isUploadTab() {
        return this.currentTab === QMediaPickerCurrentTab.UPLOAD;
    }


    get maxAllowedImageSize(): number {
        return this.appStore.orgConfig.subscription.formQMediaImageFSize;
    }

    get maxAllowedVideoSize(): number {
        return this.appStore.orgConfig.subscription.formQMediaVideoFSize;
    }

    thumbnailPath(item: QMedia): string {
        if (item.type.isImage) {
            return this.appStore.apiBaseUrl + "/" + item.path;
        }
        else if (item.type.isVideo) {
            return this.appStore.apiBaseUrl + "/" + item.thumbnail;
        }
        return "";
    }

    selectMedia(item: QMedia) {
        const isEligible = this.isEligible(item);
        if (!isEligible) {
            const humanReadableMaxFileSize = FileSizeFmt.humanReadable(this.maxAllowedSizeInBytes(item.type));
            const selectedFileSize = FileSizeFmt.humanReadable(item.size);
            const message = `The selected file exceeds the maximum allowed size of ${humanReadableMaxFileSize}. Selected file size: ${selectedFileSize}.`;
            showErrorToast({
                message: "File Size Exceeded",
                description: message,
            });
            return;
        }
        if (this.selectedItem === item) {
            this.selectedItem = null;
        } else {
            this.selectedItem = item;
        }
    }

    async loadFiles() {
        try {
            if (this.loadState.isLoading) return;
            runInAction(() => {
                this.loadState = DataState.loading();
            });
            const res = await this.qMediaService.queryQMedia({
                searchQuery: this.searchQuery,
                page: this.currentPage,
                pageSize: this.pageSize,
            });
            const data = res.getOrError();
            const vm = QMediaQueryResponseVm.fromModel(data);
            runInAction(() => {
                this.loadState = DataState.data(vm);
            });
        }
        catch (error) {
            const appError = AppError.fromAny(error);
            runInAction(() => {
                this.loadState = DataState.error(appError);
            });
        }
    }

    setCurrentTab(tab: QMediaPickerCurrentTab) {
        this.currentTab = tab;
    }

    isEligible(item: QMedia): boolean {
        const maxSize = this.maxAllowedSizeInBytes(item.type);
        return item.size <= maxSize;
    }

    get isConfirmDisabled(): boolean {
        return this.selectedItem === null || !this.isEligible(this.selectedItem);
    }

    get isUploadButtonDisabled(): boolean {
        return this.uploadState.isLoading;
    }


    openFilePicker(): void {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = this.uploadSupportedExtensions.map(ext => '.' + ext).join(',');
        input.style.display = 'none';
        document.body.appendChild(input);
        input.addEventListener('change', (event: Event) => {
            const target = event.target as HTMLInputElement;
            if (target.files && target.files.length > 0) {
                const file = target.files[0];
                this.onFileSelected(file);
            }
            document.body.removeChild(input);
        }, { once: true });
        input.click();
    }


    maxAllowedSize(type: QMediaType): number {
        if (type.isImage) {
            return this.appStore.orgConfig.subscription.formQMediaImageFSize;
        }
        if (type.isVideo) {
            return this.appStore.orgConfig.subscription.formQMediaVideoFSize;
        }
        return 0;
    }

    maxAllowedSizeInBytes(type: QMediaType): number {
        return FileSizeFmt.mbToBytes(this.maxAllowedSize(type));
    }

    async onFileSelected(file: File) {
        const fileExtension: string = file.name.split('.').pop()?.toLowerCase() ?? "";
        const extension = QMediaExtension.fromExtensionString(fileExtension);
        const type = QMediaType.fromExtension(fileExtension);

        if (!extension || !type) {
            showErrorToast({
                message: "File not supported",
                description: "Please select a file with supported extension",
            });
            return;
        }

        const selectedFileSize = file.size;
        const maxAllowedSize = this.maxAllowedSizeInBytes(type);

        if (selectedFileSize > maxAllowedSize) {
            showErrorToast({
                message: "File Size Exceeded",
                description: `The selected file exceeds the maximum allowed size of ${FileSizeFmt.humanReadable(maxAllowedSize)}.`,
            });
            return;
        }

        await this.uploadFile(file);
    }


    async uploadFile(file: File) {
        try {
            runInAction(() => {
                this.uploadState = DataState.loading();
            });
            const res = await this.qMediaService.createQMedia(file);
            const qMedia = res.getOrError();
            this.onFileUploadSuccess(qMedia);
        }
        catch (error) {
            const appError = AppError.fromAny(error);
            runInAction(() => {
                this.uploadState = DataState.error(appError);
            });
            showErrorToast({
                message: appError.message,
                description: appError.description,
            });
        }
    }

    onFileUploadSuccess(qMedia: QMedia) {
        runInAction(() => {
            this.uploadState = DataState.data(qMedia);
            this.selectedItem = qMedia;
        });
        this.onClickConfirm();
    }

    onClickConfirm(): void {
        if (this.selectedItem) {
            this.onSelect(this.selectedItem.toTile());
        } else {
            showErrorToast({
                message: "No Media Selected",
                description: "Please select a media item before confirming.",
            });
        }
    }


}