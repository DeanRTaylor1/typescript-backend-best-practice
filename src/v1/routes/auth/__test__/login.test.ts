import { app } from "@src/app";
import { generateEmail, generateString } from "@src/util";
import request from "supertest";

it("returns 200 if given correct credentials", async () => {
  const email = generateEmail();
  const password = "Password123";
  const username = generateString();
  const full_name = generateString();
  await request(app)
    .post("/api/v1/auth/signup")
    .send({
      email,
      password,
      username,
      full_name,
    })
    .expect(201);
  const response = await request(app)
    .post("/api/v1/auth/login")
    .send({
      email,
      password,
    })
    .expect(200);

  expect(response.body).toHaveProperty("access_token");
});

it("returns 400 if given incorrect credentials", async () => {
  const email = generateEmail();
  const password = "Password123";
  const username = generateString();
  const full_name = generateString();
  await request(app)
    .post("/api/v1/auth/signup")
    .send({
      email,
      password,
      username,
      full_name,
    })
    .expect(201);
  await request(app)
    .post("/api/v1/auth/login")
    .send({
      email,
      password: "wrongPassword",
    })
    .expect(400);
});

it("returns 400 if given incorrect email", async () => {
  const email = generateEmail();
  const password = "Password123";
  const username = generateString();
  const full_name = generateString();
  await request(app)
    .post("/api/v1/auth/signup")
    .send({
      email,
      password,
      username,
      full_name,
    })
    .expect(201);
  await request(app)
    .post("/api/v1/auth/login")
    .send({
      email: generateEmail(),
      password,
    })
    .expect(400);
});
