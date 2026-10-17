import { Link } from 'react-router-dom';

function Footer() {
    return (
<footer className='w-full shrink-0 border-t border-slate-200/70 bg-white/70 py-4 text-sm text-slate-500 backdrop-blur-lg transition-colors duration-300 dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-slate-400'>
    <div className='mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 sm:flex-row sm:px-6'>
        <p>&copy; {new Date().getFullYear()} Marde AI. All rights reserved.</p>
        <Link to='/privacy' className='hover:underline'>
            Privacy Policy
        </Link>
    </div>
</footer>
    );
}

export default Footer;
