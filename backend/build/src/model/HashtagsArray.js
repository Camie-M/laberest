"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HashtagsArray = void 0;
class HashtagsArray {
    constructor(names) {
        this.names = names;
    }
    getNames() {
        return this.names;
    }
    setName(names) {
        this.names = names;
    }
    static toHashtagModel(tag) {
        return new HashtagsArray(tag.names);
    }
}
exports.HashtagsArray = HashtagsArray;
