# Library Book System

_Book management system for the terminal._

![Tests status](https://github.com/perry-mitchell/c01/actions/workflows/test.yml/badge.svg)

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

_Note that the project comes with a sample database, `sample.db.csv`, so you can use that to quickly test: `npm start -- ./sample.db.csv`._

### Tests

You can run the unit tests by simply calling `npm test`. The tests execute all current specs and checks to see that the coverage is still at an acceptable amount.

## Production Usage

This application can also be run directly by invoking `npx`:

```shell
npx @perrymitchell/book-system path_to_file.csv
```

_New_ databases can be created by simply referring to a file that doesn't exist yet:

```shell
npx @perrymitchell/book-system ./no-file-yet.csv
```

Once saved, the new database will be created at the provided path.
