"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const redisConnection_1 = require("./shared/services/redis/redisConnection");
const config_1 = require("./config");
const mongoose_1 = __importDefault(require("mongoose"));
const log = config_1.config.createLogger('databaseLog');
exports.default = () => {
    const connect = () => {
        mongoose_1.default
            .connect(`${config_1.config.MONGO_URL}`)
            .then(() => {
            log.info('database connection successfull');
            redisConnection_1.redisConnection.connect();
        })
            .catch((error) => {
            log.info('database error', error);
            process.exit(1);
        });
    };
    connect();
    mongoose_1.default.connection.on('disconnect', connect);
};
//# sourceMappingURL=setupDatabase.js.map