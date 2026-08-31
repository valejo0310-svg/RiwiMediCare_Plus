// Imports Multer to handle file uploads in memory.
import multer from "multer";

// Imports the custom application error
// used to return controlled validation errors.
import { AppError } from "../errors/app-errors";

/**
 * Configures Multer for JSON file uploads.
 *
 * Files are stored in memory instead of being written
 * directly to disk. The middleware also limits the
 * maximum file size and validates that only JSON files
 * are accepted.
 */
export const uploadJson = multer({

    // Stores uploaded files in memory as Buffer objects.
    storage: multer.memoryStorage(),

    // Defines upload restrictions.
    limits: {

        // Limits the uploaded file size to 2 MB.
        fileSize: 2 * 1024 * 1024
    },

    /**
     * Validates the uploaded file type.
     *
     * A file is accepted when its MIME type is
     * "application/json" or its filename ends with ".json".
     *
     * @param req - Express request associated with the upload.
     * @param file - File information provided by Multer.
     * @param callback - Function used to accept or reject the uploaded file.
     */
    fileFilter: (
        req,
        file,
        callback
    ) => {

        // Checks whether the file is identified as JSON
        // by MIME type or by its filename extension.
        const isJson =
            file.mimetype === "application/json" ||
            file.originalname
                .toLowerCase()
                .endsWith(".json");

        // Rejects files that are not JSON.
        if (!isJson) {
            callback(
                new AppError(
                    "Only JSON files are allowed",
                    400
                )
            );

            return;
        }

        // Accepts the uploaded JSON file.
        callback(null, true);
    }
});