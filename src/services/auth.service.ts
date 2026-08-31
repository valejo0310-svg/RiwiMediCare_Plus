// Imports bcrypt to securely hash and compare user passwords.
import bcrypt from "bcryptjs";

// Imports JSON Web Token utilities used to generate authentication tokens.
import jwt from "jsonwebtoken";

// Imports the registration DTO used to define
// the expected user registration data.
import { RegisterUserDTO} from "../dto/register-user.dto";

// Imports the login DTO used to define
// the expected authentication credentials.
import { LoginUserDTO} from "../dto/login-user.dto";

// Imports repository functions used to create users
// and search for existing users by email.
import { createUser, findUserByEmail} from "../repositories/user.repository";

// Imports the custom application error
// used to return controlled business errors.
import { AppError} from "../errors/app-errors";

// Imports the user role type used
// to validate the available system roles.
import {UserRole} from "../models/user.model";


/**
 * Defines the roles that can be assigned
 * to users during registration.
 */
const VALID_ROLES: UserRole[] = [
    "ADMIN",
    "REQUEST_MANAGER"
];


/**
 * Registers a new system user.
 *
 * Validates the required registration fields,
 * verifies that the selected role is valid,
 * normalizes the email, checks for duplicate users,
 * hashes the password, and creates the user.
 *
 * The returned object excludes the password
 * for security reasons.
 *
 * @param data - User registration information.
 * @returns The created user without the password field.
 */
export async function registerUser(
    data: RegisterUserDTO
) {

    // Validates that all required registration
    // fields were provided.
    if (
        !data.name ||
        !data.email ||
        !data.password ||
        !data.role
    ) {
        throw new AppError(
            "All fields are required",
            400
        );
    }

    // Validates that the selected role
    // is supported by the application.
    if (
        !VALID_ROLES.includes(data.role)
    ) {
        throw new AppError(
            "Invalid role",
            400
        );
    }

    // Normalizes the email before searching
    // or storing it in the database.
    const email =
        data.email.trim().toLowerCase();

    // Searches for an existing user
    // registered with the same email.
    const existingUser =
        await findUserByEmail(email);

    // Prevents duplicate user registration.
    if (existingUser) {
        throw new AppError(
            "Email already registered",
            409
        );
    }

    // Hashes the password before storing it
    // to avoid saving plain text credentials.
    const hashedPassword =
        await bcrypt.hash(data.password, 10);

    // Creates the new user using
    // the repository layer.
    const user =
        await createUser({
            name: data.name.trim(),
            email,
            password: hashedPassword,
            role: data.role
        });

    // Returns only non-sensitive user information.
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        active: user.active
    };
}


/**
 * Authenticates a registered user.
 *
 * Validates the login credentials, verifies that
 * the user exists and is active, compares the provided
 * password with the stored password hash, and generates
 * a JWT containing the user identifier and role.
 *
 * @param data - User login credentials.
 * @returns An object containing the generated JWT.
 */
export async function loginUser( data: LoginUserDTO): Promise<{ token: string }> {

    // Validates that both authentication
    // credentials were provided.
    if (
        !data.email ||
        !data.password
    ) {
        throw new AppError(
            "Email and password are required",
            400
        );
    }

    // Normalizes the email before searching
    // for the registered user.
    const email =
        data.email.trim().toLowerCase();

    // Searches for the user by email.
    const user =
        await findUserByEmail(email);

    // Rejects authentication when the user
    // does not exist or is inactive.
    if (!user || !user.active) {
        throw new AppError(
            "Invalid credentials",
            401
        );
    }

    // Compares the provided password
    // with the stored password hash.
    const validPassword =
        await bcrypt.compare(
            data.password,
            user.password
        );

    // Rejects authentication when
    // the password does not match.
    if (!validPassword) {
        throw new AppError(
            "Invalid credentials",
            401
        );
    }

    // Retrieves the secret key used
    // to sign the authentication token.
    const secret =
        process.env.JWT_SECRET;

    // Ensures the JWT secret is configured.
    if (!secret) {
        throw new Error(
            "JWT_SECRET is not configured"
        );
    }

    // Generates a JWT containing the authenticated
    // user identifier and role.
    const token =
        jwt.sign(
            {
                userId: user.id,
                role: user.role
            },
            secret,
            {
                expiresIn: "8h"
            }
        );

    // Returns the generated authentication token.
    return {
        token
    };
}