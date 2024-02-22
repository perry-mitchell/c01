import boxen from "boxen";
import chalk from "chalk";
import { Library } from "./library/Library.js";

export function printHeader(): void {
    console.log(
        boxen(
            `${chalk.rgb(133, 202, 93).bold("Library")} ${chalk.rgb(111, 183, 214).bold("Management")}`,
            { padding: 1 }
        ),
        "\n"
    );
}

export function printLibraryInfo(library: Library): void {
    console.log(`\tDatabase: ${chalk.yellow(library.filename)}`);
    console.log(`\tBooks:    ${chalk.blue(library.count)}`);
    console.log("");
}
