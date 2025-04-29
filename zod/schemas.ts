import { z } from 'zod';

export const UserLoginFormSchema = z.object({
  email: z.string().email({ message: 'email must be valid' }).trim(),
  password: z
    .string()
    .min(1, { message: 'password must not be empty' })
    .min(6, { message: 'password must have at least 6 characteres' })
    .regex(/[0-9]/, { message: 'contains at least one number' })
    .trim(),
});

export type UserLogin = z.infer<typeof UserLoginFormSchema>;
