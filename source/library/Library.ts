import { Database } from "../types.js";
import { parseLibraryFile } from "./decode.js";
import { writeLibraryFile } from "./encode.js";

export class Library {
    static async initialiseUsingFile(filename: string): Promise<Library> {
        const db = await parseLibraryFile(filename);
        return new Library(filename, db);
    }

    protected _db: Database;
    protected _filename: string;

    constructor(filename: string, db: Database) {
        this._filename = filename;
        this._db = db;
    }

    async saveToFile() {
        await writeLibraryFile(this._filename, this._db);
    }
}
