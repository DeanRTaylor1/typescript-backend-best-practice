import { DatabaseConnectionError } from "../database-connection-error";

it("returns the correct message and status", () => {
  const error = new DatabaseConnectionError();
  expect(error.statusCode).toBe(500);
  const messages = error.serializeErrors();

  expect(messages.length).toBe(1);
  expect(messages[0].message).toBe("Error connecting to database");
});
