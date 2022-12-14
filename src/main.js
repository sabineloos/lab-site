import {ViteSSG} from "vite-ssg";
import {createRouter, createWebHistory} from "vue-router";
import {createHead} from "@vueuse/head";
import {v4 as uuidv4} from "uuid";
import App from "./App.vue";
import routes from "~pages";
import store from "./store/";
import utils from "./scripts/utils.js";
import Post from "@/pages/Post.vue";

export const createApp = ViteSSG(
    // the root component
    App,
    // vue-router options
    {routes},
    // function to have custom setups
    ({app, router, routes, isClient, initialState}) => {
        app.component("Post", Post);
        app.mixin({
            methods: utils.filters,
        });

        const layouts = import.meta.globEager("./layouts/**/*.vue");
        for (const path in layouts) {
            let componentConfig = layouts[path];
            const componentName = componentConfig.default.name;
            app.component(componentName, componentConfig.default || componentConfig);
        }

        const components = import.meta.globEager("./components/**/*.vue");
        for (const component in components) {
            let componentConfig = components[component];
            const componentName = componentConfig.default.name;
            app.component(componentName, componentConfig.default || componentConfig);
            // automatically register all components
        }

        let mode = import.meta.env.VITE_STAGE;

        let mdPostRoutes = [];
        let markdownPosts = import.meta.globEager("./pages/post/**/*.md");
        if (mode == "production" || mode == "dev") {
            // filter out drafts
            let filteredPosts = {};
            Object.keys(markdownPosts).forEach(post => {
                if (markdownPosts[post].status == "published") {
                    filteredPosts[post] = markdownPosts[post];
                }
            });
            markdownPosts = filteredPosts;
        }

        for (const post in markdownPosts) {
            //register md page as a component
            let componentConfig = markdownPosts[post];
            const componentName = componentConfig.slug;

            //app.component(componentName, componentConfig.default || componentConfig);
            let metaProps = {
                id: uuidv4(),
                path: `/posts/${componentConfig.slug}`,
                name: componentConfig.slug,
                component: Post,
                meta: {
                    ...componentConfig,
                },
            };

            mdPostRoutes.push(metaProps);
        }

        let mdMemberRoutes = [];
        let markdownMembers = import.meta.globEager("./pages/members/**/*.md");
        for (const member in markdownMembers) {
            let componentConfig = markdownMembers[member];

            let metaProps = {
                id: uuidv4(),
                path: `/members/${componentConfig.slug}`,
                meta: {
                    ...componentConfig,
                },
            };

            mdMemberRoutes.push(metaProps);
        }

        let mdContentRoutes = [];
        let markdownContents = import.meta.globEager("./pages/content/**/*.md");
        for (const content in markdownContents) {
            let componentConfig = markdownContents[content];

            let metaProps = {
                id: uuidv4(),
                path: `/content/${componentConfig.slug}`,
                meta: {
                    ...componentConfig,
                },
            };

            mdContentRoutes.push(metaProps);
        }

        let allRoutes = [...routes, ...mdPostRoutes, ...mdMemberRoutes, ...mdContentRoutes];
        app.use(store);

        if (import.meta.env.SSR) {
            initialState.store = store.state;
        } else {
            if (!initialState.store) {
                initialState.store = store.state;
            } else {
                store.replaceState(initialState.store);
            }
        }

        router.beforeEach((to, from, next) => {
            // perform the (user-implemented) store action to fill the store's state
            if (!store.getters.ready) {
                store.dispatch("loadPosts", mdPostRoutes);
                store.dispatch("loadMembers", mdMemberRoutes);
                store.dispatch("loadContents", mdContentRoutes);
                store.dispatch("setMode", mode);
            }

            next();
        });
    },
    {
        // transformState(state) {
        //     console.log("CAT", import.meta.env.SSR, state)
        //     return import.meta.env.SSR ? devalue(state) : state;
        // },
    }
);
