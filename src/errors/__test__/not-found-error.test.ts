import { NotFoundError } from "../not-found-error";

it("returns the correct message and status", () => {
  const error = new NotFoundError();
  expect(error.statusCode).toBe(404);
  const messages = error.serializeErrors();

  expect(messages.length).toBe(1);
  expect(messages[0].message).toBe("Not Found");
});
