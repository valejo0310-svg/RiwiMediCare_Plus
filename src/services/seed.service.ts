// Imports bcrypt to hash user passwords before storing them.
import bcrypt from "bcryptjs";

// Imports the user model and user role type
// used during the seed process.
import {users, UserRole} from "../models/user.model";

// Imports the clinic model used to create
// and validate clinic seed records.
import {clinics} from "../models/clinic.model";

// Imports the warehouse model used to create
// and validate warehouse seed records.
import { warehouse} from "../models/warehouse.model";

// Imports the medication model used to create
// and validate medication seed records.
import { medication} from "../models/medication.model";

// Imports the inventory model used to create
// and update inventory seed records.
import { Inventory} from "../models/inventory.model";

// Imports the custom application error
// used to return controlled seed validation errors.
import { AppError} from "../errors/app-errors";

/**
 * Defines the structure of a user
 * received from the JSON seed file.
 */
interface SeedUser {

    // Full name of the user.
    name: string;

    // Email used to identify and authenticate the user.
    email: string;

    // Plain password that will be hashed before storage.
    password: string;

    // Role assigned to the user.
    role: UserRole;
}

/**
 * Defines the structure of a clinic
 * received from the JSON seed file.
 */
interface SeedClinic {

    // Name of the clinic.
    name: string;

    // Unique tax identification number of the clinic.
    nit: string;

    // Email of the user responsible for the clinic.
    responsibleEmail: string;
}

/**
 * Defines the structure of a warehouse
 * received from the JSON seed file.
 */
interface SeedWarehouse {

    // Name of the warehouse.
    name: string;

    // Physical location of the warehouse.
    location: string;
}

/**
 * Defines the structure of a medication
 * received from the JSON seed file.
 */
interface SeedMedication {

    // Name of the medication.
    name: string;

    // Description of the medication.
    description: string;
}

/**
 * Defines the structure of an inventory record
 * received from the JSON seed file.
 */
interface SeedInventory {

    // Name of the warehouse related to the inventory.
    warehouseName: string;

    // Name of the medication related to the inventory.
    medicationName: string;

    // Available medication quantity.
    quantity: number;
}

/**
 * Defines the complete structure accepted
 * by the JSON seed process.
 *
 * Every collection is optional, allowing the
 * uploaded JSON file to contain only the resources
 * that need to be loaded.
 */
export interface SeedData {
    users?: SeedUser[];
    clinics?: SeedClinic[];
    warehouses?: SeedWarehouse[];
    medications?: SeedMedication[];
    inventories?: SeedInventory[];
}

/**
 * Loads initial system data from JSON.
 *
 * Processes users, warehouses, medications, clinics,
 * and inventory records in an order that respects
 * the dependencies between the different resources.
 *
 * Existing records are skipped when appropriate,
 * while inventory records can be updated and
 * reactivated when they already exist.
 *
 * @param data - Parsed seed information received from the JSON file.
 * @returns A summary containing the number of created and skipped records.
 */
