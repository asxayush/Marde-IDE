import { LuFolder, LuPanelLeftClose, LuPlus, LuSettings } from 'react-icons/lu';

/*
  Marde AI sidebar (minimal)
  - Navbar (h-16) ke neeche left me fixed, slide in/out transition ke saath
  - Colors navbar se match: light = white/slate, dark = near-black with white/10 borders
  - Close button sidebar ke andar hai (alag floating X ki zaroorat nahi)
  - Props:
      open        : boolean
      onClose     : () => void
      projects    : [{ id, name }]
      activeId    : currently selected project id
      onSelect    : (id) => void
      onNewProject: () => void
*/

export default function SideBar({
  open = true,
  onClose,
  projects = [],
  activeId,
  onSelect,
  onNewProject,
}) {
  return (
    <aside
      aria-label='Sidebar'
      aria-hidden={!open}
      className={[
        'fixed left-0 top-16 z-30 flex h-[calc(100vh-4rem)] w-64 flex-col border-r font-sans',
        'border-slate-200/70 bg-white text-slate-900',
        'dark:border-white/[0.08] dark:bg-[#0b0b0f] dark:text-white',
        'transition-transform duration-300 ease-out motion-reduce:transition-none',
        open ? 'translate-x-0' : '-translate-x-full',
      ].join(' ')}
    >
      {/* Header */}
      <div className='flex items-center justify-between px-4 py-3'>
        <span className='text-xs font-medium uppercase tracking-wider text-slate-400 dark:text-slate-500'>
          Workspace
        </span>
        <button
          type='button'
          onClick={onClose}
          aria-label='Close sidebar'
          className='flex h-8 w-8 items-center justify-center rounded-md text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-white/[0.06] dark:hover:text-white'
        >
          <LuPanelLeftClose size={18} />
        </button>
      </div>

      {/* New project */}
      <div className='px-3'>
        <button
          type='button'
          onClick={onNewProject}
          className='flex w-full items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 dark:border-white/[0.1] dark:text-slate-200 dark:hover:bg-white/[0.05]'
        >
          <LuPlus size={16} />
          New project
        </button>
      </div>

      {/* Projects list */}
      <nav className='mt-5 flex-1 overflow-y-auto px-3'>
        <p className='px-2 pb-2 text-xs font-medium uppercase tracking-wider text-slate-400 dark:text-slate-500'>
          Recent
        </p>

        {projects.length === 0 ? (
          <p className='px-2 py-2 text-sm text-slate-400 dark:text-slate-500'>No projects yet</p>
        ) : (
          <ul className='space-y-0.5'>
            {projects.map((project) => {
              const active = project.id === activeId;
              return (
                <li key={project.id}>
                  <button
                    type='button'
                    onClick={() => onSelect?.(project.id)}
                    aria-current={active ? 'page' : undefined}
                    className={[
                      'flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-sm transition-colors',
                      active
                        ? 'bg-slate-100 font-medium text-slate-900 dark:bg-white/[0.08] dark:text-white'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-white/[0.04] dark:hover:text-white',
                    ].join(' ')}
                  >
                    <LuFolder size={16} className='shrink-0' />
                    <span className='truncate'>{project.name}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </nav>

      {/* Footer */}
      <div className='border-t border-slate-200/70 p-3 dark:border-white/[0.08]'>
        <button
          type='button'
          className='flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-white/[0.04] dark:hover:text-white'
        >
          <LuSettings size={16} />
          Settings
        </button>
      </div>
    </aside>
  );
}