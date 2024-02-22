import fs from "node:fs";
import { parse } from "@fast-csv/parse";
import { Layerr } from "layerr";
import { Database } from "../types.js";
import { DatabaseItemSchema } from "../schema.js";

/**
 * Parse a library database file -
 *  It may be in TSV or CSV format..
 * @param filename The full path to the library file
 * @returns An array of books (ie. the database)
 */
export async function parseLibraryFile(filename: string): Promise<Database> {
    const db: Database = [];
    // Pipe in file contents
    const inStream = fs.createReadStream(filename).pipe(
        parse({
            headers: ["title", "author", "isbn"]
        })
    );
    // Watch for items
    try {
        await new Promise<void>((resolve, reject) => {
            inStream.on("error", err => {
                reject(new Layerr(err, "CSV stream error"));
            });
            inStream.on("data", row => {
                const result = DatabaseItemSchema.safeParse(row);
                if (!result.success) {
                    throw new Layerr(result.error, "Invalid CSV row format");
                }
                db.push(result.data);
            });
            inStream.on("end", () => {
                resolve();
            });
        });
    } catch (err) {
        // Cleanup
        inStream.destroy();
        // Throw
        throw new Layerr(err, "CSV stream parsing failed");
    }
    // Return DB instance
    return db;
}
