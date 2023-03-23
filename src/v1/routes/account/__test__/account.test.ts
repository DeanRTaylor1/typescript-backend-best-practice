import request from "supertest";
import { app } from "../../../../app";

import { generateEmail, generateString } from "../../../../util";

let user: {
  email: string;
  password: string;
  username: string;
  full_name: string;
};

beforeAll(async () => {
  user = {
    email: generateEmail(),
    password: "password",
    username: generateString(),
    full_name: generateString(),
  };

  await request(app).post("/api/v1/auth/signup").send(user);
});

describe("Accounts get route", () => {
  it("should return a 200 status code", async () => {
    const result = await request(app).post("/api/v1/auth/login").send(user);

    const { access_token } = result.body;

    await request(app)
      .get(`/api/v1/account`)
      .set("Authorization", `Bearer ${access_token}`)
      .send()
      .expect(200);
  });

  it("returns the account details", async () => {
    const result = await request(app).post("/api/v1/auth/login").send(user);

    const { access_token } = result.body;

    const response = await request(app)
      .get(`/api/v1/account`)
      .set("Authorization", `Bearer ${access_token}`)
      .send()
      .expect(200);

    const { account } = response.body;
    expect(account).toHaveProperty("id");
    expect(account).toHaveProperty("owner_id");
    expect(account).toHaveProperty("currency");
    expect(account).toHaveProperty("balance");
    expect(account).toHaveProperty("created_at");
  });

  it("returns a 401 status code if the user is not logged in", async () => {
    await request(app).get(`/api/v1/account`).send().expect(401);
  });
});
