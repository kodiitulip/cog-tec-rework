import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getCurrentUserName, getCurrentUserAvatarUrl } from '@/lib/supabase/auth/user';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { LogOut } from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/button';
import { type VariantProps } from 'class-variance-authority';
import { SignOutButton } from './buttons';

type UserButtonProps = {
  label?: boolean;
  customLabel?: string;
} & React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants>;

export const UserButton = async ({ label, customLabel, ...props }: UserButtonProps) => {
  const userName = await getCurrentUserName();
  const userAvatarUrl = await getCurrentUserAvatarUrl();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button {...props}>
          <Avatar>
            <AvatarImage src={userAvatarUrl} />
            <AvatarFallback>{userName.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          {label &&
            (customLabel ?? (
              <span>
                hi, <strong className='text-sky-400'>{userName}</strong>
              </span>
            ))}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56'>
        <DropdownMenuItem asChild>
          <SignOutButton
            variant='ghost'
            className='w-full justify-start'
          >
            <LogOut />
            <label>Sign Out</label>
          </SignOutButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
