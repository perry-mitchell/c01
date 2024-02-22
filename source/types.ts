import { z } from "zod";
import { CLIArgsSchema, DatabaseItemSchema, DatabaseSchema } from "./schema";

export type CLIArgs = z.infer<typeof CLIArgsSchema>;

export type Database = z.infer<typeof DatabaseSchema>;

export type DatabaseItem = z.infer<typeof DatabaseItemSchema>;

export enum ErrorCode {
    BadArgs = "err/cli/args"
}
