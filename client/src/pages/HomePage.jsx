import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

function HomePage() {
    return (
        <div className='hide-scrollbar flex min-h-screen flex-col overflow-y-auto bg-slate-50 font-sans transition-colors duration-300 dark:bg-[#07070c]'>
            <nav className='flex h-16 w-full shrink-0 items-center justify-between border-b border-slate-200/70 bg-white/70 px-4 backdrop-blur-lg sm:px-6 dark:border-white/[0.08] dark:bg-white/[0.03]'>
                <Link to='/home' className='flex items-center gap-2.5'>
                    <div className='flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 shadow-sm dark:bg-white'>
                        <img
                            src='/favicon.svg'
                            alt='Marde AI logo'
                            className='h-6 w-6 rounded-md'
                        />
                    </div>
                    <span className='text-sm font-bold tracking-tight text-slate-900 dark:text-white'>
                        Marde AI
                    </span>
                </Link>

                <Link
                    to='/'
                    className='rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors duration-150 hover:bg-slate-700 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200'
                >
                    Sign up
                </Link>
            </nav>

            <main className='min-h-[calc(100vh-4rem)] flex-1'>
                {/* Homepage content can be added here without affecting footer placement. */}
            </main>

            <Footer />
        </div>
    );
}

export default HomePage;