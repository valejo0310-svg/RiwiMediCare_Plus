// Imports the clinic model used to perform
// database operations through Sequelize.
import { clinics } from "../models/clinic.model";

/**
 * Defines the data required to create a clinic.
 */
export interface CreateClinicData {

    // Name of the clinic.
    name: string;

    // Unique tax identification number of the clinic.
    nit: string;

    // Identifier of the user responsible for the clinic.
    responsibleId: number;
}

/**
 * Defines the fields that can be updated
 * in an existing clinic.
 */
export interface UpdateClinicData {

    // Optional new clinic name.
    name?: string;

    // Optional new clinic tax identification number.
    nit?: string;

    // Optional new responsible user identifier.
    responsibleId?: number;
}

/**
 * Creates a new clinic record.
 *
 * New clinics are created with the active state
 * enabled by default.
 *
 * @param data - Clinic information required for creation.
 * @returns The newly created clinic.
 */
export async function createClinic(
    data: CreateClinicData
): Promise<clinics> {
    return await clinics.create({
        ...data,
        active: true
    });
}

/**
 * Finds an active clinic by its identifier.
 *
 * @param id - Identifier of the clinic to search.
 * @returns The matching active clinic or null if it does not exist.
 */
export async function findClinicById(
    id: number
): Promise<clinics | null> {
    return await clinics.findOne({
        where: {
            id,
            active: true
        }
    });
}

/**
 * Finds a clinic by its NIT.
 *
 * The search does not filter by active state,
 * allowing duplicate NIT validation across
 * all clinic records.
 *
 * @param nit - Tax identification number of the clinic.
 * @returns The matching clinic or null if it does not exist.
 */
export async function findClinicByNit(
    nit: string
): Promise<clinics | null> {
    return await clinics.findOne({
        where: { nit }
    });
}

/**
 * Returns all active clinics.
 *
 * @returns A list containing all active clinic records.
 */
export async function findAllClinics(): Promise<clinics[]> {
    return await clinics.findAll({
        where: {
            active: true
        }
    });
}

/**
 * Updates an existing clinic.
 *
 * @param clinic - Clinic instance that will be updated.
 * @param data - Fields that will be modified.
 * @returns The updated clinic instance.
 */
export async function updateClinic(
    clinic: clinics,
    data: UpdateClinicData
): Promise<clinics> {

    // Applies the provided changes to the clinic record.
    await clinic.update(data);

    // Returns the updated clinic instance.
    return clinic;
}

/**
 * Performs a logical deletion of a clinic.
 *
 * The record remains stored in the database,
 * but its active state is changed to false.
 *
 * @param clinic - Clinic instance that will be deactivated.
 * @returns A promise that resolves when the clinic is updated.
 */
export async function deactivateClinic(
    clinic: clinics
): Promise<void> {
    await clinic.update({
        active: false
    });
}