// Imports the Express request and response types
// used by the medication controllers.
import {
    Request,
    Response
} from "express";

// Imports the medication service functions responsible
// for handling medication business logic.
import {
    createMedicationService,
    deleteMedicationService,
    getMedicationByIdService,
    getMedicationsService,
    updateMedicationService
} from "../services/medication.service";

/**
 * Creates a new medication.
 *
 * Receives the medication data from the request body,
 * delegates the business logic to the service layer,
 * and returns the created medication.
 *
 * @param req - Express request containing the medication data.
 * @param res - Express response used to return the created medication.
 * @returns A promise that resolves when the response is sent.
 */
export async function createMedicationController(
    req: Request,
    res: Response
): Promise<void> {

    // Delegates medication creation and validation
    // to the service layer.
    const medication =
        await createMedicationService(
            req.body
        );

    // Returns the newly created medication.
    res.status(201).json(
        medication
    );
}

/**
 * Returns all active medications.
 *
 * The service layer retrieves only medications
 * that are currently marked as active.
 *
 * @param _req - Express request object. It is not used by this controller.
 * @param res - Express response used to return the medication list.
 * @returns A promise that resolves when the response is sent.
 */
export async function getMedicationsController(
    _req: Request,
    res: Response
): Promise<void> {

    // Retrieves all active medications
    // from the service layer.
    const medications =
        await getMedicationsService();

    // Returns the medication collection.
    res.status(200).json(
        medications
    );
}

/**
 * Returns a medication by its identifier.
 *
 * Receives the medication id from the route parameters
 * and delegates the lookup to the service layer.
 *
 * @param req - Express request containing the medication id.
 * @param res - Express response used to return the medication.
 * @returns A promise that resolves when the response is sent.
 */
export async function getMedicationByIdController(
    req: Request,
    res: Response
): Promise<void> {

    // Converts the route parameter into a numeric identifier.
    const medicationId =
        Number(req.params.id);

    // Retrieves the requested medication
    // through the service layer.
    const medication =
        await getMedicationByIdService(
            medicationId
        );

    // Returns the medication.
    res.status(200).json(
        medication
    );
}

/**
 * Updates an existing medication.
 *
 * Receives the medication identifier from the route
 * parameters and the editable fields from the request body.
 *
 * @param req - Express request containing the medication id and update data.
 * @param res - Express response used to return the updated medication.
 * @returns A promise that resolves when the response is sent.
 */
export async function updateMedicationController(
    req: Request,
    res: Response
): Promise<void> {

    // Converts the route parameter into a numeric identifier.
    const medicationId =
        Number(req.params.id);

    // Delegates the update operation and validation
    // to the service layer.
    const medication =
        await updateMedicationService(
            medicationId,
            req.body
        );

    // Returns the updated medication.
    res.status(200).json(
        medication
    );
}

/**
 * Performs a logical deletion of a medication.
 *
 * The medication is not physically removed from
 * the database. Instead, its `active` property is
 * set to false to preserve historical information.
 *
 * @param req - Express request containing the medication id.
 * @param res - Express response used to confirm the operation.
 * @returns A promise that resolves when the response is sent.
 */
export async function deleteMedicationController(
    req: Request,
    res: Response
): Promise<void> {

    // Converts the route parameter into a numeric identifier.
    const medicationId =
        Number(req.params.id);

    // Delegates the soft delete operation
    // to the service layer.
    await deleteMedicationService(
        medicationId
    );

    // Returns HTTP 204 because the operation
    // was successful and no response body is required.
    res.status(204).send();
}