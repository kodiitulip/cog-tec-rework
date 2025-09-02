import { SelectChallenges, SelectLessons } from '@/db/schema';
import { UnitBanner } from './unit-banner';
import { LessonButton } from './lesson-button';
import { CoursesIds } from '@/lib/utils';

type Props = {
  id: number;
  order: number;
  title: string;
  description: string;
  lessons: (SelectLessons & { completed: boolean } & { challenges: SelectChallenges[] })[];
  activeLesson?: SelectLessons;
  activeLessonPercentage: number;
  courseId?: CoursesIds;
};

export const Unit = ({
  title,
  description,
  lessons,
  activeLesson,
  activeLessonPercentage,
  courseId = CoursesIds.DEFAULT,
}: Props) => (
  <>
    <UnitBanner
      title={title}
      description={description}
      courseId={courseId}
    />
    <div className='grid grid-cols2 justify-center gap-y-3 gap-x-20 py-10'>
      {lessons.map(({ id, completed, challenges }, index) => {
        const isCurrent = id === activeLesson?.id;
        const isLocked = challenges.length === 0 || (!completed && !isCurrent);

        return (
          <LessonButton
            key={id}
            id={id}
            index={index}
            totalCount={lessons.length - 1}
            current={isCurrent}
            locked={isLocked}
            percentage={activeLessonPercentage}
            courseId={courseId}
            completed={completed}
          />
        );
      })}
    </div>
  </>
);
