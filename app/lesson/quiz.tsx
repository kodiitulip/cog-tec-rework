'use client';

import { SelectChallengeOptions, SelectChallenges } from '@/db/schema';
import { useState } from 'react';
import { Header } from './header';

type Props = {
  initialPercentage: number;
  initialHearts: number;
  initialLessonId: number;
  initialLessonChallenges: (SelectChallenges & {
    completed: boolean;
    challengeOptions: SelectChallengeOptions[];
  })[];
};

export const Quiz = ({ initialPercentage, initialHearts, initialLessonId, initialLessonChallenges }: Props) => {
  const [hearts, setHearts] = useState<number>(initialHearts);
  const [percentage, setPercentage] = useState<number>(initialPercentage);

  return (
    <>
      <Header
        hearts={hearts}
        percentage={percentage}
      />
    </>
  );
};
