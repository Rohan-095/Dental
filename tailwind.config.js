/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './data/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Legacy tokens kept for back-compat in Phase A.
        // Phase B migrates section backgrounds to the semantic tokens below.
        midnight: '#06182d',
        'midnight-deep': '#050b15',
        glass: 'rgba(255, 255, 255, 0.1)',
        mint: '#dff7ee',
        skysoft: '#e6f1ff',
        warmbeige: '#f5efd9',

        // Semantic surface tokens (Phase A foundation)
        'surface-deep': '#06182d',
        'surface-base': '#F8F4EC',
        'surface-card': '#FFFFFF',
        'surface-warm': '#F0E9DC',

        // Semantic accents
        'accent-primary': '#2DD4BF',
        'accent-ice': '#E0F2F1',
        'accent-warm': '#FF8A4C',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Fraunces', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'Inter', 'Segoe UI', 'sans-serif'],
      },
      boxShadow: {
        glass: '0 24px 80px rgba(0, 0, 0, 0.22)',
        card: '0 4px 24px rgba(15,23,42,0.07), 0 1px 4px rgba(15,23,42,0.04)',
        lift: '0 16px 50px rgba(15,23,42,0.10), 0 4px 12px rgba(15,23,42,0.06)',
        floating: '0 30px 80px rgba(0,0,0,0.22), 0 8px 24px rgba(0,0,0,0.12)',
      },
      backdropBlur: {
        glass: '18px',
      },
    },
  },
}

export default config
