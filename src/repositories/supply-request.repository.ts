import { SupplyRequest } from "../models/supply-request.model";
import { CreateSupplyRequestDTO } from "../dto/create-supply-request.dto";

interface SupplyRequestData extends CreateSupplyRequestDTO {
    createdBy: number;
    status: string;
}

/**
 * Persists a new supply request.
 */
export async function createSupplyRequestRecord(data: SupplyRequestData): Promise<SupplyRequest> {

    return await SupplyRequest.create({
        clinicId: data.clinicId,
        medicationId: data.medicationId,
        warehouseId: data.warehouseId,
        quantity: data.quantity,
        status: data.status,
        createdBy: data.createdBy,
        active: true
    });
}

/**
 * Finds a supply request by its identifier.
 */
export async function findSupplyRequestById(id: number): Promise<SupplyRequest | null> {

    return await SupplyRequest.findByPk(id);
}

/**
 * Updates the status of an existing supply request.
 */
export async function updateSupplyRequestStatus(request: SupplyRequest,status: string): Promise<SupplyRequest> {

    await request.update({status});

    return request;
}