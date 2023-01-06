<script>
    import {mapState} from "vuex";
    import {useRoute} from "vue-router";
    import {useHead} from "@vueuse/head";
    import Prism from "prismjs";
    import utils from "@/scripts/utils.js";

    export default {
        name: "Post",
        components: {},
        data() {
            return {
                ...this.$attrs.frontmatter,

                breakpointWatcher: "",

                readingTime: {},
                readingTimeUnit: "",

                activeHeadingId: "",

                activeWindow: {},

                titles: [], // same set in <TOC/>
                titleIds: [],
                nodes: [],
                minDepth: 0,
                idsByDepth: {},

                contentOffset: 0,

                titleIdsInView: [],
            };
        },
        computed: {
            ...mapState({
                posts: state => state.posts,
            }),
            activeMarkdownComponent() {
                return this.$route.name;
            },
            pubDates() {
                return this.$route.meta.date;
            },
        },
        methods: {
            initHeadingTitles() {
                let titles = utils.getMarkdownTitles() || {
                    nodes: [],
                    minDepth: 1,
                    titles: [],
                };
                Object.keys(titles).forEach(key => {
                    this[key] = {...titles}[key];
                });

                let ids = [];
                this.nodes.forEach((node, index) => {
                    ids.push(node.id);
                });
                this.titleIds = ids;
            },
            getClosestId(activeWindow) {
                let titleIdsByDepth = {};
                this.titleIds.forEach((id, index) => {
                    if (index == this.titleIds.length - 1) {
                        // sometimes last section is not long enough
                        titleIdsByDepth[document.getElementById(id).offsetTop] = id;
                    } else {
                        titleIdsByDepth[document.getElementById(id).offsetTop] = id;
                    }
                });

                // // closes aka closest before, not after, scroll position
                let depths = Object.keys(titleIdsByDepth);
                let currentDepth = activeWindow.start;

                let titleId = this.titleIds[0];
                depths.forEach((depth, index) => {
                    if (depth < currentDepth + 200) {
                        titleId = this.titleIds[index] || this.titleIds[0];
                    }
                });
                return titleId;
            },
            setActiveHeadingId() {
                let windowHeight = window.innerHeight;
                let currentScrollDepth = window.scrollY;
                let activeWindow = {
                    start: currentScrollDepth,
                    end: currentScrollDepth + windowHeight,
                };

                this.activeWindow = activeWindow;
                this.activeHeadingId = this.getClosestId(activeWindow);
            },
            onScroll() {
                this.setActiveHeadingId();
            },
            scrollToHeading(headingId, $event) {
                $event.preventDefault();
                let element = document.getElementById(headingId);
                let top = element.offsetTop - 6 * 16;
                window.scrollTo({left: 0, top, behavior: "smooth"});
            },
            scrollToTop($event) {
                $event.preventDefault();
                let top = 0;
                window.scrollTo({left: 0, top, behavior: "smooth"});
            },
        },
        setup() {
            const route = useRoute();
            useHead({
                // Can be static or computed
                title: route.meta.title,
                meta: [
                    {
                        name: `description`,
                        content: route.meta.description,
                    },
                ],
            });
            // useMeta({
            //     title: route.meta.title,
            //     description: route.meta.description,
            //     meta: "cats",
            //     cars: [
            //         { name: "author", bee: "marguserite" },
            //         { name: "distribution", content: "global" },
            //         { name: "keywords", content: "cats, bees" },
            //         { name: "language", content: "English" },
            //     ],
            // });
        },
        mounted() {
            window.addEventListener("scroll", this.onScroll);
            this.initHeadingTitles();
            this.setActiveHeadingId();

            Prism.highlightAll();

            let content = document.getElementsByClassName("markdown-body")[0].innerHTML;
            this.readingTime = utils.getReadingTime(content);
            this.readingTimeUnit = this.readingTime.readingTime < 2 ? "minute" : "minutes";
        },
        beforeUnmount() {
            window.removEventListener("scroll", this.onScroll);
        },
    };
</script>

