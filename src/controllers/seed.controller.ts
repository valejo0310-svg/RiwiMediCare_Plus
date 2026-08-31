// Imports the Express request and response types.
import { Request, Response} from "express";

// Imports the custom application error used
// to handle controlled errors.
import { AppError} from "../errors/app-errors";

// Imports the seed data type and the service
// responsible for processing the JSON seed information.
import {SeedData,seedFromJson} from "../services/seed.service";

/**
 * Processes a JSON seed file uploaded with Multer.
 *
 * Validates that a file was uploaded, converts the file
 * buffer into a UTF-8 string, parses the JSON content,
 * and sends the resulting data to the seed service.
 *
 * @param req - Express request containing the uploaded JSON file.
 * @param res - Express response used to return the seed result.
 * @returns A promise that resolves when the response is sent.
 */
export async function uploadSeedController(
    req: Request,
    res: Response
): Promise<void> {

    // Validates that Multer received a file.
    if (!req.file) {
        throw new AppError(
            "JSON file is required",
            400
        );
    }

    // Declares the variable that will contain
    // the parsed seed data.
    let data: SeedData;

    try {

        // Converts the uploaded file buffer
        // into a UTF-8 string.
        const content =
            req.file.buffer.toString(
                "utf-8"
            );

        // Parses the JSON content and assigns it
        // to the expected SeedData structure.
        data =
            JSON.parse(content) as SeedData;

    } catch {

        // Throws a controlled error when the
        // uploaded file does not contain valid JSON.
        throw new AppError(
            "Invalid JSON file",
            400
        );
    }

    // Delegates the data loading process
    // to the seed service.
    const result =
        await seedFromJson(data);

    // Returns the result of the seed operation.
    res.status(200).json({
        message:
            "Seed data loaded successfully",

        result
    });
}