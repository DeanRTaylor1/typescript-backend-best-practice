[![ci-test](https://github.com/DeanRTaylor1/typescript-backend-best-practice/actions/workflows/test.yml/badge.svg?branch=main)](https://github.com/DeanRTaylor1/typescript-backend-best-practice/actions/workflows/test.yml)
[![Coverage Status](./icons/badge-statements.svg)](./coverage/index.html)
[![Coverage Status](./icons/badge-lines.svg)](./coverage/index.html)
[![Coverage Status](./icons/badge-functions.svg)](./coverage/index.html)
[![Coverage Status](./icons/badge-branches.svg)](./coverage/index.html)

# typescript-backend-best-practice Repo

## Setup Dev Environment

- Clone repo
- npm install
- create .env with below parameters
- npm run postgres setup docker container with postgres
- npm run createdb createdb with required name
- npm run migrate-up
- npm run dev to run dev server with ts-node
- npm run test-ci will complete one test run and output coverage details

### Must have Docker Daemon installed and running to get db set up

## Environment Variables

The following environment variables are required to run the project:

- `PG_HOST`: The hostname or IP address of the PostgreSQL server (default is `localhost`).
- `PG_USERNAME`: The username for the PostgreSQL server (default is `root`).
- `PG_PASSWORD`: The password for the PostgreSQL server (default is `secret`).
- `PASETO_KEY`: The secret key used for PASETO encryption (default is `12345678901234567890123456789012`).
- `ACCESS_TOKEN_DURATION`: The duration of the access token in minutes (default is `15`).
- `REFRESH_TOKEN_DURATION`: The duration of the refresh token in minutes (default is `2880`).

To set up these environment variables, create a `.env` file in the root directory of the project, and add the following lines:

## Features

1. Custom logging using morgan, Influenced by Gin Go framework
2. Custom Error handling classes
3. Create new db migration by using npm run create-migration -- migration-name
4. PASETO Bearer authentication and refresh token

## Naming Conventions

- Use camelCase for internal functions and variables.
- Use snake_case for client-facing data such as variables to be sent in JSON.

## Examples

Here are some examples of how to use these naming conventions:

```javascript
// Internal function
function myFunction() {
  // ...
}

// Internal variable
let myVariable = "Hello, world!";

// Client-facing data
let clientData = {
  first_name: "John",
  last_name: "Doe",
  age: 30
}:
```

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in development mode using `ts-node-dev` with hot-reloading enabled.

### `npm run build`

Builds the app for production using `tsc`.

### `npm start`

Starts the app in production mode after it has been built.

### `npm test`

Launches the test runner using `jest` with watch mode and console output.

### `npm run postgres`

Starts a PostgreSQL 14 Docker container with default username and password.

### `npm run createdb`

Creates a PostgreSQL database named `typescript-backend-best-practice` in the running container.

### `npm run postgres:stop`

Stops the running PostgreSQL Docker container.

### `npm run create-migration`

Creates a new migration file in the `src/db/migrations` directory using a timestamp and given description.

### `npm run migrate-up`

Migrates the database schema up to the latest version using `db-migrate`.

### `npm run migrate-down`

Migrates the database schema down to the previous version using `db-migrate`.

### `npm run migrate-up1`

Migrates the database schema up by one step only using `db-migrate`.

### `npm run migrate-down1`

Migrates the database schema down by one step only using `db-migrate`.

### `npm run test-ci`

Runs tests in CI mode with code coverage enabled using `jest`.

### `npm run lint`

Runs ESLint to check for linting errors in the project and fix them.

### `npm run coverage-badges`

Generates code coverage badges using Jest and saves them in the `./icons` directory.

### `npm run cleanup`

Rolls back the database migrations and removes the PostgreSQL Docker container used for testing.
