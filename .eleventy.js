module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("styles.css");
  eleventyConfig.addPassthroughCopy("admin");
  eleventyConfig.addPassthroughCopy("uploads");
  eleventyConfig.addPassthroughCopy("fonts");

  eleventyConfig.addFilter("nl2br", (str) =>
    str ? str.replace(/\n\n/g, "<br><br>").replace(/\n/g, "<br>") : ""
  );

  return {
    dir: {
      input: "src",
      output: "_site",
    },
  };
};
