import { Database } from "../types.js";

/**
 * Sort the library database by author name
 * @param db The db collection
 */
export function sortDatabase(db: Database): void {
    db.sort((a, b) => {
        if (a.author > b.author) return 1;
        if (a.author < b.author) return -1;
        return 0;
    });
}
