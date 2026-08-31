// Imports the medication model used
// as the return type of medication service functions.
import { medication } from "../models/medication.model";

// Imports the custom application error
// used to return controlled business errors.
import { AppError } from "../errors/app-errors";

// Imports medication repository functions responsible
// for direct database operations.
import {
    createMedication,
    deactivateMedication,
    findAllMedications,
    findMedicationById,
    updateMedication
} from "../repositories/medication.repository";

/**
 * Defines the data required to create a medication.
 */
interface CreateMedicationDTO {

    // Name of the medication.
    name: string;

    // Description of the medication.
    description: string;
}

/**
 * Defines the editable fields of an existing medication.
 */
interface UpdateMedicationDTO {

    // Optional new medication name.
    name?: string;

    // Optional new medication description.
    description?: string;
}

/**
 * Creates a new medication.
 *
 * Validates that the required fields are provided,
 * normalizes the received values, and delegates
 * the creation process to the repository layer.
 *
 * @param data - Information required to create the medication.
 * @returns The newly created medication.
 */
export async function createMedicationService(
    data: CreateMedicationDTO
): Promise<medication> {

    // Validates that all required medication
    // information was provided.
    if (!data.name || !data.description) {
        throw new AppError(
            "Name and description are required",
            400
        );
    }

    // Delegates medication creation
    // to the repository layer.
    return await createMedication({
        name: data.name.trim(),
        description: data.description.trim()
    });
}

/**
 * Returns all active medications.
 *
 * @returns A list containing all active medications.
 */
export async function getMedicationsService(): Promise<medication[]> {

    // Delegates the database query
    // to the repository layer.
    return await findAllMedications();
}

/**
 * Returns an active medication by its identifier.
 *
 * @param id - Identifier of the medication.
 * @returns The matching medication.
 */
export async function getMedicationByIdService(
    id: number
): Promise<medication> {

    // Searches for the medication by its identifier.
    const item =
        await findMedicationById(id);

    // Validates that the medication exists.
    if (!item) {
        throw new AppError(
            "Medication not found",
            404
        );
    }

    // Returns the medication when found.
    return item;
}

/**
 * Updates an existing medication.
 *
 * Validates that the medication exists,
 * normalizes the editable values, and delegates
 * the update operation to the repository layer.
 *
 * @param id - Identifier of the medication to update.
 * @param data - Fields that will be updated.
 * @returns The updated medication.
 */
export async function updateMedicationService(
    id: number,
    data: UpdateMedicationDTO
): Promise<medication> {

    // Searches for the medication
    // that will be updated.
    const item =
        await findMedicationById(id);

    // Validates that the medication exists.
    if (!item) {
        throw new AppError(
            "Medication not found",
            404
        );
    }

    // Delegates the update operation
    // to the repository layer.
    return await updateMedication(
        item,
        {
            name: data.name?.trim(),
            description: data.description?.trim()
        }
    );
}

/**
 * Performs a logical deletion of a medication.
 *
 * Validates that the medication exists
 * and delegates the deactivation process
 * to the repository layer.
 *
 * @param id - Identifier of the medication to deactivate.
 * @returns A promise that resolves when the medication is deactivated.
 */
export async function deleteMedicationService(
    id: number
): Promise<void> {

    // Searches for the active medication
    // that will be deactivated.
    const item =
        await findMedicationById(id);

    // Validates that the medication exists.
    if (!item) {
        throw new AppError(
            "Medication not found",
            404
        );
    }

    // Performs the logical deletion
    // through the repository layer.
    await deactivateMedication(item);
}