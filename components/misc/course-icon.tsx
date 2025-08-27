import { cn, CoursesIds } from '@/lib/utils';
import { BehaviorismIcon, CogTecIcon, GestaltIcon, IconProps, SociocultureIcon } from '@/components/svgs';

type Props = IconProps & {
  courseId?: CoursesIds;
  colored?: boolean;
};

const icons = {
  [CoursesIds.DEFAULT]: CogTecIcon,
  [CoursesIds.BEHAVIORISM]: BehaviorismIcon,
  [CoursesIds.GESTALT]: GestaltIcon,
  [CoursesIds.SOCIOCULTURE]: SociocultureIcon,
};

const fills = {
  [CoursesIds.DEFAULT]: 'fill-ecstasy-500',
  [CoursesIds.BEHAVIORISM]: 'fill-behaviorism-500',
  [CoursesIds.GESTALT]: 'fill-gestalt-500',
  [CoursesIds.SOCIOCULTURE]: 'fill-sociocultural-500',
};

export const CourseIcon = ({ courseId = CoursesIds.DEFAULT, colored, className, ...props }: Props) => {
  const Icon = icons[courseId];
  return (
    <Icon
      className={cn(colored && fills[courseId], className)}
      {...props}
    />
  );
};
