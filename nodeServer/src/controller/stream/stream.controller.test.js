const { mockRequest, mockResponse } = require("jest-mock-req-res");
const createError = require("http-errors");
const streamController = require("./stream.controller");
const streamService = require("./stream.service.js");
jest.mock("./stream.service.js");

describe("Unit tests for streamController", () => {
  let mockData;
  let nextFunction;
  let response;

  beforeEach(() => {
    mockData = [
      {
        id: 1,
        title: "PewPewPew",
        game: "EFT",
        startDate: "2023/04/15",
        streamLink: "www.twitch.tv/baki",
        creator: "BaKi",
      },
      {
        id: 2,
        title: "Grind!",
        game: "PUBG",
        startDate: "2023/04/16",
        streamLink: "www.twitch.tv/bena",
        creator: "BeNa",
      },
      {
        id: 3,
        title: "Way To Immo",
        game: "VALORANT",
        startDate: "2023/04/17",
        streamLink: "www.twitch.tv/babe",
        creator: "BaBe",
      },
    ];

    streamService.__setMockData(mockData);
    nextFunction = jest.fn();
    response = mockResponse();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("create() test: should create a new stream and return it", async () => {
    const validSavedStream = {
      id: mockData[mockData.length - 1].id + 1,
      title: "TestTitle",
      game: "LOL",
      startDate: "2023/04/18",
      streamLink: "www.twitch.tv/test",
      creator: "test",
    };

    const request = mockRequest({
      body: {
        title: validSavedStream.title,
        game: validSavedStream.game,
        startDate: validSavedStream.startDate,
        streamLink: validSavedStream.streamLink,
        creator: validSavedStream.creator,
      },
    });

    const saveObj = {
      title: validSavedStream.title,
      game: validSavedStream.game,
      startDate: validSavedStream.startDate,
      streamLink: validSavedStream.streamLink,
      creator: validSavedStream.creator,
    };

    await streamController.create(request, response, nextFunction);

    expect(streamService.create).toBeCalledWith(saveObj);
    expect(nextFunction).not.toBeCalled();
    expect(response.json).toBeCalledTimes(1);
    expect(response.status).toBeCalledWith(201);
    expect(response.json).toBeCalledWith(validSavedStream);
  });

  test("findById() with valid ID", () => {
    const validStreamId = 3;

    const request = mockRequest({
      params: {
        id: validStreamId,
      },
    });

    return streamController
      .findById(request, response, nextFunction)
      .then(() => {
        expect(streamService.findById).toBeCalledWith(validStreamId);
        expect(streamService.findById).toBeCalledTimes(1);
        expect(response.json).toBeCalledWith(
          mockData.find((p) => p.id === validStreamId)
        );
      });
  });

  test("findById() with invalid ID", async () => {
    const inValidStreamId = 7;

    const request = mockRequest({
      params: {
        id: inValidStreamId,
      },
    });

    await streamController.findById(request, response, nextFunction);
    expect(streamService.findById).toBeCalledWith(inValidStreamId);
    expect(streamService.findById).toBeCalledTimes(1);
    expect(response.json).not.toBeCalled();
    expect(nextFunction).toBeCalledWith(
      new createError.NotFound(`Stream with ${inValidStreamId} was not found!`)
    );
  });

  test("findAll(): should return the whole db", async () => {
    const allStreams = await streamService.findAll();

    expect(allStreams).toHaveLength(mockData.length);
    expect(allStreams).toEqual(mockData);
  });

  test("Delete a stream successfully", async () => {
    const idToDelete = 3;
    const deletedStream = {
      id: idToDelete,
      title: "Way To Immo",
      game: "VALORANT",
      startDate: "2023/04/17",
      streamLink: "www.twitch.tv/babe",
      creator: "BaBe",
    };

    const deletedStreamResponse = await streamService.delete(idToDelete);

    expect(deletedStreamResponse).toEqual({});
    expect(mockData).not.toContainEqual(deletedStream);
  });

  test("Delete a stream with an invalid id", async () => {
    const invalidId = 999;

    const result = await streamService.delete(invalidId);

    expect(result).toBeNull();
    expect(mockData).toHaveLength(3);
  });
});
