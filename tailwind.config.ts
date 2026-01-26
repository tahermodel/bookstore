import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            boxShadow: {
                'glass-premium': '0 20px 50px -10px rgba(28, 25, 23, 0.1), 0 10px 20px -5px rgba(28, 25, 23, 0.04)',
                'glass-button': '0 10px 15px -3px rgba(0, 0, 0, 0.05)',
                'glass-hover': '0 30px 40px -10px rgba(0, 0, 0, 0.12)',
                'glass-inset': 'inset 0 0 0 1.5px rgba(255, 255, 255, 0.6), inset 0 0 30px 0 rgba(255, 255, 255, 0.4)',
                'glass-glow': 'inset 10px 10px 20px -10px rgba(255, 255, 255, 0.8)',
            },
            backgroundColor: {
                'white-glass': 'rgba(255, 255, 255, 0.35)',
                'white-glass-material': 'rgba(255, 255, 255, 0.88)',
                'dark-glass': 'rgba(28, 25, 23, 0.4)',
            },
            backgroundImage: {
                'glass-noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E\")",
            }
        },
    },
    plugins: [require("@tailwindcss/typography")],
};
export default config;