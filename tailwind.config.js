/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-primary': '#2563EB', // A close blue match for the icons
        'brand-success': '#10B981', // A close green match
        'brand-error': '#EF4444', // A close red match
        'brand-warning': '#F97316', // A close orange match
        'neutral-50': '#F9FAFB',
        'neutral-100': '#F3F4F6',
        'neutral-800': '#1F2937',
        'neutral-900': '#111827',
      },
    },
  },
  plugins: [],
}