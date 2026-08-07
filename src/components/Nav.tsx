import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Home, LayoutDashboard, Route, Building2, Mic2, BookOpen, Target, User, Menu, X, LogOut } from 'lucide-react';
import supabase from '../lib/supabase';

const links = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/career', label: 'Career', icon: User },
  { to: '/roadmap', label: 'Roadmap', icon: Route },
  { to: '/company-intel', label: 'Companies', icon: Building2 },
  { to: '/interview', label: 'Interview', icon: Mic2 },
  { to: '/learn', label: 'Learn', icon: BookOpen },
  { to: '/focus', label: 'Focus', icon: Target },
];

export default function Nav() {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <NavLink to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white text-xs font-bold">L</div>
            <span className="text-slate-100 font-semibold tracking-tight">Luna</span>
          </NavLink>

          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm transition-colors ${
                    isActive ? 'bg-indigo-500/10 text-indigo-300' : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900'
                  }`
                }
              >
                <link.icon className="w-4 h-4" />
                {link.label}
              </NavLink>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <button
                onClick={() => supabase.auth.signOut()}
                className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-100 px-3 py-2 rounded-lg hover:bg-slate-900 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Sign out
              </button>
            ) : (
              <NavLink to="/login" className="text-sm text-slate-100 bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-lg transition-colors">
                Sign in
              </NavLink>
            )}
          </div>

          <button onClick={() => setOpen(!open)} className="md:hidden p-2 text-slate-300">
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-slate-800/60 bg-slate-950/95 backdrop-blur-md">
          <div className="px-4 py-3 space-y-1">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm ${
                    isActive ? 'bg-indigo-500/10 text-indigo-300' : 'text-slate-400'
                  }`
                }
              >
                <link.icon className="w-4 h-4" />
                {link.label}
              </NavLink>
            ))}
            {user ? (
              <button
                onClick={() => { supabase.auth.signOut(); setOpen(false); }}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-400 w-full"
              >
                <LogOut className="w-4 h-4" />
                Sign out
              </button>
            ) : (
              <NavLink to="/login" onClick={() => setOpen(false)} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-indigo-300">
                Sign in
              </NavLink>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
