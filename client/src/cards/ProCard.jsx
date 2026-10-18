import { LuCheck, LuPlus } from 'react-icons/lu';

/*
  Marde AI pricing cards
  - Tailwind `dark:` variant use karta hai (tumhara <html class="dark"> toggle kaam karega)
  - Animation sirf HOVER pe: card upar uthta hai, thoda bada hota hai, border + glow aata hai
  - Click pe koi animation nahi
  - Prices / features placeholder hain, apne hisaab se badal lena
*/

const PLANS = [
  {
    id: 'starter',
    name: 'Starter',
    price: '$0',
    oldPrice: null,
    badge: null,
    period: 'free forever',
    tagline: 'For trying Marde AI and small side projects.',
    featuresTitle: 'Includes:',
    features: [
      '1,500 tokens to start',
      'AI code generation',
      'Browser-based editor',
      'Save up to 3 projects',
    ],
    cta: 'Start for free',
  },
  {
    id: 'pro',
    name: 'Marde Pro',
    price: '$15',
    oldPrice: '$20',
    badge: 'Save $60',
    period: 'per month, billed annually',
    tagline: 'For serious builds and daily use.',
    featuresTitle: 'Everything in Starter plus:',
    features: [
      '50,000 tokens every month',
      'Access to the most powerful models',
      'Unlimited projects',
      'Priority generation speed',
    ],
    cta: 'Join Marde Pro',
  },
];

function PlanCard({ plan }) {
  return (
    <article
      className={[
        'relative flex w-full max-w-sm flex-col rounded-2xl border p-6 text-left',
        'bg-white text-slate-900 dark:bg-white/[0.03] dark:text-white',
        'border-slate-200 dark:border-white/[0.1]',
        // hover animation
        'transition-all duration-300 ease-out',
        'hover:-translate-y-2 hover:scale-[1.02]',
        'hover:border-orange-500 hover:shadow-xl hover:shadow-orange-500/15',
        'dark:hover:border-orange-400 dark:hover:shadow-orange-400/15',
        // reduced-motion wale users ke liye movement band
        'motion-reduce:transform-none motion-reduce:transition-colors',
      ].join(' ')}
    >
      {/* Header: plan name + badge */}
      <div className='flex items-center justify-between'>
        <h3 className='text-sm font-medium text-slate-500 dark:text-slate-400'>{plan.name}</h3>
        {plan.badge && (
          <span className='rounded-full bg-orange-100 px-3 py-1 text-xs font-medium text-orange-600 dark:bg-orange-500/15 dark:text-orange-300'>
            {plan.badge}
          </span>
        )}
      </div>

      {/* Price */}
      <div className='mt-5 flex items-end gap-3'>
        {plan.oldPrice && (
          <span className='text-lg text-slate-400 line-through dark:text-slate-500'>{plan.oldPrice}</span>
        )}
        <span className='text-5xl font-semibold tracking-tight'>{plan.price}</span>
        <span className='pb-1 text-xs leading-tight text-slate-500 dark:text-slate-400'>
          {plan.period}
        </span>
      </div>

      <p className='mt-5 text-sm text-slate-600 dark:text-slate-300'>{plan.tagline}</p>

      {/* Features */}
      <ul className='mt-5 space-y-3 text-sm'>
        <li className='flex items-center gap-3 text-slate-700 dark:text-slate-200'>
          <LuPlus className='h-4 w-4 shrink-0 text-slate-400 dark:text-slate-500' />
          {plan.featuresTitle}
        </li>
        {plan.features.map((feature) => (
          <li key={feature} className='flex items-center gap-3 text-slate-700 dark:text-slate-200'>
            <LuCheck className='h-4 w-4 shrink-0 text-slate-400 dark:text-slate-500' />
            {feature}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <button
        type='button'
        onClick={() => {
          // yahan signup modal kholo ya checkout pe bhejo
        }}
        className='mt-8 w-full rounded-lg border border-orange-500 py-2.5 text-sm font-medium text-orange-600 transition-colors duration-150 hover:bg-orange-500 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/50 dark:border-orange-400 dark:text-orange-300 dark:hover:bg-orange-400 dark:hover:text-slate-900'
      >
        {plan.cta}
      </button>
    </article>
  );
}

export default function ProCard() {
  return (
    <section className='flex w-full flex-col items-center justify-center gap-6 px-4 py-12 md:flex-row md:items-stretch cursor-pointer'>
      {PLANS.map((plan) => (
        <PlanCard key={plan.id} plan={plan} />
      ))}
    </section>
  );
}