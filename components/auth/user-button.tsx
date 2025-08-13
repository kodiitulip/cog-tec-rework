import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { LogOut } from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/button';
import { type VariantProps } from 'class-variance-authority';
import { SignOutButton } from './buttons';
import { cn } from '@/lib/utils';
import { getUserProgress } from '@/db/queries';

type UserButtonProps = {
  label?: boolean;
} & React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants>;

export const UserButton = async ({ label, className, ...props }: UserButtonProps) => {
  const userProgress = await getUserProgress();
  const userName = userProgress?.userName ?? 'user';
  const userAvatarUrl = userProgress?.userImageSrc ?? '/icon-512-maskable.png';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          {...props}
          className={cn('group/user-button', className)}
        >
          <Avatar>
            <AvatarImage src={userAvatarUrl} />
            <AvatarFallback className='text-ecstasy-400'>{userName.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          {label && (
            <span>
              hi, <strong className='text-ecstasy-400 group-hover/user-button:text-current'>{userName}</strong>
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56'>
        <SignOutButton
          variant='ghost'
          className='w-full justify-start'
        >
          <LogOut />
          <label>Sign Out</label>
        </SignOutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
