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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageBusiness = exports.imageId = void 0;
const Image_1 = require("../model/Image");
const IdGenerator_1 = require("../services/IdGenerator");
const InvalidParameterError_1 = require("../error/InvalidParameterError");
const moment_1 = __importDefault(require("moment"));
const HashtagBusiness_1 = require("./HashtagBusiness");
const HashtagDatabase_1 = require("../data/HashtagDatabase");
const HashtagImageDatabase_1 = require("../data/HashtagImageDatabase");
const id = new IdGenerator_1.IdGenerator();
exports.imageId = id.generate();
class ImageBusiness {
    constructor(imageDatabase, idGenerator) {
        this.imageDatabase = imageDatabase;
        this.idGenerator = idGenerator;
    }
    createImage(image, tagsArray) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!image.subtitle || !image.author || !image.file || !image.collection) {
                throw new InvalidParameterError_1.InvalidParameterError("Missing input");
            }
            const dateNow = moment_1.default().format("YYYY-MM-DD HH:mm");
            yield this.imageDatabase.createImage(new Image_1.Image(exports.imageId, image.subtitle, image.author, dateNow, image.file, image.collection));
            /* Criar relação entre imagem e hashtag */
            for (let item of tagsArray) {
                const hashtagId = yield ImageBusiness.HashtagBusiness.getHashtagId(item);
                const tagImgRelation = new HashtagImageDatabase_1.HashtagImageDatabase();
                tagImgRelation.createHashtagImageRelation(hashtagId, exports.imageId);
            }
        });
    }
    getImageById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!id) {
                throw new InvalidParameterError_1.InvalidParameterError("Missing input");
            }
            const findImage = yield this.imageDatabase.getImageById(id);
            return findImage;
        });
    }
    getAllImages() {
        return __awaiter(this, void 0, void 0, function* () {
            const getFeed = yield this.imageDatabase.getAllImages();
            return getFeed;
        });
    }
}
exports.ImageBusiness = ImageBusiness;
ImageBusiness.HashtagBusiness = new HashtagBusiness_1.HashtagBusiness(new HashtagDatabase_1.HashtagDatabase(), new IdGenerator_1.IdGenerator());
