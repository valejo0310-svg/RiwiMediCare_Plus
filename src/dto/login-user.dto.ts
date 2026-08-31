/**
 * Defines the credentials required
 * to authenticate a user in the system.
 */
export interface LoginUserDTO {

    // User email used for authentication.
    email: string;

    // User password used for credential validation.
    password: string;

}