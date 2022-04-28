const htmlmin = require('html-minifier')
const markdownIt = require('markdown-it');
const markdownItClass = require('@toycode/markdown-it-class');

const now = String(Date.now())

module.exports = function (eleventyConfig) {
  eleventyConfig.addWatchTarget('styles/tailwind.config.js')
  eleventyConfig.addWatchTarget('styles/tailwind.css')
  eleventyConfig.addPassthroughCopy('.nojekyll');
  eleventyConfig.addPassthroughCopy('CNAME');
  eleventyConfig.addPassthroughCopy({ '_tmp/style.css': 'css/style.css' })
  eleventyConfig.addPassthroughCopy('img');
  eleventyConfig.addPassthroughCopy('webfonts');
  eleventyConfig.addPassthroughCopy({ 'node_modules/@fortawesome/fontawesome-free/css/all.min.css': 'css/fontawesome.css' });
  eleventyConfig.addPassthroughCopy({ 'node_modules/@fortawesome/fontawesome-free/webfonts': 'webfonts' });
  eleventyConfig.addShortcode('version', function () {
    return now
  })

  // Set Markdown default styles
  const mapping = {
    h1: ['text-5xl', 'font-serif', 'text-center', 'pb-5'],
    h2: ['text-4xl', 'font-serif', 'pb-5'],
    h3: ['text-3xl', 'font-serif', 'pb-4'],
    h4: ['text-2xl', 'font-serif'],
    h5: ['text-xl', 'font-serif'],
    h6: ['text-lg', 'font-serif'],
  };
  const md = markdownIt({ linkify: true, html: true });
  md.use(markdownItClass, mapping);
  eleventyConfig.setLibrary('md', md);

  eleventyConfig.addTransform('htmlmin', function (content, outputPath) {
    if (
      process.env.ELEVENTY_PRODUCTION &&
      outputPath &&
      outputPath.endsWith('.html')
    ) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
      });
      return minified
    }

    return content
  })

  return {
    markdownTemplateEngine: 'njk',
  }
};