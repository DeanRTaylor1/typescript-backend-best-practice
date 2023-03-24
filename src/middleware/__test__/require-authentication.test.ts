import { NotAuthorizedError } from "../../errors/not-authorized-error";
import { requireAuth } from "../require-authentication";

const mockRequest = () => {
  const req: any = {};
  req.headers = {
    authorization: "Bearer abc123",
  };
  req.currentUser = undefined;
  return req;
};

const mockResponse = () => {
  const res: any = {};
  res.send = jest.fn().mockReturnValue(res);
  res.status = jest.fn().mockReturnValue(res);
  return res;
};

describe("require authentication middleware", () => {
  it("throws an error if no currentUser is present", async () => {
    const req = mockRequest();

    const res = mockResponse();
    const next = jest.fn();

    await expect(() => requireAuth(req, res, next)).toThrowError(
      NotAuthorizedError
    );
    expect(next).not.toHaveBeenCalled();
  });

  it("calls next if currentUser is present", async () => {
    const req = mockRequest();

    const res = mockResponse();
    const next = jest.fn();
    req.currentUser = "valid";
    await requireAuth(req, res, next);
    expect(next).toHaveBeenCalled();
  });
});
