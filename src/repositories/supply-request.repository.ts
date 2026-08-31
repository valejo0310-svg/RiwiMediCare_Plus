// Imports the request status type and supply request model
// used to perform database operations through Sequelize.
import {
    RequestStatus,
    SupplyRequest
} from "../models/supply-request.model";

/**
 * Defines the data required to create
 * a new supply request.
 */
export interface CreateSupplyRequestData {

    // Identifier of the clinic creating the request.
    clinicId: number;

    // Identifier of the requested medication.
    medicationId: number;

    // Identifier of the warehouse assigned to the request.
    warehouseId: number;

    // Quantity of medication requested.
    quantity: number;

    // Initial status assigned to the supply request.
    status: RequestStatus;

    // Identifier of the user who created the request.
    createdBy: number;
}

/**
 * Creates a supply request.
 *
 * The new request is stored with its active
 * state enabled by default.
 *
 * @param data - Information required to create the supply request.
 * @returns The newly created supply request.
 */
export async function createSupplyRequest(
    data: CreateSupplyRequestData
): Promise<SupplyRequest> {

    return await SupplyRequest.create({
        ...data,
        active: true
    });
}

/**
 * Finds an active supply request by id.
 *
 * @param id - Identifier of the supply request.
 * @returns The matching active supply request or null if it does not exist.
 */
export async function findSupplyRequestById(
    id: number
): Promise<SupplyRequest | null> {

    return await SupplyRequest.findOne({
        where: {
            id,
            active: true
        }
    });
}

/**
 * Returns all active requests.
 *
 * Results are ordered from the most recently
 * created request to the oldest one.
 *
 * @returns A list containing all active supply requests.
 */
export async function findActiveSupplyRequests():
Promise<SupplyRequest[]> {

    return await SupplyRequest.findAll({
        where: {
            active: true
        },
        order: [
            ["createdAt", "DESC"]
        ]
    });
}

/**
 * Returns complete request history.
 *
 * Includes logically deleted records to preserve
 * historical information and traceability.
 *
 * Results are ordered from the most recently
 * created request to the oldest one.
 *
 * @returns A list containing the complete supply request history.
 */
export async function findAllSupplyRequests():
Promise<SupplyRequest[]> {

    return await SupplyRequest.findAll({
        order: [
            ["createdAt", "DESC"]
        ]
    });
}

/**
 * Returns complete request history by clinic.
 *
 * Includes logically deleted records associated
 * with the specified clinic.
 *
 * @param clinicId - Identifier of the clinic.
 * @returns A list containing the clinic supply request history.
 */
export async function findSupplyRequestsByClinic(
    clinicId: number
): Promise<SupplyRequest[]> {

    return await SupplyRequest.findAll({
        where: {
            clinicId
        },
        order: [
            ["createdAt", "DESC"]
        ]
    });
}

/**
 * Updates request status.
 *
 * @param request - Supply request instance that will be updated.
 * @param status - New status assigned to the request.
 * @returns The updated supply request instance.
 */
export async function updateSupplyRequestStatus(
    request: SupplyRequest,
    status: RequestStatus
): Promise<SupplyRequest> {

    // Updates the current status of the supply request.
    await request.update({
        status
    });

    // Returns the updated request instance.
    return request;
}

/**
 * Performs logical deletion.
 *
 * The request remains stored in the database,
 * but its active state is changed to false.
 *
 * @param request - Supply request instance that will be deactivated.
 * @returns A promise that resolves when the request is updated.
 */
export async function deactivateSupplyRequest(
    request: SupplyRequest
): Promise<void> {

    await request.update({
        active: false
    });
}

/**
 * Defines the editable fields of an existing
 * supply request.
 */
export interface UpdateSupplyRequestData {

    // Optional new clinic identifier.
    clinicId?: number;

    // Optional new medication identifier.
    medicationId?: number;

    // Optional new warehouse identifier.
    warehouseId?: number;

    // Optional new requested quantity.
    quantity?: number;
}

/**
 * Updates the editable data of a supply request.
 *
 * @param request - Supply request instance that will be updated.
 * @param data - Fields that will be modified.
 * @returns The updated supply request instance.
 */
export async function updateSupplyRequest(
    request: SupplyRequest,
    data: UpdateSupplyRequestData
): Promise<SupplyRequest> {

    // Applies the provided changes to the supply request.
    await request.update(data);

    // Returns the updated request instance.
    return request;
}