/* eslint-disable @typescript-eslint/no-explicit-any */
import { generateSession } from "../../../util";
import { generateDbUser } from "../../../util/generate-db-user";
import { createSession, getSession } from "../session.sql";

describe("session.sql", () => {
  it("should create a session successfully with the correct parameters", async () => {
    const dbUser = await generateDbUser();
    const userSession = generateSession(dbUser.email);

    const session = await createSession(
      userSession.id,
      userSession.email,
      userSession.refresh_token,
      userSession.user_agent,
      userSession.client_ip,
      userSession.expires_at
    );
    console.log(session);
    expect(session).toHaveProperty("email", userSession.email);
    expect(session).toHaveProperty("refresh_token", userSession.refresh_token);
    expect(session).toHaveProperty("user_agent", userSession.user_agent);
    expect(session).toHaveProperty("client_ip", userSession.client_ip);
    expect(session).toHaveProperty("expires_at", userSession.expires_at);

    expect(session.id).toBeTruthy();
    expect(session.created_at).toBeTruthy();
  });

  it("should throw an error if the user email is not valid", async () => {
    const dbUser = await generateDbUser();
    const userSession = generateSession(dbUser.email);

    await expect(
      createSession(
        userSession.id,
        userSession.email + "invalid",
        userSession.refresh_token,
        userSession.user_agent,
        userSession.client_ip,
        userSession.expires_at
      )
    ).rejects.toThrowError();
  });

  it("should return a session with the correct paramaters if the session exists", async () => {
    const dbUser = await generateDbUser();
    const userSession = generateSession(dbUser.email);

    const session1 = await createSession(
      userSession.id,
      userSession.email,
      userSession.refresh_token,
      userSession.user_agent,
      userSession.client_ip,
      userSession.expires_at
    );

    const session2 = await getSession(session1.id);

    expect(session2).toHaveProperty("email", userSession.email);
    expect(session2).toHaveProperty("refresh_token", userSession.refresh_token);
    expect(session2).toHaveProperty("user_agent", userSession.user_agent);
    expect(session2).toHaveProperty("client_ip", userSession.client_ip);
    expect(session2).toHaveProperty("expires_at", userSession.expires_at);

    expect(session2.id).toBeTruthy();
    expect(session2.created_at).toBeTruthy();
  });

  it("should throw an error if the session does not exist", async () => {
    await expect(getSession("invalid")).rejects.toThrowError();
  });
});
