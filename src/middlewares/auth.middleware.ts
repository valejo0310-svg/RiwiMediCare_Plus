// Imports Express types used by the authentication middleware.
import { NextFunction, Request, Response} from "express";

// Imports the JSON Web Token library used
// to verify authentication tokens.
import jwt from "jsonwebtoken";

// Imports the custom application error
// used to return controlled authentication errors.
import { AppError} from "../errors/app-errors";

// Imports the user role type used
// to define the role stored inside the JWT payload.
import type {UserRole} from "../models/user.model";


/**
 * Defines the expected structure of the JWT payload.
 */
interface JwtPayload {

    // Identifier of the authenticated user.
    userId: number;

    // Role assigned to the authenticated user.
    role: UserRole;
}


/**
 * Validates the JWT sent by the client.
 *
 * The middleware reads the Authorization header,
 * verifies that it uses the Bearer authentication scheme,
 * validates the JWT signature, and stores the authenticated
 * user information inside the request object.
 *
 * @param req - Express request containing the authorization header.
 * @param _res - Express response object. It is not used directly by this middleware.
 * @param next - Express function used to continue to the next middleware or controller.
 * @returns Nothing. The function continues the request flow when authentication succeeds.
 */
export function authMiddleware(req: Request,_res: Response, next: NextFunction): void {

    // Reads the Authorization header sent by the client.
    const authorization = req.headers.authorization;

    // Validates that an authentication token
    // was included in the request.
    if (!authorization) {
        throw new AppError(
            "Authentication token required",
            401
        );
    }

    // Separates the authentication scheme
    // from the JWT token.
    const [type, token ] = authorization.split(" ");

    // Validates that the authorization scheme
    // is Bearer and that a token is present.
    if (
        type !== "Bearer" ||
        !token
    ) {
        throw new AppError(
            "Invalid authentication token",
            401
        );
    }

    // Retrieves the secret key used
    // to verify the JWT signature.
    const secret =
        process.env.JWT_SECRET;

    // Ensures that the JWT secret
    // is configured in the environment.
    if (!secret) {
        throw new Error(
            "JWT_SECRET is not configured"
        );
    }

    try {

        // Verifies the token and extracts
        // the authenticated user information.
        const payload =
            jwt.verify(
                token,
                secret
            ) as JwtPayload;

        // Stores the authenticated user information
        // in the request object for later middleware
        // and controllers.
        req.user = {
            userId: payload.userId,
            role: payload.role
        };

        // Continues the request execution.
        next();

    } catch {

        // Rejects invalid or expired authentication tokens.
        throw new AppError(
            "Invalid or expired token",
            401
        );
    }
}