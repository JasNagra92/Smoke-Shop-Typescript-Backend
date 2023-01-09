"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const bunyan_1 = __importDefault(require("bunyan"));
dotenv_1.default.config({});
class Config {
    constructor() {
        this.MONGO_URL = process.env.MONGO_URL;
        this.KEY_ONE = process.env.KEY_ONE;
        this.KEY_TWO = process.env.KEY_TWO;
        this.NODE_ENV = process.env.NODE_ENV;
        this.JWT_SECRET = process.env.JWT_SECRET;
        this.CLIENT_URL = process.env.CLIENT_URL;
        this.SENDER_EMAIL = process.env.SENDER_EMAIL;
        this.SENDER_PASSWORD = process.env.SENDER_PASSWORD;
        this.SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
        this.REDIS_HOST = process.env.REDIS_HOST;
        this.STRIPE_API_KEY = process.env.STRIPE_API_KEY;
        this.STRIPE_ENDPOINT_SECRET = process.env.STRIPE_ENDPOINT_SECRET;
        this.EC2_URL = process.env.EC2_URL;
    }
    validateConfig() {
        for (const [key, value] of Object.entries(this)) {
            if (value === undefined) {
                throw new Error(`${key} is undefined`);
            }
        }
    }
    createLogger(name) {
        return bunyan_1.default.createLogger({ name, level: 'debug' });
    }
}
exports.config = new Config();
//# sourceMappingURL=config.js.map