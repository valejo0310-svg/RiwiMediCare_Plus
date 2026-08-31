// Imports Express types used by the global error middleware.
import {NextFunction,Request,Response} from "express";

// Imports the custom application error used
// to identify controlled application errors.
import { AppError } from "../errors/app-errors";

/**
 * Handles application errors.
 *
 * This middleware checks whether the received error
 * is an AppError. Controlled application errors return
 * their corresponding HTTP status code and message.
 *
 * Unexpected errors are logged and returned as
 * an internal server error with HTTP status 500.
 *
 * @param error - Error generated during request processing.
 * @param _req - Express request object. It is not used directly.
 * @param res - Express response used to return the error response.
 * @param next - Express next function required by the error middleware signature.
 * @returns Nothing. The middleware sends the corresponding HTTP response.
 */
export function errorMiddleware(error: Error,_req: Request, res: Response, next: NextFunction): void {

    // Checks whether the error is a controlled
    // application error.
    if (error instanceof AppError) {

        // Returns the status code and message
        // defined by the application error.
        res.status(
            error.statusCode
        ).json({
            message: error.message
        });

        return;
    }

    // Logs unexpected errors for debugging purposes.
    console.error(error);

    // Returns a generic response for
    // unexpected server errors.
    res.status(500).json({
        message: "Internal server error"
    });
}