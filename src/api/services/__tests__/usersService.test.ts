import Container from "typedi";
import { UsersService } from "../users.service";
import { UserStatusEnum, UserRoleEnum } from "api/enum/users.enum";
import User from "api/models/entities/User.entity";
import { IUser } from "api/models/entities/types/entity.types";
// import DB from "api/models";

const usersService = Container.get(UsersService);

describe("UsersService tests", () => {
  describe("createUser", () => {
    const testCases: Array<{
      description: string;
      input: IUser;
      expected: Partial<User>;
    }> = [
      {
        description: "should create user John Doe successfully",
        input: {
          username: "username",
          firstName: "John",
          lastName: "Doe",
          email: "john.doe@example.com",
          hashedPassword: "somehashedpassword1",
        },
        expected: {
          username: "username",
          firstName: "John",
          lastName: "Doe",
          email: "john.doe@example.com",
          status: UserStatusEnum.INACTIVE,
          role: UserRoleEnum.USER,
        },
      },
      {
        description: "should create user Jane Doe successfully",
        input: {
          username: "username1",
          firstName: "Jane",
          lastName: "Doe",
          email: "jane.doe@example.com",
          hashedPassword: "somehashedpassword2",
        },
        expected: {
          username: "username1",
          firstName: "Jane",
          lastName: "Doe",
          email: "jane.doe@example.com",
          status: UserStatusEnum.INACTIVE,
          role: UserRoleEnum.USER,
        },
      },
      {
        description: "should create user Alice Johnson successfully",
        input: {
          username: "username2",
          firstName: "Alice",
          lastName: "Johnson",
          email: "alice.johnson@example.com",
          hashedPassword: "somehashedpassword3",
        },
        expected: {
          username: "username2",
          firstName: "Alice",
          lastName: "Johnson",
          email: "alice.johnson@example.com",
          status: UserStatusEnum.INACTIVE,
          role: UserRoleEnum.USER,
        },
      },
    ];

    testCases.forEach(({ description, input, expected }) => {
      test(description, async () => {
        const result: User = await usersService.createUser(input);

        expect(result.username).toBe(expected.username);
        expect(result.firstName).toBe(expected.firstName);
        expect(result.lastName).toBe(expected.lastName);
        expect(result.email).toBe(expected.email);
        expect(result.status).toBe(expected.status);
        expect(result.role).toBe(expected.role);
        expect(typeof result.hashedPassword).toBe("string");
        expect(result.hashedPassword).toBeDefined();
      });
    });
  });
});
