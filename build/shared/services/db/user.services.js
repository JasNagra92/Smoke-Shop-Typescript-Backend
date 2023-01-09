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
exports.userServices = void 0;
const errorHandler_1 = require("./../../globals/helpers/errorHandler");
const user_model_1 = require("../../../features/user/models/user.model");
const validator_1 = __importDefault(require("validator"));
class UserServices {
    addUserToDB(data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield user_model_1.userModel.create(data);
        });
    }
    findUserByUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const foundUser = yield user_model_1.userModel.findOne({ username });
            return foundUser;
        });
    }
    getUserByUsernameOrEmail(username, email) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = {
                $or: [{ username }, { email }]
            };
            const user = (yield user_model_1.userModel.findOne(query).exec());
            return user;
        });
    }
    validateCredentials(email, password, phoneNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!validator_1.default.isEmail(email)) {
                throw new errorHandler_1.ValidationError('email must be valid');
            }
            if (!validator_1.default.isStrongPassword(password)) {
                throw new errorHandler_1.ValidationError('password not strong enough');
            }
            if (!validator_1.default.isMobilePhone(phoneNumber)) {
                throw new errorHandler_1.ValidationError('phone number must be a phone number');
            }
        });
    }
}
exports.userServices = new UserServices();
//# sourceMappingURL=user.services.js.map