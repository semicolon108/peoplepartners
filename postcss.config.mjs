// postcss.config.mjs

/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {}, // Use 'tailwindcss', NOT '@tailwindcss/postcss'
    autoprefixer: {},
  },
};

export default config;