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
2. Custom Error handling
3. Create new db migration by using npm run create-migration -- migration-name
4. PASETO Bearer authentication

Node express
Node express
SEARCHCHATIMAGESVIDEOSMAPSNEWSSHOPPINGFLIGHTSTRAVELHOTELS
Welcome to the new Bing
Use the power of AI to find answers from the web, create written content, and more.
Terms of Use
Privacy Statement
How does Bing use AI?
What else can Bing do?
What is the latest news in tech?
Choose a conversation stylePreview

More
Creative

More
Balanced

More
Precise
undefined
node express
Sent message. node express
Searching for: node express

Searching for: node express

Generating answers for you…

Generating answers for you…

Node.js is a JavaScript runtime built on Chrome’s V8 JavaScript engineExpress is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications1. Using Express, you can build web applications, REST APIs, frameworks quickly and efficiently2.

Here’s how you can get started with Node.js and Express:

Open your terminal window and create a new project directory: mkdir express-example.
Navigate to the newly created directory: cd express-example.
Initialize a new npm project: npm init -y.
Install the express package: npm install express @4.17.13.
I hope this helps! Let me know if you have any other questions.

Received message. **Node.js** is a JavaScript runtime built on Chrome's V8 JavaScript engine. **Express** is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications. Using **Express**, you can build web applications, REST APIs, frameworks quickly and efficiently. Here's how you can get started with **Node.js** and **Express**: 1. Open your terminal window and create a new project directory: `mkdir express-example`. 2. Navigate to the newly created directory: `cd express-example`. 3. Initialize a new npm project: `npm init -y`. 4. Install the express package: `npm install express @4.17.1`. I hope this helps! Let me know if you have any other questions.
Learn more:
1. expressjs.com
2. codeforgeek.com
3. digitalocean.com
4. developer.mozilla.org
1
of
20
In my api, i use camelcase for my internal functions and variables and snake case for any client facing data such as variables to be sent in json, is this a bad practice?
Sent message. In my api, i use camelcase for my internal functions and variables and snake case for any client facing data such as variables to be sent in json, is this a bad practice?
It’s not necessarily a bad practice to use camelCase for internal functions and snake_case for client-facing data. It’s actually a common practice in many programming languages and frameworks.

The important thing is to be consistent with your naming conventions throughout your codebase. This makes it easier for other developers to read and understand your code.

I hope this helps! Let me know if you have any other questions.

Received message. It's not necessarily a bad practice to use camelCase for internal functions and snake_case for client-facing data. It's actually a common practice in many programming languages and frameworks. The important thing is to be consistent with your naming conventions throughout your codebase. This makes it easier for other developers to read and understand your code. I hope this helps! Let me know if you have any other questions.
2
of
20
So if i define these paramaters in my project readme it isn't a terrible decision, basically: am i sending this as json in a http response? If yes use snake case if no use camelcase
Sent message. So if i define these paramaters in my project readme it isn't a terrible decision, basically: am i sending this as json in a http response? If yes use snake case if no use camelcase
Defining these parameters in your project readme is a good practice. It helps other developers understand your naming conventions and makes it easier for them to work with your code.

It’s also a good idea to document your naming conventions in your codebase itself. This can be done using comments or other documentation tools.

I hope this helps! Let me know if you have any other questions.

Received message. Defining these parameters in your project readme is a good practice. It helps other developers understand your naming conventions and makes it easier for them to work with your code. It's also a good idea to document your naming conventions in your codebase itself. This can be done using comments or other documentation tools. I hope this helps! Let me know if you have any other questions.
3
of
20
What are some best practices for writing clean code?
Sent message. What are some best practices for writing clean code?
Searching for: best practices for writing clean code

Searching for: best practices for writing clean code

Generating answers for you…

Generating answers for you…

Here are some best practices for writing clean code:

Use intuitive naming conventions: Use descriptive and intuitive names for variables, functions, and classes. This makes your code more readable and easier to understand.
Write modular and reusable code: Break your code into smaller, more manageable chunks that each perform a specific task. This makes your code more modular and easier to maintain.
Keep code consistent and DRY (Don’t Repeat Yourself): Avoid duplicating code as much as possible. Instead, create reusable functions or classes that can be used throughout your codebase.
Optimize for readability and maintainability: Write code that is easy to read and understand. Use comments and documentation to explain complex sections of code.
Prioritize code comments and documentation: Document your code as much as possible. This makes it easier for other developers to understand your codebase.
I hope this helps! Let me know if you have any other questions.

Received message. Here are some best practices for writing clean code: 1. Use intuitive naming conventions: Use descriptive and intuitive names for variables, functions, and classes. This makes your code more readable and easier to understand. 2. Write modular and reusable code: Break your code into smaller, more manageable chunks that each perform a specific task. This makes your code more modular and easier to maintain. 3. Keep code consistent and DRY (Don't Repeat Yourself): Avoid duplicating code as much as possible. Instead, create reusable functions or classes that can be used throughout your codebase. 4. Optimize for readability and maintainability: Write code that is easy to read and understand. Use comments and documentation to explain complex sections of code. 5. Prioritize code comments and documentation: Document your code as much as possible. This makes it easier for other developers to understand your codebase. I hope this helps! Let me know if you have any other questions.
Learn more:
1. technotification.com
2. nerdleveltech.com
3. dev.to
4. pluralsight.com
5. betterprogramming.pub
+1 more
4
of
20
Can you write me a short readme.md example that explains my naming convention that i described above?
Sent message. Can you write me a short readme.md example that explains my naming convention that i described above?
Sure! Here’s an example of how you can write a README.md file that explains your naming convention:

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
};

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
