// import { BehaviorismIcon, CogTecIcon, GestaltIcon, SociocultureIcon } from '@/components/svgs';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

type TailwindShadeUnits = '50' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900' | '950';
type TailwindColorTypes = 'fg' | 'bg' | 'text' | 'border' | 'fill';

export const tailwindCourseColors = (
  courseName: string,
  type: TailwindColorTypes,
  shade: TailwindShadeUnits,
  defaultColor?: string
) => {
  const colorName =
    courseName == 'Behaviorismo'
      ? 'behaviorism'
      : courseName == 'Gestalt'
        ? 'gestalt'
        : courseName == 'Teoria Sociocultural'
          ? 'socioculture'
          : defaultColor || 'neutral';

  const res = `${type}-${colorName}-${shade}`;
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
