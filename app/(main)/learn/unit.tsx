import { SelectLessons } from '@/db/schema';
import { UnitBanner } from './unit-banner';
import { LessonButton } from './lesson-button';

type Props = {
  id: number;
  order: number;
  title: string;
  description: string;
  lessons: (SelectLessons & { completed: boolean })[];
  activeLesson?: SelectLessons;
  activeLessonPercentage: number;
  activeCourse: string;
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
        const isLocked = !lesson.completed && !isCurrent;

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
