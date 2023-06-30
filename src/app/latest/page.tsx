import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Latest Posts',
};

function LatestPage() {
  return redirect(`/latest/1`);
}

export default LatestPage;
