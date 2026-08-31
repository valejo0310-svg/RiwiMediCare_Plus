// Imports the user model and user role type
// used to perform database operations through Sequelize.
import {users, UserRole} from "../models/user.model";

/**
 * Defines the data required to create
 * a new user in the system.
 */
export interface CreateUserData {

    // Full name of the user.
    name: string;

    // Email used to identify and authenticate the user.
    email: string;

    // Password assigned to the user.
    password: string;

    // Role assigned to the user.
    role: UserRole;
}

/**
 * Finds a user by email.
 *
 * @param email - Email address used to search for the user.
 * @returns The matching user or null if it does not exist.
 */
export async function findUserByEmail( email: string): Promise<users | null> {

    return await users.findOne({
        where: {
            email
        }
    });
}


/**
 * Finds a user by identifier.
 *
 * @param id - Identifier of the user.
 * @returns The matching user or null if it does not exist.
 */
export async function findUserById( id: number): Promise<users | null> {

    return await users.findByPk(id);
}


/**
 * Creates a user.
 *
 * The new user is stored with the active
 * state enabled by default.
 *
 * @param data - Information required to create the user.
 * @returns The newly created user.
 */
export async function createUser( data: CreateUserData): Promise<users> {

    return await users.create({
        ...data,
        active: true
    });
}