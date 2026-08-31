// Imports the Express request and response types
// used by the clinic controllers.
import {
    Request,
    Response
} from "express";

// Imports the clinic service functions responsible
// for handling the business logic of clinic operations.
import {
    createClinicService,
    deleteClinicService,
    getClinicByIdService,
    getClinicsService,
    updateClinicService
} from "../services/clinic.service";

/**
 * Handles the creation of a new clinic.
 *
 * Receives clinic data from the request body,
 * delegates the business logic to the service layer,
 * and returns the created clinic.
 *
 * @param req - Express request containing the clinic data.
 * @param res - Express response used to return the created clinic.
 * @returns A promise that resolves when the response is sent.
 */
export async function createClinicController(
    req: Request,
    res: Response
): Promise<void> {

    // Delegates clinic creation to the service layer.
    const clinic =
        await createClinicService(
            req.body
        );

    // Returns the newly created clinic.
    res.status(201).json(clinic);
}

/**
 * Returns all active clinics.
 *
 * The request object is not used in this controller,
 * so it is prefixed with an underscore.
 *
 * @param _req - Express request object.
 * @param res - Express response used to return the clinics.
 * @returns A promise that resolves when the response is sent.
 */
export async function getClinicsController(
    _req: Request,
    res: Response
): Promise<void> {

    // Retrieves all active clinics from the service layer.
    const clinics =
        await getClinicsService();

    // Returns the list of clinics.
    res.status(200).json(clinics);
}

/**
 * Returns an active clinic by its identifier.
 *
 * @param req - Express request containing the clinic id as a route parameter.
 * @param res - Express response used to return the clinic.
 * @returns A promise that resolves when the response is sent.
 */
export async function getClinicByIdController(
    req: Request,
    res: Response
): Promise<void> {

    // Converts the route parameter to a number
    // and delegates the lookup to the service layer.
    const clinic =
        await getClinicByIdService(
            Number(req.params.id)
        );

    // Returns the requested clinic.
    res.status(200).json(clinic);
}

/**
 * Updates an existing clinic.
 *
 * Receives the clinic identifier from the route
 * parameters and the editable fields from the request body.
 *
 * @param req - Express request containing the clinic id and update data.
 * @param res - Express response used to return the updated clinic.
 * @returns A promise that resolves when the response is sent.
 */
export async function updateClinicController(
    req: Request,
    res: Response
): Promise<void> {

    // Delegates the update operation to the service layer.
    const clinic =
        await updateClinicService(
            Number(req.params.id),
            req.body
        );

    // Returns the updated clinic.
    res.status(200).json(clinic);
}

/**
 * Performs a logical deletion of a clinic.
 *
 * The clinic is not physically removed from the database.
 * Instead, the service changes its `active` property to false,
 * preserving the record for historical and traceability purposes.
 *
 * Any application error is handled by the global error middleware.
 *
 * @param req - Express request containing the clinic id.
 * @param res - Express response used to confirm the operation.
 * @returns A promise that resolves when the response is sent.
 */
export async function deleteClinicController(
    req: Request,
    res: Response
): Promise<void> {

    // Converts the clinic id route parameter to a number.
    const clinicId =
        Number(req.params.id);

    // Delegates the soft delete operation to the service layer.
    await deleteClinicService(
        clinicId
    );

    // Confirms that the clinic was logically deleted.
    res.status(200).json({
        status: "success",
        message:
            `Clinic with ID ${clinicId} successfully deactivated.`
    });
}