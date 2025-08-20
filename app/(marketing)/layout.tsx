import { SignInModal } from '@/components/modals/sign-in-modal';
import { SignUpAlertModal, SignUpModal } from '@/components/modals/sign-up-modal';
import { Footer } from './footer';
import { Header } from './header';
import { PrivacyPolicyModal } from '@/components/modals/privacy-policy-modal';

type Props = {
  children: React.ReactNode;
};

const MarketingLayout = ({ children }: Readonly<Props>) => (
  <div className='min-h-dvh flex flex-col'>
    <PrivacyPolicyModal />
    <SignUpModal />
    <SignUpAlertModal />
    <SignInModal />
    <Header />
    <main className='flex-2 flex flex-col items-center justify-center'>{children}</main>
    <Footer />
  </div>
);

export default MarketingLayout;
