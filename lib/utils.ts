// import { BehaviorismIcon, CogTecIcon, GestaltIcon, SociocultureIcon } from '@/components/svgs';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import * as Colors from './custom-colors.json';

type TailwindShadeUnits = '50' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900' | '950';
type TailwindColorTypes = 'bg' | 'text' | 'border' | 'fill';

export const tailwindCourseColors = (courseName: string, shade: TailwindShadeUnits, type?: TailwindColorTypes) => {
  const colorName =
    courseName == 'Behaviorismo' ? 'behaviorism'
    : courseName == 'Gestalt' ? 'gestalt'
    : 'socioculture';
  // : 'neutral';

  const res = Colors[colorName][shade];
  if (type) return `${type}-(${res})`;
  return res;
};

// export const courseIcons = {
//   Behaviorismo: BehaviorismIcon,
//   behaviorism: BehaviorismIcon,
//   Gestalt: GestaltIcon,
//   gestalt: GestaltIcon,
//   'Teoria Sociocultural': SociocultureIcon,
//   socioculture: SociocultureIcon,
//   CogTec: CogTecIcon,
//   cogtec: CogTecIcon,
// };

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
