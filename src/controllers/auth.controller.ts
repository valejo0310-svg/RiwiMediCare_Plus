// Imports the Express request and response types
// used by the authentication controllers.
import {
    Request,
    Response
} from "express";

// Imports the authentication service functions
// responsible for user registration and login.
import {
    registerUser,
    loginUser
} from "../services/auth.service";

// Imports the DTO used to type registration data.
import {
    RegisterUserDTO
} from "../dto/register-user.dto";

// Imports the DTO used to type login data.
import {
    LoginUserDTO
} from "../dto/login-user.dto";

/**
 * Handles user registration requests.
 *
 * Receives the registration data from the request body,
 * sends it to the authentication service, and returns
 * the created user with HTTP status 201.
 *
 * @param req - Express request containing the registration data.
 * @param res - Express response used to return the created user.
 * @returns A promise that resolves when the response is sent.
 */
export async function registerController(
    req: Request,
    res: Response
): Promise<void> {

    // Extracts and types the registration data
    // received from the request body.
    const data: RegisterUserDTO =
        req.body;

    // Delegates the registration business logic
    // to the authentication service.
    const user =
        await registerUser(data);

    // Returns the newly created user.
    res.status(201).json(user);
}

/**
 * Handles user login requests.
 *
 * Receives the user credentials from the request body,
 * sends them to the authentication service, and returns
 * the authentication result with HTTP status 200.
 *
 * @param req - Express request containing the login credentials.
 * @param res - Express response used to return the authentication result.
 * @returns A promise that resolves when the response is sent.
 */
export async function loginController(
    req: Request,
    res: Response
): Promise<void> {

    // Extracts and types the login credentials
    // received from the request body.
    const data: LoginUserDTO =
        req.body;

    // Delegates authentication to the service layer.
    const result =
        await loginUser(data);

    // Returns the authentication result,
    // which includes the JWT token.
    res.status(200).json(result);
}