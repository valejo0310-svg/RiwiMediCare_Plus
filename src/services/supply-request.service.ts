// Imports the supply request model and request status type
// used by the service layer.
import {
    RequestStatus,
    SupplyRequest
} from "../models/supply-request.model";

// Imports the custom application error
// used to return controlled business errors.
import {
    AppError
} from "../errors/app-errors";

// Imports the clinic repository function
// used to validate clinic existence.
import {
    findClinicById
} from "../repositories/clinic.repository";

// Imports the medication repository function
// used to validate medication existence.
import {
    findMedicationById
} from "../repositories/medication.repository";

// Imports the warehouse repository function
// used to validate warehouse existence.
import {
    findWarehouseById
} from "../repositories/warehouse.repository";

// Imports inventory repository functions used
// to validate stock and update available quantity.
import {
    findInventory,
    updateInventoryQuantity
} from "../repositories/inventory.repository";

// Imports supply request repository functions
// responsible for direct database operations.
import {
    createSupplyRequest,
    deactivateSupplyRequest,
    findActiveSupplyRequests,
    findAllSupplyRequests,
    findSupplyRequestById,
    findSupplyRequestsByClinic,
    updateSupplyRequest,
    updateSupplyRequestStatus
} from "../repositories/supply-request.repository";

/**
 * Defines the data required to create
 * a new supply request.
 */
interface CreateSupplyRequestDTO {

    // Identifier of the clinic creating the request.
    clinicId: number;

    // Identifier of the requested medication.
    medicationId: number;

    // Identifier of the warehouse assigned to the request.
    warehouseId: number;

    // Quantity of medication requested.
    quantity: number;
}

/**
 * Defines all valid lifecycle statuses
 * available for supply requests.
 */
const VALID_STATUSES: RequestStatus[] = [
    "PENDING",
    "APPROVED",
    "REJECTED",
    "DISPATCHED",
    "COMPLETED"
];

/**
 * Creates a supply request.
 *
 * Validates the required identifiers and quantity,
 * verifies that the clinic, medication, warehouse,
 * and inventory exist, checks available stock,
 * creates the request with PENDING status, and
 * decreases the inventory quantity.
 *
 * @param userId - Identifier of the user creating the request.
 * @param data - Information required to create the supply request.
 * @returns The newly created supply request.
 */
export async function createSupplyRequestService(
    userId: number,
    data: CreateSupplyRequestDTO
): Promise<SupplyRequest> {

    // Validates that all required resource identifiers
    // were provided.
    if (
        !data.clinicId ||
        !data.medicationId ||
        !data.warehouseId
    ) {
        throw new AppError(
            "Clinic, medication and warehouse are required",
            400
        );
    }

    // Validates that the requested quantity
    // is an integer greater than zero.
    if (
        !Number.isInteger(data.quantity) ||
        data.quantity <= 0
    ) {
        throw new AppError(
            "Quantity must be greater than zero",
            400
        );
    }

    // Verifies that the clinic exists.
    const clinic =
        await findClinicById(
            data.clinicId
        );

    if (!clinic) {
        throw new AppError(
            "Clinic not found",
            404
        );
    }

    // Verifies that the medication exists.
    const medication =
        await findMedicationById(
            data.medicationId
        );

    if (!medication) {
        throw new AppError(
            "Medication not found",
            404
        );
    }

    // Verifies that the warehouse exists.
    const warehouse =
        await findWarehouseById(
            data.warehouseId
        );

    if (!warehouse) {
        throw new AppError(
            "Warehouse not found",
            404
        );
    }

    // Searches for inventory matching
    // the selected warehouse and medication.
    const inventory =
        await findInventory(
            data.warehouseId,
            data.medicationId
        );

    // Validates that the medication is available
    // in the selected warehouse.
    if (!inventory) {
        throw new AppError(
            "Medication is not available in this warehouse",
            404
        );
    }

    // Validates that the inventory contains
    // enough units to fulfill the request.
    if (
        inventory.quantity <
        data.quantity
    ) {
        throw new AppError(
            "Insufficient inventory",
            409
        );
    }

    // Creates the supply request with
    // an initial PENDING status.
    const request =
        await createSupplyRequest({
            clinicId: data.clinicId,
            medicationId: data.medicationId,
            warehouseId: data.warehouseId,
            quantity: data.quantity,
            status: "PENDING",
            createdBy: userId
        });

    // Decreases the available inventory quantity
    // according to the amount requested.
    await updateInventoryQuantity(
        inventory,
        inventory.quantity -
            data.quantity
    );

    // Returns the newly created supply request.
    return request;
}

/**
 * Returns a request by id.
 *
 * @param id - Identifier of the supply request.
 * @returns The matching active supply request.
 */
export async function getSupplyRequestByIdService(
    id: number
): Promise<SupplyRequest> {

    // Searches for the active supply request
    // by its identifier.
    const request =
        await findSupplyRequestById(id);

    // Validates that the supply request exists.
    if (!request) {
        throw new AppError(
            "Supply request not found",
            404
        );
    }

    // Returns the requested supply request.
    return request;
}

