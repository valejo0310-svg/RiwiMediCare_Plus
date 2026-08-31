// Imports the medication model used to perform
// database operations through Sequelize.
import { medication } from "../models/medication.model";

/**
 * Defines the data required to create a medication.
 */
export interface CreateMedicationData {

    // Name of the medication.
    name: string;

    // Description of the medication.
    description: string;
}

/**
 * Defines the fields that can be updated
 * in an existing medication.
 */
export interface UpdateMedicationData {

    // Optional new medication name.
    name?: string;

    // Optional new medication description.
    description?: string;
}

/**
 * Creates a new medication record.
 *
 * New medication records are created
 * with the active state enabled.
 *
 * @param data - Medication information required for creation.
 * @returns The newly created medication.
 */
export async function createMedication(
    data: CreateMedicationData
): Promise<medication> {
    return await medication.create({
        ...data,
        active: true
    });
}

/**
 * Finds an active medication by its identifier.
 *
 * @param id - Identifier of the medication to search.
 * @returns The matching active medication or null if it does not exist.
 */
export async function findMedicationById(
    id: number
): Promise<medication | null> {
    return await medication.findOne({
        where: {
            id,
            active: true
        }
    });
}

/**
 * Returns all active medications.
 *
 * @returns A list containing all active medication records.
 */
export async function findAllMedications(): Promise<medication[]> {
    return await medication.findAll({
        where: {
            active: true
        }
    });
}

/**
 * Updates an existing medication.
 *
 * @param item - Medication instance that will be updated.
 * @param data - Fields that will be modified.
 * @returns The updated medication instance.
 */
export async function updateMedication(
    item: medication,
    data: UpdateMedicationData
): Promise<medication> {

    // Applies the provided changes to the medication record.
    await item.update(data);

    // Returns the updated medication instance.
    return item;
}

/**
 * Performs a logical deletion of a medication.
 *
 * The record remains stored in the database,
 * but its active state is changed to false.
 *
 * @param item - Medication instance that will be deactivated.
 * @returns A promise that resolves when the medication is updated.
 */
export async function deactivateMedication(
    item: medication
): Promise<void> {
    await item.update({
        active: false
    });
}