import request from "supertest";
import { app } from "../../../../app";

it("returns a 201 on successful signup", async () => {
  return request(app)
    .post("/api/v1/auth/signup")
    .send({
      email: "test@test.com",
      password: "password",
      username: "test",
    })
    .expect(201);
});
