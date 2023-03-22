import { NotAuthorizedError } from "../not-authorized-error";

it("returns the correct message", () => {
  const error = new NotAuthorizedError();
  expect(error.statusCode).toBe(401);
  const messages = error.serializeErrors();

  expect(messages.length).toBe(1);
  expect(messages[0].message).toBe("Not Authorized");
});
