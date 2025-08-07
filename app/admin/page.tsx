import { getIsAdmin } from '@/lib/admin';
import App from './app';
import { notFound } from 'next/navigation';

const AdminPage = async () => {
  const isAdmin = await getIsAdmin();

  if (!isAdmin) notFound();

  return <App />;
};

export default AdminPage;
