const { mockRequest, mockResponse } = require("jest-mock-req-res");
const createError = require("http-errors");
const articleController = require("./article.controller");
const articleService = require("./article.service.js");
jest.mock("./article.service.js");

describe("Unit tests for articleController", () => {
  let mockData;
  let nextFunction;
  let response;

  beforeEach(() => {
    mockData = [
      {
        id: 1,
        title: "Something really important gaming news!",
        category: "PUBG",
        short:
          "Lorem Ipsum is simply dummy text of the printing and article1setting industry.",
        article1:
          "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of article1 and scrambled it to make a article1 specimen book. It has survived not only five centuries, but also the leap into electronic article1setting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        article2:
          "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.",
        postImg:
          "https://dummyimage.com/?utm_content=cmp-true600x400/000111/fff.jpg",
        mainImg:
          "https://dummyimage.com/?utm_content=cmp-true600x400/111000/fff.jpg",
        lead: false,
        postDate: "2023/04/13",
      },
      {
        id: 2,
        title: "Something really important gaming news!",
        category: "CS:GO",
        short:
          "Lorem Ipsum is simply dummy text of the printing and article1setting industry.",
        article1:
          "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of article1 and scrambled it to make a article1 specimen book. It has survived not only five centuries, but also the leap into electronic article1setting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        article2:
          "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.",
        postImg:
          "https://dummyimage.com/?utm_content=cmp-true600x400/000111/fff.jpg",
        mainImg:
          "https://dummyimage.com/?utm_content=cmp-true600x400/111000/fff.jpg",
        lead: true,
        postDate: "2023/04/12",
      },
      {
        id: 3,
        title: "Something really important gaming news!",
        category: "LOL",
        short:
          "Lorem Ipsum is simply dummy text of the printing and article1setting industry.",
        article1:
          "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of article1 and scrambled it to make a article1 specimen book. It has survived not only five centuries, but also the leap into electronic article1setting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        article2:
          "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.",
        postImg:
          "https://dummyimage.com/?utm_content=cmp-true600x400/000111/fff.jpg",
        mainImg:
          "https://dummyimage.com/?utm_content=cmp-true600x400/111000/fff.jpg",
        lead: false,
        postDate: "2023/04/11",
      },
    ];

    articleService.__setMockData(mockData);
    nextFunction = jest.fn();
    response = mockResponse();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("create() test: should create a new article and return it", async () => {
    const validSavedArticle = {
      id: mockData[mockData.length - 1].id + 1,
      title: "Test Article",
      category: "EFT",
      short: "Test Short",
      article1:
        "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of article1 and scrambled it to make a article1 specimen book. It has survived not only five centuries, but also the leap into electronic article1setting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      article2:
        "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.",
      postImg:
        "https://dummyimage.com/?utm_content=cmp-true600x400/000111/fff.jpg",
      mainImg:
        "https://dummyimage.com/?utm_content=cmp-true600x400/111000/fff.jpg",
      lead: false,
      postDate: "2023/04/13",
    };

    const request = mockRequest({
      body: {
        title: validSavedArticle.title,
        category: validSavedArticle.category,
        short: validSavedArticle.short,
        article1: validSavedArticle.article1,
        article2: validSavedArticle.article2,
        postImg: validSavedArticle.postImg,
        mainImg: validSavedArticle.mainImg,
        lead: validSavedArticle.lead,
        postDate: validSavedArticle.postDate,
      },
    });

    const saveObj = {
      title: validSavedArticle.title,
      category: validSavedArticle.category,
      short: validSavedArticle.short,
      article1: validSavedArticle.article1,
      article2: validSavedArticle.article2,
      postImg: validSavedArticle.postImg,
      mainImg: validSavedArticle.mainImg,
      lead: validSavedArticle.lead,
      postDate: validSavedArticle.postDate,
    };

    await articleController.create(request, response, nextFunction);

    expect(articleService.create).toBeCalledWith(saveObj);
    expect(nextFunction).not.toBeCalled();
    expect(response.json).toBeCalledTimes(1);
    expect(response.status).toBeCalledWith(201);
    expect(response.json).toBeCalledWith(validSavedArticle);
  });

  test("findById() with valid ID", () => {
    const validArticleId = 3;

    const request = mockRequest({
      params: {
        id: validArticleId,
      },
    });

    return articleController
      .findById(request, response, nextFunction)
      .then(() => {
        expect(articleService.findById).toBeCalledWith(validArticleId);
        expect(articleService.findById).toBeCalledTimes(1);
        expect(response.json).toBeCalledWith(
          mockData.find((p) => p.id === validArticleId)
        );
      });
  });

  test("findById() with invalid ID", async () => {
    const invalidArticleId = 7;

    const request = mockRequest({
      params: {
        id: invalidArticleId,
      },
    });

    await articleController.findById(request, response, nextFunction);
    expect(articleService.findById).toBeCalledWith(invalidArticleId);
    expect(articleService.findById).toBeCalledTimes(1);
    expect(response.json).not.toBeCalled();
    expect(nextFunction).toBeCalledWith(
      new createError.NotFound(
        `Article with ${invalidArticleId} was not found!`
      )
    );
  });

  test("findAll(): should return the whole db", async () => {
    const allArticles = await articleService.findAll();

    expect(allArticles).toHaveLength(mockData.length);
    expect(allArticles).toEqual(mockData);
  });

  test("Delete a article successfully", async () => {
    const idToDelete = 1;
    const deletedArticle = {
      id: idToDelete,
      title: "Something really important gaming news!",
      category: "LOL",
      short:
        "Lorem Ipsum is simply dummy text of the printing and article1setting industry.",
      article1:
        "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of article1 and scrambled it to make a article1 specimen book. It has survived not only five centuries, but also the leap into electronic article1setting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      article2:
        "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.",
      postImg:
        "https://dummyimage.com/?utm_content=cmp-true600x400/000111/fff.jpg",
      mainImg:
        "https://dummyimage.com/?utm_content=cmp-true600x400/111000/fff.jpg",
      lead: false,
      postDate: "2023/04/11",
    };

    const deletedArticleResponse = await articleService.delete(idToDelete);
    console.log(deletedArticleResponse);
    expect(deletedArticleResponse).toEqual({});
    expect(mockData).not.toContainEqual(deletedArticle);
  });

  test("Delete a article with an invalid id", async () => {
    const invalidId = 999;

    const result = await articleService.delete(invalidId);

    expect(result).toBeNull();
    expect(mockData).toHaveLength(3);
  });
});
