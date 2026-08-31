// Imports the user role type used
// to define the role assigned during registration.
import type { UserRole} from "../models/user.model";

/**
 * Defines the data required to register
 * a new user in the system.
 */
export interface RegisterUserDTO {

    // Full name of the user.
    name: string;

    // Unique email used to identify and authenticate the user.
    email: string;

    // Password provided during registration.
    password: string;

    // Role assigned to the user.
    role: UserRole;

}