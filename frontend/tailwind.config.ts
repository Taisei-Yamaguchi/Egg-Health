import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      textShadow: {
        'default': '0 1px 3px rgba(0, 0, 0, 0.12)',
        'md': '0 3px 6px rgba(0, 0, 0, 0.16)',
      }
    },
  },
  plugins: [
    require('tailwindcss-textshadow')
  ],
};
export default config;
