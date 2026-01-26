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
            },
            backgroundColor: {
                'white-glass': 'rgba(255, 255, 255, 0.4)',
                'dark-glass': 'rgba(28, 25, 23, 0.4)',
            }
        },
    },
    plugins: [require("@tailwindcss/typography")],
};
export default config;