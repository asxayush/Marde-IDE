import { useEffect, useState } from 'react';
import { MdDarkMode } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { FaSackDollar } from 'react-icons/fa6';
import {Link} from 'react-router-dom';

function Navbar() {
    const [isDark, setIsDark] = useState(true);
    const { userData } = useSelector((state) => state.user);
    const name = userData?.name?.trim() || 'Guest';
    const initials = name
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((word) => word[0])
        .join('')
        .toUpperCase();

    
    useEffect(() => {
        if (typeof window === 'undefined') return;
        const theme = window.localStorage.getItem('theme');
        const dark = theme ? theme === 'dark' : true;
        document.documentElement.classList.toggle('dark', dark);
        setIsDark(dark);
    }, []);

    const toggleTheme = () => {
        const next = !isDark;
        setIsDark(next);
        document.documentElement.classList.toggle('dark', next);
        window.localStorage.setItem('theme', next ? 'dark' : 'light');
    };

    return (
        <nav className='flex h-16 w-full items-center justify-between border-b border-slate-200/70 bg-white/70 px-4 font-sans backdrop-blur-lg transition-colors duration-300 sm:px-6 dark:border-white/[0.08] dark:bg-white/[0.03]'>
            <div className='flex min-w-0 items-center gap-2.5'>
                <div className='flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-900 text-xs font-bold text-white shadow-sm dark:bg-white dark:text-slate-900'>
                    <img src='../../public/favicon.svg' alt='Logo'  />
                </div>
                <Link to='/home'>
                    <span className='truncate text-sm font-bold tracking-tight text-slate-900 dark:text-white'>
                        Marde AI
                    </span>
                </Link>
            </div>

            <div className='flex items-center gap-2 sm:gap-3'>
                <div className='flex items-center rounded-lg border border-slate-200/80 bg-white/70 px-2.5 py-1.5 shadow-sm dark:border-white/[0.1] dark:bg-white/[0.04]'>
                    <FaSackDollar className='mr-2 text-amber-500' size={16} />
                    <span className='text-xs font-semibold tabular-nums text-slate-700 dark:text-slate-200'>
                        {userData?.credits ?? 1000}
                    </span>
                    <span className='ml-1 hidden text-xs text-slate-500 sm:inline dark:text-slate-400'>
                        
                    </span>
                </div>

                <button
                    type='button'
                    onClick={toggleTheme}
                    aria-label='Toggle color theme'
                    className='flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition-colors duration-150 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-white/[0.06] dark:hover:text-white'
                >
                    <MdDarkMode size={18} />
                </button>

                <button
                    type='button'
                    aria-label={`Open ${name} profile`}
                    className='flex h-10 items-center rounded-lg p-1 transition-colors duration-150 hover:bg-slate-100 dark:hover:bg-white/[0.06]'
                >
                    <div className='flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-slate-600 to-slate-700 ring-1 ring-black/5 dark:from-slate-200 dark:to-white dark:ring-white/20'>
                        <span className='text-xs font-semibold text-white dark:text-slate-900'>
                            {initials}
                        </span>
                    </div>
                </button>
            </div>
        </nav>
    );
}

export default Navbar;
