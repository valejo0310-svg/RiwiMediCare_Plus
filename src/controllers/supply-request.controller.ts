// Imports the Express request and response types
// used by the supply request controllers.
import {
    Request,
    Response
} from "express";

// Imports the request status type used
// when updating a supply request status.
import {
    RequestStatus
} from "../models/supply-request.model";


// Imports the supply request service functions
// responsible for handling the business logic.
import {
    createSupplyRequestService,
    deleteSupplyRequestService,
    getActiveSupplyRequestsService,
    getClinicRequestHistoryService,
    getSupplyRequestByIdService,
    getSupplyRequestHistoryService,
    updateSupplyRequestStatusService,
    updateSupplyRequestService
} from "../services/supply-request.service";

/**
 * Creates a supply request.
 *
 * Validates that an authenticated user exists,
 * then delegates the request creation process
 * to the service layer.
 *
 * @param req - Express request containing the authenticated user and request data.
 * @param res - Express response used to return the created supply request.
 * @returns A promise that resolves when the response is sent.
 */
export async function createSupplyRequestController(
    req: Request,
    res: Response
): Promise<void> {

    // Verifies that the request contains
    // authenticated user information.
    if (!req.user) {
        res.status(401).json({
            message:
                "Authentication required"
        });

        return;
    }

    // Delegates the creation process to the service layer,
    // using the authenticated user id and request body.
    const result =
        await createSupplyRequestService(
            req.user.userId,
            req.body
        );

    // Returns the newly created supply request.
    res.status(201).json(result);
}

/**
 * Returns complete request history.
 *
 * Retrieves all supply requests, including historical
 * records preserved for traceability purposes.
 *
 * @param req - Express request object.
 * @param res - Express response used to return the request history.
 * @returns A promise that resolves when the response is sent.
 */
export async function getSupplyRequestsController(
    req: Request,
    res: Response
): Promise<void> {

    // Retrieves the complete supply request history.
    const result =
        await getSupplyRequestHistoryService();

    // Returns the request history.
    res.status(200).json(result);
}

/**
 * Returns active requests.
 *
 * Retrieves only supply requests that are currently
 * marked as active.
 *
 * @param req - Express request object.
 * @param res - Express response used to return active requests.
 * @returns A promise that resolves when the response is sent.
 */
export async function getActiveSupplyRequestsController(
    req: Request,
    res: Response
): Promise<void> {

    // Retrieves all active supply requests.
    const result =
        await getActiveSupplyRequestsService();

    // Returns the active requests.
    res.status(200).json(result);
}

/**
 * Returns request by id.
 *
 * Receives the supply request identifier from
 * the route parameters and delegates the lookup
 * to the service layer.
 *
 * @param req - Express request containing the request id.
 * @param res - Express response used to return the supply request.
 * @returns A promise that resolves when the response is sent.
 */
export async function getSupplyRequestByIdController(
    req: Request,
    res: Response
): Promise<void> {

    // Converts the route parameter into a numeric identifier
    // and retrieves the corresponding supply request.
    const result =
        await getSupplyRequestByIdService(
            Number(req.params.id)
        );

    // Returns the requested supply request.
    res.status(200).json(result);
}

/**
 * Returns clinic request history.
 *
 * Retrieves the complete supply request history
 * associated with a specific clinic.
 *
 * @param req - Express request containing the clinic id.
 * @param res - Express response used to return the clinic request history.
 * @returns A promise that resolves when the response is sent.
 */
export async function getClinicRequestHistoryController(
    req: Request,
    res: Response
): Promise<void> {

    // Converts the clinic route parameter to a number
    // and retrieves its complete request history.
    const result =
        await getClinicRequestHistoryService(
            Number(req.params.clinicId)
        );

    // Returns the clinic request history.
    res.status(200).json(result);
}

/**
 * Updates request status.
 *
 * Receives the supply request identifier and the new
 * status, then delegates the validation and update
 * process to the service layer.
 *
 * @param req - Express request containing the request id and new status.
 * @param res - Express response used to return the updated request.
 * @returns A promise that resolves when the response is sent.
 */
export async function updateSupplyRequestStatusController(
    req: Request,
    res: Response
): Promise<void> {

    // Delegates status validation and update
    // to the service layer.
    const result =
        await updateSupplyRequestStatusService(
            Number(req.params.id),
            req.body.status as RequestStatus
        );

    // Returns the updated supply request.
    res.status(200).json(result);
}

/**
 * Logically deletes a request.
 *
 * The supply request is not physically removed
 * from the database. The service layer performs
 * a soft delete by changing its active state.
 *
 * @param req - Express request containing the supply request id.
 * @param res - Express response used to confirm the operation.
 * @returns A promise that resolves when the response is sent.
 */
export async function deleteSupplyRequestController(
    req: Request,
    res: Response
): Promise<void> {

    // Delegates the soft delete operation
    // to the service layer.
    await deleteSupplyRequestService(
        Number(req.params.id)
    );

    // Returns HTTP 204 because the operation
    // was completed successfully without a response body.
    res.status(204).send();
}

/**
 * Updates an existing supply request.
 *
 * Receives the supply request identifier from the
 * route parameters and the editable request data
 * from the request body.
 *
 * @param req - Express request containing the request id and update data.
 * @param res - Express response used to return the updated request.
 * @returns A promise that resolves when the response is sent.
 */
export async function updateSupplyRequestController(
    req: Request,
    res: Response
): Promise<void> {

    // Delegates the update operation and business
    // validations to the service layer.
    const result =
        await updateSupplyRequestService(
            Number(req.params.id),
            req.body
        );

    // Returns the updated supply request.
    res.status(200).json(result);
}