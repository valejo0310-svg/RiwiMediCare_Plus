// Imports the inventory model used to perform
// database operations through Sequelize.
import { Inventory } from "../models/inventory.model";

/**
 * Creates a new inventory record.
 *
 * Associates a warehouse with a medication and stores
 * the available quantity for that combination.
 * New inventory records are created as active.
 *
 * @param warehouseId - Identifier of the warehouse.
 * @param medicationId - Identifier of the medication.
 * @param quantity - Initial available quantity.
 * @returns The newly created inventory record.
 */
export async function createInventory(
    warehouseId: number,
    medicationId: number,
    quantity: number
): Promise<Inventory> {

    return await Inventory.create({
        warehouseId,
        medicationId,
        quantity,
        active: true
    });
}

/**
 * Finds an active inventory record by warehouse
 * and medication identifiers.
 *
 * @param warehouseId - Identifier of the warehouse.
 * @param medicationId - Identifier of the medication.
 * @returns The matching active inventory record or null if it does not exist.
 */
export async function findInventory(
    warehouseId: number,
    medicationId: number
): Promise<Inventory | null> {

    return await Inventory.findOne({
        where: {
            warehouseId,
            medicationId,
            active: true
        }
    });
}

/**
 * Finds an active inventory record by its identifier.
 *
 * @param id - Identifier of the inventory record.
 * @returns The matching active inventory record or null if it does not exist.
 */
export async function findInventoryById(
    id: number
): Promise<Inventory | null> {

    return await Inventory.findOne({
        where: {
            id,
            active: true
        }
    });
}

/**
 * Returns all active inventory records.
 *
 * @returns A list containing all active inventory records.
 */
export async function findAllInventory(): Promise<Inventory[]> {

    return await Inventory.findAll({
        where: {
            active: true
        }
    });
}

/**
 * Updates the quantity of an existing inventory record.
 *
 * @param inventory - Inventory instance that will be updated.
 * @param quantity - New available quantity.
 * @returns The updated inventory instance.
 */
export async function updateInventoryQuantity(
    inventory: Inventory,
    quantity: number
): Promise<Inventory> {

    // Updates the available medication quantity.
    await inventory.update({
        quantity
    });

    // Returns the updated inventory instance.
    return inventory;
}

/**
 * Performs a logical deletion of an inventory record.
 *
 * The record remains stored in the database,
 * but its active state is changed to false.
 *
 * @param inventory - Inventory instance that will be deactivated.
 * @returns A promise that resolves when the inventory is updated.
 */
export async function deactivateInventory(
    inventory: Inventory
): Promise<void> {

    await inventory.update({
        active: false
    });
}