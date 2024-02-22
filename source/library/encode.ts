import fs from "node:fs";
import events from "node:events";
import { format } from "@fast-csv/format";
import { sortDatabase } from "./sort.js";
import { Database } from "../types.js";

/**
 * Write a database file to disk
 * @param filename The path to write to (overwrite)
 * @param db The database (or library)
 * @example
 *  const db = await parseLibraryFile("./test.csv");
 *  db.push({ title: "...", author: "...", isbn: "000000000" });
 *  await writeLibraryFile("./test.csv", db);
 */
export async function writeLibraryFile(filename: string, db: Database): Promise<void> {
    // Start stream encoding
    const csvStream = format({
        headers: ["title", "author", "isbn"],
        writeHeaders: false
    });
    const fileStream = fs.createWriteStream(filename);
    csvStream.pipe(fileStream);
    // Sort
    const clone = structuredClone(db);
    sortDatabase(clone);
    // Process
    for (const book of clone) {
        csvStream.write(book);
    }
    csvStream.end();
    // Wait for end
    await events.once(fileStream, "close");
}
