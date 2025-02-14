import { z } from 'zod';

export const registerSchema = z.object({
  firstName: z
    .string({ required_error: 'FirstName is required' })
    .min(3, { message: 'FirstName must be at least 1 characters' }),
  lastName: z
    .string({ required_error: 'LastName is required' })
    .min(1, { message: 'LastName must be at least 1 characters' }),
  email: z
    .string()
    .min(2, {
      message: 'email must be at least 2 characters.',
    })
    .email(),
  password: z
    .string({ required_error: 'Password is required' })
    .min(6, { message: 'Password must be at least 6 characters' }),
  companyName: z
    .string({ required_error: 'CompanyName is required' })
    .min(3, { message: 'CompanyName must be at least 1 characters' }),
});

export const loginSchema = z.object({
  email: z
    .string()
    .min(2, {
      message: 'email must be at least 2 characters.',
    })
    .email(),
  password: z
    .string({ required_error: 'Password is required' })
    .min(6, { message: 'Password must be at least 6 characters' }),
});

export const businessAddToCompanySchema = z.object({
  businessLineId: z.string({
    required_error: 'Tipe bisnis wajib di isi',
  }),

  companyId: z.string({
    required_error: 'Usaha wajib di isi',
  }),
});

export const registerUserByAdminSchema = z.object({
  firstName: z
    .string({ required_error: 'FirstName is required' })
    .min(3, { message: 'FirstName must be at least 1 characters' }),
  lastName: z
    .string({ required_error: 'LastName is required' })
    .min(1, { message: 'LastName must be at least 1 characters' }),
  email: z
    .string()
    .min(2, {
      message: 'email must be at least 2 characters.',
    })
    .email(),
  password: z
    .string({ required_error: 'Password is required' })
    .min(6, { message: 'Password must be at least 6 characters' }),
  businessName: z
    .string({ required_error: 'businessName is required' })
    .optional(),
  existing: z.boolean(),
});

export const registerUserByOwnerSchema = z.object({
  firstName: z
    .string({ required_error: 'FirstName is required' })
    .min(3, { message: 'FirstName must be at least 1 characters' }),
  lastName: z
    .string({ required_error: 'LastName is required' })
    .min(1, { message: 'LastName must be at least 1 characters' }),
  email: z
    .string()
    .min(2, {
      message: 'email must be at least 2 characters.',
    })
    .email(),
  password: z
    .string({ required_error: 'Password is required' })
    .min(6, { message: 'Password must be at least 6 characters' }),
  businessCode: z.string({ required_error: 'Bisnis code is required' }),
});

export const addMainCategorySchema = z.object({
  title: z
    .string({ required_error: 'Title is required' })
    .min(3, { message: 'Title must be at least 3 characters' }),
  companyId: z.string(),
});

export const updateMainCategorySchema = z.object({
  title: z
    .string({ required_error: 'Title is required' })
    .min(3, { message: 'Title must be at least 3 characters' }),
});

export const addCategorySchema = z.object({
  mainCategoryId: z.string(),
  title: z
    .string({ required_error: 'Title is required' })
    .min(3, { message: 'Title must be at least 3 characters' }),
  description: z.string().optional(),
});

export const updateCategorySchema = z.object({
  title: z
    .string({ required_error: 'Title is required' })
    .min(3, { message: 'Title must be at least 3 characters' }),
  description: z.string().optional(),
  mainCategoryId: z.string().optional(),
});
