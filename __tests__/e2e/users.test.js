const request = require("supertest");
const app = require("../../src/app");
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");

describe("end2end test", () => {
  let mongoServer;
  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  describe("POST /users", () => {
    it("should create a new user", async () => {
      const newUser = {
        name: "John Doe",
        email: "italo@gmail.com",
        password: "P@ssw0rd",
      };

      const response = await request(app)
        .post("/users")
        .send(newUser)
        .expect(200);

      expect(response.body.name).toEqual(newUser.name);
      expect(response.body.email).toEqual(newUser.email);
    });

    it("should return 400 if request body is missing required fields", async () => {
      const response = await request(app).post("/users").send({}).expect(400);

      expect(response.body.errors).toBeTruthy();
    });

    it("should return 400 if user with same email already exists", async () => {
      const newUser = {
        name: "John Doe",
        email: "italo@gmail.com",
        password: "P@ssw0rd",
      };
      const response = await request(app)
        .post("/users")
        .send(newUser)
        .expect(400);

      expect(response.body.error).toEqual("User already exists");
    });
  });
});