export async function seedFromJson(
    data: SeedData
) {

    // Stores a summary of the records created
    // or skipped during the seed process.
    const result = {
        usersCreated: 0,
        clinicsCreated: 0,
        warehousesCreated: 0,
        medicationsCreated: 0,
        inventoriesCreated: 0,
        skipped: 0
    };

    /*
    |--------------------------------------------------------------------------
    | USERS
    |--------------------------------------------------------------------------
    */

    // Processes each user received in the seed data.
    for (const item of data.users ?? []) {

        // Normalizes the email before validation and storage.
        const email =
            item.email.trim().toLowerCase();

        // Searches for an existing user
        // with the same email.
        const existingUser =
            await users.findOne({
                where: { email }
            });

        // Skips duplicate users.
        if (existingUser) {
            result.skipped++;
            continue;
        }

        // Hashes the user password before
        // storing it in the database.
        const hashedPassword =
            await bcrypt.hash(
                item.password,
                10
            );

        // Creates the user as an active record.
        await users.create({
            name: item.name.trim(),
            email,
            password: hashedPassword,
            role: item.role,
            active: true
        });

        // Increases the created user counter.
        result.usersCreated++;
    }

    /*
    |--------------------------------------------------------------------------
    | WAREHOUSES
    |--------------------------------------------------------------------------
    */

    // Processes each warehouse received
    // in the seed data.
    for (
        const item of
        data.warehouses ?? []
    ) {

        // Searches for an existing warehouse
        // with the same name.
        const existing =
            await warehouse.findOne({
                where: {
                    name: item.name
                }
            });

        // Skips duplicate warehouses.
        if (existing) {
            result.skipped++;
            continue;
        }

        // Creates the warehouse as an active record.
        await warehouse.create({
            name: item.name.trim(),
            location:
                item.location.trim(),
            active: true
        });

        // Increases the created warehouse counter.
        result.warehousesCreated++;
    }

    /*
    |--------------------------------------------------------------------------
    | MEDICATIONS
    |--------------------------------------------------------------------------
    */

    // Processes each medication received
    // in the seed data.
    for (
        const item of
        data.medications ?? []
    ) {

        // Searches for an existing medication
        // with the same name.
        const existing =
            await medication.findOne({
                where: {
                    name: item.name
                }
            });

        // Skips duplicate medications.
        if (existing) {
            result.skipped++;
            continue;
        }

        // Creates the medication as an active record.
        await medication.create({
            name: item.name.trim(),
            description:
                item.description.trim(),
            active: true
        });

        // Increases the created medication counter.
        result.medicationsCreated++;
    }

    /*
    |--------------------------------------------------------------------------
    | CLINICS
    |--------------------------------------------------------------------------
    */

    // Processes each clinic received
    // in the seed data.
    for (
        const item of
        data.clinics ?? []
    ) {

        // Searches for an existing clinic
        // with the same NIT.
        const existingClinic =
            await clinics.findOne({
                where: {
                    nit: item.nit
                }
            });

        // Skips duplicate clinics.
        if (existingClinic) {
            result.skipped++;
            continue;
        }

        // Searches for the responsible user
        // using the email provided in the seed file.
        const responsible =
            await users.findOne({
                where: {
                    email:
                        item.responsibleEmail
                            .trim()
                            .toLowerCase()
                }
            });

        // Prevents clinic creation when the
        // responsible user does not exist.
        if (!responsible) {
            throw new AppError(
                `Responsible user ${item.responsibleEmail} not found`,
                400
            );
        }

        // Creates the clinic and associates it
        // with the responsible user.
        await clinics.create({
            name: item.name.trim(),
            nit: item.nit.trim(),
            responsibleId:
                responsible.id,
            active: true
        });

        // Increases the created clinic counter.
        result.clinicsCreated++;
    }

    /*
    |--------------------------------------------------------------------------
    | INVENTORY
    |--------------------------------------------------------------------------
    */

    // Processes each inventory record
    // received in the seed data.
    for (
        const item of
        data.inventories ?? []
    ) {

        // Prevents negative inventory quantities.
        if (item.quantity < 0) {
            throw new AppError(
                "Inventory quantity cannot be negative",
                400
            );
        }

        // Searches for the warehouse referenced
        // by the inventory record.
        const foundWarehouse =
            await warehouse.findOne({
                where: {
                    name:
                        item.warehouseName
                }
            });

        // Prevents inventory creation when
        // the referenced warehouse does not exist.
        if (!foundWarehouse) {
            throw new AppError(
                `Warehouse ${item.warehouseName} not found`,
                400
            );
        }

        // Searches for the medication referenced
        // by the inventory record.
        const foundMedication =
            await medication.findOne({
                where: {
                    name:
                        item.medicationName
                }
            });

        // Prevents inventory creation when
        // the referenced medication does not exist.
        if (!foundMedication) {
            throw new AppError(
                `Medication ${item.medicationName} not found`,
                400
            );
        }

        // Searches for an existing inventory record
        // using the warehouse and medication identifiers.
        const existingInventory =
            await Inventory.findOne({
                where: {
                    warehouseId:
                        foundWarehouse.id,

                    medicationId:
                        foundMedication.id
                }
            });

        // Updates and reactivates the inventory record
        // when the warehouse-medication combination already exists.
        if (existingInventory) {

            await existingInventory.update({
                quantity:
                    item.quantity,

                active: true
            });

            result.skipped++;
            continue;
        }

        // Creates a new active inventory record.
        await Inventory.create({
            warehouseId:
                foundWarehouse.id,

            medicationId:
                foundMedication.id,

            quantity:
                item.quantity,

            active: true
        });

        // Increases the created inventory counter.
        result.inventoriesCreated++;
    }

    // Returns the summary of the seed operation.
    return result;
}