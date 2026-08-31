import { Router } from "express";

import {
    createSupplyRequestController,
    deleteSupplyRequestController,
    getActiveSupplyRequestsController,
    getClinicRequestHistoryController,
    getSupplyRequestByIdController,
    getSupplyRequestsController,
    updateSupplyRequestStatusController,
    updateSupplyRequestController
} from "../controllers/supply-request.controller";

import {
    authMiddleware
} from "../middlewares/auth.middleware";

import {
    roleMiddleware
} from "../middlewares/role.middleware";

export const supplyRequestRouter =
    Router();

/**
 * @swagger
 * /api/requests:
 *   post:
 *     tags:
 *       - Supply Requests
 *     summary: Create supply request
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - clinicId
 *               - medicationId
 *               - warehouseId
 *               - quantity
 *             properties:
 *               clinicId:
 *                 type: integer
 *                 example: 1
 *               medicationId:
 *                 type: integer
 *                 example: 1
 *               warehouseId:
 *                 type: integer
 *                 example: 1
 *               quantity:
 *                 type: integer
 *                 example: 10
 *     responses:
 *       201:
 *         description: Request created
 *       400:
 *         description: Invalid data
 *       404:
 *         description: Related resource not found
 *       409:
 *         description: Insufficient inventory
 */
supplyRequestRouter.post(
    "/",
    authMiddleware,
    roleMiddleware(
        "ADMIN",
        "REQUEST_MANAGER"
    ),
    createSupplyRequestController
);

/**
 * @swagger
 * /api/requests:
 *   get:
 *     tags:
 *       - Supply Requests
 *     summary: Get complete request history
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Complete request history
 */
supplyRequestRouter.get(
    "/",
    authMiddleware,
    roleMiddleware(
        "ADMIN",
        "REQUEST_MANAGER"
    ),
    getSupplyRequestsController
);

/**
 * @swagger
 * /api/requests/active:
 *   get:
 *     tags:
 *       - Supply Requests
 *     summary: Get active requests
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Active requests
 */
supplyRequestRouter.get(
    "/active",
    authMiddleware,
    roleMiddleware(
        "ADMIN",
        "REQUEST_MANAGER"
    ),
    getActiveSupplyRequestsController
);

/**
 * @swagger
 * /api/requests/clinic/{clinicId}/history:
 *   get:
 *     tags:
 *       - Supply Requests
 *     summary: Get complete request history by clinic
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: clinicId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Clinic request history
 */
supplyRequestRouter.get(
    "/clinic/:clinicId/history",
    authMiddleware,
    roleMiddleware(
        "ADMIN",
        "REQUEST_MANAGER"
    ),
    getClinicRequestHistoryController
);

/**
 * @swagger
 * /api/requests/{id}/status:
 *   patch:
 *     tags:
 *       - Supply Requests
 *     summary: Update request status
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
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum:
 *                   - PENDING
 *                   - APPROVED
 *                   - REJECTED
 *                   - DISPATCHED
 *                   - COMPLETED
 *                 example: APPROVED
 *     responses:
 *       200:
 *         description: Status updated
 *       400:
 *         description: Invalid status
 *       404:
 *         description: Request not found
 */
supplyRequestRouter.patch(
    "/:id/status",
    authMiddleware,
    roleMiddleware(
        "ADMIN",
        "REQUEST_MANAGER"
    ),
    updateSupplyRequestStatusController
);

/**
 * @swagger
 * /api/requests/{id}:
 *   get:
 *     tags:
 *       - Supply Requests
 *     summary: Get request by id
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
 *         description: Request found
 *       404:
 *         description: Request not found
 */
supplyRequestRouter.get(
    "/:id",
    authMiddleware,
    roleMiddleware(
        "ADMIN",
        "REQUEST_MANAGER"
    ),
    getSupplyRequestByIdController
);

/**
 * @swagger
 * /api/requests/{id}:
 *   patch:
 *     tags:
 *       - Supply Requests
 *     summary: Update a supply request
 *     description: Allows an administrator to update editable request information.
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
 *               clinicId:
 *                 type: integer
 *                 example: 1
 *               medicationId:
 *                 type: integer
 *                 example: 1
 *               warehouseId:
 *                 type: integer
 *                 example: 1
 *               quantity:
 *                 type: integer
 *                 example: 20
 *     responses:
 *       200:
 *         description: Supply request updated
 *       400:
 *         description: Invalid data
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Administrator role required
 *       404:
 *         description: Request or related resource not found
 */
supplyRequestRouter.patch(
    "/:id",
    authMiddleware,
    roleMiddleware("ADMIN"),
    updateSupplyRequestController
);

/**
 * @swagger
 * /api/requests/{id}:
 *   delete:
 *     tags:
 *       - Supply Requests
 *     summary: Logically delete request
 *     description: Sets active to false without physically deleting the request.
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
 *         description: Request logically deleted
 *       404:
 *         description: Request not found
 */
supplyRequestRouter.delete(
    "/:id",
    authMiddleware,
    roleMiddleware("ADMIN"),
    deleteSupplyRequestController
);