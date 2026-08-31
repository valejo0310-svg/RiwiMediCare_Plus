// Imports the clinic model type used
// as the return type of clinic service functions.
import { clinics } from "../models/clinic.model";

// Imports the custom application error
// used to return controlled business errors.
import { AppError } from "../errors/app-errors";

// Imports clinic repository functions responsible
// for direct database operations.
import {
    createClinic,
    deactivateClinic,
    findAllClinics,
    findClinicById,
    findClinicByNit,
    updateClinic
} from "../repositories/clinic.repository";

// Imports the user repository function used
// to validate the responsible user.
import {
    findUserById
} from "../repositories/user.repository";

/**
 * Defines the data required to create a clinic.
 */
interface CreateClinicDTO {

    // Name of the clinic.
    name: string;

    // Unique tax identification number of the clinic.
    nit: string;

    // Identifier of the user responsible for the clinic.
    responsibleId: number;
}

/**
 * Defines the editable fields of an existing clinic.
 */
interface UpdateClinicDTO {

    // Optional new clinic name.
    name?: string;

    // Optional new clinic tax identification number.
    nit?: string;

    // Optional new responsible user identifier.
    responsibleId?: number;
}

/**
 * Creates a new clinic.
 *
 * Validates the required fields, checks that the NIT
 * is not already registered, verifies that the responsible
 * user exists and is active, and delegates the creation
 * process to the repository layer.
 *
 * @param data - Information required to create the clinic.
 * @returns The newly created clinic.
 */
export async function createClinicService(
    data: CreateClinicDTO
): Promise<clinics> {

    // Validates the required clinic information.
    if (!data.name || !data.nit || !data.responsibleId) {
        throw new AppError(
            "Name, NIT and responsibleId are required",
            400
        );
    }

    // Searches for an existing clinic
    // registered with the same NIT.
    const existingClinic =
        await findClinicByNit(data.nit.trim());

    // Prevents duplicate clinic registration.
    if (existingClinic) {
        throw new AppError(
            "A clinic with this NIT already exists",
            409
        );
    }

    // Searches for the user assigned
    // as responsible for the clinic.
    const responsible =
        await findUserById(data.responsibleId);

    // Validates that the responsible user
    // exists and is currently active.
    if (!responsible || !responsible.active) {
        throw new AppError(
            "Responsible user not found",
            404
        );
    }

    // Creates the clinic with normalized
    // name and NIT values.
    return await createClinic({
        name: data.name.trim(),
        nit: data.nit.trim(),
        responsibleId: data.responsibleId
    });
}

/**
 * Returns all active clinics.
 *
 * @returns A list containing all active clinics.
 */
export async function getClinicsService(): Promise<clinics[]> {

    // Delegates the database query to the repository layer.
    return await findAllClinics();
}

/**
 * Returns an active clinic by its identifier.
 *
 * @param id - Identifier of the clinic.
 * @returns The matching clinic.
 */
export async function getClinicByIdService(
    id: number
): Promise<clinics> {

    // Searches for the clinic by its identifier.
    const clinic =
        await findClinicById(id);

    // Validates that the clinic exists.
    if (!clinic) {
        throw new AppError(
            "Clinic not found",
            404
        );
    }

    // Returns the clinic when found.
    return clinic;
}

/**
 * Updates an existing clinic.
 *
 * Validates that the clinic exists, prevents duplicate
 * NIT values, verifies a new responsible user when provided,
 * and delegates the update operation to the repository layer.
 *
 * @param id - Identifier of the clinic to update.
 * @param data - Fields that will be updated.
 * @returns The updated clinic.
 */
export async function updateClinicService(
    id: number,
    data: UpdateClinicDTO
): Promise<clinics> {

    // Searches for the clinic to be updated.
    const clinic =
        await findClinicById(id);

    // Validates that the clinic exists.
    if (!clinic) {
        throw new AppError(
            "Clinic not found",
            404
        );
    }

    // Validates a new NIT only when it was provided
    // and differs from the current clinic NIT.
    if (data.nit && data.nit !== clinic.nit) {
        const existingClinic =
            await findClinicByNit(data.nit.trim());

        // Prevents assigning a NIT already
        // registered to another clinic.
        if (existingClinic) {
            throw new AppError(
                "A clinic with this NIT already exists",
                409
            );
        }
    }

    // Validates the responsible user when
    // a new responsibleId is provided.
    if (data.responsibleId !== undefined) {
        const responsible =
            await findUserById(data.responsibleId);

        // Ensures that the new responsible user
        // exists and is currently active.
        if (!responsible || !responsible.active) {
            throw new AppError(
                "Responsible user not found",
                404
            );
        }
    }

    // Delegates the update operation
    // to the repository layer.
    return await updateClinic(
        clinic,
        {
            name: data.name?.trim(),
            nit: data.nit?.trim(),
            responsibleId: data.responsibleId
        }
    );
}

/**
 * Performs a logical deletion of a clinic.
 *
 * Validates that the clinic exists and delegates
 * the deactivation process to the repository layer.
 *
 * @param id - Identifier of the clinic to deactivate.
 * @returns A promise that resolves when the clinic is deactivated.
 */
export async function deleteClinicService(
    id: number
): Promise<void> {

    // Searches for the active clinic
    // that will be deactivated.
    const clinic =
        await findClinicById(id);

    // Validates that the clinic exists.
    if (!clinic) {
        throw new AppError(
            "Clinic not found",
            404
        );
    }

    // Performs the logical deletion
    // through the repository layer.
    await deactivateClinic(clinic);
}