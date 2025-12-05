/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Fond Profond (Abyss)
                abyss: {
                    50: '#f0fdfa',
                    100: '#ccfbf1',
                    200: '#99f6e4',
                    300: '#5eead4',
                    400: '#2dd4bf',
                    500: '#14b8a6',
                    600: '#0d9488',
                    700: '#0f766e',
                    800: '#0f514e', // Dark Teal
                    900: '#083344', // Deep Blue
                    950: '#020617', // Almost Black
                },
                // Bioluminescence (Neon Accents)
                biolum: {
                    cyan: '#22d3ee',
                    green: '#4ade80',
                    purple: '#a78bfa',
                    glow: '#67e8f9',
                },
                // Alias pour compatibilité
                primary: {
                    DEFAULT: '#06b6d4', // Cyan-500
                    50: '#ecfeff',
                    100: '#cffafe',
                    200: '#a5f3fc',
                    300: '#67e8f9',
                    400: '#22d3ee',
                    500: '#06b6d4',
                    600: '#0891b2',
                    700: '#0e7490',
                    800: '#155e75',
                    900: '#164e63',
                },
            },
            backgroundImage: {
                'abyss-gradient': 'radial-gradient(circle at center, #0f514e 0%, #020617 100%)',
                'glow-gradient': 'linear-gradient(135deg, rgba(34, 211, 238, 0.1) 0%, rgba(74, 222, 128, 0.05) 100%)',
            },
            boxShadow: {
                'neon': '0 0 10px rgba(34, 211, 238, 0.5), 0 0 20px rgba(34, 211, 238, 0.3)',
                'neon-hover': '0 0 15px rgba(34, 211, 238, 0.7), 0 0 30px rgba(34, 211, 238, 0.5)',
                'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
            },
            fontFamily: {
                sans: ['"Inter"', 'sans-serif'],
                display: ['"Outfit"', 'sans-serif'], // Modern geometric font
            },
            animation: {
                'pulse-glow': 'pulse-glow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'float-slow': 'float 8s ease-in-out infinite',
                'slide-up': 'slideUp 0.8s ease-out forwards',
            },
            keyframes: {
                'pulse-glow': {
                    '0%, 100%': { opacity: '1', filter: 'brightness(1)' },
                    '50%': { opacity: '.8', filter: 'brightness(1.2)' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(50px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
            },
        },
    },
    plugins: [],
}
