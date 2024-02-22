import { Database } from "../types.js";

export function sortDatabase(db: Database): void {
    db.sort((a, b) => {
        if (a.author > b.author) return 1;
        if (a.author < b.author) return -1;
        return 0;
    });
}
