import { QMediaRepo } from "~/infra/repos/forms/QMediaRepo";
import { QMedia } from "~/domain/forms/models/qmedia/QMedia";
import { QueryQMediaResponse } from "~/domain/forms/models/qmedia/QueryQMediaResponse";
import { ResEither } from "~/core/utils/ResEither";
import { AppError } from "~/core/error/AppError";
import { QMediaType } from "../models/qmedia/QMediaType";

export class QMediaService {
    private readonly qMediaRepo: QMediaRepo;

    constructor() {
        this.qMediaRepo = new QMediaRepo();
    }

    async getQMedia(id: number): Promise<ResEither<AppError, QMedia>> {
        return await this.qMediaRepo.getQMedia(id);
    }

    async queryQMedia({ searchQuery, page, pageSize, types }: {
        searchQuery?: string;
        page?: number;
        pageSize?: number;
        types?: QMediaType[];
    }): Promise<ResEither<AppError, QueryQMediaResponse>> {
        return await this.qMediaRepo.queryQMedia({ searchQuery, page, pageSize, types });
    }

    async deleteQMedia(id: number): Promise<ResEither<AppError, void>> {
        return await this.qMediaRepo.deleteQMedia(id);
    }

    async createQMedia(file: File): Promise<ResEither<AppError, QMedia>> {
        return await this.qMediaRepo.createQMedia(file);
    }
}