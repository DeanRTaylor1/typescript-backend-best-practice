import { currentUser } from "../current-user";
import { NotAuthorizedError } from "../../errors/not-authorized-error";
import { payload, verifyToken } from "@src/util/paseto";

jest.mock("@src/util/paseto", () => ({
  verifyToken: jest.fn(),
}));

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

const mockNext = jest.fn();

describe("currentUser middleware", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should set currentUser on the request object if token is valid", async () => {
    const mockReq = mockRequest();
    const mockRes = mockResponse();
    const mockPayload: payload = {
      id: 1,
      username: "123",
      email: "test@example.com",
      issued_at: 123,
      expires_at: 12345,
    };
    (verifyToken as jest.MockedFunction<typeof verifyToken>).mockResolvedValue(
      mockPayload
    );

    await currentUser(mockReq, mockRes, mockNext);

    expect(mockReq.currentUser).toEqual(mockPayload);
    expect(mockNext).toHaveBeenCalled();
  });

  it("should throw NotAuthorizedError if authorization header is not present", async () => {
    const mockReq = mockRequest();
    mockReq.headers.authorization = undefined;
    const mockRes = mockResponse();
    const mockNext = jest.fn();

    await expect(currentUser(mockReq, mockRes, mockNext)).rejects.toThrow(
      NotAuthorizedError
    );
    expect(mockNext).not.toHaveBeenCalled();
  });

  it("should throw NotAuthorizedError if authorization header does not start with Bearer", async () => {
    const mockReq = mockRequest();
    mockReq.headers.authorization = "Basic abc123";
    const mockRes = mockResponse();
    const mockNext = jest.fn();
    await expect(currentUser(mockReq, mockRes, mockNext)).rejects.toThrow(
      NotAuthorizedError
    );
    expect(mockNext).not.toHaveBeenCalled();
  });

  it("should throw NotAuthorizedError if token verification fails", async () => {
    const mockReq = mockRequest();
    const mockRes = mockResponse();
    const mockNext = jest.fn();
    (verifyToken as jest.MockedFunction<typeof verifyToken>).mockResolvedValue(
      ""
    );

    await expect(currentUser(mockReq, mockRes, mockNext)).rejects.toThrow(
      NotAuthorizedError
    );
    expect(mockNext).not.toHaveBeenCalled();
  });
});
