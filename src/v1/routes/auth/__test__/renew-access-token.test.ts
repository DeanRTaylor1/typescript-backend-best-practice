import request from "supertest";
import { app } from "../../../../app";
import { createToken, generateEmail, generateString } from "../../../../util";

interface LoginResponse {
  access_token: string;
  refresh_token: string;
}

let user: {
  email: string;
  password: string;
  username: string;
  full_name: string;
};

let body: LoginResponse;

beforeAll(async () => {
  user = {
    email: generateEmail(),
    password: "password",
    username: generateString(),
    full_name: generateString(),
  };

  await request(app).post("/api/v1/auth/signup").send(user);

  const response = await request(app).post("/api/v1/auth/login").send(user);

  body = response.body;
});

describe("renew access token route", () => {
  it("should return 200 and access token if token is valid", async () => {
    const { access_token, refresh_token } = body;

    const response = await request(app)
      .post(`/api/v1/auth/renew`)
      .set("Authorization", `Bearer ${access_token}`)
      .send({
        refresh_token: refresh_token,
      })
      .expect(200);

    expect(response.body.access_token).toBeDefined();
    expect(response.body.access_token_expires_at).toBeDefined();
  });

  it("should return 401 if token is invalid", async () => {
    const { access_token, refresh_token } = body;

    await request(app)
      .post(`/api/v1/auth/renew`)
      .set("Authorization", `Bearer ${access_token}`)
      .send({
        refresh_token: refresh_token + "invalid",
      })
      .expect(401);
  });

  it("should return 401 if bearer token does not match the refresh token", async () => {
    const { access_token } = body;

    const wrongToken = createToken(
      1,
      generateString(),
      generateEmail(),
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      +process.env.REFRESH_TOKEN_DURATION!
    );

    await request(app)
      .post(`/api/v1/auth/renew`)
      .set("Authorization", `Bearer ${access_token}`)
      .send({
        refresh_token: wrongToken,
      })
      .expect(401);
  });

  it("should return 401 if bearer token is expired", async () => {
    const { refresh_token } = body;

    const wrongToken = await createToken(
      1,
      generateString(),
      generateEmail(),
      -1
    );

    await request(app)
      .post(`/api/v1/auth/renew`)
      .set("Authorization", `Bearer ${wrongToken}`)
      .send({
        refresh_token: refresh_token,
      })
      .expect(401);
  });
});
