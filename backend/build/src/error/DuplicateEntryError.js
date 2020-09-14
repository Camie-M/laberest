"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DuplicateEntryError = void 0;
const BaseError_1 = require("./BaseError");
class DuplicateEntryError extends BaseError_1.BaseError {
    constructor(message) {
        super(message, 409);
    }
}
exports.DuplicateEntryError = DuplicateEntryError;
