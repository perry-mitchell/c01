# Library Book System

_Book management system for the terminal._

## About

This application provides a terminal interface with which to manage a library book system. The application reads books from a database file (in **CSV format**), allowing the user to add to the database or print all of the current books contained within it.

## Development Usage

Before running the application, ensure that you've followed the setup procedure.

### Setup

After cloning this repository, make sure to initialise the application:

```shell
npm i
```

_Note that this application requires NodeJS 18+_.

### Execution

There are a number of ways of executing this program. The first being to simply build it and run it:

```shell
npm run build
node ./dist/index.js path_to_file.csv
```

You can also run it using `npm start`:

```shell
npm start -- path_to_file.csv
```

The file path may be relative or absolute.

### Tests

You can run the unit tests by simply calling `npm test`. The tests execute all current specs and checks to see that the coverage is still at an acceptable amount.

## Production Usage

This application can also be run directly by invoking `npx`:

```shell
npx @perrymitchell/book-system path_to_file.csv
```
