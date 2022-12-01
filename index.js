const {
  parseMarkdownString,
  normalizeUrl
} = require('@docusaurus/utils');

const fs = require('fs-extra');
const fg = require('fast-glob');
const path = require('path');

const DEFAULT_OPTIONS = {
  include: "**/*.{md,mdx}", // Extensions to include.
  path: "docs", // Path to data on filesystem, relative to site dir.
  routeBasePath: "docs" // URL Route.
};

let articles = []

module.exports = function (context, options) {
  return {
    name: 'docusaurus-plugin-showcase',

    async processMetadata(filePath, siteDir) {
      const fileStringPromise = fs.readFile(filePath, 'utf-8');
      const contents = await fileStringPromise;
      const { frontMatter = {}, contentTitle, excerpt } = parseMarkdownString(contents, {
        removeContentTitle: true
      });

      console.log(contentTitle, excerpt)

      let article = {}

      if (frontMatter["x-custom"] != undefined &&
        frontMatter["x-custom"]["tags"] != undefined) {
        article.tags = frontMatter["x-custom"]["tags"]
      } else {
        console.log(filePath, "IS MISSING PROPER TAGS");
        return
      }

      if (frontMatter.title != undefined) {
        article.title = frontMatter.title;
      } else if (contentTitle != undefined) {
        article.title = contentTitle;
      } else {
        console.log(filePath, "IS MISSING A TITLE");
        return
      }

      if (frontMatter.description != undefined) {
        article.description = frontMatter.description;
      } else if (excerpt != undefined) {
        article.description = excerpt;
      } else {
        console.log(filePath, "IS MISSING A DESCRIPTION");
        return
      }

      if (frontMatter.slug != undefined) {
        article.website = frontMatter.slug
      } else {
        console.log(filePath, "IS MISSING A SLUG");
        return
      }

      if (frontMatter["x-custom"] != undefined &&
        frontMatter["x-custom"]["repo"] != undefined) {
        article.source = frontMatter["x-custom"]["repo"]
      }

      console.log("ADDING ARTICLE", article);
      articles.push(article)
    },

    async loadContent() {
      const siteDir = context.siteDir;
      console.log(siteDir);

      const docsFiles = await fg(
        path.join(siteDir, DEFAULT_OPTIONS.path, DEFAULT_OPTIONS.include),
        {
          ignore: ['**/node_modules/**']
        });
      console.log(docsFiles);

      for (const filePath of docsFiles) {
        await this.processMetadata(filePath, siteDir)
      }

      fs.writeFile(
        'src/data/articles.json',
        JSON.stringify(articles, null, 2)
      )
    },

    async contentLoaded({actions: {addRoute}}) {

      console.log(normalizeUrl(['showcase']));


      addRoute({
        path: '/showcase',
        component: 'docusaurus-plugin-showcase/src/pages/showcase',
        exact: true,
      });
    },
  }
}