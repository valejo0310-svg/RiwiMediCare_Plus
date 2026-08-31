import { Router } from "express";

import {
    createMedicationController,
    deleteMedicationController,
    getMedicationByIdController,
    getMedicationsController,
    updateMedicationController
} from "../controllers/medication.controller";

import {
    authMiddleware
} from "../middlewares/auth.middleware";

import {
    roleMiddleware
} from "../middlewares/role.middleware";

export const medicationRouter = Router();

/**
 * @swagger
 * /api/medications:
 *   post:
 *     tags:
 *       - Medications
 *     summary: Create a medication
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
 *               - description
 *             properties:
 *               name:
 *                 type: string
 *                 example: Acetaminofen
 *               description:
 *                 type: string
 *                 example: Tabletas 500 mg
 *     responses:
 *       201:
 *         description: Medication created successfully
 *       400:
 *         description: Invalid data
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Administrator role required
 */
medicationRouter.post(
    "/",
    authMiddleware,
    roleMiddleware("ADMIN"),
    createMedicationController
);

/**
 * @swagger
 * /api/medications:
 *   get:
 *     tags:
 *       - Medications
 *     summary: Get all active medications
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Medications obtained successfully
 *       401:
 *         description: Authentication required
 */
medicationRouter.get(
    "/",
    authMiddleware,
    roleMiddleware(
        "ADMIN",
        "REQUEST_MANAGER"
    ),
    getMedicationsController
);

/**
 * @swagger
 * /api/medications/{id}:
 *   get:
 *     tags:
 *       - Medications
 *     summary: Get medication by id
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
 *         description: Medication found
 *       401:
 *         description: Authentication required
 *       404:
 *         description: Medication not found
 */
medicationRouter.get(
    "/:id",
    authMiddleware,
    roleMiddleware(
        "ADMIN",
        "REQUEST_MANAGER"
    ),
    getMedicationByIdController
);

/**
 * @swagger
 * /api/medications/{id}:
 *   patch:
 *     tags:
 *       - Medications
 *     summary: Update a medication
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
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Acetaminofen Forte
 *               description:
 *                 type: string
 *                 example: Tabletas 650 mg
 *     responses:
 *       200:
 *         description: Medication updated successfully
 *       400:
 *         description: Invalid data
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Administrator role required
 *       404:
 *         description: Medication not found
 */
medicationRouter.patch(
    "/:id",
    authMiddleware,
    roleMiddleware("ADMIN"),
    updateMedicationController
);

/**
 * @swagger
 * /api/medications/{id}:
 *   delete:
 *     tags:
 *       - Medications
 *     summary: Logically delete a medication
 *     description: Marks the medication as inactive instead of physically deleting it.
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
 *         description: Medication logically deleted
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Administrator role required
 *       404:
 *         description: Medication not found
 */
medicationRouter.delete(
    "/:id",
    authMiddleware,
    roleMiddleware("ADMIN"),
    deleteMedicationController
);