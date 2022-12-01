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
exports.smokeShopServer = void 0;
const express_1 = __importDefault(require("express"));
const hpp_1 = __importDefault(require("hpp"));
const helmet_1 = __importDefault(require("helmet"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
let PORT = 4000;
class SmokeShopServer {
    constructor() {
        this.app = (0, express_1.default)();
    }
    start(app) {
        this.securityMiddelware(app);
        this.standardMiddleware(app);
        this.routesMiddleware(app);
        this.globalErrorHandler(app);
        this.startServer(app);
    }
    securityMiddelware(app) {
        app.use((0, hpp_1.default)());
        app.use((0, helmet_1.default)());
        app.use((0, cors_1.default)());
    }
    standardMiddleware(app) { }
    routesMiddleware(app) {
        appRoutes(app);
    }
    globalErrorHandler(app) { }
    startServer(app) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const httpServer = new http_1.default.Server(app);
                this.startHTTPServer(httpServer);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    startHTTPServer(httpServer) {
        httpServer.listen(PORT, () => {
            console.log('server started now listening on ' + PORT);
        });
    }
}
exports.smokeShopServer = new SmokeShopServer();
//# sourceMappingURL=setupServer.js.map