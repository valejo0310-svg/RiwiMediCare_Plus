import { Router } from "express";

import {
    createClinicController,
    deleteClinicController,
    getClinicByIdController,
    getClinicsController,
    updateClinicController
} from "../controllers/clinic.controller";

import { authMiddleware} from "../middlewares/auth.middleware";

import { roleMiddleware} from "../middlewares/role.middleware";


export const clinicRouter = Router();


/**
 * @swagger
 * /api/clinics:
 *   post:
 *     tags:
 *       - Clinics
 *     summary: Create a clinic
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - nit
 *               - responsibleId
 *             properties:
 *               name:
 *                 type: string
 *                 example: Clinica Central
 *               nit:
 *                 type: string
 *                 example: "900123456"
 *               responsibleId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Clinic created
 *       400:
 *         description: Invalid data
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Administrator role required
 *       409:
 *         description: NIT already exists
 */
clinicRouter.post(
    "/",
    authMiddleware,
    roleMiddleware("ADMIN"),
    createClinicController
);


/**
 * @swagger
 * /api/clinics:
 *   get:
 *     tags:
 *       - Clinics
 *     summary: Get active clinics
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Clinics obtained successfully
 *       401:
 *         description: Authentication required
 */
clinicRouter.get( "/", authMiddleware, roleMiddleware(
        "ADMIN",
        "REQUEST_MANAGER"
    ),
    getClinicsController
);


/**
 * @swagger
 * /api/clinics/{id}:
 *   get:
 *     tags:
 *       - Clinics
 *     summary: Get clinic by id
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Clinic found
 *       404:
 *         description: Clinic not found
 */
clinicRouter.get(
    "/:id",
    authMiddleware,
    roleMiddleware(
        "ADMIN",
        "REQUEST_MANAGER"
    ),
    getClinicByIdController
);


/**
 * @swagger
 * /api/clinics/{id}:
 *   patch:
 *     tags:
 *       - Clinics
 *     summary: Update a clinic
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             name: Clinica Central Actualizada
 *     responses:
 *       200:
 *         description: Clinic updated
 *       403:
 *         description: Administrator role required
 *       404:
 *         description: Clinic not found
 */
clinicRouter.patch(
    "/:id",
    authMiddleware,
    roleMiddleware("ADMIN"),
    updateClinicController
);


/**
 * @swagger
 * /api/clinics/{id}:
 *   delete:
 *     tags:
 *       - Clinics
 *     summary: Logically delete a clinic
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Clinic deleted
 *       403:
 *         description: Administrator role required
 *       404:
 *         description: Clinic not found
 */
clinicRouter.delete(
    "/:id",
    authMiddleware,
    roleMiddleware("ADMIN"),
    deleteClinicController
);