module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--color-primary)',
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)',
        },
        tertiary: {
          DEFAULT: 'var(--color-tertiary)',
        },
      },
      fontSize: {
        _68: '68px',
        _38: '38px',
        _28: '28px',
      },
      lineHeight: {
        _100: '100%',
        _110: '110%',
      },
    },
  },
  plugins: [],
};
