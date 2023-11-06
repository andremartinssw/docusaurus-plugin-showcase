const { parseMarkdownString } = require("@docusaurus/utils");

const fs = require("fs-extra");
const fg = require("fast-glob");
const path = require("path");

const DEFAULT_OPTIONS = {
    include: "**/*.{md,mdx}", // Extensions to include.
    ignore: [
        "**/node_modules/**",
        "**/sdks/reference/**",
        "**/guides/administration/guides/signalwire-space/**",
        "**/administration/guides/signalwire-integrations/**",
        "**/compatibility-api/xml/**",
        "**/cantina/**",
        "**/docs/sdks/**",
    ],
    path: "docs", // Path to data on filesystem, relative to site dir.
    routeBasePath: "docs", // URL Route.
};

let articles = [];

module.exports = function(context, options) {
    return {
        name: "docusaurus-plugin-showcase",

        async loadContent() {
            const siteDir = context.siteDir;

            console.log("START: docusaurus-plugin-showcase");

            const docsFiles = await fg(
                path.join(
                    siteDir,
                    DEFAULT_OPTIONS.path,
                    DEFAULT_OPTIONS.include
                ),
                {
                    ignore: DEFAULT_OPTIONS.ignore,
                }
            );

            for (const filePath of docsFiles) {
                await this.processMetadata(filePath, siteDir);
            }

            fs.writeFile(
                siteDir + "/src/data/articles.json",
                JSON.stringify(articles, null, 2)
            );
        },

        async contentLoaded({ actions: { addRoute } }) {
            console.log("FINISHED: docusaurus-plugin-showcase");

            addRoute({
                path: "/showcase",
                component: "docusaurus-plugin-showcase/src/pages/showcase",
                exact: true,
            });
        },

        async processMetadata(filePath, siteDir) {
            const fileStringPromise = fs.readFile(filePath, "utf-8");
            const contents = await fileStringPromise;
            const {
                frontMatter = {},
                content,
                contentTitle,
            } = parseMarkdownString(contents, {
                removeContentTitle: true,
            });

            let {
                missingTags,
                missingTitle,
                missingDescription,
                missingSlug,
            } = false;

            let article = {};

            // Check tags
            if (frontMatter["x-custom"]) {
                if (frontMatter["x-custom"]["hideInGuideShowcase"] == true) {
                    return;
                } else if (frontMatter["x-custom"]["tags"]) {
                    article.tags = frontMatter["x-custom"]["tags"];
                } else {
                    missingTags = true;
                }
            } else {
                missingTags = true;
            }

            // Check title
            if (frontMatter.title) {
                article.title = frontMatter.title;
            } else if (contentTitle) {
                article.title = contentTitle;
            } else {
                missingTitle = true;
            }

            let newExcerpt = this.createExcerptWithoutHeading(content);

            // Check description
            if (frontMatter.description) {
                article.description = frontMatter.description;
            } else if (newExcerpt) {
                article.description = newExcerpt;
            } else {
                missingDescription = true;
            }

            // Determine link
            if (frontMatter.slug) {
                article.website = frontMatter.slug;
            } else {
                let newPath = filePath
                    .replace(siteDir, "")
                    .replace(DEFAULT_OPTIONS.path + "/", "")
                    .replace("/index.mdx", "");

                article.website = newPath;
            }

            // Check for custom repo
            if (frontMatter["x-custom"] && frontMatter["x-custom"]["repo"]) {
                article.source = frontMatter["x-custom"]["repo"];
            }

            console.log("\n");

            const reset = "\x1b[0m";
            const red = "\x1b[31m";
            const green = "\x1b[32m";

            if (missingTags || missingTitle || missingDescription) {
                console.log(red + "  ✘ " + filePath + reset);
                missingTags ? console.log(red + "    - Tags: ✘" + reset) : "";
                missingTitle ? console.log(red + "    - Title: ✘" + reset) : "";
                missingDescription ? console.log(red + "    - Description: ✘" + reset) : "";
                return;
            } else {
                console.log(green + "  ✔ " + filePath + reset);
                articles.push(article);
            }
        },

        createExcerptWithoutHeading(articleContent) {
            // Split the text into paragraphs based on empty lines
            const paragraphs = articleContent.split(/\n\s*\n/);

            for (const paragraph of paragraphs) {
                // Check if the paragraph is not a heading (doesn't start with #, ##, ###, etc.)
                if (!/^#+\s/.test(paragraph)) {
                    const cleanedLine = paragraph
                        // Remove HTML tags.
                        .replace(/<[^>]*>/g, "")
                        // Remove Title headers
                        .replace(/^#[^#]+#?/gm, "")
                        // Remove Markdown + ATX-style headers
                        .replace(/^#{1,6}\s*(?<text>[^#]*)\s*#{0,6}/gm, "$1")
                        // Remove emphasis.
                        .replace(/(?<opening>[*_]{1,3})(?<text>.*?)\1/g, "$2")
                        // Remove strikethroughs.
                        .replace(/~~(?<text>\S.*\S)~~/g, "$1")
                        // Remove images.
                        .replace(/!\[(?<alt>.*?)\][[(].*?[\])]/g, "$1")
                        // Remove footnotes.
                        .replace(/\[\^.+?\](?:: .*$)?/g, "")
                        // Remove inline links.
                        .replace(/\[(?<alt>.*?)\][[(].*?[\])]/g, "$1")
                        // Remove inline code.
                        .replace(/`(?<text>.+?)`/g, "$1")
                        // Remove blockquotes.
                        .replace(/^\s{0,3}>\s?/g, "")
                        // Remove admonition definition.
                        .replace(/:::.*/, "")
                        // Remove Emoji names within colons include preceding whitespace.
                        .replace(/\s?:(?:::|[^:\n])+:/g, "")
                        // Remove custom Markdown heading id.
                        .replace(/\{#*[\w-]+\}/, "")
                        .trim();

                    return cleanedLine;
                }
            }

            if (cleanedLine) {
                return cleanedLine;
            } else {
                return "";
            }
        },
    };
};
