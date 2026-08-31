import { Router } from "express";

import {loginController, registerController} from "../controllers/auth.controller";

export const authRouter = Router();

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Register a new user
 *     description: Creates a user with ADMIN or REQUEST_MANAGER role.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - role
 *             properties:
 *               name:
 *                 type: string
 *                 example: Administrador
 *               email:
 *                 type: string
 *                 format: email
 *                 example: admin@riwimedicare.com
 *               password:
 *                 type: string
 *                 example: Admin123!
 *               role:
 *                 type: string
 *                 enum:
 *                   - ADMIN
 *                   - REQUEST_MANAGER
 *                 example: ADMIN
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Invalid registration data
 *       409:
 *         description: Email already registered
 */
authRouter.post(
    "/register",
    registerController
);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Login
 *     description: Authenticates a user and returns a JWT.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: admin@riwimedicare.com
 *               password:
 *                 type: string
 *                 example: Admin123!
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */
authRouter.post(
    "/login",
    loginController
);