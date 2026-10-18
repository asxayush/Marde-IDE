import { useRef, useState } from 'react';
import { LuArrowUp, LuPlus } from 'react-icons/lu';

/*
  Marde AI homepage demo prompt box (Replit jaisa)
  - Light + dark mode (Tailwind `dark:` variant)
  - Textarea apne aap badhta hai (max 200px tak)
  - Enter = send, Shift+Enter = nayi line
  - Send pe `onSubmit(prompt)` chalta hai. Demo ke liye wahan signup modal kholo.
*/

const SUGGESTIONS = [
  'Build a todo app with login',
  'Create a landing page for my startup',
  'Make a REST API with Express and MongoDB',
  'Add dark mode to my React app',
];

export default function PromptBox({ onSubmit }) {
  const [value, setValue] = useState('');
  const textareaRef = useRef(null);

  const resize = () => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, 200)}px`;
  };

  const handleChange = (e) => {
    setValue(e.target.value);
    resize();
  };

  const send = () => {
    const prompt = value.trim();
    if (!prompt) return;
    onSubmit?.(prompt); // demo: yahan signup modal kholo
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  const useSuggestion = (text) => {
    setValue(text);
    // state update ke baad height theek karo
    requestAnimationFrame(() => {
      resize();
      textareaRef.current?.focus();
    });
  };

  return (
    <div className='mx-auto w-full max-w-2xl px-4'>
      <div
        className={[
          'rounded-2xl border p-3 shadow-lg backdrop-blur-xl transition-colors duration-200',
          'border-slate-200 bg-white/80 shadow-slate-900/5',
          'dark:border-white/[0.1] dark:bg-white/[0.04] dark:shadow-black/30',
          'focus-within:border-orange-500 dark:focus-within:border-orange-400',
        ].join(' ')}
      >
        <textarea
          ref={textareaRef}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          rows={2}
          placeholder='What do you want to build?'
          aria-label='Describe what you want to build'
          className='block max-h-[200px] min-h-[56px] w-full resize-none bg-transparent px-2 py-1 text-[15px] text-slate-900 placeholder:text-slate-400 focus:outline-none dark:text-white dark:placeholder:text-slate-500'
        />

        <div className='mt-2 flex items-center justify-between'>
          <button
            type='button'
            aria-label='Attach file'
            className='flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-white/[0.06] dark:hover:text-white'
          >
            <LuPlus size={18} />
          </button>

          <button
            type='button'
            onClick={send}
            disabled={!value.trim()}
            aria-label='Send prompt'
            className='flex h-9 w-9 items-center justify-center rounded-lg bg-orange-500 text-white transition-all duration-150 hover:bg-orange-600 active:scale-95 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400 dark:bg-orange-400 dark:text-slate-900 dark:hover:bg-orange-300 dark:disabled:bg-white/[0.08] dark:disabled:text-slate-500'
          >
            <LuArrowUp size={18} />
          </button>
        </div>
      </div>

      {/* Suggestion chips */}
      <div className='mt-4 flex flex-wrap justify-center gap-2'>
        {SUGGESTIONS.map((text) => (
          <button
            key={text}
            type='button'
            onClick={() => useSuggestion(text)}
            className='rounded-full border border-slate-200 bg-white/60 px-3 py-1.5 text-xs text-slate-600 transition-colors hover:border-orange-500 hover:text-orange-600 dark:border-white/[0.1] dark:bg-white/[0.03] dark:text-slate-300 dark:hover:border-orange-400 dark:hover:text-orange-300'
          >
            {text}
          </button>
        ))}
      </div>
    </div>
  );
}