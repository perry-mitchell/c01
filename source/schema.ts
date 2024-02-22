import { z } from "zod";

export const CLIArgsSchema = z
    .object({
        _: z
            .array(z.string().min(1))
            .min(1, "Expected at least one input file")
            .max(1, "Expected no more than 1 input file")
    })
    .strict();

export const DatabaseItemSchema = z.object({
    author: z.string().min(1),
    isbn: z
        .string()
        .regex(/^(\d{10}|\d{13})$/, "ISBN numbers must either be 10 or 13 digits in length"),
    title: z.string().min(1)
});

export const DatabaseSchema = z.array(DatabaseItemSchema);
