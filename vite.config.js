import {defineConfig} from "vite";
import generateSitemap from "vite-plugin-pages-sitemap";
import ViteComponents from "vite-plugin-components";
import imagePresets, {widthPreset} from "vite-plugin-image-presets";
import Pages from "vite-plugin-pages";
import vue from "@vitejs/plugin-vue";
import Markdown from "vite-plugin-md";

export default defineConfig({
    siteName: "AIDD labs",
    resolve: {
        alias: [{find: "@", replacement: "/src"}],
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `
                @import "src/styles/animations.scss";
                @import "src/styles/colors.scss";
                @import "src/styles/fonts.scss";
                @import "src/styles/layout.scss";
                `,
            },
        },
    },
    assetsInclude: ["**/*.woff", "**/*.woff2", "**/*.png"],
    filenameHashing: false,
    plugins: [
        imagePresets({
            thumbnail: widthPreset({
                class: "img thumb",
                loading: "lazy",
                widths: [48, 96],
                formats: {
                    webp: {quality: 50},
                    jpg: {quality: 70},
                },
            }),
        }),
        ViteComponents(),
        vue({
            include: [/\.vue$/, /\.md$/], // <--
        }),
        ViteComponents({
            // allow auto load markdown components under `./src/components/`
            extensions: ["vue", "md"],

            // allow auto import and register components used in markdown
            customLoaderMatcher: id => id.endsWith(".md"),
        }),
        Markdown({
            // default options passed to markdown-it
            // see: https://markdown-it.github.io/markdown-it/
            wrapperComponent: "Post",
            markdownItOptions: {
                html: true,
                linkify: true,
                typographer: true,
            },
            // A function providing the Markdown It instance gets the ability to apply custom settings/plugins
            markdownItSetup(md) {
                // for example
                md.use(require("markdown-it-anchor"));
                md.use(require("markdown-it-prism"));
                md.use(require("markdown-it-ins"));
            },
            // Class names for the wrapper div
            wrapperClasses: "markdown-body",
        }),
        Pages({
            extensions: ["vue", "md"],
            dirs: [{dir: "src/pages", baseRoute: ""}],
            extendRoute(route, parent) {
                if (route.component.includes("src/pages/post")) {
                    let newRoute = route.path.split("/post/")[1];
                    newRoute = newRoute.slice(10, newRoute.length);
                    newr = newRoute;
                    return {
                        ...route,
                        path: `/posts/${newRoute}`,
                    };
                }
                return route;
            },
            onRoutesGenerated: routes => {
                generateSitemap({
                    routes,
                    hostname: "https://disasterdata.engin.umich.edu",
                });
            },
        }),
    ],
    ssgOptions: {
        script: "async",
        formatting: "minify",
        format: "cjs",
    },
});
