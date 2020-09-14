"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageDatabase = void 0;
const BaseDatabase_1 = require("./BaseDatabase");
const Image_1 = require("../model/Image");
class ImageDatabase extends BaseDatabase_1.BaseDatabase {
    toModel(dbModel) {
        return (dbModel &&
            new Image_1.Image(dbModel.id, dbModel.subtitle, dbModel.author, dbModel.date, dbModel.file, dbModel.collection));
    }
    createImage(image) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.getConnection()
                .insert({
                id: image.getId(),
                subtitle: image.getSubtitle(),
                author: image.getAuthor(),
                date: image.getDate(),
                file: image.getFile(),
                collection: image.getCollection(),
            })
                .into(ImageDatabase.TABLE_NAME);
        });
    }
    getImageById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.getConnection()
                .select("*")
                .from(ImageDatabase.TABLE_NAME)
                .where({ id });
            return Image_1.Image.toImageModel(result[0]);
        });
    }
    getAllImages() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.getConnection()
                .select("*")
                .from(ImageDatabase.TABLE_NAME);
            return result;
        });
    }
}
exports.ImageDatabase = ImageDatabase;
ImageDatabase.TABLE_NAME = "LABEREST_IMAGES";
