"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const validate = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body);
        next();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (err) {
        // await sequelize.close(); // Ensure the connection is closed
        return res
            .status(400)
            .json({ message: 'Invalid request', error: err.errors });
    }
};
exports.validate = validate;
