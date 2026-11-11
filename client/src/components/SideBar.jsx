import { motion } from "motion/react";
import { FiFolder, FiStar, FiZap } from "react-icons/fi";

const items = [
  { id: "projects", label: "Projects", Icon: FiFolder },
  { id: "starred", label: "Starred", Icon: FiStar },
];

function SideBar({ activeSession, setActiveSession }) {
  return (
    <aside className="flex h-full w-64 shrink-0 flex-col border-r border-slate-200/70 bg-white/60 px-3 py-5 font-sans backdrop-blur-xl transition-colors duration-300 dark:border-white/[0.06] dark:bg-white/[0.02]">
      <div className="flex flex-col gap-1">
        {items.map(({ id, label, Icon }) => {
          const isActive = activeSession === id;

          return (
            <motion.button
              key={id}
              type="button"
              whileTap={{ scale: 0.97 }}
              onClick={() => setActiveSession(id)}
              className={`relative flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-[13.5px] font-medium transition-colors duration-150 ${
                isActive
                  ? "text-slate-900 dark:text-white"
                  : "text-slate-500 hover:bg-slate-100/80 hover:text-slate-800 dark:text-slate-400 dark:hover:bg-white/[0.04] dark:hover:text-slate-200"
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="sidebar-active-pill"
                  className="absolute inset-0 rounded-lg bg-slate-100 dark:bg-white/[0.06]"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
              <Icon className="relative z-10 text-base" />
              <span className="relative z-10">{label}</span>
            </motion.button>
          );
        })}

        <div className="my-4 h-px bg-slate-200/70 dark:bg-white[0.06]" />
        <div className="rounded-xl border border-slate-200/70 bg-white/70 p-3.5 shadow-sm backdrop-blur-xl dark:border-white/[0.07] dark:bg-white/[0.03] dark:shadow-none ">
          <p className="mb-1 text-[12.5px] font-medium text-slate-700 dark:text-slate-300">
            Upgrade Plan
          </p>
          <p className="mb-1 text-[12.5px] leading-snug text-slate-400 dark:text-slate-500">
            Upgrade Plan to Pro for more credits
          </p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-slate-900 py-2 text-[12.5px] font-semibold text-white shadow-sm transition-opacity duration-150 hover:opacity-90 dark:bg-white dark:text-slate-900"
          >
            <FiZap
              size={13}
              fill="currentColor"
            />
            Upgrade Now
          </motion.button>
        </div>
        
      </div>
    </aside>
  );
}

export default SideBar;