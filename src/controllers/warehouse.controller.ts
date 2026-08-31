// Imports the Express request and response types
// used by the warehouse controllers.
import { Request, Response } from "express";

// Imports the warehouse service functions responsible
// for handling warehouse business logic.
import {
    createWarehouseService,
    deleteWarehouseService,
    getWarehouseByIdService,
    getWarehousesService,
    updateWarehouseService
} from "../services/warehouse.service";

/**
 * Creates a new warehouse.
 *
 * Receives warehouse data from the request body,
 * delegates the business logic to the service layer,
 * and returns the created warehouse.
 *
 * @param req - Express request containing the warehouse data.
 * @param res - Express response used to return the created warehouse.
 * @returns A promise that resolves when the response is sent.
 */
export async function createWarehouseController(
    req: Request,
    res: Response
): Promise<void> {

    // Delegates warehouse creation and validation
    // to the service layer.
    const result =
        await createWarehouseService(req.body);

    // Returns the newly created warehouse.
    res.status(201).json(result);
}

/**
 * Returns all active warehouses.
 *
 * Retrieves the warehouse collection from the service layer.
 *
 * @param req - Express request object.
 * @param res - Express response used to return the warehouse list.
 * @returns A promise that resolves when the response is sent.
 */
export async function getWarehousesController(
    req: Request,
    res: Response
): Promise<void> {

    // Retrieves all active warehouses
    // through the service layer.
    res.status(200).json(
        await getWarehousesService()
    );
}

/**
 * Returns a warehouse by its identifier.
 *
 * Receives the warehouse id from the route parameters
 * and delegates the lookup to the service layer.
 *
 * @param req - Express request containing the warehouse id.
 * @param res - Express response used to return the warehouse.
 * @returns A promise that resolves when the response is sent.
 */
export async function getWarehouseByIdController(
    req: Request,
    res: Response
): Promise<void> {

    // Converts the route parameter into a numeric identifier
    // and retrieves the corresponding warehouse.
    res.status(200).json(
        await getWarehouseByIdService(
            Number(req.params.id)
        )
    );
}

/**
 * Updates an existing warehouse.
 *
 * Receives the warehouse identifier from the route parameters
 * and the editable fields from the request body.
 *
 * @param req - Express request containing the warehouse id and update data.
 * @param res - Express response used to return the updated warehouse.
 * @returns A promise that resolves when the response is sent.
 */
export async function updateWarehouseController(
    req: Request,
    res: Response
): Promise<void> {

    // Delegates the update operation and validation
    // to the service layer.
    res.status(200).json(
        await updateWarehouseService(
            Number(req.params.id),
            req.body
        )
    );
}

/**
 * Performs a logical deletion of a warehouse.
 *
 * The warehouse is not physically removed from
 * the database. The service layer performs a soft
 * delete by setting its active state to false.
 *
 * @param req - Express request containing the warehouse id.
 * @param res - Express response used to confirm the operation.
 * @returns A promise that resolves when the response is sent.
 */
export async function deleteWarehouseController(
    req: Request,
    res: Response
): Promise<void> {

    // Delegates the soft delete operation
    // to the service layer.
    await deleteWarehouseService(
        Number(req.params.id)
    );

    // Returns HTTP 204 because the operation
    // was completed successfully without a response body.
    res.status(204).send();
}