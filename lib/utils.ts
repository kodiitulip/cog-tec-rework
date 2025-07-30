// import { BehaviorismIcon, CogTecIcon, GestaltIcon, SociocultureIcon } from '@/components/svgs';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export type CourseTitles = 'Behaviorismo' | 'Gestalt' | 'Teoria Sociocultural';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
