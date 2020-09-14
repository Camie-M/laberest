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
exports.HashtagDatabase = void 0;
const BaseDatabase_1 = require("./BaseDatabase");
const HashtagsArray_1 = require("../model/HashtagsArray");
const IdGenerator_1 = require("../services/IdGenerator");
class HashtagDatabase extends BaseDatabase_1.BaseDatabase {
    toModel(dbModel) {
        return dbModel && new HashtagsArray_1.HashtagsArray(dbModel.name);
    }
    createHashtag(tag) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("oi");
            try {
                const knex = this.getConnection();
                const generateId = new IdGenerator_1.IdGenerator();
                const tagsArray = tag.getNames();
                for (let item of tagsArray) {
                    const tagId = generateId.generate();
                    yield knex
                        .insert({ id: tagId, name: item })
                        .into(HashtagDatabase.TABLE_NAME);
                }
            }
            catch (error) {
                console.log(error.message);
            }
        });
    }
    getHashtagById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.getConnection()
                .select("*")
                .from(HashtagDatabase.TABLE_NAME)
                .where({ id });
            return result[0];
        });
    }
    getHashtagByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.getConnection()
                .select("name")
                .from(HashtagDatabase.TABLE_NAME)
                .where({ name });
            return result[0];
        });
    }
    getHashtagId(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.getConnection()
                .select("id")
                .from(HashtagDatabase.TABLE_NAME)
                .where({ name });
            return result[0];
        });
    }
    getAllHashtags() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.getConnection()
                .select("*")
                .from(HashtagDatabase.TABLE_NAME);
            return result;
        });
    }
}
exports.HashtagDatabase = HashtagDatabase;
HashtagDatabase.TABLE_NAME = "LABEREST_HASHTAGS";
