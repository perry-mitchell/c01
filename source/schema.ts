import { z } from "zod";

/**
 * Command line argument schema, for arguments passed into
 *  the program
 */
export const CLIArgsSchema = z
    .object({
        _: z
            .array(z.string().min(1))
            .min(1, "Expected at least one input file")
            .max(1, "Expected no more than 1 input file")
    })
    .strict();

/**
 * Database item (book) schema, for each individual item
 *  stored in the database
 */
export const DatabaseItemSchema = z.object({
    author: z.string().min(1),
    isbn: z
        .string()
        .regex(/^(\d{10}|\d{13})$/, "ISBN numbers must either be 10 or 13 digits in length"),
    title: z.string().min(1)
});

/**
 * Overall database collection schema
 */
export const DatabaseSchema = z.array(DatabaseItemSchema);
