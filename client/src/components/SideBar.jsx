import react from "react";
import {motion} from "motion/react"


function SideBar({activeSession, setActiveSession}) {

  const isActive = activeSession=="projects"?"projects":"starred"

  return(
    <div className="flex h-full w-64 shrink-0 flex-col border-r border-slate-200/70 bg-white/60 px-3 py-5 font-sans backdrop-blur-xl transition-colors duration-300 dark:border-white/[0.06] dark:bg-white/[0.02]">
       <div className="flex flex-col gap-1">
          <motion.div
            whileTap={{scale:0.97}}
            className={`relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13.5px] font-medium transition-colors duration-150 ${isActive ? "text-slate-900 dark:text-white" : "text-slate-500 hover:bg-slate-100/80 hover:text-slate-800 dark:text-slate-400 dark:hover:bg-white/[0.04] dark:hover:text-slate-200"}`}
          >

          </motion.div>


          <motion.div
            whileTap={{scale:0.97}}
            className={`relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13.5px] font-medium transition-colors duration-150 ${isActive ? "text-slate-900 dark:text-white" : "text-slate-500 hover:bg-slate-100/80 hover:text-slate-800 dark:text-slate-400 dark:hover:bg-white/[0.04] dark:hover:text-slate-200"}`}
          >

          </motion.div>
       </div>

    </div>
  )
}

export default SideBar