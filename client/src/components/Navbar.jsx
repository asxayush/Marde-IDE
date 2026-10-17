import { useEffect, useState } from 'react';
import { FiUser } from 'react-icons/fi'
import { MdDarkMode } from "react-icons/md";
import { useSelector } from 'react-redux'

function Navbar() {
    const [isDark, setIsDark] = useState(true)

    const {userData} = useSelector((state) => state.user)
    const name = userData.name || "Guest"
    const initals = name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUppperCase()
    
    useEffect(() =>{
        if(typeof window == undefined) return;
        const theme = window.localStorage.getItem("theme")
        const dark = theme?theme=="dark":true
        document.documentElement.classList.toggle("dark", dark)
        setIsDark(dark)
    } ,[])

    const toggleTheme = () => {
        const next = !isDark
        setIsDark(next)
        document.documentElement.classList.toggle("dark", next)
        window.localStorage.setItem("theme", next?"dark":"light")
    }

    return (
        <div className='w-full h-16 bg-white/70 dark:bg-white/[0.03] backdrop-blur-lg border-b border-slate-200/70 dark:border-white/[0.08] flex items-center gap-6 font-sans transition-colors duration-300 px-4'>

            <div className='flex items-center gap-2.5 shrink-0'>
                <span className='text-slate-900 dark:text-white font-bold tracking-tight'>
                    Marde AI
                </span>
            </div>
            <div className='flex-1' />
            <div className='flex items-center gap-2.5 shrink-0'>
                <button 
                onClick={toggleTheme}
                className='flex w-9 h-9 items-center justify-center rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-colors duration-150'>
                    <MdDarkMode size ={18} />
                </button>

                <div className='relative ml-1'>
                    <button className='flex items-center gap-2 pl-1.5 pr-2 h-10 rounded-lg hover:bg-slate-100 dark:hover:bg-white transition-colors duration-150'>
                        <div className='w-8 h-8 rounded-fu;; bg-gradient-to-br from-slate-600 to-slate-700 dark:from-slate-200 dark:to-white flex items-center justify-center overflow-hidden ring-1 ring-black/5 dark:ring-white/20'>
                            <span className='text-[12px] font-semibold text-white dark:text-slate-900'>
                            {initals}
                            </span>
                        </div>

                    </button>

                </div>
            </div>


        </div>
    )
}

export default Navbar