/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './data/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        midnight: '#06182d',
        'midnight-deep': '#050b15',
        glass: 'rgba(255, 255, 255, 0.1)',
        mint: '#dff7ee',
        skysoft: '#e6f1ff',
        warmbeige: '#f5efd9',
      },
      boxShadow: {
        glass: '0 24px 80px rgba(0, 0, 0, 0.22)',
      },
      backdropBlur: {
        glass: '18px',
      },
    },
  },
}

export default config
