import type { Config } from 'tailwindcss';
import { heroui } from '@heroui/react';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  // theme: {
  //   extend: {
  //     colors: {
  //       // background: 'var(--background)',
  //       // foreground: 'var(--foreground)',
  //     },
  //   },
  // },
  darkMode: 'class',
  plugins: [
    heroui({
      prefix: 'heroui', // prefix for themes variables
      addCommonColors: false, // override common colors (e.g. "blue", "green", "pink").
      defaultTheme: 'light', // default theme from the themes object
      defaultExtendTheme: 'light', // default theme to extend on custom themes
      layout: {}, // common layout tokens (applied to all themes)
      themes: {
        light: {
          layout: {},
          colors: {
            background: '#ffffff',
            foreground: '#14213d',
            primary: {
              DEFAULT: '#fca311',
              foreground: '#14213d',
            },
            focus: '#fca311',
          },
        },
        dark: {
          layout: {},
          colors: {},
        },
        // ... custom themes
      },
    }),
  ],
} satisfies Config;
