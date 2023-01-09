"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
require("express-async-errors");
const express_1 = __importStar(require("express"));
const hpp_1 = __importDefault(require("hpp"));
const helmet_1 = __importDefault(require("helmet"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const compression_1 = __importDefault(require("compression"));
const cookie_session_1 = __importDefault(require("cookie-session"));
const routes_1 = __importDefault(require("./routes"));
const config_1 = require("./config");
const errorHandler_1 = require("../src/shared/globals/helpers/errorHandler");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const PORT = 4000;
const log = config_1.config.createLogger('serverSetup');
class SmokeShopServer {
    constructor() {
        this.app = (0, express_1.default)();
    }
    // public function that will be called in main app class
    start(app) {
        this.securityMiddelware(app);
        this.standardMiddleware(app);
        this.routesMiddleware(app);
        this.globalErrorHandler(app);
        this.startServer(app);
    }
    securityMiddelware(app) {
        app.use((0, cookie_session_1.default)({
            name: 'session',
            keys: [config_1.config.KEY_ONE, config_1.config.KEY_TWO],
            maxAge: 24 * 7 * 3600000,
            secure: config_1.config.NODE_ENV !== 'development'
        }));
        app.use((0, hpp_1.default)());
        app.use((0, helmet_1.default)());
        app.use((0, cors_1.default)({
            origin: config_1.config.CLIENT_URL,
            credentials: true,
            optionsSuccessStatus: 200,
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
        }));
    }
    standardMiddleware(app) {
        app.use((0, compression_1.default)());
        // if request comes from webhook url, do not parse
        app.use((req, res, next) => {
            if (req.originalUrl === '/webhook') {
                next();
            }
            else {
                express_1.default.json()(req, res, next);
            }
        });
        app.use((0, express_1.urlencoded)({ extended: true, limit: '50mb' }));
    }
    // anonymous function that will be called from routes file
    routesMiddleware(app) {
        (0, routes_1.default)(app);
    }
    // middleware that will be called after routes middleware to respond with error to client
    globalErrorHandler(app) {
        app.all('*', (req, res) => {
            res.status(http_status_codes_1.default.NOT_FOUND).json({ message: `${req.originalUrl} not found` });
        });
        app.use((error, _req, res, next) => {
            log.error(error);
            if (error instanceof errorHandler_1.CustomError) {
                return res.status(error.statusCode).json(error.serializeErrors());
            }
            next();
        });
    }
    // creates http server and uses private method to start listening on port
    startServer(app) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const httpServer = new http_1.default.Server(app);
                this.startHTTPServer(httpServer);
            }
            catch (error) {
                log.error(error);
            }
        });
    }
    startHTTPServer(httpServer) {
        httpServer.listen(PORT, () => {
            log.info('server started now listening on ' + PORT);
        });
    }
}
exports.smokeShopServer = new SmokeShopServer();
//# sourceMappingURL=setupServer.js.map