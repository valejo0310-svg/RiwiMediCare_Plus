import { Router } from "express";

import {
    createInventoryController,
    deleteInventoryController,
    getInventoryController,
    updateInventoryController
} from "../controllers/inventory.controller";

import {
    authMiddleware
} from "../middlewares/auth.middleware";

import {
    roleMiddleware
} from "../middlewares/role.middleware";

export const inventoryRouter =
    Router();


/**
 * @swagger
 * /api/inventory:
 *   post:
 *     tags:
 *       - Inventory
 *     summary: Create an inventory record
 *     description: Assigns a medication and available quantity to a warehouse.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - warehouseId
 *               - medicationId
 *               - quantity
 *             properties:
 *               warehouseId:
 *                 type: integer
 *                 example: 1
 *               medicationId:
 *                 type: integer
 *                 example: 1
 *               quantity:
 *                 type: integer
 *                 example: 100
 *     responses:
 *       201:
 *         description: Inventory created successfully
 *       400:
 *         description: Invalid quantity
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Administrator role required
 *       404:
 *         description: Warehouse or medication not found
 *       409:
 *         description: Inventory already exists
 */
inventoryRouter.post(
    "/",
    authMiddleware,
    roleMiddleware("ADMIN"),
    createInventoryController
);


/**
 * @swagger
 * /api/inventory:
 *   get:
 *     tags:
 *       - Inventory
 *     summary: Get active inventory
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Inventory obtained successfully
 *       401:
 *         description: Authentication required
 */
inventoryRouter.get(
    "/",
    authMiddleware,
    roleMiddleware(
        "ADMIN",
        "REQUEST_MANAGER"
    ),
    getInventoryController
);


/**
 * @swagger
 * /api/inventory/{id}:
 *   patch:
 *     tags:
 *       - Inventory
 *     summary: Update inventory quantity
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
 *               - quantity
 *             properties:
 *               quantity:
 *                 type: integer
 *                 example: 150
 *     responses:
 *       200:
 *         description: Inventory updated successfully
 *       400:
 *         description: Invalid quantity
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Administrator role required
 *       404:
 *         description: Inventory not found
 */
inventoryRouter.patch(
    "/:id",
    authMiddleware,
    roleMiddleware("ADMIN"),
    updateInventoryController
);


/**
 * @swagger
 * /api/inventory/{id}:
 *   delete:
 *     tags:
 *       - Inventory
 *     summary: Logically delete inventory
 *     description: Sets active to false without physically deleting the record.
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
 *         description: Inventory logically deleted
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Administrator role required
 *       404:
 *         description: Inventory not found
 */
inventoryRouter.delete(
    "/:id",
    authMiddleware,
    roleMiddleware("ADMIN"),
    deleteInventoryController
);