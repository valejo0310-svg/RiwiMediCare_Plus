/**
 * Custom application error used to represent
 * controlled business and HTTP errors.
 *
 * Extends the native Error class by adding
 * an HTTP status code that can be handled
 * by the global error middleware.
 */
export class AppError extends Error {

    // HTTP status code associated with the error.
    public readonly statusCode: number;

    /**
     * Creates a new application error.
     *
     * @param message - Human-readable error message.
     * @param statusCode - HTTP status code associated with the error.
     */
    constructor(
        message: string,
        statusCode: number
    ) {
        // Initializes the native Error class
        // with the provided message.
        super(message);

        // Stores the HTTP status code
        // for later use by the error middleware.
        this.statusCode = statusCode;
    }
}