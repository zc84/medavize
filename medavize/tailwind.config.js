/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Replit Design: Primary Blue - medical expertise, trust
        primary: {
          DEFAULT: '#0077cc',
          foreground: '#ffffff',
          50: '#e8f4fd',
          100: '#d0e8fb',
          200: '#a1d0f7',
          300: '#72b8f3',
          400: '#43a0ef',
          500: '#0077cc',
          600: '#0066b3',
          700: '#005599',
          800: '#004480',
          900: '#003366',
        },
        // Replit Design: Accent Cyan - vitality, innovation
        accent: {
          DEFAULT: '#00b4d8',
          foreground: '#ffffff',
          50: '#e6f9fc',
          100: '#ccf3fa',
          200: '#99e7f5',
          300: '#66dbf0',
          400: '#33cfeb',
          500: '#00b4d8',
          600: '#0099b8',
          700: '#007e98',
          800: '#006378',
          900: '#004858',
        },
        // Replit Design: Background - soft medical blue-gray
        background: '#f4f8fb',
        foreground: '#0d1b2a',
        // Replit Design: Card - clean white
        card: {
          DEFAULT: '#ffffff',
          foreground: '#0d1b2a',
        },
        // Replit Design: Secondary - light blue tint
        secondary: {
          DEFAULT: '#e8f4fd',
          foreground: '#0d1b2a',
        },
        // Replit Design: Muted - subtle gray-blue
        muted: {
          DEFAULT: '#e8f0f7',
          foreground: '#6b7c93',
        },
        // Replit Design: Border - soft gray
        border: '#d0dce8',
        input: '#d0dce8',
        // Replit Design: Destructive - error red
        destructive: {
          DEFAULT: '#e63946',
          foreground: '#ffffff',
        },
        // Replit Design: Success/Warning
        success: '#2ecc71',
        warning: '#f39c12',
        // Legacy aliases for compatibility
        navy: {
          50: '#f0f4f8',
          100: '#d9e2ec',
          200: '#bcccdc',
          300: '#9fb3c8',
          400: '#829ab1',
          500: '#627d98',
          600: '#486581',
          700: '#334e68',
          800: '#243b53',
          900: '#102a43',
        },
        teal: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
        },
        medical: {
          50: '#f0f4f8',
          100: '#d9e2ec',
          200: '#bcccdc',
          300: '#9fb3c8',
          400: '#829ab1',
          500: '#627d98',
          600: '#486581',
          700: '#334e68',
          800: '#243b53',
          900: '#102a43',
        },
      },
      borderRadius: {
        DEFAULT: '12px',
        lg: '12px',
        md: '8px',
        sm: '4px',
      },
      boxShadow: {
        'card': '0 2px 8px rgba(0, 0, 0, 0.08)',
        'card-hover': '0 4px 16px rgba(0, 0, 0, 0.12)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
