'use client';

import { SelectChallengeOptions, SelectChallenges } from '@/db/schema';
import { useState } from 'react';
import { Header } from './header';
import { QuestionBubble } from './question-bubble';
import { Challenge } from './challenge';
import { Footer } from './footer';

type NormalizedChallenges = SelectChallenges & {
  completed: boolean;
  challengeOptions: SelectChallengeOptions[];
};

type Props = {
  initialPercentage: number;
  initialHearts: number;
  initialLessonId: number;
  initialLessonChallenges: NormalizedChallenges[];
  activeCourseName?: string;
};

export const Quiz = ({
  initialPercentage,
  initialHearts,
  initialLessonId,
  initialLessonChallenges,
  activeCourseName,
}: Props) => {
  const [hearts, setHearts] = useState<number>(initialHearts);
  const [percentage, setPercentage] = useState<number>(initialPercentage);
  const [challenges] = useState<NormalizedChallenges[]>(initialLessonChallenges);
  const [activeIndex, setActiveIndex] = useState<number>(() => {
    const uncompletedIndex = challenges.findIndex(({ completed }) => !completed);
    return uncompletedIndex === -1 ? 0 : uncompletedIndex;
  });
  const [selectedOption, setSelectedOption] = useState<number>(-1);
  const [status, setStatus] = useState<'correct' | 'wrong' | 'none'>('none');

  const onNext = () => setActiveIndex((curr) => curr + 1);

  const onSelect = (id: number) => {
    if (status !== 'none') return;
    setSelectedOption(id);
  };

  const onContinue = () => {
    if (!selectedOption) return;
    if (status === 'wrong') {
      setStatus('none');
      setSelectedOption(-1);
      return;
    }
    if (status === 'correct') {
      onNext();
      setStatus('none');
      setSelectedOption(-1);
      return;
    }
    const correctOption = options.find(({ correct }) => correct);
    if (!correctOption) return;
    if (correctOption.id == selectedOption) {
      console.log('aaa');
    } else {
      console.log('aaab');
    }
  };

  const currentChallenge = challenges[activeIndex];
  const options = currentChallenge?.challengeOptions || [];

  const title = currentChallenge.type === 'ASSIST' ? 'Selecione o significado correto' : currentChallenge.question;

  return (
    <>
      <Header
        hearts={hearts}
        percentage={percentage}
      />
      <div className='h-full flex items-center justify-center'>
        <div className='max-w-230 px-6 lg:px-0 flex flex-col gap-y-12'>
          <h1 className='text-lg text-center lg:text-start font-bold text-neutral-700'>{title}</h1>
          <div>
            {currentChallenge.type === 'ASSIST' && (
              <QuestionBubble
                question={currentChallenge.question}
                courseName={activeCourseName}
              />
            )}
            <Challenge
              options={options}
              onSelect={onSelect}
              status={status}
              selectedOption={selectedOption}
              disabled={false}
              type={currentChallenge.type}
            />
          </div>
        </div>
      </div>
      <Footer
        onCheck={() => {}}
        status={status}
        disabled={!selectedOption}
        activeCourseName={activeCourseName}
        lessonId={initialLessonId} // TODO: change this, probably becomes outdated when pressing continue
      />
    </>
  );
};
