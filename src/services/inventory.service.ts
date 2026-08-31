// Imports the inventory model used
// as the return type of inventory service functions.
import { Inventory } from "../models/inventory.model";

// Imports the custom application error
// used to return controlled business errors.
import { AppError } from "../errors/app-errors";

// Imports inventory repository functions responsible
// for direct database operations.
import {
    createInventory,
    deactivateInventory,
    findAllInventory,
    findInventory,
    findInventoryById,
    updateInventoryQuantity
} from "../repositories/inventory.repository";


// Imports the warehouse repository function used
// to validate the related warehouse.
import {
    findWarehouseById
} from "../repositories/warehouse.repository";

// Imports the medication repository function used
// to validate the related medication.
import {
    findMedicationById
} from "../repositories/medication.repository";

/**
 * Creates a new inventory record.
 *
 * Validates that the quantity is not negative,
 * verifies that the warehouse and medication exist,
 * prevents duplicate inventory records for the same
 * warehouse and medication, and delegates creation
 * to the repository layer.
 *
 * @param warehouseId - Identifier of the warehouse.
 * @param medicationId - Identifier of the medication.
 * @param quantity - Initial quantity available in inventory.
 * @returns The newly created inventory record.
 */
export async function createInventoryService(
    warehouseId: number,
    medicationId: number,
    quantity: number
): Promise<Inventory> {

    // Prevents negative inventory quantities.
    if (quantity < 0) {
        throw new AppError(
            "Quantity cannot be negative",
            400
        );
    }

    // Searches for the warehouse associated
    // with the inventory record.
    const warehouse =
        await findWarehouseById(warehouseId);

    // Validates that the warehouse exists.
    if (!warehouse) {
        throw new AppError(
            "Warehouse not found",
            404
        );
    }

    // Searches for the medication associated
    // with the inventory record.
    const medication =
        await findMedicationById(medicationId);

    // Validates that the medication exists.
    if (!medication) {
        throw new AppError(
            "Medication not found",
            404
        );
    }

    // Searches for an existing inventory record
    // with the same warehouse and medication.
    const existing =
        await findInventory(
            warehouseId,
            medicationId
        );

    // Prevents duplicate inventory records
    // for the same warehouse and medication.
    if (existing) {
        throw new AppError(
            "Inventory already exists for this warehouse and medication",
            409
        );
    }

    // Delegates inventory creation
    // to the repository layer.
    return await createInventory(
        warehouseId,
        medicationId,
        quantity
    );
}

/**
 * Returns all active inventory records.
 *
 * @returns A list containing all active inventory records.
 */
export async function getInventoryService(): Promise<Inventory[]> {

    // Delegates the database query
    // to the repository layer.
    return await findAllInventory();
}

/**
 * Updates the quantity of an inventory record.
 *
 * Validates that the new quantity is not negative,
 * verifies that the inventory record exists,
 * and delegates the update to the repository layer.
 *
 * @param id - Identifier of the inventory record.
 * @param quantity - New inventory quantity.
 * @returns The updated inventory record.
 */
export async function updateInventoryService(
    id: number,
    quantity: number
): Promise<Inventory> {

    // Prevents negative inventory quantities.
    if (quantity < 0) {
        throw new AppError(
            "Quantity cannot be negative",
            400
        );
    }

    // Searches for the inventory record
    // that will be updated.
    const inventory =
        await findInventoryById(id);

    // Validates that the inventory record exists.
    if (!inventory) {
        throw new AppError(
            "Inventory not found",
            404
        );
    }

    // Delegates the quantity update
    // to the repository layer.
    return await updateInventoryQuantity(
        inventory,
        quantity
    );
}

/**
 * Performs a logical deletion of an inventory record.
 *
 * Validates that the inventory record exists
 * and delegates the deactivation process
 * to the repository layer.
 *
 * @param id - Identifier of the inventory record to deactivate.
 * @returns A promise that resolves when the inventory is deactivated.
 */
export async function deleteInventoryService(
    id: number
): Promise<void> {

    // Searches for the active inventory record
    // that will be deactivated.
    const inventory =
        await findInventoryById(id);

    // Validates that the inventory record exists.
    if (!inventory) {
        throw new AppError(
            "Inventory not found",
            404
        );
    }

    // Performs the logical deletion
    // through the repository layer.
    await deactivateInventory(inventory);
}