<template>
    <MaxWidth class="Post" size="m">
        <div class="post-left"></div>
        <div class="post-center">
            <!-- <div
                class="active-window"
                :style="{height: activeWindow.end - activeWindow.start + 'px', top: activeWindow.start + 'px'}"
            ></div> -->
            <!-- <pre class="language-python">
            <code class="language-python">
                print("cats")
                keys_list = ['A', 'B', 'C']
                values_list = ['blue', 'red', 'bold']
            </code>
            </pre> -->
            <div class="post-metas">
                <div class="top">
                    <div class="date">Aug 03, 2022</div>
                    <div class="ish-tilde">~</div>
                    <div>{{ readingTime.readingTime }} min read</div>
                </div>
                <h1 class="title">
                    {{ title }}
                </h1>
            </div>

            <div class="content">
                <slot />
            </div>
            <div class="content-offset" :style="{height: contentOffset + 'px'}"></div>
            <!-- <div class="recirc">
                <PostCard
                    :href="post.path"
                    :post="post"
                    v-for="post in posts.slice(0, 3)"
                    :key="post"
                />
            </div> -->
        </div>
        <div class="post-right">
            <div class="right-fixed">
                <div class="author-metas">
                    <div class="bio-image-wrapper" @click="scrollToTop($event)">
                        <div class="scroll-note">Scroll up ^</div>
                        <div class="bio-image-container">
                            <img
                                class="bio-image"
                                src="/favicon.png"
                                alt="Woman (Marguerite) taking a selfie in the mirror, phone in hand, wearing a RHCP shirt."
                            />
                        </div>
                    </div>
                    <h4 class="name">Author</h4>
                    <div class="bio-content">
                        <p>Engineer + Designer</p>
                        <!-- <div class="metas">Aug 25, 2012 * 10m read</div> -->
                    </div>
                </div>
                <div>
                    <TOC :active-heading="activeHeadingId" />
                </div>
            </div>
            <div class="post-squiggle">
                <svg
                    width="8"
                    height="56"
                    viewBox="0 0 8 56"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M4.00003 55.425C2.79995e-05 53.425 2.80869e-05 51.425 4.00003 49.425C8.00003 47.425 8.00003 45.425 4.00003 43.425C2.8524e-05 41.425 2.86115e-05 39.425 4.00003 37.425C8.00003 35.425 8.00003 33.425 4.00003 31.425C2.90486e-05 29.425 2.9136e-05 27.425 4.00003 25.425C8.00003 23.425 6.17503 21.6 4.00003 19.425C1.82503 17.25 4.00003 16.35 4.00003 12.15C4.00003 7.95 4.00003 0 4.00003 0"
                        stroke="black"
                    />
                </svg>
            </div>
        </div>
    </MaxWidth>
</template>

