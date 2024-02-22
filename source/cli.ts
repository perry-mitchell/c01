import boxen from "boxen";
import chalk from "chalk";
import inquirer from "inquirer";
import formatColumns from "colm";
import { Library } from "./library/Library.js";
import { DatabaseItem, LibraryAction } from "./types.js";
import { DatabaseItemSchema } from "./schema.js";

const TRANSFORM_INPUT = (value: string) => value.trim();
const VALIDATE_ISBN_INPUT = (value: string) => /^(\d{10}|\d{13})$/.test(value);
const VALIDATE_TEXT_INPUT = (value: string) => /[^\s]+/.test(value);

/**
 * Print a book's details to stdout
 * @param item The database item (book)
 */
export function printBookDetails(item: DatabaseItem): void {
    console.log(`\tTitle:  ${chalk.green(item.title)}`);
    console.log(`\tAuthor: ${item.author}`);
    console.log(`\tISBN:   ${chalk.bold(item.isbn)}`);
    console.log("");
}

/**
 * Print the main program header/logo
 */
export function printHeader(): void {
    console.log(
        boxen(
            `${chalk.rgb(133, 202, 93).bold("Library")} ${chalk.rgb(111, 183, 214).bold("Management")}`,
            { padding: 1 }
        ),
        "\n"
    );
}

/**
 * Print the library info to stdout
 * @param library The current library instance
 */
export function printLibraryInfo(library: Library): void {
    console.log(`\tDatabase: ${chalk.yellow(library.filename)}`);
    console.log(`\tBooks:    ${chalk.blue(library.count)}`);
    console.log("");
}

/**
 * Run the add-book menu/prompt, where a user can input
 *  a new book's details and choose to save them to the
 *  library database
 * @param library The current library instance
 */
async function runAddBook(library: Library): Promise<void> {
    const answers = await inquirer.prompt([
        {
            message: "Book Title",
            name: "title",
            transformer: TRANSFORM_INPUT,
            type: "input",
            validate: VALIDATE_TEXT_INPUT
        },
        {
            message: "Book Author",
            name: "author",
            transformer: TRANSFORM_INPUT,
            type: "input",
            validate: VALIDATE_TEXT_INPUT
        },
        {
            message: "ISBN",
            name: "isbn",
            transformer: TRANSFORM_INPUT,
            type: "input",
            validate: VALIDATE_ISBN_INPUT
        }
    ]);
    const book = DatabaseItemSchema.parse(answers);
    console.log("");
    // Prompt to update
    printBookDetails(book);
    const confirmAnswers = await inquirer.prompt([
        {
            message: "Add this book to the library?",
            name: "save",
            type: "confirm"
        }
    ]);
    if (confirmAnswers.save === true) {
        library.addItem(book);
        await library.saveToFile();
        console.log(chalk.underline("Saved to database.\n"));
    } else {
        console.log(chalk.dim("Book was not saved to database.\n"));
    }
}

/**
 * Run the main menu prompt
 * @param library The current library instance
 */
export async function runMainMenu(library: Library): Promise<void> {
    printLibraryInfo(library);
    const answers = await inquirer.prompt([
        {
            choices: [
                { name: "Add Book", value: LibraryAction.AddBook },
                { name: "Print Books", value: LibraryAction.Print },
                { name: "Exit", value: LibraryAction.Exit }
            ],
            message: "Choose library action",
            name: "action",
            type: "list"
        }
    ]);
    console.log("");
    switch (answers.action) {
        case LibraryAction.AddBook:
            await runAddBook(library);
            return runMainMenu(library);
        case LibraryAction.Print:
            runPrintBooks(library);
            return runMainMenu(library);
        case LibraryAction.Exit:
            console.log(chalk.bold.red("Bye!"));
            break;
        default:
            throw new Error(`Unrecognised action: ${answers.action}`);
    }
}

/**
 * Run the print-books procedure, where all current book
 *  items are printed to stdout
 * @param library The current library instance
 */
function runPrintBooks(library: Library): void {
    const items = library.getItems();
    console.log(
        formatColumns([
            ["Author", "Title", "ISBN"].map(value => chalk.bold.white(value)),
            ...items.map(item => [item.author, item.title, chalk.yellow(item.isbn)])
        ])
    );
    console.log("");
}
