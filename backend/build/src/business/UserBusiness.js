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
exports.UserBusiness = void 0;
const User_1 = require("../model/User");
const InvalidParameterError_1 = require("../error/InvalidParameterError");
const NotFoundError_1 = require("../error/NotFoundError");
class UserBusiness {
    constructor(userDatabase, idGenerator, hashManager, authenticator) {
        this.userDatabase = userDatabase;
        this.idGenerator = idGenerator;
        this.hashManager = hashManager;
        this.authenticator = authenticator;
    }
    signup(user) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!user.name || !user.email || !user.nickname || !user.password) {
                throw new InvalidParameterError_1.InvalidParameterError("Missing input");
            }
            if (user.email.indexOf("@") === -1) {
                throw new InvalidParameterError_1.InvalidParameterError("Invalid email");
            }
            if (user.password.length < 6) {
                throw new InvalidParameterError_1.InvalidParameterError("Password must be have at least 6 characters");
            }
            const id = this.idGenerator.generate();
            const cryptedPassword = yield this.hashManager.hash(user.password);
            yield this.userDatabase.createUser(new User_1.User(id, user.name, user.email, user.nickname, cryptedPassword));
            const accessToken = this.authenticator.generateToken({
                id,
            });
            return accessToken;
        });
    }
    login(user) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!user.email || !user.password) {
                throw new InvalidParameterError_1.InvalidParameterError("Missing input");
            }
            const userFromDB = yield this.userDatabase.getUserByEmail(user.email);
            if (!userFromDB) {
                throw new NotFoundError_1.NotFoundError("User not found");
            }
            const isPasswordCorrect = yield this.hashManager.compare(user.password, userFromDB.getPassword());
            if (!isPasswordCorrect) {
                throw new InvalidParameterError_1.InvalidParameterError("Invalid password");
            }
            const accessToken = this.authenticator.generateToken({
                id: userFromDB.getId(),
            });
            return accessToken;
        });
    }
}
exports.UserBusiness = UserBusiness;
