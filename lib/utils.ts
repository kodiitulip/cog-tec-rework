import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export type CourseTitles = 'Behaviorismo' | 'Gestalt' | 'Teoria Sociocultural';

export enum CoursesIds {
  DEFAULT = -1,
  BEHAVIORISM = 1,
  GESTALT = 2,
  SOCIOCULTURE = 3,
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const randomizeArray = <T>(array: T[]): T[] =>
  array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

export const authErrorCodeToMessage = (code: string) => {
  switch (code) {
    case 'email_address_invalid':
      return 'Email inválido';
    case 'email_exists':
      return 'Esse email já está cadstrado';
    case 'email_not_confirmed':
      return 'Esse email ainda não foi confirmado, confirme pelo email enviado!';
    case 'invalid_credentials':
      return 'Email ou senha inválidos';
    case 'mfa_challenge_expired':
      return 'Verificação expirou';
    case 'same_password':
      return 'Essa senha já foi utilizada por você, utilize outra';
    case 'weak_password':
      return 'Senha fraca';
    case 'over_request_rate_limit':
      return 'Tente de novo em alguns minutos';
    default:
      return 'Houve um erro de autenticação, por favor tente novamente';
  }
};
