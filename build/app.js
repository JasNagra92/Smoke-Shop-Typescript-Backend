"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const setupServer_1 = require("./setupServer");
const express_1 = __importDefault(require("express"));
const config_1 = require("./config");
class App {
    initialize() {
        this.loadConfig();
        const app = (0, express_1.default)();
        setupServer_1.smokeShopServer.start(app);
    }
    loadConfig() {
        config_1.config.validateConfig();
        config_1.config.cloudinaryConfig();
    }
}
const app = new App();
app.initialize();
//# sourceMappingURL=app.js.map