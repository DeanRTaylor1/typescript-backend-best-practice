import request from "supertest";
import { app } from "../../../../app";
import { generateEmail, generateString } from "../../../../util";

it("returns a 201 on successful signup", async () => {
  return request(app)
    .post("/api/v1/auth/signup")
    .send({
      email: generateEmail(),
      password: "password",
      username: generateString(),
      full_name: generateString(),
    })
    .expect(201);
});

it("returns a 400 with invalid email", async () => {
  return request(app)
    .post("/api/v1/auth/signup")
    .send({
      email: generateString(),
      password: "Password123",
      username: generateString(),
      full_name: generateString(),
    })
    .expect(400);
});

it("returns a 400 with invalid password", async () => {
  return request(app)
    .post("/api/v1/auth/signup")
    .send({
      email: generateEmail(),
      password: "p",
      username: "testTests",
      full_name: generateString(),
    })
    .expect(400);
});

it("returns a 400 with missing parameters", async () => {
  await request(app)
    .post("/api/v1/auth/signup")
    .send({
      email: generateEmail(),
      password: "password",
    })
    .expect(400);
  await request(app)
    .post("/api/v1/auth/signup")
    .send({
      password: "p",
      full_name: generateString(),
    })
    .expect(400);
  await request(app)
    .post("/api/v1/auth/signup")
    .send({
      email: generateEmail,
      full_name: generateString(),
    })
    .expect(400);
  await request(app).post("/api/v1/auth/signup").send({}).expect(400);
});

it("disallows duplicate emails", async () => {
  const email = generateEmail();

  await request(app)
    .post("/api/v1/auth/signup")
    .send({
      email,
      password: "Password",
      username: generateString(),
      full_name: generateString(),
    })
    .expect(201);

  await request(app)
    .post("/api/v1/auth/signup")
    .send({
      email,
      password: "Password",
      username: "testTests",
      full_name: generateString(),
    })
    .expect(400);
});
