"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const setupServer_1 = require("./setupServer");
const express_1 = __importDefault(require("express"));
const config_1 = require("./config");
const setupDatabase_1 = __importDefault(require("./setupDatabase"));
const log = config_1.config.createLogger('app');
class App {
    initialize() {
        this.loadConfig();
        (0, setupDatabase_1.default)();
        const app = (0, express_1.default)();
        setupServer_1.smokeShopServer.start(app);
        App.handleExit();
    }
    loadConfig() {
        config_1.config.validateConfig();
    }
    static handleExit() {
        process.on('uncaughtException', (error) => {
            log.error(`There was an uncaught error: ${error}`);
            App.shutDownProperly(1);
        });
        process.on('unhandleRejection', (reason) => {
            log.error(`Unhandled rejection at promise: ${reason}`);
            App.shutDownProperly(2);
        });
        process.on('SIGTERM', () => {
            log.error('Caught SIGTERM');
            App.shutDownProperly(2);
        });
        process.on('SIGINT', () => {
            log.error('Caught SIGINT');
            App.shutDownProperly(2);
        });
        process.on('exit', () => {
            log.error('Exiting');
        });
    }
    static shutDownProperly(exitCode) {
        Promise.resolve()
            .then(() => {
            log.info('Shutdown Complete');
            process.exit(exitCode);
        })
            .catch((error) => {
            log.error(`Error during shutdown: ${error}`);
            process.exit(1);
        });
    }
}
const app = new App();
app.initialize();
//# sourceMappingURL=app.js.map