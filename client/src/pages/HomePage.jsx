import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import ProCards from '../cards/ProCard';
import PromptBox from '../cards/PromptBox';
import MardeAi from '../components/MardeAi';

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
                    to='/signup'
                    className='rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors duration-150 hover:bg-slate-700 dark:bg-amber-500 dark:text-slate-900 dark:hover:bg-slate-200'
                >
                    Sign up
                </Link>
            </nav>

            <main className='min-h-[calc(100vh-4rem)] flex-1'>
                <h1 className='flex flex-col py-10 m-4 font-itself items-center justify-center  text-5xl font-bold text-slate-900 dark:text-white'> Describe it. Marde builds it.</h1>
                
                <div>
                    <PromptBox onSubmit={(prompt) => setShowSignup(true)} />
                </div>

                <div
                    aria-hidden='true'
                    className='pointer-events-none absolute inset-0 
    [background-image:linear-gradient(to_right,rgba(100,116,139,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(100,116,139,0.12)_1px,transparent_1px)]
    [background-size:48px_48px]
    [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]'
                />
                {/* glow */}
                <div
                    aria-hidden='true'
                    className='pointer-events-none absolute left-1/2 top-0 h-80 w-[40rem] -translate-x-1/2 rounded-full bg-orange-500/20 blur-3xl dark:bg-orange-400/15'
                />

                <div>
                    <ProCards />
                </div>
            </main>
            <div>
                <MardeAi />
            </div>
            <Footer />
        </div>
    );
}

export default HomePage;