const { mockRequest, mockResponse } = require("jest-mock-req-res");
const createError = require("http-errors");
const userController = require("./user.controller");
const userService = require("./user.service.js");
jest.mock("./user.service.js");

describe("Unit tests for userController", () => {
  let mockData;
  let nextFunction;
  let response;

  beforeEach(() => {
    mockData = [
      {
        id: 1,
        firstName: "Baba",
        lastName: "Kicsi",
        nickName: "BaKi",
        email: "baki@mail.com",
        password: "1234",
        isStreamer: false,
        role: "user",
      },
      {
        id: 2,
        firstName: "Beni",
        lastName: "Nagy",
        nickName: "BeNa",
        email: "bena@mail.com",
        password: "2345",
        isStreamer: false,
        role: "user",
      },
      {
        id: 3,
        firstName: "Bangyi",
        lastName: "Behemot",
        nickName: "BaBe",
        email: "babe@mail.com",
        password: "3456",
        isStreamer: true,
        role: "streamer",
        mainGame: "PUBG",
        streamSite: "www.twitch.tw/babe",
        profilePic: "http://dummyimage.com/174x100.png/ff4444/ffffff",
        streams: [{}],
      },
    ];

    userService.__setMockData(mockData);
    nextFunction = jest.fn();
    response = mockResponse();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("create() test: should create a new user and return it", async () => {
    const validSavedUser = {
      id: mockData[mockData.length - 1].id + 1,
      firstName: "test",
      lastName: "Test",
      nickName: "tete",
      email: "tete@mail.com",
      password: "5678",
      isStreamer: false,
      role: "user",
    };

    const request = mockRequest({
      body: {
        "firstName": validSavedUser.firstName,
        "lastName": validSavedUser.lastName,
        "nickName": validSavedUser.nickName,
        "email": validSavedUser.email,
        "password": validSavedUser.password,
        "isStreamer": validSavedUser.isStreamer,
        "role": validSavedUser.role,
      },
    });

    const saveObj = {
      firstName: validSavedUser.firstName,
      lastName: validSavedUser.lastName,
      nickName: validSavedUser.nickName,
      email: validSavedUser.email,
      password: validSavedUser.password,
      isStreamer: validSavedUser.isStreamer,
      role: validSavedUser.role,
    };

    await userController.create(request, response, nextFunction);

    expect(userService.create).toBeCalledWith(saveObj);
    expect(nextFunction).not.toBeCalled();
    expect(response.json).toBeCalledTimes(1);
    expect(response.status).toBeCalledWith(201);
    expect(response.json).toBeCalledWith(validSavedUser);
  });

  test("findById() with valid ID", () => {
    const VALID_USER_ID = 3;

    const request = mockRequest({
      params: {
        id: VALID_USER_ID,
      },
    });

    return userController.findById(request, response, nextFunction).then(() => {
      expect(userService.findById).toBeCalledWith(VALID_USER_ID);
      expect(userService.findById).toBeCalledTimes(1);
      expect(response.json).toBeCalledWith(
        mockData.find((p) => p.id === VALID_USER_ID)
      );
    });
  });

  test("findById() with invalid ID", async () => {
    const INVALID_USER_ID = 7;

    const request = mockRequest({
      params: {
        id: INVALID_USER_ID,
      },
    });

    await userController.findById(request, response, nextFunction);
    expect(userService.findById).toBeCalledWith(INVALID_USER_ID);
    expect(userService.findById).toBeCalledTimes(1);
    expect(response.json).not.toBeCalled();
    expect(nextFunction).toBeCalledWith(
      new createError.NotFound(`User with ${INVALID_USER_ID} was not found!`)
    );
  });

  test("findAll(): should return the whole db", async () => {
    const allUsers = await userService.findAll();

    expect(allUsers).toHaveLength(mockData.length);
    expect(allUsers).toEqual(mockData);
  });

  test("Delete a user successfully", async () => {
    const idToDelete = 2;
    const deletedUser = {
      id: idToDelete,
      firstName: "Beni",
      lastName: "Nagy",
      nickName: "BeNa",
      email: "bena@mail.com",
      password: "2345",
      isStreamer: false,
      role: "user",
    };

    const deletedUserResponse = await userService.delete(idToDelete);

    expect(deletedUserResponse).toEqual({});
    expect(mockData).not.toContainEqual(deletedUser);
  });

  test("Delete a user with an invalid id", async () => {
    const invalidId = 999;

    const result = await userService.delete(invalidId);

    expect(result).toBeNull();
    expect(mockData).toHaveLength(3);
  });
});
