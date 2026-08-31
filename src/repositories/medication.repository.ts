import { medication } from "../models/medication.model";

/**
 * Retrieves a medication from the database by its primary key.
 * @param {number} id - The unique identifier of the medication.
 * @returns {Promise<medications | null>} A promise that resolves to the medication instance, or null if not found.
 */
export async function findMedicationById(id: number): Promise<medication | null> {
    return await medication.findByPk(id);
}
