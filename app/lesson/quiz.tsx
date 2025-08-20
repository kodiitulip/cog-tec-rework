'use client';

import { SelectChallengeOptions, SelectChallenges, SelectLessons } from '@/db/schema';
import { useState, useTransition } from 'react';
import { Header } from './header';
import { QuestionBubble } from './question-bubble';
import { Challenge } from './challenge';
import { Footer } from './footer';
import { CourseTitles } from '@/lib/utils';
import { upsertChallengeProgress } from '@/actions/challenge-progress';
import { reduceHearts } from '@/actions/user-progress';
import { toast } from 'sonner';
import { useAudio, useMount } from 'react-use';
import { FinishScreen } from './finish-screen';
import { useHeartsModal } from '@/store/use-hearts-modal';
import { usePracticeModal } from '@/store/use-practice-modal';

type NormalizedChallenges = SelectChallenges & {
  completed: boolean;
  challengeOptions: SelectChallengeOptions[];
};

type Props = {
  initialPercentage: number;
  initialHearts: number;
  initialLessonId: SelectLessons['id'];
  initialLessonChallenges: NormalizedChallenges[];
  activeCourseName?: CourseTitles;
};

export const Quiz = ({
  initialPercentage,
  initialHearts,
  initialLessonId,
  initialLessonChallenges,
  activeCourseName,
}: Props) => {
  const [correctAudio, , correctControls] = useAudio({ src: '/sounds/correct.mp3' });
  const [incorrectAudio, , incorrectControls] = useAudio({ src: '/sounds/incorrect.wav' });

  const { open: openHeartsModal } = useHeartsModal();
  const { open: openPracticeModal } = usePracticeModal();

  useMount(() => {
    if (initialPercentage === 100) openPracticeModal();
    // if (options.length === 0) setOptions(randomizeArray<SelectChallengeOptions>(currentChallenge.challengeOptions));
  });

  const [pending, startTransition] = useTransition();

  const [hearts, setHearts] = useState<number>(initialHearts);
  const [percentage, setPercentage] = useState<number>(() => (initialPercentage === 100 ? 0 : initialPercentage));
  const [lessonId] = useState<SelectLessons['id']>(initialLessonId);
  const [challenges] = useState<NormalizedChallenges[]>(initialLessonChallenges);
  const [activeIndex, setActiveIndex] = useState<number>(() => {
    const uncompletedIndex = challenges.findIndex(({ completed }) => !completed);
    return uncompletedIndex === -1 ? 0 : uncompletedIndex;
  });
  const [selectedOption, setSelectedOption] = useState<SelectChallengeOptions['id'] | undefined>();
  const [status, setStatus] = useState<'correct' | 'wrong' | 'none'>('none');
  // const [options, setOptions] = useState<SelectChallengeOptions[]>(() =>
  //   currentChallenge ? randomizeArray<SelectChallengeOptions>(currentChallenge.challengeOptions) : []
  // );

  const currentChallenge = challenges[activeIndex];

  if (!currentChallenge) {
    return (
      <>
        <FinishScreen
          courseName={activeCourseName}
          points={challenges.length * 10}
          hearts={hearts}
          lessonId={lessonId}
        />
        {correctAudio}
        {incorrectAudio}
      </>
    );
  }

  const title = currentChallenge.type === 'ASSIST' ? 'Selecione a opção correta' : currentChallenge.question;
  const options = currentChallenge?.challengeOptions || [];

  const onNext = () => setActiveIndex((curr) => curr + 1);

  const onSelect = (id: number) => {
    if (status !== 'none') return;
    setSelectedOption(id);
  };

  const onContinue = () => {
    if (!selectedOption) return;
    if (status === 'wrong') {
      setStatus('none');
      setSelectedOption(undefined);
      return;
    }
    if (status === 'correct') {
      onNext();
      setStatus('none');
      setSelectedOption(undefined);
      return;
    }
    const correctOption = options.find(({ correct }) => correct);
    if (!correctOption) return;
    if (correctOption.id === selectedOption) {
      startTransition(() => {
        upsertChallengeProgress(currentChallenge.id)
          .then((res) => {
            if (!res.error) {
              correctControls.play();
              setStatus('correct');
              setPercentage((prev) => prev + 100 / challenges.length);

              // this is practice
              if (initialPercentage === 100) {
                setHearts((prev) => Math.min(prev + 1, 5));
              }
              return;
            }
            switch (res.error.type) {
              case 'UNAUTHORIZED':
                toast.error('Usuário não autorizado');
                console.log(res.error.error?.message);
                break;

              case 'ZERO_HEARTS':
                openHeartsModal();
                break;

              default:
                toast.error('Houve um erro inesperado!');
                break;
            }
          })
          .catch(() => toast.error('Um erro inesperado aconteceu.'));
      });
    } else {
      startTransition(() => {
        reduceHearts(currentChallenge.id)
          .then(({ error }) => {
            if (!error) {
              incorrectControls.play();
              setStatus('wrong');
              setHearts((prev) => Math.max(prev - 1, 0));
              return;
            }
            switch (error.type) {
              case 'UNAUTHORIZED':
                toast.error('Usuário não autorizado');
                console.log(error.error?.message);
                break;

              case 'PRACTICE_MODE':
                incorrectControls.play();
                setStatus('wrong');
                break;

              default:
                toast.error('Houve um erro inesperado!');
                break;
            }
          })
          .catch(() => toast.error('Um erro inesperado aconteceu.'));
      });
    }
  };

  return (
    <>
      {correctAudio}
      {incorrectAudio}
      <Header
        hearts={hearts}
        percentage={percentage}
        courseName={activeCourseName}
      />
      <div className='h-full flex items-center justify-center'>
        <div className='max-w-230 px-6 lg:px-0 flex flex-col gap-y-12 w-full'>
          <h1 className='text-lg text-center lg:text-start font-bold text-neutral-700'>{title}</h1>
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
            disabled={pending}
            type={currentChallenge.type}
          />
        </div>
      </div>
      <Footer
        onCheck={onContinue}
        status={status}
        disabled={pending || !selectedOption}
        lessonId={lessonId}
      />
    </>
  );
};
