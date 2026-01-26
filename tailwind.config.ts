import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            boxShadow: {
                'glass-premium': '0 8px 32px 0 rgba(28, 25, 23, 0.05)',
                'glass-button': '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
                'glass-hover': '0 20px 25px -5px rgba(0, 0, 0, 0.08)',
                'glass-inset': 'inset 0 0 0 1px rgba(255, 255, 255, 0.3), inset 0 0 20px 0 rgba(255, 255, 255, 0.2)',
            },
            backgroundColor: {
                'white-glass': 'rgba(255, 255, 255, 0.4)',
                'white-glass-material': 'rgba(255, 255, 255, 0.85)',
                'dark-glass': 'rgba(28, 25, 23, 0.4)',
            },
            backgroundImage: {
                'glass-noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E\")",
            }
        },
    },
    plugins: [require("@tailwindcss/typography")],
};
export default config;