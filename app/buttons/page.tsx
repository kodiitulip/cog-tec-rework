import { Button } from '@/components/ui/button';

const ButtonsPage = () => (
  <div className='p-4 gap-4 flex flex-col max-w-50'>
    <Button variant='default'>default</Button>
    <Button variant='ghost'>ghost</Button>
    <Button variant='behaviorism'>behaviorism</Button>
    <Button variant='behaviorismGhost'>behaviorism</Button>
    <Button variant='gestalt'>gestalt</Button>
    <Button variant='gestaltGhost'>gestalt</Button>
    <Button variant='socio'>sociocultural</Button>
    <Button variant='socioGhost'>sociocultural</Button>
    <Button variant='danger'>danger</Button>
    <Button variant='dangerGhost'>danger</Button>
    <Button variant='sidebar'>sidebar</Button>
    <Button variant='sidebarGhost'>sidebar</Button>
  </div>
);

export default ButtonsPage;
