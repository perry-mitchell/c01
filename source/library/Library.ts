import { parseLibraryFile } from "./parse.js";

export class Library {
    static async initialiseUsingFile(filename: string): Promise<Library> {
        const db = await parseLibraryFile(filename);
        console.log(JSON.stringify(db, undefined, 2));
        return new Library();
    }
}
