'use client';

import { SelectChallengeOptions, SelectChallenges, SelectLessons } from '@/db/schema';
import { useState, useTransition } from 'react';
import { Header } from './header';
import { QuestionBubble } from './question-bubble';
import { Challenge } from './challenge';
import { Footer } from './footer';
import { CourseTitles } from '@/lib/utils';
import { reduceHearts, upsertChallengeProgress } from '@/actions/challenge-progress';
import { toast } from 'sonner';
import { useAudio } from 'react-use';
import { FinishScreen } from './finish-screen';

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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [correctAudio, _c, correctControls] = useAudio({ src: '/sounds/correct.mp3' });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [incorrectAudio, _i, incorrectControls] = useAudio({ src: '/sounds/incorrect.wav' });
  // const [finishAudio, _f, finishControls] = useAudio({ src: '/sounds/finish.mp3' });

  const [pending, startTransition] = useTransition();

  const [hearts, setHearts] = useState<number>(initialHearts);
  const [percentage, setPercentage] = useState<number>(initialPercentage);
  const [lessonId] = useState<SelectLessons['id']>(initialLessonId);
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
    if (selectedOption == id) {
      setSelectedOption(-1);
      return;
    }
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

              case 'MISSING_USER_ID':
                toast.error('Id do usuário não encontrado');
                break;

              case 'MISSING_USER_PROGRESS':
                toast.error('Progresso do usuário não encontrado');
                break;

              case 'ZERO_HEARTS':
                toast.error('Usuário não tem corações restantes');
                break;

              case 'CHALLENGE_NOT_FOUND':
                toast.error('Houve um erro ao encontrar a atividade');
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
          .then((res) => {
            if (!res.error) {
              incorrectControls.play();
              setStatus('wrong');
              setHearts((prev) => Math.max(prev - 1, 0));
              return;
            }
            switch (res.error.type) {
              case 'UNAUTHORIZED':
                toast.error('Usuário não autorizado');
                console.log(res.error.error?.message);
                break;

              case 'MISSING_USER_ID':
                toast.error('Id do usuário não encontrado');
                break;

              case 'MISSING_USER_PROGRESS':
                toast.error('Progresso do usuário não encontrado');
                break;

              case 'ZERO_HEARTS':
                toast.error('Usuário não tem corações restantes');
                break;

              case 'CHALLENGE_NOT_FOUND':
                toast.error('Houve um erro ao encontrar a atividade');
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

  const currentChallenge = challenges[activeIndex];
  const options = currentChallenge?.challengeOptions || [];

  const title = currentChallenge.type === 'ASSIST' ? 'Selecione o significado correto' : currentChallenge.question;

  // TODO: remove harcoded true
  if (true || !currentChallenge) {
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
              disabled={pending}
              type={currentChallenge.type}
            />
          </div>
        </div>
      </div>
      <Footer
        onCheck={onContinue}
        status={status}
        disabled={pending || selectedOption === -1}
        lessonId={initialLessonId} // TODO: change this, probably becomes outdated when pressing continue
      />
    </>
  );
};
