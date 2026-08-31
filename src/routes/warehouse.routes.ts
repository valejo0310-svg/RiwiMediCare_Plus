import { Router } from "express";
import { 
    createWarehouseController, 
    getWarehousesController, 
    getWarehouseByIdController,
    updateWarehouseController,
    deleteWarehouseController 
} from "../controllers/warehouse.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { roleMiddleware } from "../middlewares/role.middleware";

const warehouseRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Warehouses
 *   description: Operaciones para la gestión de bodegas y almacenes
 */

/**
 * @swagger
 * /api/warehouses:
 *   post:
 *     summary: Crear una nueva bodega
 *     tags: [Warehouses]
 *     security:
 *       - bearerAuth: []
 *     description: Permite registrar una nueva bodega en el sistema. Restringido solo para administradores.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - location
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Bodega Central Norte"
 *               location:
 *                 type: string
 *                 example: "Calle 45 #23-10"
 *               capacity:
 *                 type: integer
 *                 example: 5000
 *     responses:
 *       201:
 *         description: Bodega creada exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: { type: string, example: "success" }
 *                 data: { type: object }
 *       400:
 *         description: Datos de entrada inválidos o JSON mal formateado.
 *       401:
 *         description: No autenticado. Falta el token o es inválido.
 *       403:
 *         description: No autorizado. Requiere rol ADMIN.
 *       500:
 *         description: Error interno del servidor.
 */
warehouseRouter.post(
    "/",
    authMiddleware,
    roleMiddleware("ADMIN"),
    createWarehouseController
);

/**
 * @swagger
 * /api/warehouses:
 *   get:
 *     summary: Obtener listado de bodegas
 *     tags: [Warehouses]
 *     security:
 *       - bearerAuth: []
 *     description: Retorna una lista con todas las bodegas registradas. Accesible por administradores y gestores de solicitudes.
 *     responses:
 *       200:
 *         description: Lista de bodegas obtenida correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: { type: string, example: "success" }
 *                 data: 
 *                   type: array
 *                   items: { type: object }
 *       401:
 *         description: No autenticado.
 *       403:
 *         description: No autorizado. Requiere rol ADMIN o REQUEST_MANAGER.
 *       500:
 *         description: Error interno del servidor.
 */
warehouseRouter.get(
    "/",
    authMiddleware,
    roleMiddleware("ADMIN", "REQUEST_MANAGER"),
    getWarehousesController
);

/**
 * @swagger
 * /api/warehouses/{id}:
 *   get:
 *     summary: Obtener una bodega por ID
 *     tags: [Warehouses]
 *     security:
 *       - bearerAuth: []
 *     description: Retorna el detalle completo de una bodega específica según su ID numérico.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID numérico de la bodega
 *         example: 1
 *     responses:
 *       200:
 *         description: Bodega encontrada.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: { type: string, example: "success" }
 *                 data: { type: object }
 *       401:
 *         description: No autenticado.
 *       403:
 *         description: No autorizado. Requiere rol ADMIN o REQUEST_MANAGER.
 *       404:
 *         description: La bodega no existe.
 *       500:
 *         description: Error interno del servidor.
 */
warehouseRouter.get(
    "/:id",
    authMiddleware,
    roleMiddleware("ADMIN", "REQUEST_MANAGER"),
    getWarehouseByIdController
);

/**
 * @swagger
 * /api/warehouses/{id}:
 *   patch:
 *     summary: Actualizar una bodega de forma parcial
 *     tags: [Warehouses]
 *     security:
 *       - bearerAuth: []
 *     description: Actualiza uno o varios campos de una bodega existente. Restringido para administradores.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID numérico de la bodega a modificar
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Bodega Central Modificada"
 *               capacity:
 *                 type: integer
 *                 example: 6000
 *     responses:
 *       200:
 *         description: Bodega modificada exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: { type: string, example: "success" }
 *                 data: { type: object }
 *       400:
 *         description: Datos enviados incorrectos.
 *       401:
 *         description: No autenticado.
 *       403:
 *         description: No autorizado. Requiere rol ADMIN.
 *       404:
 *         description: La bodega no existe.
 *       500:
 *         description: Error interno del servidor.
 */
warehouseRouter.patch(
    "/:id",
    authMiddleware,
    roleMiddleware("ADMIN"),
    updateWarehouseController
);

/**
 * @swagger
 * /api/warehouses/{id}:
 *   delete:
 *     summary: Desactivar una bodega (Soft Delete)
 *     tags: [Warehouses]
 *     security:
 *       - bearerAuth: []
 *     description: Realiza un borrado lógico de la bodega utilizando la propiedad paranoid/deletedAt. Restringido para administradores.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID numérico de la bodega a desactivar
 *         example: 1
 *     responses:
 *       200:
 *         description: Bodega desactivada de forma lógica exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: { type: string, example: "success" }
 *                 message: { type: string, example: "Warehouse with ID 1 successfully deactivated." }
 *       401:
 *         description: No autenticado.
 *       403:
 *         description: No autorizado. Requiere rol ADMIN.
 *       404:
 *         description: La bodega no existe.
 *       500:
 *         description: Error interno del servidor.
 */
warehouseRouter.delete(
    "/:id",
    authMiddleware,
    roleMiddleware("ADMIN"),
    deleteWarehouseController
);

export default warehouseRouter;
