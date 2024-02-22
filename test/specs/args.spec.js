import { expect } from "chai";
import { parseCLIArgs } from "../../dist/args.js";

describe("parseCLIArgs", function() {
    it("parses args correctly", function() {
        const out = parseCLIArgs({
            _: ["filename.csv"]
        });
        expect(out).to.deep.include({
            _: ["filename.csv"]
        });
    });

    it("throws for invalid arguments", function() {
        expect(() => {
            parseCLIArgs({
                _: []
            });
        }).to.throw(/Failed parsing/i);
    });
});
