const request = require("supertest");
const app = require("../src/app");

describe("API Todos List Management", () => {
  let token;

  test("POST /api/auth/login - Login berhasil", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({
        email: "adnan@example.com",
        password: "password123",
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.token).toBeDefined();

    token = response.body.data.token;
  });

  test("GET /api/todos - Mengambil daftar Todo", async () => {
    const response = await request(app)
      .get("/api/todos")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toBeDefined();
  });

  test("GET /api/stats/summary - Statistik dengan API Key", async () => {
    const response = await request(app)
      .get("/api/stats/summary")
      .set("x-api-key", process.env.API_KEY);

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toBeDefined();
  });

  test("GET /api/stats/summary - Tanpa API Key harus ditolak", async () => {
    const response = await request(app)
      .get("/api/stats/summary");

    expect(response.statusCode).toBe(401);
    expect(response.body.success).toBe(false);
  });
});