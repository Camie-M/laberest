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
exports.HashtagBusiness = void 0;
const HashtagsArray_1 = require("../model/HashtagsArray");
const InvalidParameterError_1 = require("../error/InvalidParameterError");
class HashtagBusiness {
    constructor(hashtagDatabase, idGenerator) {
        this.hashtagDatabase = hashtagDatabase;
        this.idGenerator = idGenerator;
    }
    createHashtag(hashtag) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!hashtag.names) {
                throw new InvalidParameterError_1.InvalidParameterError("Missing input");
            }
            yield this.hashtagDatabase.createHashtag(new HashtagsArray_1.HashtagsArray(hashtag.names));
        });
    }
    getHashtagById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!id) {
                throw new InvalidParameterError_1.InvalidParameterError("Missing input");
            }
            const findTag = yield this.hashtagDatabase.getHashtagById(id);
            return findTag;
        });
    }
    getHashtagByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!name) {
                throw new InvalidParameterError_1.InvalidParameterError("Missing input");
            }
            const findTag = yield this.hashtagDatabase.getHashtagByName(name);
            return findTag;
        });
    }
    getHashtagId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!id) {
                throw new InvalidParameterError_1.InvalidParameterError("Missing input");
            }
            const findTagId = yield this.hashtagDatabase.getHashtagByName(name);
            return findTagId;
        });
    }
    getAllHashtags() {
        return __awaiter(this, void 0, void 0, function* () {
            const getHashtags = yield this.hashtagDatabase.getAllHashtags();
            return getHashtags;
        });
    }
}
exports.HashtagBusiness = HashtagBusiness;
