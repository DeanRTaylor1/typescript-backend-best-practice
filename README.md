[![ci-test](https://github.com/DeanRTaylor1/typescript-backend-best-practice/actions/workflows/test.yml/badge.svg?event=release)](https://github.com/DeanRTaylor1/typescript-backend-best-practice/actions/workflows/test.yml)
[![Coverage Status](./icons/badge-statements.svg)](./coverage/index.html)
[![Coverage Status](./icons/badge-lines.svg)](./coverage/index.html)
[![Coverage Status](./icons/badge-functions.svg)](./coverage/index.html)
[![Coverage Status](./icons/badge-branches.svg)](./coverage/index.html)

# typescript-backend-best-practice Repo

## Setup Dev Environment

- Clone repo
- npm install
- npm run postgres setup docker container with postgres
- npm run createdb createdb with required name
- npm run migrate-up
- npm run dev to run dev server with ts-node
- npm run test-ci will complete one test run and output coverage details

### Must have Docker Daemon installed and running to get db set up

## Features

1. Custom logging using morgan, Influenced by Gin Go framework
2. Custom Error handling
3. Create new db migration by using npm run create-migration -- migration-name
4. PASETO Bearer authentication

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