<style lang="scss">
    .Post {
        $post-font-size: 1.2rem;
        $post-padding-horiz: 2em;

        $content-max-width: 720px;
        //$content-max-width: 100%;
        $right-sidebar-width: 25em;

        margin-top: 3em;
        font-size: $post-font-size;
        display: flex;
        margin-bottom: 3em;
        position: relative;
        //border: 1px solid orange;

        .active-window {
            // position: absolute;
            // top: 0;
            // left: 25px;
            // width: 25px;
            // height: 50px;
            // background: red;
            // opacity: 0.8;
            // z-index: 200;
        }

        @media (max-width: $max-width-xs) {
            flex-direction: column;
        }

        .post-left {
            //border: 1px solid;

            flex: 1;

            // @mixin inset-divider-offset($offset, $padding) {
            //     $divider-offset: (2 * $padding) + $offset;
            //     @debug "divider offset: #{$divider-offset}";

            //     margin-left: $divider-offset;
            //     width: calc(100% - #{$divider-offset});
            // }

            @media (max-width: 1200px) {
                display: none;
            }
        }
        .post-center {
            margin-left: 7em;
            padding-bottom: 4em;
            // padding-right: $post-padding-horiz;
            margin-right: $right-sidebar-width;
            width: 100%;
            // padding-left: $post-padding-horiz;
            padding-top: 3em;
            //border: 1px solid green;

            @media (max-width: $max-width-xxs) {
                padding-right: 0;
                padding-left: 0;
            }

            @media (max-width: 1400px) {
                margin-left: 4em;
            }

            @media (max-width: 1300px) {
                margin-left: 3em;
            }

            @media (max-width: 1200px) {
                margin-left: auto;
                margin-right: auto;
            }

            @media (max-width: 1100px) {
                margin-left: 0em;
            }

            .content-offset {
                width: 100%;
            }
        }
        .post-right {
            border-left: 1px solid var(--border-500);
            padding-top: 4em;
            max-width: $right-sidebar-width;
            width: 100%;
            padding-left: $post-padding-horiz;
            padding-right: $post-padding-horiz;
            position: relative;
            position: fixed;
            right: 0;
            top: 0;
            height: calc(100% - 8em);
            height: 100%;

            @media (max-width: 1400px) {
                max-width: 19em;
            }

            @media (max-width: 1200px) {
                display: none;
            }

            .right-fixed {
                //position: fixed;
                margin-top: 4em;
                padding-right: $post-padding-horiz;
                display: flex;
                flex-direction: column;
                gap: 1em;
            }

            .GayAgenda {
                margin-bottom: 2em;
            }

            // &:after {
            //     position: absolute;
            //     bottom: 0;
            //     content: "";
            //     left: 0;
            //     border-left: 7px solid transparent;
            //     border-right: 7px solid transparent;
            //     border-bottom: 11px solid var(--border-500);
            //     transform: translate(calc(-50% - 0.5px), 50%);
            // }

            .post-squiggle {
                position: absolute;
                bottom: 0;
                left: 0;
                opacity: 0;
                transform: translate(calc(-50% - 0.5px), 100%);

                path {
                    stroke: var(--border-500);
                    stroke: rgba(lightgrey, 0.6);
                    stroke-width: 1px;
                }
            }
        }

        .post-metas {
            .top {
                display: flex;
                gap: 0.4em;
                align-items: center;
                opacity: 0.5;
                font-size: 0.85em;
            }

            .date {
            }
            .title {
                margin: 0.4em 0;
            }

            .ish-tilde {
                //color: $neon-green-500;
                opacity: 0.5;
            }
        }

        .author-metas {
            display: flex;
            flex-direction: column;
            font-size: 0.9em;
            position: relative;
            width: fit-content;

            .bio-image-wrapper {
                position: relative;
                width: 100%;

                &:hover {
                    cursor: pointer;
                    //background: rgba(black, 0.03);

                    .scroll-note {
                        transition: all 100ms linear;
                        opacity: 0.35;
                    }
                }
            }

            .scroll-note {
                position: absolute;
                top: 0;
                right: 0;
                font-size: 0.8em;
                transition: all 100ms linear;
                opacity: 0;
            }

            .bio-image-container {
                width: 70px;
                height: 70px;
                overflow: hidden;
                border-radius: 60px 60px 0 0;
                border-radius: 60px;
                margin-bottom: 0.6em;
            }

            .name {
                margin: 0;
            }

            p {
                font-family: "Inter";
                margin: 0;
                //line-height: 1.2;
                margin-bottom: 0.5em;
                font-size: 0.8em;
                margin-top: 0.5em;
                opacity: 0.5;
                font-weight: 500;
            }

            .metas {
                color: var(--grey-700);
            }
        }

        .recirc {
            display: flex;
            width: 100%;
            gap: 0.7em;
        }

        .markdown-body {
            h4 {
                font-family: "Vulf Mono", serif;
                font-weight: 400;
                text-transform: lowercase;
                margin-top: 2.5em;
            }
        }

        h1,
        h2,
        h3,
        h4,
        h5,
        h6,
        p,
        a,
        span {
            code {
                font-size: $post-font-size;
            }
        }

        h2,
        h3,
        h4,
        h5,
        h6,
        p,
        code,
        pre,
        .recirc {
            max-width: $content-max-width;
            width: 100%;
        }

        code,
        pre {
            overflow-x: auto;
        }

        a {
            text-decoration-thickness: 1px;
            text-underline-offset: 2px;
            //text-decoration-color: $neon-green-300;
        }

        .hero-img {
            max-height: 400px;
            overflow: hidden;
        }

        h1,
        h2,
        h3 {
            letter-spacing: -0.01em;
        }

        h3,
        h2 {
            margin-top: 2.25em;
        }

        p {
        }

        @media (max-width: 600px) {
            h1 {
                font-size: 1.6em;
            }

            .post-metas {
                .top {
                    font-size: 0.75em;
                }
            }

            h2 {
                margin-top: 1em;
            }

            h3 {
                margin-top: 2.25em;
            }
        }
    }
</style>