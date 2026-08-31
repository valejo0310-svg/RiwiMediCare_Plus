import {
    Router
} from "express";

import {
    uploadSeedController
} from "../controllers/seed.controller";

import {
    authMiddleware
} from "../middlewares/auth.middleware";

import {
    roleMiddleware
} from "../middlewares/role.middleware";

import {
    uploadJson
} from "../middlewares/upload.middleware";

export const seedRouter =
    Router();

/**
 * @swagger
 * /api/seed/upload:
 *   post:
 *     tags:
 *       - Seed
 *     summary: Load initial data from JSON
 *     description: Uploads a JSON file using Multer and loads initial system data.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - file
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Seed data loaded successfully
 *       400:
 *         description: Invalid or missing JSON file
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Administrator role required
 */
seedRouter.post(
    "/upload",
    authMiddleware,
    roleMiddleware("ADMIN"),
    uploadJson.single("file"),
    uploadSeedController
);