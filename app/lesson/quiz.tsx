'use client';

import { SelectChallengeOptions, SelectChallenges } from '@/db/schema';
import { useState } from 'react';
import { Header } from './header';

type NormalizedChallenges = SelectChallenges & {
  completed: boolean;
  challengeOptions: SelectChallengeOptions[];
};

type Props = {
  initialPercentage: number;
  initialHearts: number;
  initialLessonId: number;
  initialLessonChallenges: NormalizedChallenges[];
};

export const Quiz = ({ initialPercentage, initialHearts, initialLessonId, initialLessonChallenges }: Props) => {
  const [hearts, setHearts] = useState<number>(initialHearts);
  const [percentage, setPercentage] = useState<number>(initialPercentage);
  const [challenges] = useState<NormalizedChallenges[]>(initialLessonChallenges);
  const [activeIndex, setActiveIndex] = useState<number>(() => {
    const uncompletedIndex = challenges.findIndex(({ completed }) => !completed);
    return uncompletedIndex === -1 ? 0 : uncompletedIndex;
  });

  const challenge = challenges[activeIndex];

  const title = challenge.type === 'ASSIST' ? 'Selecione o significado correto' : challenge.question;

  return (
    <>
      <Header
        hearts={hearts}
        percentage={percentage}
      />
      <div className='flex-1'>
        <div className='h-full flex items-center justify-center'>
          <div className='lg:min-h-87 lg:w-150 w-full px-6 lg:px-0 flex flex-col gap-y-12'>
            <h1 className='text-lg text-center lg:text-start font-bold text-neutral-700'>{title}</h1>
            <div className=''>{/* TODO: challenges? */}</div>
          </div>
        </div>
      </div>
    </>
  );
};
