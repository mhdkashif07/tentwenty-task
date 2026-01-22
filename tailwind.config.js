/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1A56DB',
        panelhero: '#1C64F2',
        background: '#FFFFFF',
        foreground: '#0F172A',
        muted: '#94A3B8',
        accent: '#60A5FA',
        success: '#16A34A',
        danger: '#DC2626',
        border: '#E5E7EB'
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui']
      }
    }
  },
  plugins: []
};
