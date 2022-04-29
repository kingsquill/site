const htmlmin = require('html-minifier')

const now = String(Date.now())

module.exports = function (eleventyConfig) {
  eleventyConfig.setUseGitIgnore(false);
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
  eleventyConfig.addFilter('take', function (value, count) {
    return value.slice(0, count);
  })

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