import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { expect } from "chai";
import { writeLibraryFile } from "../../../dist/library/encode.js";

describe("writeLibraryFile", function() {
    beforeEach(function() {
        const __dirname = fileURLToPath(new URL(".", import.meta.url));
        this.testFile = path.resolve(__dirname, "../../../dist/test.csv");
        this.db = [
            {
                author: "D. Dickens",
                title: "A Book",
                isbn: "0000000001"
            },
            {
                author: "A. Aaronson",
                title: "Z",
                isbn: "0000000002"
            },
            {
                author: "J. Jefferson",
                title: "X marks the spot",
                isbn: "0000000003"
            },
        ];
    });

    afterEach(async function() {
        await fs.unlink(this.testFile);
    });

    it("writes a file to disk", async function() {
        await writeLibraryFile(this.testFile, this.db);
        const contents = await fs.readFile(this.testFile, "utf8");
        const lines = contents.split(/\n/g);
        expect(lines[0]).to.equal("Z,A. Aaronson,0000000002");
        expect(lines[1]).to.equal("A Book,D. Dickens,0000000001");
        expect(lines[2]).to.equal("X marks the spot,J. Jefferson,0000000003");
    });
});
