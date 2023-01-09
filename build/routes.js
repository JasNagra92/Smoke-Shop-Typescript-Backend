"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const healthRoutes_1 = require("./features/health/routes/healthRoutes");
const stripeRoutes_1 = require("./features/stripe/routes/stripeRoutes");
const orderRoutes_1 = require("./features/cart/routes/orderRoutes");
const base_queue_1 = require("./../src/shared/services/queue/base.queue");
const authMiddleware_1 = require("./shared/globals/helpers/authMiddleware");
const currentUser_routes_1 = require("./../src/features/auth/routes/currentUser.routes");
const auth_routes_1 = require("./../src/features/auth/routes/auth.routes");
const menuRoutes_1 = require("./features/menu/routes/menuRoutes");
const BASE_PATH = '/api/v1';
exports.default = (app) => {
    app.use('/health', healthRoutes_1.healthRoutes.healthRoute());
    app.use('/instance', healthRoutes_1.healthRoutes.instance());
    app.use('/env', healthRoutes_1.healthRoutes.env());
    app.use('/queues', base_queue_1.serverAdapter.getRouter());
    app.use('/webhook', stripeRoutes_1.stripeRoutes.webhookRoutes());
    app.use(BASE_PATH, auth_routes_1.authRoutes.routes());
    app.use(BASE_PATH, auth_routes_1.authRoutes.signOutRoute());
    app.use(BASE_PATH, menuRoutes_1.menuRoutes.routes());
    app.use(BASE_PATH, orderRoutes_1.cartRoutes.routes());
    app.use(BASE_PATH, stripeRoutes_1.stripeRoutes.routes());
    app.use(BASE_PATH, authMiddleware_1.authMiddleware.verifyUser, currentUser_routes_1.currentUserRouter.routes());
};
//# sourceMappingURL=routes.js.map