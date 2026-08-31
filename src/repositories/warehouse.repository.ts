// Imports the warehouse model used to perform
// database operations through Sequelize.
import { warehouse } from "../models/warehouse.model";

/**
 * Defines the data required to create
 * a new warehouse.
 */
export interface CreateWarehouseData {

    // Name of the warehouse.
    name: string;

    // Physical location of the warehouse.
    location: string;
}

/**
 * Defines the fields that can be updated
 * in an existing warehouse.
 */
export interface UpdateWarehouseData {

    // Optional new warehouse name.
    name?: string;

    // Optional new warehouse location.
    location?: string;
}

/**
 * Creates a new warehouse record.
 *
 * New warehouse records are created
 * with the active state enabled.
 *
 * @param data - Warehouse information required for creation.
 * @returns The newly created warehouse.
 */
export async function createWarehouse(
    data: CreateWarehouseData
): Promise<warehouse> {
    return await warehouse.create({
        ...data,
        active: true
    });
}

/**
 * Finds an active warehouse by its identifier.
 *
 * @param id - Identifier of the warehouse to search.
 * @returns The matching active warehouse or null if it does not exist.
 */
export async function findWarehouseById(
    id: number
): Promise<warehouse | null> {
    return await warehouse.findOne({
        where: {
            id,
            active: true
        }
    });
}

/**
 * Returns all active warehouses.
 *
 * @returns A list containing all active warehouse records.
 */
export async function findAllWarehouses(): Promise<warehouse[]> {
    return await warehouse.findAll({
        where: {
            active: true
        }
    });
}

/**
 * Updates an existing warehouse.
 *
 * @param item - Warehouse instance that will be updated.
 * @param data - Fields that will be modified.
 * @returns The updated warehouse instance.
 */
export async function updateWarehouse(
    item: warehouse,
    data: UpdateWarehouseData
): Promise<warehouse> {

    // Applies the provided changes to the warehouse record.
    await item.update(data);

    // Returns the updated warehouse instance.
    return item;
}

/**
 * Performs a logical deletion of a warehouse.
 *
 * The record remains stored in the database,
 * but its active state is changed to false.
 *
 * @param item - Warehouse instance that will be deactivated.
 * @returns A promise that resolves when the warehouse is updated.
 */
export async function deactivateWarehouse(
    item: warehouse
): Promise<void> {
    await item.update({
        active: false
    });
}