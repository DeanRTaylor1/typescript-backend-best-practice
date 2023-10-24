import Container from "typedi";
import { UsersService } from "../users.service";
// import DB from "api/models";

const usersService = Container.get(UsersService);

describe("UsersService tests", () => {
  describe("createUser", () => {
    const testCases = [
      {
        description: "should create a user successfully",
        input: {
          firstName: "John",
          lastName: "Doe",
          email: "john.doe@example.com",
        },
        expected: {
          firstName: "John",
          lastName: "Doe",
          email: "john.doe@example.com",
        },
      },
    ];
    testCases.forEach(({ description, input, expected }) => {
      test(description, async () => {
        const result = await usersService.createUser(input);
        expect(result.firstName).toBe(expected.firstName);
        expect(result.lastName).toBe(expected.lastName);
        expect(result.email).toBe(expected.email);
      });
    });
  });
});
