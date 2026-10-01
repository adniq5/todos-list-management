# Todos List Management API

API untuk mengelola data Todo List menggunakan Node.js, Express.js, dan MongoDB. Project ini dibuat sebagai bagian dari tugas akhir Backend Development pada kegiatan magang di GameLab.

## Deskripsi

Todos List Management API merupakan REST API yang digunakan untuk mengelola pengguna, kategori, Todo, activity log, dan statistik.

API dilengkapi dengan autentikasi JWT, role-based access control, validasi input, pagination, search, filtering, sorting, activity log, API Key, automated testing, dan dokumentasi Swagger.

## Fitur

- Register dan Login pengguna
- Authentication menggunakan JWT
- Role-based access control (`user` dan `admin`)
- CRUD Category
- CRUD Todo
- Validasi input menggunakan Express Validator
- Pagination Todo
- Search Todo
- Filter Todo berdasarkan status
- Filter Todo berdasarkan kategori
- Sorting Todo
- Activity Log untuk aktivitas Todo
- Statistics / Summary
- API Key untuk endpoint Statistics
- Automated testing menggunakan Jest dan Supertest
- Dokumentasi API menggunakan Swagger UI

## Teknologi yang Digunakan

- Node.js
- Express.js
- MongoDB
- MongoDB Atlas
- Mongoose
- JSON Web Token (JWT)
- bcryptjs
- express-validator
- Jest
- Supertest
- Swagger UI Express
- dotenv
- nodemon

## Struktur Project

```text
todos-list-management/
├── src/
│   ├── config/
│   ├── middleware/
│   ├── model/
│   ├── service/
│   ├── controller/
│   ├── route/
│   ├── validator/
│   └── app.js
├── tests/
│   └── api.test.js
├── .env
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
└── README.md