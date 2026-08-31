/**
 * Defines the data required to create
 * a new supply request.
 *
 * This interface represents the information
 * received by the application when a clinic
 * requests a specific medication from a warehouse.
 */
export interface CreateSupplyRequestDTO {

    // Identifier of the clinic creating the request.
    clinicId: number;

    // Identifier of the requested medication.
    medicationId: number;

    // Identifier of the warehouse assigned to the request.
    warehouseId: number;

    // Quantity of medication requested.
    quantity: number;

}