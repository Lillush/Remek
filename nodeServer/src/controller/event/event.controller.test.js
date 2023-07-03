const { mockRequest, mockResponse } = require("jest-mock-req-res");
const createError = require("http-errors");
const eventController = require("./event.controller");
const eventService = require("./event.service.js");
jest.mock("./event.service.js");

describe("Unit tests for eventController", () => {
  let mockData;
  let nextFunction;
  let response;

  beforeEach(() => {
    mockData = [
      {
        id: 1,
        title: "Pubg Masters 2023",
        description: "A big event for PUBG",
        game: "PUBG",
        type: "ONLINE",
        startDate: "2023/05/05",
        eventPage: "www.eventpage.com",
      },
      {
        id: 2,
        title: "CS:GO Major 2023",
        description: "The last Major in history",
        game: "CS:GO",
        type: "LAN",
        startDate: "2023/06/10",
        eventPage: "www.csmajor.com",
      },
      {
        id: 3,
        title: "LEC finals 2023",
        description: "The biggest LOL championship",
        game: "LOL",
        type: "LAN",
        startDate: "2023/05/25",
        eventPage: "www.lec.com",
      },
    ];

    eventService.__setMockData(mockData);
    nextFunction = jest.fn();
    response = mockResponse();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("create() test: should create a new event and return it", async () => {
    const validSavedEvent = {
      id: mockData[mockData.length - 1].id + 1,
      title: "Test Event",
      description: "A big event for Testing",
      game: "PUBG",
      type: "ONLINE",
      startDate: "2023/04/15",
      eventPage: "www.test.com",
    };

    const request = mockRequest({
      body: {
        title: validSavedEvent.title,
        description: validSavedEvent.description,
        game: validSavedEvent.game,
        type: validSavedEvent.type,
        startDate: validSavedEvent.startDate,
        eventPage: validSavedEvent.eventPage,
      },
    });

    const saveObj = {
      title: validSavedEvent.title,
      description: validSavedEvent.description,
      game: validSavedEvent.game,
      type: validSavedEvent.type,
      startDate: validSavedEvent.startDate,
      eventPage: validSavedEvent.eventPage,
    };

    await eventController.create(request, response, nextFunction);

    expect(eventService.create).toBeCalledWith(saveObj);
    expect(nextFunction).not.toBeCalled();
    expect(response.json).toBeCalledTimes(1);
    expect(response.status).toBeCalledWith(201);
    expect(response.json).toBeCalledWith(validSavedEvent);
  });

  test("findById() with valid ID", () => {
    const validEventId = 3;

    const request = mockRequest({
      params: {
        id: validEventId,
      },
    });

    return eventController
      .findById(request, response, nextFunction)
      .then(() => {
        expect(eventService.findById).toBeCalledWith(validEventId);
        expect(eventService.findById).toBeCalledTimes(1);
        expect(response.json).toBeCalledWith(
          mockData.find((p) => p.id === validEventId)
        );
      });
  });

  test("findById() with invalid ID", async () => {
    const invalidEventId = 7;

    const request = mockRequest({
      params: {
        id: invalidEventId,
      },
    });

    await eventController.findById(request, response, nextFunction);
    expect(eventService.findById).toBeCalledWith(invalidEventId);
    expect(eventService.findById).toBeCalledTimes(1);
    expect(response.json).not.toBeCalled();
    expect(nextFunction).toBeCalledWith(
      new createError.NotFound(`Event with ${invalidEventId} was not found!`)
    );
  });

  test("findAll(): should return the whole db", async () => {
    const allEvents = await eventService.findAll();

    expect(allEvents).toHaveLength(mockData.length);
    expect(allEvents).toEqual(mockData);
  });

  test("Delete a event successfully", async () => {
    const idToDelete = 1;
    const deletedEvent = {
      id: idToDelete,
      title: "Pubg Masters 2023",
      description: "A big event for PUBG",
      game: "PUBG",
      type: "ONLINE",
      startDate: "2023/05/05",
      eventPage: "www.eventpage.com",
    };

    const deletedEventResponse = await eventService.delete(idToDelete);

    expect(deletedEventResponse).toEqual({});
    expect(mockData).not.toContainEqual(deletedEvent);
  });

  test("Delete a event with an invalid id", async () => {
    const invalidId = 999;

    const result = await eventService.delete(invalidId);

    expect(result).toBeNull();
    expect(mockData).toHaveLength(3);
  });
});
