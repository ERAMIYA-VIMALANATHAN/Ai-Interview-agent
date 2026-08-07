import { ReactNode } from 'react';
import Nav from './Nav';

interface Props {
  children: ReactNode;
  full?: boolean;
}

export default function Layout({ children, full = false }: Props) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Nav />
      <main className={full ? '' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'}>
        {children}
      </main>
    </div>
  );
}
