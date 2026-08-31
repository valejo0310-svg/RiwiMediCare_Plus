// Imports the warehouse model used
// as the return type of warehouse service functions.
import { warehouse } from "../models/warehouse.model";

// Imports the custom application error
// used to return controlled business errors.
import { AppError } from "../errors/app-errors";

// Imports warehouse repository functions responsible
// for direct database operations.
import {
    createWarehouse,
    deactivateWarehouse,
    findAllWarehouses,
    findWarehouseById,
    updateWarehouse
} from "../repositories/warehouse.repository";

/**
 * Defines the data required to create a warehouse.
 */
interface CreateWarehouseDTO {

    // Name of the warehouse.
    name: string;

    // Physical location of the warehouse.
    location: string;
}

/**
 * Defines the editable fields of an existing warehouse.
 */
interface UpdateWarehouseDTO {

    // Optional new warehouse name.
    name?: string;

    // Optional new warehouse location.
    location?: string;
}

/**
 * Creates a new warehouse.
 *
 * Validates that the required fields are provided,
 * normalizes the received values, and delegates
 * the creation process to the repository layer.
 *
 * @param data - Information required to create the warehouse.
 * @returns The newly created warehouse.
 */
export async function createWarehouseService(
    data: CreateWarehouseDTO
): Promise<warehouse> {

    // Validates that all required warehouse
    // information was provided.
    if (!data.name || !data.location) {
        throw new AppError(
            "Name and location are required",
            400
        );
    }

    // Delegates warehouse creation
    // to the repository layer.
    return await createWarehouse({
        name: data.name.trim(),
        location: data.location.trim()
    });
}

/**
 * Returns all active warehouses.
 *
 * @returns A list containing all active warehouses.
 */
export async function getWarehousesService(): Promise<warehouse[]> {

    // Delegates the database query
    // to the repository layer.
    return await findAllWarehouses();
}

/**
 * Returns an active warehouse by its identifier.
 *
 * @param id - Identifier of the warehouse.
 * @returns The matching warehouse.
 */
export async function getWarehouseByIdService(
    id: number
): Promise<warehouse> {

    // Searches for the warehouse
    // by its identifier.
    const item =
        await findWarehouseById(id);

    // Validates that the warehouse exists.
    if (!item) {
        throw new AppError(
            "Warehouse not found",
            404
        );
    }

    // Returns the warehouse when found.
    return item;
}

/**
 * Updates an existing warehouse.
 *
 * Validates that the warehouse exists,
 * normalizes the editable values, and delegates
 * the update operation to the repository layer.
 *
 * @param id - Identifier of the warehouse to update.
 * @param data - Fields that will be updated.
 * @returns The updated warehouse.
 */
export async function updateWarehouseService(
    id: number,
    data: UpdateWarehouseDTO
): Promise<warehouse> {

    // Searches for the warehouse
    // that will be updated.
    const item =
        await findWarehouseById(id);

    // Validates that the warehouse exists.
    if (!item) {
        throw new AppError(
            "Warehouse not found",
            404
        );
    }

    // Delegates the update operation
    // to the repository layer.
    return await updateWarehouse(
        item,
        {
            name: data.name?.trim(),
            location: data.location?.trim()
        }
    );
}

/**
 * Performs a logical deletion of a warehouse.
 *
 * Validates that the warehouse exists
 * and delegates the deactivation process
 * to the repository layer.
 *
 * @param id - Identifier of the warehouse to deactivate.
 * @returns A promise that resolves when the warehouse is deactivated.
 */
export async function deleteWarehouseService(
    id: number
): Promise<void> {

    // Searches for the active warehouse
    // that will be deactivated.
    const item =
        await findWarehouseById(id);

    // Validates that the warehouse exists.
    if (!item) {
        throw new AppError(
            "Warehouse not found",
            404
        );
    }

    // Performs the logical deletion
    // through the repository layer.
    await deactivateWarehouse(item);
}