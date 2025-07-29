// import { BehaviorismIcon, CogTecIcon, GestaltIcon, SociocultureIcon } from '@/components/svgs';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

type TailwindShadeUnits = '50' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900' | '950';
type TailwindColorTypes = 'bg' | 'text' | 'border' | 'fill';

export const tailwindCourseColors = (courseName: string, type: TailwindColorTypes, shade: TailwindShadeUnits) => {
  const colorName =
    courseName == 'Behaviorismo'
      ? 'behaviorism'
      : courseName == 'Gestalt'
      ? 'gestalt'
      : courseName == 'Teoria Sociocultural'
      ? 'socioculture'
      : 'neutral';

  const res = colors[colorName][type][shade];
  return res;
};

export const colors = {
  socioculture: {
    bg: {
      50: 'bg-socioculture-50',
      100: 'bg-socioculture-100',
      200: 'bg-socioculture-200',
      300: 'bg-socioculture-300',
      400: 'bg-socioculture-400',
      500: 'bg-socioculture-500',
      600: 'bg-socioculture-600',
      700: 'bg-socioculture-700',
      800: 'bg-socioculture-800',
      900: 'bg-socioculture-900',
      950: 'bg-socioculture-950',
    },
    text: {
      50: 'text-socioculture-50',
      100: 'text-socioculture-100',
      200: 'text-socioculture-200',
      300: 'text-socioculture-300',
      400: 'text-socioculture-400',
      500: 'text-socioculture-500',
      600: 'text-socioculture-600',
      700: 'text-socioculture-700',
      800: 'text-socioculture-800',
      900: 'text-socioculture-900',
      950: 'text-socioculture-950',
    },
    border: {
      50: 'border-socioculture-50',
      100: 'border-socioculture-100',
      200: 'border-socioculture-200',
      300: 'border-socioculture-300',
      400: 'border-socioculture-400',
      500: 'border-socioculture-500',
      600: 'border-socioculture-600',
      700: 'border-socioculture-700',
      800: 'border-socioculture-800',
      900: 'border-socioculture-900',
      950: 'border-socioculture-950',
    },
    fill: {
      50: 'fill-socioculture-50',
      100: 'fill-socioculture-100',
      200: 'fill-socioculture-200',
      300: 'fill-socioculture-300',
      400: 'fill-socioculture-400',
      500: 'fill-socioculture-500',
      600: 'fill-socioculture-600',
      700: 'fill-socioculture-700',
      800: 'fill-socioculture-800',
      900: 'fill-socioculture-900',
      950: 'fill-socioculture-950',
    },
  },
  gestalt: {
    bg: {
      50: 'bg-gestalt-50',
      100: 'bg-gestalt-100',
      200: 'bg-gestalt-200',
      300: 'bg-gestalt-300',
      400: 'bg-gestalt-400',
      500: 'bg-gestalt-500',
      600: 'bg-gestalt-600',
      700: 'bg-gestalt-700',
      800: 'bg-gestalt-800',
      900: 'bg-gestalt-900',
      950: 'bg-gestalt-950',
    },
    text: {
      50: 'text-gestalt-50',
      100: 'text-gestalt-100',
      200: 'text-gestalt-200',
      300: 'text-gestalt-300',
      400: 'text-gestalt-400',
      500: 'text-gestalt-500',
      600: 'text-gestalt-600',
      700: 'text-gestalt-700',
      800: 'text-gestalt-800',
      900: 'text-gestalt-900',
      950: 'text-gestalt-950',
    },
    border: {
      50: 'border-gestalt-50',
      100: 'border-gestalt-100',
      200: 'border-gestalt-200',
      300: 'border-gestalt-300',
      400: 'border-gestalt-400',
      500: 'border-gestalt-500',
      600: 'border-gestalt-600',
      700: 'border-gestalt-700',
      800: 'border-gestalt-800',
      900: 'border-gestalt-900',
      950: 'border-gestalt-950',
    },
    fill: {
      50: 'fill-gestalt-50',
      100: 'fill-gestalt-100',
      200: 'fill-gestalt-200',
      300: 'fill-gestalt-300',
      400: 'fill-gestalt-400',
      500: 'fill-gestalt-500',
      600: 'fill-gestalt-600',
      700: 'fill-gestalt-700',
      800: 'fill-gestalt-800',
      900: 'fill-gestalt-900',
      950: 'fill-gestalt-950',
    },
  },
  behaviorism: {
    bg: {
      50: 'bg-behaviorism-50',
      100: 'bg-behaviorism-100',
      200: 'bg-behaviorism-200',
      300: 'bg-behaviorism-300',
      400: 'bg-behaviorism-400',
      500: 'bg-behaviorism-500',
      600: 'bg-behaviorism-600',
      700: 'bg-behaviorism-700',
      800: 'bg-behaviorism-800',
      900: 'bg-behaviorism-900',
      950: 'bg-behaviorism-950',
    },
    text: {
      50: 'text-behaviorism-50',
      100: 'text-behaviorism-100',
      200: 'text-behaviorism-200',
      300: 'text-behaviorism-300',
      400: 'text-behaviorism-400',
      500: 'text-behaviorism-500',
      600: 'text-behaviorism-600',
      700: 'text-behaviorism-700',
      800: 'text-behaviorism-800',
      900: 'text-behaviorism-900',
      950: 'text-behaviorism-950',
    },
    border: {
      50: 'border-behaviorism-50',
      100: 'border-behaviorism-100',
      200: 'border-behaviorism-200',
      300: 'border-behaviorism-300',
      400: 'border-behaviorism-400',
      500: 'border-behaviorism-500',
      600: 'border-behaviorism-600',
      700: 'border-behaviorism-700',
      800: 'border-behaviorism-800',
      900: 'border-behaviorism-900',
      950: 'border-behaviorism-950',
    },
    fill: {
      50: 'fill-behaviorism-50',
      100: 'fill-behaviorism-100',
      200: 'fill-behaviorism-200',
      300: 'fill-behaviorism-300',
      400: 'fill-behaviorism-400',
      500: 'fill-behaviorism-500',
      600: 'fill-behaviorism-600',
      700: 'fill-behaviorism-700',
      800: 'fill-behaviorism-800',
      900: 'fill-behaviorism-900',
      950: 'fill-behaviorism-950',
    },
  },
  neutral: {
    bg: {
      50: 'bg-neutral-50',
      100: 'bg-neutral-100',
      200: 'bg-neutral-200',
      300: 'bg-neutral-300',
      400: 'bg-neutral-400',
      500: 'bg-neutral-500',
      600: 'bg-neutral-600',
      700: 'bg-neutral-700',
      800: 'bg-neutral-800',
      900: 'bg-neutral-900',
      950: 'bg-neutral-950',
    },
    text: {
      50: 'text-neutral-50',
      100: 'text-neutral-100',
      200: 'text-neutral-200',
      300: 'text-neutral-300',
      400: 'text-neutral-400',
      500: 'text-neutral-500',
      600: 'text-neutral-600',
      700: 'text-neutral-700',
      800: 'text-neutral-800',
      900: 'text-neutral-900',
      950: 'text-neutral-950',
    },
    border: {
      50: 'border-neutral-50',
      100: 'border-neutral-100',
      200: 'border-neutral-200',
      300: 'border-neutral-300',
      400: 'border-neutral-400',
      500: 'border-neutral-500',
      600: 'border-neutral-600',
      700: 'border-neutral-700',
      800: 'border-neutral-800',
      900: 'border-neutral-900',
      950: 'border-neutral-950',
    },
    fill: {
      50: 'fill-neutral-50',
      100: 'fill-neutral-100',
      200: 'fill-neutral-200',
      300: 'fill-neutral-300',
      400: 'fill-neutral-400',
      500: 'fill-neutral-500',
      600: 'fill-neutral-600',
      700: 'fill-neutral-700',
      800: 'fill-neutral-800',
      900: 'fill-neutral-900',
      950: 'fill-neutral-950',
    },
  },
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
