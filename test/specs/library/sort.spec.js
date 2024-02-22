import { expect } from "chai";
import { sortDatabase } from "../../../dist/library/sort.js";

describe("sortDatabase", function() {
    it("sorts databases by author", function() {
        const db = [
            {
                author: "D. Dickens",
                title: "A Book",
                isbn: "0000000000"
            },
            {
                author: "A. Aaronson",
                title: "Z",
                isbn: "0000000000"
            },
            {
                author: "J. Jefferson",
                title: "X marks the spot",
                isbn: "0000000000"
            },
        ];
        sortDatabase(db);
        expect(db.map(item => item.author)).to.deep.equal([
            "A. Aaronson",
            "D. Dickens",
            "J. Jefferson"
        ]);
    });
});
