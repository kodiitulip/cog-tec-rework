import { getLibraryContentById, getUserProgress } from '@/db/queries';
import { SelectLibrary } from '@/db/schema';
import Markdown from 'react-markdown';
import { Header } from './header';
import { StickyWrapper } from '@/components/bits/pages/sticky-wrapper';
import { FeedWrapper } from '@/components/bits/pages/feed-wrapper';
import { notFound, redirect } from 'next/navigation';
import { UserProgress } from '@/components/bits/pages/user-progress';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

const LibraryContentPage = async ({ params }: { params: Promise<{ id: SelectLibrary['id'] }> }) => {
  const { id } = await params;
  const [content, userProgress] = await Promise.all([getLibraryContentById(id), getUserProgress()]);
  if (!content) notFound();
  if (!userProgress || !userProgress.activeCourse) redirect('/courses');

  return (
    <div className='flex flex-row-reverse gap-12 px-6'>
      <StickyWrapper className='w-60'>
        <UserProgress
          activeCourse={userProgress.activeCourse}
          hearts={userProgress.hearts}
          points={userProgress.points}
        />
      </StickyWrapper>
      <FeedWrapper>
        <Header
          title={content.title}
          courseId={userProgress.activeCourseId || undefined}
        />
        <article className='prose prose-neutral rounded-xl rounded-t-none max-w-(--breakpoint-lg) p-4 mx-2 border-1 border-t-0 border-neutral-400 prose-h1:text-2xl prose-p:text-base'>
          <Markdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            remarkRehypeOptions={{ passThrough: ['link'] }}
          >
            {content.markdown}
          </Markdown>
        </article>
      </FeedWrapper>
    </div>
  );
};

export default LibraryContentPage;
