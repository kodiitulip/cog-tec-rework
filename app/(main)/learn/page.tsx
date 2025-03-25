import { FeedWrapper } from '@/components/bits/pages/feed-wrapper';
import { StickyWrapper } from '@/components/bits/pages/sticky-wrapper';

const LearnPage = () => {
  return (
    <div className='flex flex-row-reverse gap-12 px-6'>
      <StickyWrapper>Sticky sidebar</StickyWrapper>
      <FeedWrapper>My Feed</FeedWrapper>
    </div>
  );
};

export default LearnPage;
