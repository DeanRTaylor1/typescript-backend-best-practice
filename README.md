### `typescript-backend-best-practice`

This is a TypeScript-based backend boilerplate designed to follow best practices for scalable and maintainable architecture. The boilerplate utilizes Express.js for handling HTTP requests and integrates various tools and libraries to enhance development productivity and code quality.

---

#### Main Features:

- **TypeScript Support**: The project is set up with TypeScript for static type checking and modern JavaScript features.
- **Express.js**: Utilizing Express.js as the web application framework to handle HTTP requests.
- **Object-Oriented Programming (OOP)**: Following OOP principles for a modular and maintainable codebase.
- **Routing-Controllers**: Using `routing-controllers` library to simplify routing and controller management with decorators.
- **Validation and Transformation**: Integrated `class-validator` and `class-transformer` for validating and transforming data at runtime.
- **Environment Variable Validation**: Utilizing `envalid` to validate and clean environment variables to ensure the app runs with the required settings.
- **Database Integration**: Configured with Sequelize for ORM, supporting PostgreSQL out of the box.
- **Docker Support**: Docker scripts included for easy setup of development and test databases.
- **Logging**: Integrated with `winston` for logging, including daily log rotation.
- **Authentication**: Setup to use JSON Web Tokens (JWT) for handling authentication.
- **File Uploads**: Supports file uploads with `multer`.
- **Error Handling**: Custom error handling to ensure consistent error responses.
- **Development and Production Ready**: Different scripts and configurations for development and production environments.
- **Linting and Formatting**: Enforced code style and quality using ESLint and Prettier.
- **Testing**: Configured with Jest for running tests, with support for TypeScript.
- **Continuous Integration**: Ready to be integrated with CI/CD pipelines.
- **Husky for Git Hooks**: Utilizing Husky to enforce quality checks before commits.

---

#### Scripts:

- `dev:docker`: Setup database and start the application in development mode with Docker.
- `lint`: Run ESLint for static code analysis.
- `db:setup`: Run database migrations.
- `dev`: Start the application in development mode using Docker Compose.
- `postgres`: Start a PostgreSQL Docker container.
- `createdb`: Create the test database.
- `dropdb`: Drop the test database.
- `test-jest`: Run tests using Jest.
- `cleanup`: Stop and remove the PostgreSQL Docker container.
- `test`: Full test script including database setup, running tests, and cleanup.
- `build`: Compile TypeScript code and resolve module aliases.

### ESLint Configuration and Lint Rules

ESLint is a static code analysis tool used for identifying problematic patterns in JavaScript and TypeScript code. Below is a description of the ESLint configuration provided:

#### Environment:

- **Browser**: The environment is set to `browser`, indicating that the global variables defined by browsers are pre-defined.
- **ES2021**: ECMAScript 2021 globals and syntax features are enabled.

#### Extends:

- **ESLint Recommended**: The configuration extends the set of recommended ESLint rules.
- **TypeScript ESLint Recommended**: Recommended rules from the `@typescript-eslint` plugin are included.

#### Parser:

- The parser is set to `@typescript-eslint/parser`, allowing ESLint to parse TypeScript code.

#### Parser Options:

- **ECMA Version**: Set to "latest" to use the latest ECMAScript version.
- **Source Type**: Set to "module", indicating that the code should be treated as an ECMAScript module.

#### Plugins:

- **@typescript-eslint**: Adds TypeScript specific linting rules to ESLint.

#### Rules:

- **Quotes**: Enforce the consistent use of double quotes.
- **Max Params**: Functions can have at most 2 parameters.
- **Semi**: Enforce the consistent use of semicolons.
- **@typescript-eslint/no-unused-vars**: Rules for handling unused variables and arguments in TypeScript.

#### Ignore Patterns:

Files and directories to be ignored by ESLint:

- Database related files (`src/databases/**`)
- Jest configuration file (`jest.config.js`)
- Test files in the `src/lib/__tests__` directory
- Scripts directory (`scripts/**`)

#### Overrides:

- **Files**: Applies specific rules to controller files (`*.controller.ts`).
- **Rules**: `max-params` rule is turned off for controller files.

### BaseController Class

#### Properties:

- `code`: HTTP status code for the response. Default is `200 OK`.
- `data`: Data to be sent in the response.
- `message`: A message accompanying the response. Default is `"Success"`.
- `typeRes`: Type of the response, can be either JSON or SEND. Default is JSON.
- `enableSnakeCase`: Flag to enable snake case transformation for the response data. The value is fetched from the environment configuration.

#### Methods:

- `setCode`, `setData`, `setMessage`, `setTypeRes`: Fluent API methods for setting properties of the controller.
- `getResponse`: Sends the response with the current properties of the controller.
- `responseSuccess`: Utility method for sending a successful response. It sets the HTTP status code to `200`, and marks the response as successful.
- `responseError`: Utility method for sending an error response. It sets the HTTP status code to a provided value or `500` by default, and marks the response as unsuccessful.
- `transformData`: Transforms the data to be sent in the response. If `enableSnakeCase` is true, it converts the data to snake case. It also sanitizes the data by removing tainted fields.
- `sanitizeData`: Removes tainted fields from the data.
- `isBaseEntity`: Checks if the provided object is an instance of `BaseEntity`.

### UsersController Class

#### Methods:

- `getAllUsers`: Retrieves a list of users from the database, and sends a successful response with the user data.
- `createUser`: Creates a new user in the database, and sends a successful response with the created user's data.
- `login`: Logs in a user, and sends a successful response with a login token.

#### Tainted Fields and Sanitization:

- `TaintedFields`: A list of fields that should be removed from the response data for security reasons (e.g., passwords).
- `TaintedFieldsSet`: A set created from `TaintedFields` for faster lookups.
- `Sanitized`: A type that represents an object with the tainted fields removed.
- `ObjectOnly`: A type that ensures the given type `T` is an object.

### Explanation for New Users

The `BaseController` class provides a set of utility methods for sending HTTP responses in a consistent manner. It has methods to set the HTTP status code, response data, response message, and response type. It also provides a method to send the response, and utility methods for handling successful and error responses.

The `UsersController` class is an example of how the `BaseController` can be extended to implement specific functionality for a resource in your application, in this case, users. It includes methods to get all users, create a user, and log in a user. These methods interact with a user service to perform the required operations, and then use the `BaseController`'s utility methods to send the HTTP response.

The `TaintedFields` and related types and constants are used to define fields that should be removed from the response data before sending it, to prevent sensitive information from being exposed.

This structure promotes reusability, consistency, and security in handling HTTP responses throughout your application.
