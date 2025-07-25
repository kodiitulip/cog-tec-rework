import { SelectLessons, SelectUnits } from '@/db/schema';
import { UnitBanner } from './unit-banner';
import { LessonButton } from './lesson-button';

type Props = {
  id: number;
  order: number;
  title: string;
  description: string;
  lessons: (SelectLessons & { completed: boolean })[];
  activeLesson?: SelectLessons & { unit: SelectUnits };
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
    <div className='flex items-center flex-col relative'>
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
