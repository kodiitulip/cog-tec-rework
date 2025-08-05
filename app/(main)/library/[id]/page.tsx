import { getLibraryContentById } from '@/db/queries';
import { SelectLibrary } from '@/db/schema';
import Markdown from 'react-markdown';
import { Header } from './header';
import { StickyWrapper } from '@/components/bits/pages/sticky-wrapper';
import { FeedWrapper } from '@/components/bits/pages/feed-wrapper';
import { notFound } from 'next/navigation';

const LibraryContentPage = async ({ params }: { params: Promise<{ id: SelectLibrary['id'] }> }) => {
  const { id } = await params;
  const [content] = await Promise.all([getLibraryContentById(id)]);
  if (!content) notFound();

  return (
    <div className='flex flex-row-reverse gap-12 px-6'>
      <StickyWrapper className='w-45'></StickyWrapper>
      <FeedWrapper>
        <Header
          courseId={1}
          title={content?.title}
        />
        <article className='prose prose-neutral rounded-xl rounded-t-none max-w-(--breakpoint-lg) p-6 border-1 border-t-0 border-neutral-400 prose-h1:text-2xl prose-p:text-base'>
          <Markdown>{content ? content.markdown : 'Empty'}</Markdown>
        </article>
      </FeedWrapper>
    </div>
  );
};

export default LibraryContentPage;
