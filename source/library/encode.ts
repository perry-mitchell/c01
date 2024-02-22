import fs from "node:fs";
import events from "node:events";
import { format } from "@fast-csv/format";
import { sortDatabase } from "./sort.js";
import { Database } from "../types.js";

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
