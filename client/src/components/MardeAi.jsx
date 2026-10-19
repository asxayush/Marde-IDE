import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { LuX } from 'react-icons/lu';

/*
  Floating AI assistant / help button (neeche-left me, scroll pe wahin rehta hai)
  - createPortal se document.body me render hota hai, to parent ke backdrop-blur/transform
    ki wajah se `fixed` kabhi nahi tootega
  - Light + dark mode, hover pe halka lift, Esc se panel band
  - Logo public/favicon.svg se aata hai (Vite me '/favicon.svg' likhte hain)
*/

export default function AssistantButton() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  return createPortal(
    <div className='fixed bottom-5 left-5 z-50 flex flex-col items-start gap-3'>
      {/* Help panel (abhi placeholder, yahan chat UI lagana) */}
      {open && (
        <div
          role='dialog'
          aria-label='Marde AI assistant'
          className='w-72 rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-xl shadow-slate-900/10 backdrop-blur-xl dark:border-white/[0.1] dark:bg-slate-900/95 dark:shadow-black/40'
        >
          <div className='flex items-start justify-between'>
            <div>
              <p className='text-sm font-semibold text-slate-900 dark:text-white'>Marde Assistant</p>
              <p className='mt-1 text-xs text-slate-500 dark:text-slate-400'>
                Ask anything about Marde AI or how to get started.
              </p>
            </div>
            <button
              type='button'
              onClick={() => setOpen(false)}
              aria-label='Close assistant'
              className='rounded-md p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-white/[0.06] dark:hover:text-white'
            >
              <LuX size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Round button */}
      <button
        type='button'
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? 'Close assistant' : 'Open AI assistant'}
        aria-expanded={open}
        className='flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-black shadow-lg shadow-black/20 ring-1 ring-black/10 transition-all duration-200 hover:-translate-y-0.5 hover:scale-105 hover:shadow-xl active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 dark:ring-white/20 motion-reduce:transform-none'
      >
        <img src='/favicon.svg' alt='' className='h-full w-full object-cover' />
      </button>
    </div>,
    document.body
  );
}