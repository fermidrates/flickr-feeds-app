const request = require("supertest");
const app = require("./app");

test("get data successfully", async () => {
  const res = await request(app).get("/feeds");
  expect(res.statusCode).toBe(200);
});

test("get data by tag successfully", async () => {
  const TEST_TAG = "coin";
  const res = await request(app).get(`/feeds/${TEST_TAG}`);
  expect(res.statusCode).toBe(200);
});
