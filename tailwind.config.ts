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
            primary: '#606C38',
            secondary: '#DDA15E',
            content1: '#FFFFFF',
            content2: '#283618',
            content3: '#BC6C25',
            background: '#FEFAE0',
          },
          // colors: {
          //   default: {
          //     50: '#F4F7FA',
          //     100: '#E8F0F5',
          //     200: '#C1D6E1',
          //     300: '#A0C0D1',
          //     400: '#80AAC0',
          //     500: '#4CAF50', // Primary action color
          //     600: '#388E3C',
          //     700: '#2C6E2B',
          //     800: '#1B4A1F',
          //     900: '#0D2D10',
          //     foreground: '#212121', // Text color
          //     DEFAULT: '#4CAF50',
          //   },

          //   primary: {
          //     50: '#E3F2FD',
          //     100: '#BBDEFB',
          //     200: '#90CAF9',
          //     300: '#64B5F6',
          //     400: '#42A5F5',
          //     500: '#2196F3', // Secondary color
          //     600: '#1E88E5',
          //     700: '#1976D2',
          //     800: '#1565C0',
          //     900: '#0D47A1',
          //     foreground: '#FFFFFF',
          //     DEFAULT: '#2196F3',
          //   },

          //   secondary: {
          //     50: '#E8F5E9',
          //     100: '#C8E6C9',
          //     200: '#A5D6A7',
          //     300: '#81C784',
          //     400: '#66BB6A',
          //     500: '#4CAF50', // Success color for tasks
          //     600: '#43A047',
          //     700: '#388E3C',
          //     800: '#2C6E2B',
          //     900: '#1B4A1F',
          //     foreground: '#FFFFFF',
          //     DEFAULT: '#4CAF50',
          //   },

          //   success: {
          //     50: '#C8E6C9',
          //     100: '#A5D6A7',
          //     200: '#81C784',
          //     300: '#66BB6A',
          //     400: '#4CAF50',
          //     500: '#388E3C', // Completed task color
          //     600: '#2C6E2B',
          //     700: '#1B4A1F',
          //     800: '#0D2D10',
          //     900: '#0B1F0A',
          //     foreground: '#FFFFFF',
          //     DEFAULT: '#388E3C',
          //   },

          //   warning: {
          //     50: '#FFF8E1',
          //     100: '#FFECB3',
          //     200: '#FFE082',
          //     300: '#FFD54F',
          //     400: '#FFCA28',
          //     500: '#FFC107', // Warning color for notifications
          //     600: '#FFB300',
          //     700: '#FFA000',
          //     800: '#FF8F00',
          //     900: '#FF6F00',
          //     foreground: '#212121',
          //     DEFAULT: '#FFC107',
          //   },

          //   danger: {
          //     50: '#FFEBEE',
          //     100: '#FFCDD2',
          //     200: '#EF9A9A',
          //     300: '#F44336', // Delete color
          //     400: '#E53935',
          //     500: '#D32F2F',
          //     600: '#C62828',
          //     700: '#B71C1C',
          //     800: '#9B0000',
          //     900: '#8A0000',
          //     foreground: '#FFFFFF',
          //     DEFAULT: '#F44336',
          //   },

          //   background: {
          //     50: '#F4F7FA',
          //     100: '#E8F0F5',
          //     200: '#C1D6E1',
          //     300: '#A0C0D1',
          //     400: '#80AAC0',
          //     500: '#FFFFFF', // Main background color
          //     600: '#E0E0E0',
          //     700: '#BDBDBD',
          //     800: '#9E9E9E',
          //     900: '#757575',
          //     foreground: '#212121',
          //     DEFAULT: '#F4F7FA',
          //   },

          //   divider: {
          //     50: '#F1F1F1',
          //     100: '#E5E5E5',
          //     200: '#D6D6D6',
          //     300: '#C1C1C1',
          //     400: '#A6A6A6',
          //     500: '#E5E5E5', // Divider color for sections
          //     600: '#999999',
          //     700: '#7F7F7F',
          //     800: '#666666',
          //     900: '#4D4D4D',
          //     foreground: '#212121',
          //     DEFAULT: '#E5E5E5',
          //   },

          //   focus: {
          //     50: '#FFEB3B',
          //     100: '#FFEA00', // Focus color
          //     200: '#FFDD00',
          //     300: '#FFCC00',
          //     400: '#FFB700',
          //     500: '#FF9800',
          //     600: '#F57C00',
          //     700: '#F4511E',
          //     800: '#D84315',
          //     900: '#BF360C',
          //     foreground: '#212121',
          //     DEFAULT: '#FF9800',
          //   },
          // },
        },
        dark: {
          layout: {},
          colors: {},
          // colors: {
          //   default: {
          //     50: '#121212', // Very dark background for the app
          //     100: '#1D1D1D',
          //     200: '#2C2C2C',
          //     300: '#333333', // Dark gray for general elements
          //     400: '#424242',
          //     500: '#616161', // Slightly lighter gray for buttons
          //     600: '#757575', // Dividers or less prominent elements
          //     700: '#9E9E9E', // For inactive states
          //     800: '#BDBDBD', // For hover states
          //     900: '#E0E0E0', // For focus and highlights
          //     foreground: '#E0E0E0', // Light text for readability
          //     DEFAULT: '#4CAF50', // Default green for primary actions
          //   },

          //   primary: {
          //     50: '#121212', // Dark background
          //     100: '#1D1D1D',
          //     200: '#2C2C2C',
          //     300: '#333333',
          //     400: '#424242',
          //     500: '#2196F3', // Blue for secondary actions
          //     600: '#1976D2',
          //     700: '#1565C0',
          //     800: '#0D47A1',
          //     900: '#0B2A8C',
          //     foreground: '#FFFFFF', // White text for blue buttons
          //     DEFAULT: '#2196F3',
          //   },

          //   secondary: {
          //     50: '#1E1E1E',
          //     100: '#2C2C2C',
          //     200: '#3E3E3E',
          //     300: '#505050',
          //     400: '#616161',
          //     500: '#80C4E2', // Lighter blue-gray for less prominent actions
          //     600: '#64A9C6',
          //     700: '#4F8EA9',
          //     800: '#3A7792',
          //     900: '#2C5C7B',
          //     foreground: '#FFFFFF',
          //     DEFAULT: '#80C4E2',
          //   },

          //   success: {
          //     50: '#121212',
          //     100: '#1D1D1D',
          //     200: '#2C2C2C',
          //     300: '#388E3C', // Darker green for success
          //     400: '#4CAF50',
          //     500: '#388E3C',
          //     600: '#2C6E2B',
          //     700: '#1B4A1F',
          //     800: '#0D2D10',
          //     900: '#0B1F0A',
          //     foreground: '#FFFFFF',
          //     DEFAULT: '#388E3C',
          //   },

          //   warning: {
          //     50: '#FFF8E1',
          //     100: '#FFECB3',
          //     200: '#FFE082',
          //     300: '#FFD54F',
          //     400: '#FFCA28',
          //     500: '#FFC107', // Amber for warning
          //     600: '#FFB300',
          //     700: '#FFA000',
          //     800: '#FF8F00',
          //     900: '#FF6F00',
          //     foreground: '#212121',
          //     DEFAULT: '#FFC107',
          //   },

          //   danger: {
          //     50: '#FFEBEE',
          //     100: '#FFCDD2',
          //     200: '#EF9A9A',
          //     300: '#F44336', // Red for delete actions
          //     400: '#E53935',
          //     500: '#D32F2F',
          //     600: '#C62828',
          //     700: '#B71C1C',
          //     800: '#9B0000',
          //     900: '#8A0000',
          //     foreground: '#FFFFFF',
          //     DEFAULT: '#F44336',
          //   },

          //   background: {
          //     50: '#121212', // Main background color for the dark theme
          //     100: '#1D1D1D',
          //     200: '#2C2C2C',
          //     300: '#333333',
          //     400: '#424242',
          //     500: '#616161',
          //     600: '#757575',
          //     700: '#9E9E9E',
          //     800: '#BDBDBD',
          //     900: '#E0E0E0',
          //     foreground: '#E0E0E0',
          //     DEFAULT: '#121212',
          //   },

          //   divider: {
          //     50: '#757575',
          //     100: '#9E9E9E',
          //     200: '#BDBDBD',
          //     300: '#C1C1C1',
          //     400: '#A6A6A6',
          //     500: '#BDBDBD', // Divider color for sections
          //     600: '#999999',
          //     700: '#7F7F7F',
          //     800: '#666666',
          //     900: '#4D4D4D',
          //     foreground: '#212121',
          //     DEFAULT: '#BDBDBD',
          //   },

          //   focus: {
          //     50: '#FFEB3B',
          //     100: '#FFEA00',
          //     200: '#FFDD00',
          //     300: '#FFCC00',
          //     400: '#FFB700',
          //     500: '#FF9800', // Focus color for active elements
          //     600: '#F57C00',
          //     700: '#F4511E',
          //     800: '#D84315',
          //     900: '#BF360C',
          //     foreground: '#212121',
          //     DEFAULT: '#FF9800',
          //   },
          // },
        },
        // ... custom themes
      },
    }),
  ],
} satisfies Config;
