import { warehouse } from "../models/warehouse.model";

/**
 * Retrieves a warehouse from the database by its primary key.
 * @param {number} id - The unique identifier of the warehouse.
 * @returns {Promise<warehouses | null>} A promise that resolves to the warehouse instance, or null if not found.
 */
export async function findWarehouseById(id: number): Promise<warehouse | null> {
    return await warehouse.findByPk(id);
}
