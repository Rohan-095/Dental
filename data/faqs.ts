export type FAQ = { id: number; question: string; answer: string }

export const FAQS: FAQ[] = [
  {
    id: 1,
    question: 'Do you accept walk-ins?',
    answer: 'We accept walk-ins based on availability. For guaranteed slots, booking online or calling ahead is recommended.',
  },
  {
    id: 2,
    question: 'What insurance plans do you accept?',
    answer: 'We accept most major insurance plans and offer direct billing. Contact us to confirm your specific provider.',
  },
  {
    id: 3,
    question: 'How do I handle a dental emergency after hours?',
    answer: 'Call our main line at (604) 555-0192 — we have an after-hours message with emergency contacts and keep same-day slots.',
  },
  {
    id: 4,
    question: 'What should I bring to my first appointment?',
    answer: 'Bring a valid photo ID, your insurance card, and any existing dental records or X-rays if available.',
  },
  {
    id: 5,
    question: 'How long does a cleaning take?',
    answer: 'A standard cleaning appointment takes about 45–60 minutes, including a brief exam and X-rays if needed.',
  },
  {
    id: 6,
    question: 'Do you offer payment plans?',
    answer: 'Yes, we offer flexible payment options. Our team can walk you through financing during your consultation.',
  },
]
