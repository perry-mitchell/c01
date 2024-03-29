#!/usr/bin/env node

import minimist from "minimist";
import { parseCLIArgs, prepareAbsoluteFilename } from "./args.js";
import { printHeader, runMainMenu } from "./cli.js";
import { Library } from "./library/Library.js";

async function init() {
    printHeader();
    // Parse application arguments
    const argv = minimist(process.argv.slice(2));
    const args = parseCLIArgs(argv);
    // Get library filename
    const filename = prepareAbsoluteFilename(args._[0]);
    const library = await Library.initialiseUsingFile(filename);
    // Start
    await runMainMenu(library);
}

init().catch(err => {
    console.error(err);
    process.exit(1);
});
