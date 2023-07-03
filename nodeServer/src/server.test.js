const app = require("./server");
const mongoose = require("mongoose");
const supertest = require("supertest");
const bcrypt = require("bcryptjs");
const User = require("./models/user.model");
const Stream = require("./models/stream.model");
const Event = require("./models/event.model");
const Article = require("./models/article.model");
const config = require("config");

describe("REST API integration tests", () => {
  let ACCESS_TOKEN;
  let REFRESH_TOKEN;

  const insertUsers = [
    {
      firstName: "John",
      lastName: "Test",
      nickName: "johntest",
      email: "john@test.com",
      password: "userpw",
      isStreamer: "false",
      role: "user",
    },
    {
      firstName: "Jane",
      lastName: "Doe",
      nickName: "janedoe",
      email: "jane@test.com",
      password: "userpw",
      isStreamer: "false",
      role: "user",
    },
    {
      firstName: "Kiss",
      lastName: "Pista",
      nickName: "kisspista",
      email: "admin@test.com",
      password: "adminpw",
      isStreamer: "false",
      role: "ADMIN",
    },
  ];

  const insertEvents = [
    {
      title: "esport event 1",
      description: "This is an eSport event",
      game: "PUBG",
      type: "ONLINE",
      startDate: "2023/06/01",
      eventPage: "www.eventpage.com",
    },
    {
      title: "esport event 2",
      description: "This is an other eSport event",
      game: "CS:GO",
      type: "LAN",
      startDate: "2023/05/28",
      eventPage: "www.eventpage2.com",
    },
    {
      title: "esport event 3",
      description: "This is a Valorant eSport event",
      game: "VALORANT",
      type: "ONLINE",
      startDate: "2023/10/01",
      eventPage: "www.eventpage3.com",
    },
  ];

  const insertArticles = [
    {
      title: "This is an article",
      category: "PUBG",
      short: "This is an article about PUBG video game",
      article1: "This is the first paragraph",
      article2: "This is the second paragraph",
      article3: "This is the third paragraph",
      postImg: "www.image.com/picture.jpg",
      mainImg: "www.image.com/picture.jpg",
      lead: true,
      postDate: "2023/05/02",
    },
    {
      title: "This is an other article",
      category: "CS:GO",
      short: "This is an article about CS:GO video game",
      article1: "This is the first paragraph",
      article2: "This is the second paragraph",
      article3: "This is the third paragraph",
      postImg: "www.image.com/picture.jpg",
      mainImg: "www.image.com/picture.jpg",
      lead: false,
      postDate: "2023/06/02",
    },
    {
      title: "This is an article",
      category: "LOL",
      short: "This is an article about LOL video game",
      article1: "This is the first paragraph",
      article2: "This is the second paragraph",
      postImg: "www.image.com/picture.jpg",
      mainImg: "www.image.com/picture.jpg",
      lead: false,
      postDate: "2023/05/10",
    },
  ];

  const insertStreams = [
    {
      title: "This is a stream",
      game: "EFT",
      startDate: "2023/04/25",
      streamLink: "www.link.com/user",
    },
    {
      title: "This is an other stream",
      game: "LOL",
      startDate: "2023/04/26",
      streamLink: "www.link.com/user2",
    },
    {
      title: "This is a GAME stream",
      game: "VALORANT",
      startDate: "2023/04/27",
      streamLink: "www.link.com/user3",
    },
  ];

  beforeEach(async () => {
    await mongoose.connect("mongodb://127.0.0.1:27017/SuperTestDB");
    console.log("MongoDB connection established!");
  });

  afterEach(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close();
    console.log("MongoDB connection closed.");
  });

  // Tests for /users endpoint

  test("GET /api/users endpoint return list", async () => {
    await User.insertMany(insertUsers);

    const response = await supertest(app).get("/api/users");

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body.length).toBe(insertUsers.length);
  });

  test("GET /api/users/:id endpoint", async () => {
    const testUserDb = await User.insertMany(insertUsers);
    const firstUserId = testUserDb[0]._id;
    const response = await supertest(app)
      .get(`/api/users/${firstUserId.toString()}`)
      .expect(200);

    expect(response.body._id).toBe(firstUserId.toString());
    expect(response.body.firstName).toBe(testUserDb[0].firstName);
    expect(response.body.lastName).toBe(testUserDb[0].lastName);
    expect(response.body.email).toBe(testUserDb[0].email);
  });

  test("GET /api/users/:id endpoint with invalid id", async () => {
    await User.insertMany(insertUsers);
    const INVALID_EVENT_ID = "1234";

    const response = await supertest(app)
      .get(`/api/users/${INVALID_EVENT_ID}`)
      .expect(400);

    expect(response.body.hasError).toBe(true);
    expect(response.body.message).toBe(`Invalid ObjectID: ${INVALID_EVENT_ID}`);
  });

  test("POST /api/users endpoint test", async () => {
    const postData = {
      firstName: "Piros",
      lastName: "Lenke",
      nickName: "Pille",
      email: "pl@test.com",
      password: "userpw",
      isStreamer: false,
      role: "user",
    };
    const resp = await supertest(app).post(`/api/users`).send(postData);
    expect(resp.statusCode).toBe(200);
    expect(resp.body._id).toBeTruthy();
    expect(resp.body.firstName).toBe(postData.firstName);
    expect(resp.body.lastName).toBe(postData.lastName);
    expect(resp.body.nickName).toBe(postData.nickName);
    expect(resp.body.email).toBe(postData.email);
    expect(resp.body.password).toBe(postData.password);
    expect(resp.body.isStreamer).toBe(postData.isStreamer);
    expect(resp.body.role).toBe(postData.role);
  });

  test("PUT /api/users/:id endpoint test", async () => {
    const testUsertDb = await User.insertMany(insertUsers);
    const firstUserId = testUsertDb[1]._id;
    const updatedUser = {
      firstName: "Jane",
      lastName: "DoeDoe",
      nickName: "janedoe",
      email: "jane@test.com",
      password: "userpw",
      isStreamer: "false",
      role: "user",
    };

    const resp = await supertest(app)
      .put(`/api/users/${firstUserId}`)
      .send(updatedUser);
    expect(resp.statusCode).toBe(200);
    expect(resp.body._id).toBeTruthy();
  });

  test("DELETE /api/users/:id endpoint test", async () => {
    await User.insertMany(insertUsers);
    await supertest(app).post("/api/users").send({
      firstName: "Jane",
      lastName: "DoeDoe",
      nickName: "janedoe",
      email: "jane@test.com",
      password: "userpw",
      isStreamer: "false",
      role: "ADMIN",
    });
    const db = await supertest(app).get("/api/users");

    await supertest(app)
      .post("/api/login")
      .send({
        email: "jane@test.com",
        password: "userpw",
      })
      .then((res) => {
        ACCESS_TOKEN = res.body.accessToken;
      });

    const deletedUserId = db.body[0]._id;

    const resp = await supertest(app)
      .delete(`/api/users/${deletedUserId}`)
      .set("Authorization", `Bearer ${ACCESS_TOKEN}`);

    expect(resp.body).toEqual({});
  });

  // Tests for /events endpoint

  test("GET /api/events endpoint return list", async () => {
    await Event.insertMany(insertEvents);

    const response = await supertest(app).get("/api/events");

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body.length).toBe(insertUsers.length);
  });

  test("GET /api/events/:id endpoint", async () => {
    const testEventDb = await Event.insertMany(insertEvents);
    const firstEventId = testEventDb[0]._id;
    const response = await supertest(app)
      .get(`/api/events/${firstEventId.toString()}`)
      .expect(200);

    expect(response.body._id).toBe(firstEventId.toString());
    expect(response.body.title).toBe(testEventDb[0].title);
    expect(response.body.description).toBe(testEventDb[0].description);
    expect(response.body.game).toBe(testEventDb[0].game);
  });

  test("GET /api/events/:id endpoint with invalid id", async () => {
    await Event.insertMany(insertEvents);
    const INVALID_EVENT_ID = "1234";

    const response = await supertest(app)
      .get(`/api/events/${INVALID_EVENT_ID}`)
      .expect(400);

    expect(response.body.hasError).toBe(true);
    expect(response.body.message).toBe(`Invalid ObjectID: ${INVALID_EVENT_ID}`);
  });

  test("POST /api/events endpoint test", async () => {
    const postData = {
      title: "esport test event",
      description: "This is a test eSport event",
      game: "LOL",
      type: "LAN",
      startDate: "2023/08/01",
      eventPage: "www.eventpagetest.com",
    };
    const resp = await supertest(app).post(`/api/events`).send(postData);
    expect(resp.statusCode).toBe(201);
    expect(resp.body._id).toBeTruthy();
    expect(resp.body.title).toBe(postData.title);
    expect(resp.body.description).toBe(postData.description);
    expect(resp.body.game).toBe(postData.game);
    expect(resp.body.type).toBe(postData.type);
    expect(resp.body.eventPage).toBe(postData.eventPage);
  });

  test("PUT /api/events/:id endpoint test", async () => {
    const testEventDb = await Event.insertMany(insertEvents);
    const firstEventId = testEventDb[1]._id;
    const updatedEvent = {
      title: "esport event 2",
      description: "This is an other eSport event",
      game: "CS:GO",
      type: "ONLINE",
      startDate: "2023/05/28",
      eventPage: "www.eventpage2.com",
    };

    const resp = await supertest(app)
      .put(`/api/events/${firstEventId}`)
      .send(updatedEvent);
    expect(resp.statusCode).toBe(200);
    expect(resp.body._id).toBeTruthy();
  });

  test("DELETE /api/events/:id endpoint test", async () => {
    const testEventDb = await Event.insertMany(insertEvents);
    await supertest(app).post("/api/users").send({
      firstName: "Jane",
      lastName: "Doe",
      nickName: "admin",
      email: "admin@test.com",
      password: "adminpw",
      isStreamer: "false",
      role: "ADMIN",
    });
    const db = await supertest(app).get("/api/events");

    await supertest(app)
      .post("/api/login")
      .send({
        email: "admin@test.com",
        password: "adminpw",
      })
      .then((res) => {
        ACCESS_TOKEN = res.body.accessToken;
      });

    const deletedEventId = db.body[0]._id;

    const resp = await supertest(app)
      .delete(`/api/events/${deletedEventId}`)
      .set("Authorization", `Bearer ${ACCESS_TOKEN}`);

    expect(resp.body).toEqual({});
  });

  //Tests for /articles endpoint

  test("GET /api/articles endpoint return list", async () => {
    await Article.insertMany(insertArticles);

    const response = await supertest(app).get("/api/articles");

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body.length).toBe(insertArticles.length);
  });

  test("GET /api/articles/:id endpoint", async () => {
    const testArticlesDb = await Article.insertMany(insertArticles);
    const firstArticleId = testArticlesDb[0]._id;
    const response = await supertest(app)
      .get(`/api/articles/${firstArticleId.toString()}`)
      .expect(200);

    expect(response.body._id).toBe(testArticlesDb[0]._id.toString());
    expect(response.body.title).toBe(testArticlesDb[0].title);
    expect(response.body.category).toBe(testArticlesDb[0].category);
    expect(response.body.short).toBe(testArticlesDb[0].short);
  });

  test("GET /api/articles/:id endpoint with invalid id", async () => {
    await Article.insertMany(insertArticles);
    const INVALID_ARTICLE_ID = "1234";

    const response = await supertest(app)
      .get(`/api/events/${INVALID_ARTICLE_ID}`)
      .expect(400);

    expect(response.body.hasError).toBe(true);
    expect(response.body.message).toBe(
      `Invalid ObjectID: ${INVALID_ARTICLE_ID}`
    );
  });

  test("POST /api/articles endpoint test", async () => {
    const postData = {
      title: "This is a test article",
      category: "EFT",
      short: "This is a test article about EFT video game",
      article1: "This is the first paragraph",
      article2: "This is the second paragraph",
      postImg: "www.image.com/picture.jpg",
      mainImg: "www.image.com/picture.jpg",
      lead: false,
      postDate: "2023/05/11",
    };
    const resp = await supertest(app).post(`/api/articles`).send(postData);
    expect(resp.statusCode).toBe(201);
    expect(resp.body._id).toBeTruthy();
    expect(resp.body.title).toBe(postData.title);
    expect(resp.body.category).toBe(postData.category);
    expect(resp.body.short).toBe(postData.short);
    expect(resp.body.article1).toBe(postData.article1);
    expect(resp.body.article2).toBe(postData.article2);
    expect(resp.body.postImg).toBe(postData.postImg);
  });

  test("PUT /api/articles/:id endpoint test", async () => {
    const testArticleDb = await Article.insertMany(insertArticles);
    const firstArticleId = testArticleDb[2]._id;
    const updatedArticle = {
      title: "This is an article",
      category: "LOL",
      short: "This is an article about LOL video game",
      article1: "This is the first paragraph",
      article2: "This is the second modified paragraph",
      postImg: "www.image.com/picture.jpg",
      mainImg: "www.image.com/picture.jpg",
      lead: true,
      postDate: "2023/05/10",
    };

    const resp = await supertest(app)
      .put(`/api/articles/${firstArticleId}`)
      .send(updatedArticle);
    expect(resp.statusCode).toBe(200);
    expect(resp.body._id).toBeTruthy();
  });

  test("DELETE /api/articles/:id endpoint test", async () => {
    const testArticleDb = await Article.insertMany(insertArticles);
    await supertest(app).post("/api/users").send({
      firstName: "Jane",
      lastName: "Doe",
      nickName: "admin",
      email: "admin@test.com",
      password: "adminpw",
      isStreamer: "false",
      role: "ADMIN",
    });
    const db = await supertest(app).get("/api/articles");

    await supertest(app)
      .post("/api/login")
      .send({
        email: "admin@test.com",
        password: "adminpw",
      })
      .then((res) => {
        ACCESS_TOKEN = res.body.accessToken;
      });

    const deletedArticleId = db.body[0]._id;

    const resp = await supertest(app)
      .delete(`/api/events/${deletedArticleId}`)
      .set("Authorization", `Bearer ${ACCESS_TOKEN}`);

    expect(resp.body).toEqual({});
  });

  // Tests for /streams endpoint

  test("GET /api/streams endpoint return list", async () => {
    await Stream.insertMany(insertStreams);
    await supertest(app).post("/api/users").send({
      firstName: "Jane",
      lastName: "Doe",
      nickName: "admin",
      email: "admin@test.com",
      password: "adminpw",
      isStreamer: "false",
      role: "ADMIN",
    });

    await supertest(app)
      .post("/api/login")
      .send({
        email: "admin@test.com",
        password: "adminpw",
      })
      .then((res) => {
        ACCESS_TOKEN = res.body.accessToken;
      });
    const response = await supertest(app)
      .get("/api/streams")
      .set("Authorization", `Bearer ${ACCESS_TOKEN}`);

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body.length).toBe(insertStreams.length);
  });

  test("GET /api/streams/:id endpoint", async () => {
    await Stream.insertMany(insertStreams);
    await supertest(app).post("/api/users").send({
      firstName: "Jane",
      lastName: "Doe",
      nickName: "admin",
      email: "admin@test.com",
      password: "adminpw",
      isStreamer: "false",
      role: "ADMIN",
    });

    await supertest(app)
      .post("/api/login")
      .send({
        email: "admin@test.com",
        password: "adminpw",
      })
      .then((res) => {
        ACCESS_TOKEN = res.body.accessToken;
      });
    const db = await supertest(app)
      .get("/api/streams")
      .set("Authorization", `Bearer ${ACCESS_TOKEN}`);

    const firstStreamId = db.body[0]._id;
    const response = await supertest(app)
      .get(`/api/streams/${firstStreamId.toString()}`)
      .set("Authorization", `Bearer ${ACCESS_TOKEN}`)
      .expect(200);

    expect(response.body._id).toBe(firstStreamId.toString());
    expect(response.body.title).toBe(db.body[0].title);
    expect(response.body.game).toBe(db.body[0].game);
  });

  test("GET /api/streams/:id endpoint with invalid id", async () => {
    await Stream.insertMany(insertStreams);
    const INVALID_STREAM_ID = "1234";

    const response = await supertest(app)
      .get(`/api/events/${INVALID_STREAM_ID}`)
      .expect(400);

    expect(response.body.hasError).toBe(true);
    expect(response.body.message).toBe(
      `Invalid ObjectID: ${INVALID_STREAM_ID}`
    );
  });

  test("POST /api/streams endpoint test", async () => {
    await Stream.insertMany(insertStreams);
    await supertest(app).post("/api/users").send({
      firstName: "Jane",
      lastName: "Doe",
      nickName: "admin",
      email: "admin@test.com",
      password: "adminpw",
      isStreamer: "false",
      role: "ADMIN",
    });

    await supertest(app)
      .post("/api/login")
      .send({
        email: "admin@test.com",
        password: "adminpw",
      })
      .then((res) => {
        ACCESS_TOKEN = res.body.accessToken;
      });
    const db = await supertest(app)
      .get("/api/streams")
      .set("Authorization", `Bearer ${ACCESS_TOKEN}`);

    const postData = {
      title: "This is a test GAME stream",
      game: "LOL",
      startDate: "2023/04/28",
      streamLink: "www.link.com/user4",
    };
    const resp = await supertest(app)
      .post(`/api/streams`)
      .send(postData)
      .set("Authorization", `Bearer ${ACCESS_TOKEN}`);

    expect(resp.statusCode).toBe(201);
    expect(resp.body._id).toBeTruthy();
    expect(resp.body.title).toBe(postData.title);
    expect(resp.body.game).toBe(postData.game);
    expect(resp.body.streamLink).toBe(postData.streamLink);
  });

  test("PUT /api/streams/:id endpoint test", async () => {
    await Stream.insertMany(insertStreams);
    await supertest(app).post("/api/users").send({
      firstName: "Jane",
      lastName: "Doe",
      nickName: "admin",
      email: "admin@test.com",
      password: "adminpw",
      isStreamer: "false",
      role: "ADMIN",
    });

    await supertest(app)
      .post("/api/login")
      .send({
        email: "admin@test.com",
        password: "adminpw",
      })
      .then((res) => {
        ACCESS_TOKEN = res.body.accessToken;
      });
    const db = await supertest(app)
      .get("/api/streams")
      .set("Authorization", `Bearer ${ACCESS_TOKEN}`);

    const firstStreamId = db.body[1]._id;
    const updatedStream = {
      title: "This is an other stream",
      game: "PUBG",
      startDate: "2023/04/26",
      streamLink: "www.link.com/user2",
    };

    const resp = await supertest(app)
      .put(`/api/streams/${firstStreamId}`)
      .send(updatedStream)
      .set("Authorization", `Bearer ${ACCESS_TOKEN}`);
    expect(resp.statusCode).toBe(200);
    expect(resp.body._id).toBeTruthy();
  });

  test("DELETE /api/streams/:id endpoint test", async () => {
    const testStreamDb = await Stream.insertMany(insertStreams);
    await supertest(app).post("/api/users").send({
      firstName: "Jane",
      lastName: "Doe",
      nickName: "admin",
      email: "admin@test.com",
      password: "adminpw",
      isStreamer: "false",
      role: "ADMIN",
    });

    await supertest(app)
      .post("/api/login")
      .send({
        email: "admin@test.com",
        password: "adminpw",
      })
      .then((res) => {
        ACCESS_TOKEN = res.body.accessToken;
      });

    const db = await supertest(app)
      .get("/api/streams")
      .set("Authorization", `Bearer ${ACCESS_TOKEN}`);

    const deletedStreamId = db.body[0]._id;

    const resp = await supertest(app)
      .delete(`/api/events/${deletedStreamId}`)
      .set("Authorization", `Bearer ${ACCESS_TOKEN}`);

    expect(resp.body).toEqual({});
  });
});
