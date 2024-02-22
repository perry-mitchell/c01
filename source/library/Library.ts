import { Database, DatabaseItem } from "../types.js";
import { parseLibraryFile } from "./decode.js";
import { writeLibraryFile } from "./encode.js";
import { sortDatabase } from "./sort.js";

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

    get count(): number {
        return this._db.length;
    }

    get filename(): string {
        return this._filename;
    }

    addItem(item: DatabaseItem): void {
        this._db.push(item);
    }

    getItems(): Array<DatabaseItem> {
        const items = [...this._db];
        sortDatabase(items);
        return items;
    }

    async saveToFile(): Promise<void> {
        await writeLibraryFile(this._filename, this._db);
    }
}