/**
 * Returns all active requests.
 *
 * @returns A list containing all active supply requests.
 */
export async function getActiveSupplyRequestsService():
Promise<SupplyRequest[]> {

    // Delegates the database query
    // to the repository layer.
    return await findActiveSupplyRequests();
}

/**
 * Returns complete request history.
 *
 * The repository includes active and logically
 * deleted requests for traceability purposes.
 *
 * @returns A list containing the complete supply request history.
 */
export async function getSupplyRequestHistoryService():
Promise<SupplyRequest[]> {

    // Retrieves the complete request history.
    return await findAllSupplyRequests();
}

/**
 * Returns complete request history by clinic.
 *
 * Validates the clinic identifier and retrieves
 * all requests associated with that clinic.
 *
 * @param clinicId - Identifier of the clinic.
 * @returns A list containing the clinic request history.
 */
export async function getClinicRequestHistoryService(
    clinicId: number
): Promise<SupplyRequest[]> {

    // Validates that the clinic identifier
    // is a positive integer.
    if (
        !Number.isInteger(clinicId) ||
        clinicId <= 0
    ) {
        throw new AppError(
            "Invalid clinic id",
            400
        );
    }

    // Retrieves all supply requests
    // associated with the clinic.
    return await findSupplyRequestsByClinic(
        clinicId
    );
}

/**
 * Updates request status.
 *
 * Validates that the new status is supported,
 * verifies that the supply request exists,
 * and delegates the update to the repository layer.
 *
 * @param id - Identifier of the supply request.
 * @param status - New status assigned to the request.
 * @returns The updated supply request.
 */
export async function updateSupplyRequestStatusService(
    id: number,
    status: RequestStatus
): Promise<SupplyRequest> {

    // Validates that the received status
    // belongs to the allowed request statuses.
    if (
        !VALID_STATUSES.includes(status)
    ) {
        throw new AppError(
            "Invalid request status",
            400
        );
    }

    // Searches for the supply request
    // that will be updated.
    const request =
        await findSupplyRequestById(id);

    // Validates that the supply request exists.
    if (!request) {
        throw new AppError(
            "Supply request not found",
            404
        );
    }

    // Delegates the status update
    // to the repository layer.
    return await updateSupplyRequestStatus(
        request,
        status
    );
}

/**
 * Logically deletes a request.
 *
 * Validates that the request exists and
 * delegates its deactivation to the repository layer.
 *
 * @param id - Identifier of the supply request to deactivate.
 * @returns A promise that resolves when the request is deactivated.
 */
export async function deleteSupplyRequestService(
    id: number
): Promise<void> {

    // Searches for the active supply request
    // that will be deactivated.
    const request =
        await findSupplyRequestById(id);

    // Validates that the supply request exists.
    if (!request) {
        throw new AppError(
            "Supply request not found",
            404
        );
    }

    // Performs the logical deletion
    // through the repository layer.
    await deactivateSupplyRequest(
        request
    );
}

/**
 * Defines the editable fields
 * of an existing supply request.
 */
interface UpdateSupplyRequestDTO {

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
 * Updates an existing supply request.
 *
 * This operation is intended for administrators.
 * The service validates the request existence,
 * validates the quantity when provided, and verifies
 * each related resource before applying the changes.
 *
 * @param id - Identifier of the supply request to update.
 * @param data - Fields that will be updated.
 * @returns The updated supply request.
 */
export async function updateSupplyRequestService(
    id: number,
    data: UpdateSupplyRequestDTO
): Promise<SupplyRequest> {

    // Searches for the supply request
    // that will be updated.
    const request =
        await findSupplyRequestById(id);

    // Validates that the supply request exists.
    if (!request) {
        throw new AppError(
            "Supply request not found",
            404
        );
    }

    // Validates the new quantity when
    // it is included in the update data.
    if (
        data.quantity !== undefined &&
        (
            !Number.isInteger(data.quantity) ||
            data.quantity <= 0
        )
    ) {
        throw new AppError(
            "Quantity must be greater than zero",
            400
        );
    }

    // Validates the clinic when
    // a new clinic identifier is provided.
    if (data.clinicId !== undefined) {

        const clinic =
            await findClinicById(
                data.clinicId
            );

        if (!clinic) {
            throw new AppError(
                "Clinic not found",
                404
            );
        }
    }

    // Validates the medication when
    // a new medication identifier is provided.
    if (data.medicationId !== undefined) {

        const medication =
            await findMedicationById(
                data.medicationId
            );

        if (!medication) {
            throw new AppError(
                "Medication not found",
                404
            );
        }
    }

    // Validates the warehouse when
    // a new warehouse identifier is provided.
    if (data.warehouseId !== undefined) {

        const warehouse =
            await findWarehouseById(
                data.warehouseId
            );

        if (!warehouse) {
            throw new AppError(
                "Warehouse not found",
                404
            );
        }
    }

    // Delegates the update operation
    // to the repository layer.
    return await updateSupplyRequest(
        request,
        data
    );
}