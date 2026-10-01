const swaggerUi = require("swagger-ui-express");

const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "Todos List Management API",
    version: "1.0.0",
    description: "Dokumentasi API Todos List Management",
  },
  servers: [
    {
      url: "http://localhost:3000",
    },
  ],
  paths: {
    "/api/auth/login": {
      post: {
        summary: "Login User",
        tags: ["Authentication"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["email", "password"],
                properties: {
                  email: {
                    type: "string",
                    example: "adnan@example.com",
                  },
                  password: {
                    type: "string",
                    example: "password123",
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: "Login berhasil",
          },
          401: {
            description: "Login gagal",
          },
        },
      },
    },

    "/api/todos": {
      get: {
        summary: "Mengambil daftar Todo",
        tags: ["Todo"],
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            name: "page",
            in: "query",
            schema: {
              type: "integer",
              example: 1,
            },
          },
          {
            name: "limit",
            in: "query",
            schema: {
              type: "integer",
              example: 10,
            },
          },
          {
            name: "search",
            in: "query",
            schema: {
              type: "string",
              example: "backend",
            },
          },
          {
            name: "status",
            in: "query",
            schema: {
              type: "string",
              example: "completed",
            },
          },
          {
            name: "sort",
            in: "query",
            schema: {
              type: "string",
              example: "created_at",
            },
          },
          {
            name: "order",
            in: "query",
            schema: {
              type: "string",
              example: "desc",
            },
          },
        ],
        responses: {
          200: {
            description: "Data Todo berhasil diambil",
          },
          401: {
            description: "Token tidak valid",
          },
        },
      },

      post: {
        summary: "Membuat Todo",
        tags: ["Todo"],
        security: [
          {
            bearerAuth: [],
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["title", "category"],
                properties: {
                  title: {
                    type: "string",
                    example: "Mengerjakan tugas backend",
                  },
                  description: {
                    type: "string",
                    example: "Menyelesaikan project API",
                  },
                  category: {
                    type: "string",
                    example: "CATEGORY_ID",
                  },
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: "Todo berhasil dibuat",
          },
        },
      },
    },

    "/api/stats/summary": {
      get: {
        summary: "Mengambil statistik Todo",
        tags: ["Statistics"],
        parameters: [
          {
            name: "x-api-key",
            in: "header",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "Data statistik berhasil diambil",
          },
          401: {
            description: "API Key wajib disertakan",
          },
          403: {
            description: "API Key tidak valid",
          },
        },
      },
    },
  },

  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
};

module.exports = {
  swaggerUi,
  swaggerDocument,
};