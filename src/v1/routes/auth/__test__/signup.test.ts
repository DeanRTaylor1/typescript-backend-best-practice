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

it("returns a 400 with invalid email", async () => {
  return request(app)
    .post("/api/v1/auth/signup")
    .send({
      email: "testtest.com",
      password: "Password123",
      username: "testTests",
    })
    .expect(400);
});

it("returns a 400 with invalid password", async () => {
  return request(app)
    .post("/api/v1/auth/signup")
    .send({
      email: "test@test.com",
      password: "p",
      username: "testTests",
    })
    .expect(400);
});

it("returns a 400 with missing email and/or password", async () => {
  await request(app)
    .post("/api/v1/auth/signup")
    .send({
      email: "test@test.com",
    })
    .expect(400);
  await request(app)
    .post("/api/v1/auth/signup")
    .send({
      password: "p",
    })
    .expect(400);
  await request(app).post("/api/v1/auth/signup").send({}).expect(400);
});

it("disallows duplicate emails", async () => {
  await request(app)
    .post("/api/v1/auth/signup")
    .send({
      email: "test@test.com",
      password: "Password",
      username: "testTests",
    })
    .expect(201);

  await request(app)
    .post("/api/v1/auth/signup")
    .send({
      email: "test@test.com",
      password: "Password",
      username: "testTests",
    })
    .expect(400);
});
