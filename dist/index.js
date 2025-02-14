"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
// Import routes
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const middlewares_1 = require("./middlewares");
const routes_1 = require("./routes");
const app = (0, express_1.default)();
exports.app = app;
const port = process.env.PORT || 3000;
// Add JSON middleware to parse incoming requests
app.use(express_1.default.json());
// Use Helmet to secure Express app by setting various HTTP headers
app.use((0, helmet_1.default)());
//set coookie
app.use((0, cookie_parser_1.default)());
// Enable CORS with various options
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        const allowedOrigins = [
            'https://dev.kabarbengkel.com',
            'http://localhost:3000',
        ];
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
}));
// Use Morgan middleware for logging requests
app.use(middlewares_1.morganMiddleware);
// Use routes
app.get('/', (req, res) => {
    res.status(200).send('Hello, TypeScript with Express!');
});
app.use('/api/auth', routes_1.authRouter);
app.use('/api/trips', routes_1.tripsRouter);
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
                url: 'http://localhost:3000',
                description: 'Local server',
            },
        ],
    },
    apis: ['./src/routes/*.ts'], // Path to the API docs
};
const swaggerDocs = (0, swagger_jsdoc_1.default)(swaggerOptions);
// seed
// seedRoles();
// seedBusinessLines();
// seedBusinessTypes();
// seedCompanyWithUser();
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocs));
app.use(middlewares_1.notFound);
// Start the server and export the server instance
const server = app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
exports.server = server;
