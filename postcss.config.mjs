/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
    'postcss-nested': {},
    'postcss-import': {},
    'postcss-preset-env': {
      browsers: 'last 2 versions',
    },
  },
};

export default config;
