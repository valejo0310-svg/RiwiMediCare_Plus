"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
exports.app = (0, express_1.default)();
/*
|--------------------------------------------------------------------------
| GLOBAL MIDDLEWARES
|--------------------------------------------------------------------------
*/
exports.app.use((0, helmet_1.default)({
    contentSecurityPolicy: false
}));
exports.app.use((0, cors_1.default)());
exports.app.use(express_1.default.json());
/*
|--------------------------------------------------------------------------
| HEALTH CHECK
|--------------------------------------------------------------------------
*/
exports.app.get("/api/health", (req, res) => {
    res.status(200).json({
        message: "API is working"
    });
});
