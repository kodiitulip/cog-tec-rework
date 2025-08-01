import { z } from 'zod';

export const UserLoginFormSchema = z.object({
  email: z.string().email({ message: 'email must be valid' }).trim(),
  password: z
    .string()
    .min(1, { message: 'A senha não pode estar vazia' })
    .min(8, { message: 'A senha deve conter pelo menos 8 caracteres' })
    .regex(/[0-9]/, { message: 'A senha deve conter pelo menos um número' })
    .trim(),
});

export const SignUpFormSchema = z
  .object({
    userName: z
      .string()
      .min(1, { message: 'Nome de usuário não pode ser vazio' })
      .min(3, { message: 'Nome de usuário deve conter pelo menos 3 characters' })
      .trim(),
    email: z.string().email({ message: 'email must be valid' }).trim(),
    password: z
      .string()
      .min(1, { message: 'A senha não pode estar vazia' })
      .min(8, { message: 'A senha deve conter pelo menos 8 caracteres' })
      .regex(/[0-9]/, { message: 'A senha deve conter pelo menos um número' })
      .trim(),
    repeatPassword: z
      .string()
      .min(1, { message: 'A senha não pode estar vazia' })
      .min(8, { message: 'A senha deve conter pelo menos 8 caracteres' })
      .regex(/[0-9]/, { message: 'A senha deve conter pelo menos um número' })
      .trim(),
  })
  .superRefine(({ password, repeatPassword }, ctx) => {
    if (password !== repeatPassword)
      ctx.addIssue({
        code: 'custom',
        message: 'As senha não estão iguais',
      });
  });

export type UserLogin = z.infer<typeof UserLoginFormSchema>;
export type UserSignUp = z.infer<typeof SignUpFormSchema>;
