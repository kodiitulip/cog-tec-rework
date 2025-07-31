import { getIsAdmin } from '@/lib/admin';
import App from './app';
import { redirect } from 'next/navigation';

const AdminPage = async () => {
  const isAdmin = await getIsAdmin();

  if (!isAdmin) redirect('/');

  return <App />;
};

export default AdminPage;
