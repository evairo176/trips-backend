# 🚀 Express.js + TypeScript Starter

![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)
![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)

## 📌 Features

✅ **Express.js with TypeScript** – Type safety and better development experience.
✅ **Prisma ORM** – Database access with TypeScript support.
✅ **JWT Authentication** – Secure user authentication.
✅ **ESLint** – Enforced coding standards.
✅ **Husky** – Pre-commit hooks for consistent code quality.
✅ **Jest & Supertest** – Unit and integration testing.

---

## 📂 Project Structure

```
📦 express-ts-starter
 ┣ 📂 src
 ┃ ┣ 📂 controllers
 ┃ ┣ 📂 middleware
 ┃ ┣ 📂 models
 ┃ ┣ 📂 routes
 ┃ ┣ 📂 services
 ┃ ┗ 📜 index.ts
 ┣ 📂 prisma
 ┣ 📜 .eslintrc.json
 ┣ 📜 .huskyrc
 ┣ 📜 jest.config.ts
 ┣ 📜 package.json
 ┣ 📜 tsconfig.json
 ┗ 📜 README.md
```

---

## 🛠 Installation & Setup

### 1️⃣ Clone Repository

```sh
git clone https://github.com/your-repo/express-ts-starter.git
cd express-ts-starter
```

### 2️⃣ Install Dependencies

```sh
yarn install
```

### 3️⃣ Configure Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/mydb
JWT_SECRET=your_secret_key
PORT=3000
```

### 4️⃣ Initialize Prisma

```sh
yarn prisma generate
yarn prisma migrate dev --name init
```

### 5️⃣ Run Development Server

```sh
yarn dev
```

### 6️⃣ Run Tests

```sh
yarn test
```

---

## 🔐 Authentication

JWT authentication is implemented with `jsonwebtoken`. To generate a token:

```ts
import jwt from 'jsonwebtoken';

const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
  expiresIn: '1h',
});
```

Use middleware to verify tokens:

```ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  jwt.verify(token, process.env.JWT_SECRET!, (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Forbidden' });
    req.user = decoded;
    next();
  });
};
```

---

## 🧪 Testing

Jest and Supertest are used for testing API endpoints:

```ts
test('GET /api/users should return 200', async () => {
  const res = await request(app).get('/api/users');
  expect(res.status).toBe(200);
});
```

Run tests:

```sh
yarn test
```

---

## 🔄 Pre-Commit Hooks with Husky

Husky ensures that code quality is maintained before commits.

```sh
yarn husky install
```

Add a pre-commit hook in `.husky/pre-commit`:

```sh
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"
yarn lint && yarn test
```

---

## 📜 License

This project is licensed under the MIT License. Feel free to use and modify it as needed.

---

🚀 Happy coding! 🎉
