/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
    theme: {
        extend: {
            colors: {
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                card: { DEFAULT: 'hsl(var(--card))', foreground: 'hsl(var(--card-foreground))' },
                popover: { DEFAULT: 'hsl(var(--popover))', foreground: 'hsl(var(--popover-foreground))' },
                primary: { DEFAULT: 'hsl(var(--primary))', foreground: 'hsl(var(--primary-foreground))' },
                secondary: { DEFAULT: 'hsl(var(--secondary))', foreground: 'hsl(var(--secondary-foreground))' },
                muted: { DEFAULT: 'hsl(var(--muted))', foreground: 'hsl(var(--muted-foreground))' },
                accent: { DEFAULT: 'hsl(var(--accent))', foreground: 'hsl(var(--accent-foreground))' },
                destructive: { DEFAULT: 'hsl(var(--destructive))', foreground: 'hsl(var(--destructive-foreground))' },
                border: 'hsl(var(--border))',
                input: 'hsl(var(--input))',
                ring: 'hsl(var(--ring))',
                titli: {
                    pink: '#EC5A99',
                    'pink-hover': '#D84C8A',
                    action: '#B83268',
                    'action-hover': '#A32857',
                    'light-pink': '#FFC5DE',
                    'pale-pink': '#FEF1F8',
                    cream: '#FFFBF7',
                    ink: '#111111',
                    meta: '#4A4A4A',
                }
            },
            fontFamily: {
                sans: ['Manrope', 'Inter', 'ui-sans-serif', 'system-ui'],
                body: ['Inter', 'ui-sans-serif', 'system-ui'],
                script: ['"Shadows Into Light"', 'cursive'],
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)',
            },
            boxShadow: {
                soft: '0 8px 30px rgba(0,0,0,0.04)',
                lift: '0 20px 40px rgba(0,0,0,0.08)',
                hero: '0 30px 60px rgba(236,90,153,0.18)',
                pill: '0 10px 30px rgba(236,90,153,0.15)',
            },
            transitionTimingFunction: { titli: 'cubic-bezier(0.22, 1, 0.36, 1)' },
            keyframes: {
                'accordion-down': { from: { height: '0' }, to: { height: 'var(--radix-accordion-content-height)' } },
                'accordion-up': { from: { height: 'var(--radix-accordion-content-height)' }, to: { height: '0' } },
                'flutter': {
                    '0%,100%': { transform: 'translateY(0) rotate(0)' },
                    '50%': { transform: 'translateY(-6px) rotate(-2deg)' }
                },
                'pink-glow': {
                    '0%,100%': { boxShadow: '0 0 0 0 rgba(236,90,153,0.35)' },
                    '50%': { boxShadow: '0 0 0 18px rgba(236,90,153,0)' }
                }
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
                'flutter': 'flutter 5s ease-in-out infinite',
                'pink-glow': 'pink-glow 2.8s ease-out infinite',
            }
        }
    },
    plugins: [require("tailwindcss-animate")],
};
