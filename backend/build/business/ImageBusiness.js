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
exports.ImageBusiness = void 0;
const Image_1 = require("../model/Image");
const InvalidParameterError_1 = require("../error/InvalidParameterError");
const moment_1 = __importDefault(require("moment"));
class ImageBusiness {
    constructor(imageDatabase, idGenerator) {
        this.imageDatabase = imageDatabase;
        this.idGenerator = idGenerator;
    }
    createImage(image) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!image.subtitle || !image.author || !image.file || !image.collection) {
                throw new InvalidParameterError_1.InvalidParameterError("Missing input");
            }
            const imageId = this.idGenerator.generate();
            const dateNow = moment_1.default().format("YYYY-MM-DD HH:mm");
            yield this.imageDatabase.createImage(new Image_1.Image(imageId, image.subtitle, image.author, dateNow, image.file, image.collection));
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
