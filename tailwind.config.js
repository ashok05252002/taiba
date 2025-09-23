/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './index.html',
  ],
  theme: {
    extend: {
      colors: {
        'taiba-blue': '#108BFA',
        'taiba-purple': '#732675',
        'taiba-grey': '#696969',
        'taiba-mustard': '#FFC600',
        'taiba-pistachio': '#BCE268',
        'taiba-wheat': '#F5DEB3',
      },
      fontFamily: {
        'sans': ['Montserrat', 'Tajawal', 'Noto Naskh Arabic', 'system-ui', 'sans-serif'],
        'arabic': ['Tajawal', 'Noto Naskh Arabic', 'sans-serif'],
      },
      animation: {
        'bounce-gentle': 'bounce 1s infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-gentle': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 1.5s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(5deg)' },
        },
        glow: {
            '0%, 100%': { boxShadow: '0 0 5px rgba(16, 139, 250, 0.2), 0 0 10px rgba(16, 139, 250, 0.1)' },
            '50%': { boxShadow: '0 0 20px rgba(16, 139, 250, 0.6), 0 0 30px rgba(16, 139, 250, 0.4)' },
        }
      }
    },
  },
  plugins: [],
};
