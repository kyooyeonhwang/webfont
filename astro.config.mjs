export default /** @type {import('astro').AstroUserConfig} */ ({
  // Enable the Preact renderer to support Preact JSX components.
  renderers: ['@astrojs/renderer-preact'],
  // files in `static/` will be blindly copied to `public/`
  // public: 'static',
  // `public/` is where the built website will be output to
  dist: 'public',
  buildOptions: {
    sitemap: true,
    // site: 'https://astro.build/',
  },
});
