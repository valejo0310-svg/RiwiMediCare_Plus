import { SupplyRequest } from "../models/supply-request.model";
import { CreateSupplyRequestDTO } from "../dto/create-supply-request.dto";

import { findClinicById } from "../repositories/clinic.repository";
import { findMedicationById } from "../repositories/medication.repository";
import { findWarehouseById } from "../repositories/warehouse.repository";

import {findInventory, updateInventoryQuantity} from "../repositories/inventory.repository";

import { createSupplyRequestRecord, findSupplyRequestById, updateSupplyRequestStatus} from "../repositories/supply-request.repository";

import { RequestStatus } from "../types/request-status";

/**
 * Creates a supply request for an authenticated user.
 *
 * Validates related entities and available inventory,
 * calculates the remaining stock, creates the request
 * and updates the warehouse inventory.
 */
export async function createSupplyRequest(userId: number, data: CreateSupplyRequestDTO): Promise<SupplyRequest> {

    // VALIDAte
    if (data.quantity <= 0) {
        throw new Error(
            "Requested quantity must be greater than zero"
        );
    }

    // CONSULT
    const clinic = await findClinicById(
        data.clinicId
    );

    const medication = await findMedicationById(
        data.medicationId
    );

    const warehouse = await findWarehouseById(
        data.warehouseId
    );

    // DECIDE
    if (!clinic || !clinic.active) {
        throw new Error(
            "Clinic not found or inactive"
        );
    }

    if (!medication || !medication.active) {
        throw new Error(
            "Medication not found or inactive"
        );
    }

    if (!warehouse || !warehouse.active) {
        throw new Error(
            "Warehouse not found or inactive"
        );
    }

    // CONSULT INVENTARY
    const inventory = await findInventory(
        data.warehouseId,
        data.medicationId
    );

    if (!inventory) {
        throw new Error(
            "Medication is not available in this warehouse"
        );
    }

    // DECIDE STOCK
    if (inventory.quantity < data.quantity) {
        throw new Error(
            "Insufficient inventory"
        );
    }

    // CALCULATE
    const remainingStock =
        inventory.quantity - data.quantity;

    // SAVE SOLICITUDE
    const request =
        await createSupplyRequestRecord({
            clinicId: data.clinicId,
            medicationId: data.medicationId,
            warehouseId: data.warehouseId,
            quantity: data.quantity,
            status: RequestStatus.PENDING,
            createdBy: userId
        });

    // UPDATE REQUEST
    await updateInventoryQuantity(
        inventory,
        remainingStock
    );
    //RETURN
    return request;
}

/**
 * Updates the status of an existing supply request.
 */
export async function changeSupplyRequestStatus(id: number, status: string): Promise<SupplyRequest> {

    const validStatuses =
        Object.values(RequestStatus);

    if (!validStatuses.includes(
        status as RequestStatus
    )) {
        throw new Error(
            "Invalid request status"
        );
    }

    const request =
        await findSupplyRequestById(id);

    if (!request || !request.active) {
        throw new Error(
            "Supply request not found"
        );
    }

    return await updateSupplyRequestStatus(
        request,
        status
    );
}