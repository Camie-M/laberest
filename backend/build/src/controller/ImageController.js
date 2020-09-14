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
exports.ImageController = void 0;
const ImageDatabase_1 = require("../data/ImageDatabase");
const ImageBusiness_1 = require("../business/ImageBusiness");
const IdGenerator_1 = require("../services/IdGenerator");
const Authenticator_1 = require("../services/Authenticator");
const NotFoundError_1 = require("../error/NotFoundError");
const HashtagBusiness_1 = require("../business/HashtagBusiness");
const HashtagDatabase_1 = require("../data/HashtagDatabase");
class ImageController {
    createImage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                /* Autenticação do token */
                const token = req.headers.authorization;
                const authenticator = new Authenticator_1.Authenticator();
                const authenticationData = authenticator.getData(token);
                if (!authenticationData) {
                    throw new Error("Token unanthorized");
                }
                /* Pegar dados enviados pelo usuário */
                const tagsArray = req.body.tags;
                const tagInput = {
                    names: tagsArray,
                };
                const imageInput = {
                    subtitle: req.body.subtitle,
                    author: req.body.author,
                    file: req.body.file,
                    collection: req.body.collection,
                };
                /* Conferir se tag já existe */
                for (let item of tagsArray) {
                    const hashtagDB = yield ImageController.HashtagBusiness.getHashtagByName(item);
                    if (!hashtagDB) {
                        yield ImageController.HashtagBusiness.createHashtag(tagInput);
                    }
                }
                yield ImageController.ImageBusiness.createImage(imageInput, tagsArray);
                res.status(200).send("Image created successfully");
            }
            catch (error) {
                res.status(error.errorCode || 400).send({ message: error.message });
            }
        });
    }
    getImageById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization;
                const authenticator = new Authenticator_1.Authenticator();
                const authenticationData = authenticator.getData(token);
                if (!authenticationData) {
                    throw new Error("Token unanthorized");
                }
                const userInput = req.params.id;
                const result = yield ImageController.ImageBusiness.getImageById(userInput);
                if (!result) {
                    throw new NotFoundError_1.NotFoundError("Image not found");
                }
                res.status(200).send(result);
            }
            catch (error) {
                res.status(error.errorCode || 400).send({ message: error.message });
            }
        });
    }
    getAllImages(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization;
                const authenticator = new Authenticator_1.Authenticator();
                const authenticationData = authenticator.getData(token);
                if (!authenticationData) {
                    throw new Error("Token unanthorized");
                }
                const result = yield ImageController.ImageBusiness.getAllImages();
                if (!result) {
                    throw new NotFoundError_1.NotFoundError("Feed not found");
                }
                res.status(200).send(result);
            }
            catch (error) {
                res.status(error.errorCode || 400).send({ message: error.message });
            }
        });
    }
}
exports.ImageController = ImageController;
ImageController.ImageBusiness = new ImageBusiness_1.ImageBusiness(new ImageDatabase_1.ImageDatabase(), new IdGenerator_1.IdGenerator());
ImageController.HashtagBusiness = new HashtagBusiness_1.HashtagBusiness(new HashtagDatabase_1.HashtagDatabase(), new IdGenerator_1.IdGenerator());
