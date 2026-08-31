// Imports the user role type used
// to type the authenticated user information.
import type {UserRole} from "../models/user.model";

/**
 * Extends the global Express namespace
 * with custom request properties.
 */
declare global {

    namespace Express {

        /**
         * Extends the Express Request interface
         * to include authenticated user information.
         */
        interface Request {

            /**
             * Stores the authenticated user data
             * extracted from the JWT token.
             *
             * The property is optional because public
             * routes may not contain authenticated user data.
             */
            user?: {

                // Identifier of the authenticated user.
                userId: number;

                // Role assigned to the authenticated user.
                role: UserRole;
            };
        }
    }
}

// Ensures that this file is treated
// as a module by TypeScript.
export {};