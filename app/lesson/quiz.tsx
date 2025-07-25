import { SelectChallenges } from '@/db/schema';
import React from 'react';

type Props = {
  initialLessonId: number;
  initialLessonChallenges: SelectChallenges[];
  initialHearts: number;
  initialPercentage: number;
};

export const Quiz = ({}: Props) => {
  return <div>Quiz</div>;
};
