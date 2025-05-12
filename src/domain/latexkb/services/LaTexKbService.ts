import { AppError } from "~/core/error/AppError";
import { ResEither } from "~/core/utils/ResEither";
import { categories } from "./CategoryFactory";
import { CategoriesRes } from "../models/CategoryRes";

export class LaTexKbService {

    async getCategories(): Promise<ResEither<AppError, CategoriesRes>> {
        const res = new CategoriesRes({ categories: [] });
        res.categories.push(...categories);
        return ResEither.data(res);
    }

}