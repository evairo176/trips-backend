import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
// Import routes
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { morganMiddleware, notFound } from './middlewares';
import { authRouter, tripsRouter } from './routes';

const app = express();
const port = process.env.PORT || 3000;

// Add JSON middleware to parse incoming requests
app.use(express.json());
// Use Helmet to secure Express app by setting various HTTP headers
app.use(helmet());
//set coookie
app.use(cookieParser());
// Enable CORS with various options
app.use(
  cors({
    origin: (origin, callback) => {
      const allowedOrigins = [
        process.env.BASE_URL_FRONTEND,
        'http://localhost:3000',
      ];
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  }),
);
// Use Morgan middleware for logging requests
app.use(morganMiddleware);
// Use routes
app.get('/', (req, res) => {
  res.status(200).send('Hello, TypeScript with Express!');
});
app.use('/api/auth', authRouter);
app.use('/api/trips', tripsRouter);

// Swagger configuration options
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Authentication API',
      version: '1.0.0',
      description: 'API documentation',
    },
    servers: [
      {
        url: process.env.BASE_URL,
        description: 'Local server',
      },
    ],
  },
  apis: ['./src/routes/*.ts'], // Path to the API docs
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

// seed

// seedRoles();
// seedBusinessLines();

// seedBusinessTypes();
// seedCompanyWithUser();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(notFound);

// Start the server and export the server instance
const server = app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

export { server };
export default app; // Tambahkan ini agar Vercel bisa menangkap aplikasi
