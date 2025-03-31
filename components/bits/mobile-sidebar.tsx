import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Sidebar } from '@/components/bits/sidebar';

export const MobileSidebar = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <Menu
          className='text-white'
          aria-labelledby='menu-label'
        />
        <span
          id='menu-label'
          className='sr-only'
        >
          Open Sidebar
        </span>
      </SheetTrigger>
      <SheetContent
        className='p-0'
        side='left'
      >
        <SheetHeader className='sr-only'>
          <SheetTitle>Sidebar</SheetTitle>
          <SheetDescription>Navigate our app via here</SheetDescription>
        </SheetHeader>
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
};
