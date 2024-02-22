import { Database, DatabaseItem } from "../types.js";
import { parseLibraryFile } from "./decode.js";
import { writeLibraryFile } from "./encode.js";
import { sortDatabase } from "./sort.js";

/**
 * Library management interface
 */
export class Library {
    /**
     * Initialise a new instance using a filename
     * @param filename The database filename (CSV)
     * @returns A new library instance
     */
    static async initialiseUsingFile(filename: string): Promise<Library> {
        const db = await parseLibraryFile(filename);
        return new Library(filename, db);
    }

    /**
     * The internal database reference
     */
    protected _db: Database;
    /**
     * The internal database filename reference
     */
    protected _filename: string;

    /**
     * Create a new instance
     * @param filename The database filename (CSV)
     * @param db The database collection
     */
    constructor(filename: string, db: Database) {
        this._filename = filename;
        this._db = db;
    }

    /**
     * The current number of items in the database
     */
    get count(): number {
        return this._db.length;
    }

    /**
     * The filename used to initialise the library
     */
    get filename(): string {
        return this._filename;
    }

    /**
     * Add a new book (item) to the library
     * @param item The book data
     */
    addItem(item: DatabaseItem): void {
        this._db.push(item);
    }

    /**
     * Get all current items, sorted (expensive)
     * @returns A sorted array of book items
     */
    getItems(): Array<DatabaseItem> {
        const items = [...this._db];
        sortDatabase(items);
        return items;
    }

    /**
     * Save the library to the registered filename
     */
    async saveToFile(): Promise<void> {
        await writeLibraryFile(this._filename, this._db);
    }
}
