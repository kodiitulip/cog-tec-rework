import { SelectChallenges, SelectLessons } from '@/db/schema';
import { UnitBanner } from './unit-banner';
import { LessonButton } from './lesson-button';
import { CourseTitles } from '@/lib/utils';

type Props = {
  id: number;
  order: number;
  title: string;
  description: string;
  lessons: (SelectLessons & { completed: boolean } & { challenges: SelectChallenges[] })[];
  activeLesson?: SelectLessons;
  activeLessonPercentage: number;
  activeCourse: CourseTitles;
};

export const Unit = ({ title, description, lessons, activeLesson, activeLessonPercentage, activeCourse }: Props) => (
  <>
    <UnitBanner
      title={title}
      description={description}
      activeCourse={activeCourse}
    />
    <div className='grid grid-cols2 justify-center gap-y-3 gap-x-20 py-10'>
      {lessons.map((lesson, index) => {
        const isCurrent = lesson.id === activeLesson?.id;
        const isLocked = lesson.challenges.length === 0 || (!lesson.completed && !isCurrent);

        return (
          <LessonButton
            key={lesson.id}
            id={lesson.id}
            index={index}
            totalCount={lessons.length - 1}
            current={isCurrent}
            locked={isLocked}
            percentage={activeLessonPercentage}
            activeCourse={activeCourse}
          />
        );
      })}
    </div>
  </>
);
