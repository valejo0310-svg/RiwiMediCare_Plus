// Imports the Express request and response types
// used by the inventory controllers.
import {
    Request,
    Response
} from "express";

// Imports the inventory service functions responsible
// for handling inventory business logic.
import {
    createInventoryService,
    deleteInventoryService,
    getInventoryService,
    updateInventoryService
} from "../services/inventory.service";

/**
 * Creates a new inventory record.
 *
 * Receives the warehouse identifier, medication identifier,
 * and available quantity from the request body.
 * The business logic is delegated to the inventory service.
 *
 * @param req - Express request containing inventory data.
 * @param res - Express response used to return the created inventory record.
 * @returns A promise that resolves when the response is sent.
 */
export async function createInventoryController(
    req: Request,
    res: Response
): Promise<void> {

    // Extracts the inventory information
    // from the request body.
    const {
        warehouseId,
        medicationId,
        quantity
    } = req.body;

    // Delegates inventory creation and validation
    // to the service layer.
    const inventory =
        await createInventoryService(
            warehouseId,
            medicationId,
            quantity
        );

    // Returns the newly created inventory record.
    res.status(201).json(inventory);
}

/**
 * Returns all active inventory records.
 *
 * Only inventory records marked as active are returned
 * by the corresponding service and repository logic.
 *
 * @param _req - Express request object. It is not used by this controller.
 * @param res - Express response used to return the inventory records.
 * @returns A promise that resolves when the response is sent.
 */
export async function getInventoryController(
    _req: Request,
    res: Response
): Promise<void> {

    // Retrieves all active inventory records
    // from the service layer.
    const inventory =
        await getInventoryService();

    // Returns the inventory collection.
    res.status(200).json(inventory);
}

/**
 * Updates the available quantity of an inventory record.
 *
 * Receives the inventory identifier from the route parameters
 * and the new quantity from the request body.
 *
 * @param req - Express request containing the inventory id and quantity.
 * @param res - Express response used to return the updated inventory record.
 * @returns A promise that resolves when the response is sent.
 */
export async function updateInventoryController(
    req: Request,
    res: Response
): Promise<void> {

    // Converts the inventory id route parameter
    // into a numeric value.
    const id =
        Number(req.params.id);

    // Extracts the new inventory quantity
    // from the request body.
    const {
        quantity
    } = req.body;

    // Delegates the update operation and validation
    // to the service layer.
    const inventory =
        await updateInventoryService(
            id,
            quantity
        );

    // Returns the updated inventory record.
    res.status(200).json(inventory);
}

/**
 * Performs a logical deletion of an inventory record.
 *
 * The inventory record is not physically removed from
 * the database. Instead, its `active` property is set
 * to false to preserve historical information and traceability.
 *
 * @param req - Express request containing the inventory id.
 * @param res - Express response used to confirm the operation.
 * @returns A promise that resolves when the response is sent.
 */
export async function deleteInventoryController(
    req: Request,
    res: Response
): Promise<void> {

    // Converts the route parameter into
    // the inventory numeric identifier.
    const id =
        Number(req.params.id);

    // Delegates the soft delete operation
    // to the service layer.
    await deleteInventoryService(id);

    // Returns HTTP 204 because the operation
    // was successful and no response body is required.
    res.status(204).send();
}