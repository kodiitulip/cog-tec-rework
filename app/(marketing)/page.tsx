import { Button } from '@/components/ui/button';
import Link from 'next/link';

const Home = () => {
  return (
    <div className=''>
      <Button asChild>
        <Link href='/buttons'>Click Me </Link>
      </Button>
    </div>
  );
};

export default Home;
