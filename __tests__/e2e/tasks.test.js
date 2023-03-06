const request = require("supertest");
const jwt = require("jsonwebtoken");
const app = require("../../src/app");
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");
const User = require("../../src/models/User");

describe("TaskController", () => {
  let authToken;
  let user;
  let mongoServer;
  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
    // create a user and authenticate it
    user = await User.create({
      name: "John Doe",
      email: "john@example.com",
      password: "123456",
    });
    authToken = jwt.sign({ sub: user._id }, process.env.JWT_SECRET);
  });

  afterAll(async () => {
    // remove the created user
    await User.deleteOne({ _id: user._id });
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  describe("POST /tasks", () => {
    it("should create a new task", async () => {
      const res = await request(app)
        .post("/tasks")
        .set("Authorization", `Bearer ${authToken}`)
        .send({
          title: "Task 1",
          description: "Description for task 1",
          done: false,
        })
        .expect(200);

      expect(res.body.title).toBe("Task 1");
      expect(res.body.description).toBe("Description for task 1");
      expect(res.body.done).toBe(false);
      expect(res.body.user_id).toBe(user._id.toString());
      expect(res.body.user_name).toBe(user.name);
    });

    it("should return an error if title is not provided", async () => {
      const res = await request(app)
        .post("/tasks")
        .set("Authorization", `Bearer ${authToken}`)
        .send({
          description: "Description for task 2",
          done: false,
        })
        .expect(400);

      expect(res.body.errors[0].param).toBe("title");
    });

    it("should return an error if done is not provided", async () => {
      const res = await request(app)
        .post("/tasks")
        .set("Authorization", `Bearer ${authToken}`)
        .send({
          title: "Task 3",
          description: "Description for task 3",
        })
        .expect(400);

      expect(res.body.errors[0].param).toBe("done");
    });
  });
});
