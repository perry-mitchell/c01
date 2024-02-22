import path from "node:path";
import { ParsedArgs } from "minimist";
import { Layerr } from "layerr";
import { CLIArgs, ErrorCode } from "./types.js";
import { CLIArgsSchema } from "./schema.js";

export function parseCLIArgs(args: ParsedArgs): CLIArgs {
    try {
        return CLIArgsSchema.parse(args);
    } catch (err) {
        throw new Layerr(
            {
                cause: err,
                info: {
                    code: ErrorCode.BadArgs
                }
            },
            "Failed parsing CLI arguments"
        );
    }
}

export function prepareAbsoluteFilename(filename: string): string {
    return path.resolve(process.cwd(), filename);
}
