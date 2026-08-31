import { Inventory } from "../models/inventory.model";

/**
 * Finds the inventory record for a medication in a warehouse.
 */
export async function findInventory(warehouseId: number,medicationId: number): Promise<Inventory | null> {

    return await Inventory.findOne({
        where: {
            warehouseId,
            medicationId,
            active: true
        }
    });
}

/**
 * Updates the available quantity of an inventory record.
 */
export async function updateInventoryQuantity(inventory: Inventory,quantity: number): Promise<Inventory> {

    await inventory.update({quantity});

    return inventory;
}


