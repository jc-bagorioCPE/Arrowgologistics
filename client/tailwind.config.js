/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: { sans: ['Outfit', 'system-ui', 'sans-serif'] },
      colors: {
        border: 'var(--border)', input: 'var(--border)', ring: 'var(--ring)',
        background: 'var(--background)', foreground: 'var(--foreground)',
        primary: { DEFAULT: 'var(--primary)', foreground: 'var(--primary-foreground)' },
        secondary: { DEFAULT: 'var(--secondary)', foreground: 'var(--secondary-foreground)' },
        muted: { DEFAULT: 'var(--muted)', foreground: 'var(--muted-foreground)' },
        accent: { DEFAULT: 'var(--accent)', foreground: 'var(--accent-foreground)' },
        card: { DEFAULT: 'var(--card)', foreground: 'var(--foreground)' },
        destructive: 'var(--destructive)',
        // Arrowgo brand tokens (from the prototype)
        navy: '#0F1F5C', brand: { DEFAULT: '#2350D0', dark: '#1A3594' },
        mist: '#E6EDFC', soft: '#F3F6FE', line: '#D9E2F4', ink: '#1B2748', mute: '#55658A',
      },
      borderRadius: { lg: 'var(--radius)', md: 'calc(var(--radius) - 2px)', sm: 'calc(var(--radius) - 4px)' },
      keyframes: {
        up: { from: { opacity: 0, transform: 'translateY(24px)' } },
        drop: { from: { opacity: 0, transform: 'translateY(-100%)' } },
        globein: { from: { opacity: 0, transform: 'scale(.9) rotate(-6deg)' } },
        swap: { from: { opacity: 0, transform: 'translateY(8px)' } },
        ring: { to: { transform: 'scale(3.2)', opacity: 0 } },
        marquee: { to: { transform: 'translateX(-50%)' } },
      },
      animation: {
        up: 'up .85s cubic-bezier(.2,.7,.2,1) both',
        drop: 'drop .6s ease both',
        globein: 'globein 1.2s cubic-bezier(.2,.7,.2,1) .3s both',
        swap: 'swap .35s ease both',
        ring: 'ring 2s infinite',
        marquee: 'marquee 30s linear infinite',
      },
    },
  },
  plugins: [],
};
