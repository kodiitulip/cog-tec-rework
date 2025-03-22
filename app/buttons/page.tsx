import { Button } from '@/components/ui/button';

const ButtonsPage = () => (
  <div className='p-4 gap-4 flex flex-col max-w-50'>
    <Button variant='default'>default</Button>
    <Button variant='ghost'>ghost</Button>
    <Button variant='primary'>primary</Button>
    <Button variant='primaryGhost'>primary ghost</Button>
    <Button variant='secondary'>secondary</Button>
    <Button variant='secondaryGhost'>secondary ghost</Button>
    <Button variant='danger'>danger</Button>
    <Button variant='dangerGhost'>danger ghost</Button>
    <Button variant='super'>super</Button>
    <Button variant='superGhost'>super ghost</Button>
    <Button variant='sidebar'>sidebar</Button>
    <Button variant='sidebarGhost'>sidebar ghost</Button>
  </div>
);

export default ButtonsPage;
