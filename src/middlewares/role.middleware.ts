// Imports Express types used by the role authorization middleware.
import { NextFunction, Request, Response} from "express";

// Imports the custom application error
// used to return controlled authorization errors.
import { AppError} from "../errors/app-errors";

// Imports the user role type used
// to validate authorized roles.
import type {UserRole} from "../models/user.model";


/**
 * Restricts access according to user role.
 *
 * Receives one or more allowed roles and returns
 * an Express middleware function that verifies
 * whether the authenticated user has permission
 * to access the requested resource.
 *
 * @param allowedRoles - Roles authorized to access the route.
 * @returns An Express middleware function used for role-based authorization.
 */
export function roleMiddleware( ...allowedRoles: UserRole[]) {

    return (
        req: Request,
        res: Response,
        next: NextFunction
    ): void => {

        // Verifies that authentication information
        // is available in the request.
        if (!req.user) {
            throw new AppError(
                "Authentication required",
                401
            );
        }

        // Verifies that the authenticated user's role
        // is included in the list of allowed roles.
        if (
            !allowedRoles.includes(
                req.user.role
            )
        ) {
            throw new AppError(
                "You do not have permission",
                403
            );
        }

        // Continues to the next middleware
        // or controller when authorization succeeds.
        next();
    };
}