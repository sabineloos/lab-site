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

                isLoaded: false,

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
            authorList() {
                return this.authors?.split() || ["Dr. Sabine Loos"];
            },
            primaryAuthor() {
                if (this.members?.length) {
                    return this.members[0];
                    // Need to specifically check for members and length here for ssg build
                } else {
                    return "sabine-loos";
                }
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
        mounted() {
            window.addEventListener("scroll", this.onScroll);
            this.initHeadingTitles();
            this.setActiveHeadingId();

            Prism.highlightAll();

            let content = document.getElementsByClassName("markdown-body")[0]?.innerHTML;
            if (content) {
                this.readingTime = utils.getReadingTime(content);
                this.readingTimeUnit =
                    this.readingTime.readingTime < 2 ? "minute" : "minutes";
            }

            if (this.title) {
                this.isLoaded = true;
            }
        },
        beforeUnmount() {
            window.removEventListener("scroll", this.onScroll);
        },
    };
</script>

<template>
    <MaxWidth class="post" size="m">
        <div class="post-center" v-if="isLoaded">
            <div class="metas">
                <Link class="back-link" to="/content"
                    ><span class="arrow">← &nbsp;</span>Content</Link
                >
                <h1>{{ title }}</h1>
            </div>
            <div class="flex-wrapper">
                <div class="content">
                    <div class="metas">
                        <div class="tags">
                            <Link
                                v-for="tag in tags"
                                :key="tag"
                                :to="`/content?topic=${tag}`"
                            >
                                <TagPill variant="topic" :tag="tag" />
                            </Link>
                            <Link :to="`/content?type=${type}`">
                                <TagPill variant="type" :tag="type" />
                            </Link>
                        </div>
                        <div class="description" v-if="description">
                            {{ description }}
                        </div>
                        <AuthorBlock :author="primaryAuthor" orientation="landscape" />
                        <div class="other-metas">
                            <div class="authors" v-if="authors.length">
                                <strong>Authors:</strong> {{ authors }}
                            </div>
                            <div class="publication" v-if="publication">
                                <strong>Publication:</strong> {{ publication }}
                            </div>
                            <div class="citation" v-if="citation">
                                <strong>Citation:</strong> {{ citation }}
                            </div>
                        </div>
                    </div>
                    <div class="article-text">
                        <slot />
                    </div>
                </div>
                <div class="post-right">
                    <AuthorBlock :author="primaryAuthor" />
                    <TOC :active-heading="activeHeadingId" />
                </div>
            </div>
        </div>
    </MaxWidth>
</template>

<style lang="scss">
    .post {
        padding-top: 4em;
        padding-bottom: 3em;
        font-size: 1.125em;

        .hero-wrapper {
            text-align: center;
        }

        .content {
            h2 {
                font-family: "DM Sans", -apple-system, BlinkMacSystemFont, "Segoe UI",
                    Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
                text-transform: none;
                letter-spacing: 0;
                font-size: 1.65em;
                font-weight: 600;
            }

            h5 {
                //used as annotation
                margin: 0;
                margin-bottom: 2em;
            }
        }

        .metas {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 1em;

            .back-link {
                margin-bottom: 1.5em;
                font-size: 0.8em;
                color: var(--blue-700);
            }

            h1 {
                text-transform: none;
                font-size: 3em;
                line-height: 1.15;
                margin-bottom: 0;
                margin-top: 0;

                @media (max-width: 1300px) {
                    font-size: 2em;
                }
            }

            .tags {
                display: flex;
                gap: 0.5em;
                flex-wrap: wrap;
            }
        }

        .flex-wrapper {
            display: flex;
            gap: 6em;
            position: relative;
            padding-top: 1em;

            @media (max-width: 1100px) {
                gap: 4em;
            }

            @media (max-width: 1000px) {
                gap: 2em;
            }

            .content {
                flex-basis: 1200px;

                @media (max-width: 900px) {
                    flex-basis: 100%;
                }

                .author-block {
                    display: none;

                    @media (max-width: 900px) {
                        display: block;
                    }
                }
            }

            .post-right {
                position: sticky;
                top: 1em;
                align-self: flex-start;
                padding-bottom: 4em;
                width: 24em;

                @media (max-width: 1000px) {
                    display: none;
                }
            }
        }

        .other-metas {
            font-size: 0.8em;
        }

        .authors {
            //font-weight: 600;
        }

        .description {
            font-weight: 500;
            //padding: 0.75em 0;
        }

        .abstract {
            padding: 1em 0;
        }

        .article-text {
            padding-top: 1.5em;

            .markdown-body {
                img {
                    border: 1px solid;
                }
            }
        }
    }
</style>
