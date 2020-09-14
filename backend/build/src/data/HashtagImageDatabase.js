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
exports.HashtagImageDatabase = void 0;
const BaseDatabase_1 = require("./BaseDatabase");
class HashtagImageDatabase extends BaseDatabase_1.BaseDatabase {
    createHashtagImageRelation(tagId, imageId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const knex = this.getConnection();
                yield knex
                    .insert({ hashtag_id: tagId, image_id: imageId })
                    .into(HashtagImageDatabase.TABLE_NAME);
            }
            catch (error) {
                console.log(error.message);
            }
        });
    }
}
exports.HashtagImageDatabase = HashtagImageDatabase;
HashtagImageDatabase.TABLE_NAME = "LABEREST_HASHTAGS_IMAGES";
