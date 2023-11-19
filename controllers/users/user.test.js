import JWT from "jsonwebtoken";
import { jest, describe, test, expect, beforeEach } from "@jest/globals";

import { loginUser, signupUser } from "#controllers/users/index.js";
import User from "#models/user.js";

beforeEach(() => {
  jest.clearAllMocks();
});

const response = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

const next = jest.fn();

jest.mock("#models/user.js");
jest.mock("jsonwebtoken");

describe("loginUser controller test", () => {
  test("user not found or invalid password", async () => {
    const email = "example@example.com";
    const password = "examplePassword-1234";
    const subscription = "starter";

    const request = {
      body: {
        email,
        password,
      },
    };

    jest.mock("#validation/index.js");

    User.findOne.mockResolvedValue({
      id: "abcd1234",
      email,
      password: "anotherPassword-1234",
      subscription,
      avatar: "avatar-abcd1234.jpg",
      token: null,
      validPassword: jest.fn(async (password) => false),
      save: jest.fn(),
    });

    await loginUser(request, response, next);

    expect(response.status).toHaveBeenCalledWith(401);
    expect(response.json).toHaveBeenCalledWith({
      status: "Unauthorized",
      code: 401,
      message: "Email or password is wrong",
    });
  });

  test("should return an error when invalid data is provided", async () => {
    const email = "example@example";
    const password = "examplePassword-1234";

    const request = {
      body: {
        email,
        password,
      },
    };

    await loginUser(request, response, next);

    expect(response.status).toHaveBeenCalledWith(400);
    expect(response.json).toHaveBeenCalledWith({
      status: "Bad Request",
      code: 400,
      message: '"email" must be a valid email',
    });
  });

  test("Json with user email, subscription and token, and status code 200.", async () => {
    const email = "example@example.com";
    const password = "examplePassword-1234";
    const token = "an.example.user.token";
    const subscription = "starter";

    const request = {
      body: {
        email,
        password,
      },
    };

    User.findOne.mockResolvedValue({
      id: "abcd1234",
      email,
      password,
      subscription,
      avatar: "avatar-abcd1234.jpg",
      token: null,
      validPassword: jest.fn(async (password) => true),
      save: jest.fn(),
    });

    JWT.sign.mockResolvedValue(token);

    await loginUser(request, response, next);

    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.json).toHaveBeenCalledWith({
      status: "OK",
      code: 200,
      token,
      user: {
        email,
        subscription,
      },
    });
  });
});

describe("signupUser controller test", () => {
  test("Json with user email, subscription, and status code 201.", async () => {
    const email = "another@example.com";
    const password = "examplePassword-1234";
    const subscription = "starter";

    const request = {
      body: {
        email,
        password,
      },
    };

    User.mockResolvedValue({
      subscription: "starter",
      setAvatar: jest.fn(),
      setPassword: jest.fn(),
      save: jest.fn(),
    });
    User.findOne.mockResolvedValue(null);

    await signupUser(request, response, next);

    expect(response.status).toHaveBeenCalledWith(201);
    expect(response.json).toHaveBeenCalledWith({
      status: "Created",
      code: 201,
      data: { email, subscription },
    });
  });
});
