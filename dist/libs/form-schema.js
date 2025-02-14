"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCategorySchema = exports.addCategorySchema = exports.updateMainCategorySchema = exports.addMainCategorySchema = exports.registerUserByOwnerSchema = exports.registerUserByAdminSchema = exports.businessAddToCompanySchema = exports.loginSchema = exports.registerSchema = void 0;
const zod_1 = require("zod");
exports.registerSchema = zod_1.z.object({
    firstName: zod_1.z
        .string({ required_error: 'FirstName is required' })
        .min(3, { message: 'FirstName must be at least 1 characters' }),
    lastName: zod_1.z
        .string({ required_error: 'LastName is required' })
        .min(1, { message: 'LastName must be at least 1 characters' }),
    email: zod_1.z
        .string()
        .min(2, {
        message: 'email must be at least 2 characters.',
    })
        .email(),
    password: zod_1.z
        .string({ required_error: 'Password is required' })
        .min(6, { message: 'Password must be at least 6 characters' }),
    companyName: zod_1.z
        .string({ required_error: 'CompanyName is required' })
        .min(3, { message: 'CompanyName must be at least 1 characters' }),
});
exports.loginSchema = zod_1.z.object({
    email: zod_1.z
        .string()
        .min(2, {
        message: 'email must be at least 2 characters.',
    })
        .email(),
    password: zod_1.z
        .string({ required_error: 'Password is required' })
        .min(6, { message: 'Password must be at least 6 characters' }),
});
exports.businessAddToCompanySchema = zod_1.z.object({
    businessLineId: zod_1.z.string({
        required_error: 'Tipe bisnis wajib di isi',
    }),
    companyId: zod_1.z.string({
        required_error: 'Usaha wajib di isi',
    }),
});
exports.registerUserByAdminSchema = zod_1.z.object({
    firstName: zod_1.z
        .string({ required_error: 'FirstName is required' })
        .min(3, { message: 'FirstName must be at least 1 characters' }),
    lastName: zod_1.z
        .string({ required_error: 'LastName is required' })
        .min(1, { message: 'LastName must be at least 1 characters' }),
    email: zod_1.z
        .string()
        .min(2, {
        message: 'email must be at least 2 characters.',
    })
        .email(),
    password: zod_1.z
        .string({ required_error: 'Password is required' })
        .min(6, { message: 'Password must be at least 6 characters' }),
    businessName: zod_1.z
        .string({ required_error: 'businessName is required' })
        .optional(),
    existing: zod_1.z.boolean(),
});
exports.registerUserByOwnerSchema = zod_1.z.object({
    firstName: zod_1.z
        .string({ required_error: 'FirstName is required' })
        .min(3, { message: 'FirstName must be at least 1 characters' }),
    lastName: zod_1.z
        .string({ required_error: 'LastName is required' })
        .min(1, { message: 'LastName must be at least 1 characters' }),
    email: zod_1.z
        .string()
        .min(2, {
        message: 'email must be at least 2 characters.',
    })
        .email(),
    password: zod_1.z
        .string({ required_error: 'Password is required' })
        .min(6, { message: 'Password must be at least 6 characters' }),
    businessCode: zod_1.z.string({ required_error: 'Bisnis code is required' }),
});
exports.addMainCategorySchema = zod_1.z.object({
    title: zod_1.z
        .string({ required_error: 'Title is required' })
        .min(3, { message: 'Title must be at least 3 characters' }),
    companyId: zod_1.z.string(),
});
exports.updateMainCategorySchema = zod_1.z.object({
    title: zod_1.z
        .string({ required_error: 'Title is required' })
        .min(3, { message: 'Title must be at least 3 characters' }),
});
exports.addCategorySchema = zod_1.z.object({
    mainCategoryId: zod_1.z.string(),
    title: zod_1.z
        .string({ required_error: 'Title is required' })
        .min(3, { message: 'Title must be at least 3 characters' }),
    description: zod_1.z.string().optional(),
});
exports.updateCategorySchema = zod_1.z.object({
    title: zod_1.z
        .string({ required_error: 'Title is required' })
        .min(3, { message: 'Title must be at least 3 characters' }),
    description: zod_1.z.string().optional(),
    mainCategoryId: zod_1.z.string().optional(),
});
