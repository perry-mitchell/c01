import boxen from "boxen";
import chalk from "chalk";

export function printHeader(): void {
    console.log(
        boxen(
            `${chalk.rgb(133, 202, 93).bold("Library")} ${chalk.rgb(111, 183, 214).bold("Management")}`,
            { padding: 1 }
        ),
        "\n"
    );
}
