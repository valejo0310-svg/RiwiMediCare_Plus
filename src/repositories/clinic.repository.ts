import { clinics } from "../models/clinic.model";

/**
 * Retrieves a clinic from the database by its primary key.
 * @param {number} id - The unique identifier of the clinic.
 * @returns {Promise<clinics | null>} A promise that resolves to the clinic instance, or null if not found.
 */
export async function findClinicById(id: number): Promise<clinics | null> {
    return await clinics.findByPk(id);
}
