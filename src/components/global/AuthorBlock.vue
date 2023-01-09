<script>
    import {mapState} from "vuex";
    export default {
        name: "AuthorBlock",
        components: {},
        props: {
            author: {
                type: String,
                default: "sabine-loos",
            },
            orientation: {
                type: String,
                default: "portrait",
                validator(value) {
                    return ["portrait", "landscape"].includes(value);
                },
            },
        },
        emits: [],
        data() {
            return {};
        },
        computed: {
            ...mapState({
                members: state => state.members,
            }),
            info() {
                return this.members[this.author];
            },
        },
        methods: {},
        mounted() {},
    };
</script>
<template>
    <div class="author-block">
        <div class="author-metas portrait" v-if="orientation == 'portrait'">
            <div class="bio-image-wrapper">
                <div class="bio-image-container">
                    <img class="bio-image" :src="`../../${info.meta.img}`" />
                    <!-- Todo: fix these :src paths -->
                </div>
            </div>
            <!-- <Link :to="info.path">
            Todo: Link to page after we build this area!
            <h4 class="name">{{info.meta.name}}</h4>
        </Link> -->
            <h4 class="name">{{ info.meta.name }}</h4>
            <div class="bio-content">
                <p>{{ info.meta.title }}</p>
            </div>
            <div class="wavy">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </div>
        </div>
        <div class="author-metas landscape" v-if="orientation == 'landscape'">
            <div class="bio-image-wrapper">
                <div class="bio-image-container">
                    <img class="bio-image" :src="`../${info.meta.img}`" />
                </div>
            </div>
            <div class="info">
                <h4 class="name">{{ info.meta.name }}</h4>
                <div class="bio-content">
                    <p>{{ info.meta.title }}</p>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="scss">
    .author-block {
        .author-metas {
            display: flex;
            flex-direction: column;
            position: relative;
            width: fit-content;

            &.landscape {
                flex-direction: row;
                gap: 1em;

                .bio-image-wrapper {
                    width: fit-content;
                }

                .bio-image-container {
                    margin: 0;
                    width: 2.75rem;
                    height: 2.75rem;
                }

                font-size: 0.8em;

                .info {
                    display: flex;
                    flex-direction: column;
                    gap: 0.1em;
                    justify-content: center;

                    p {
                        margin: 0;
                    }
                }

                .name {
                    line-height: 1;
                }

                .bio-content {
                    display: flex;
                    align-items: center;
                    gap: 1em;
                }

                .actions {
                    height: 20px;

                    .Button {
                        svg {
                            max-width: 14px;
                            height: 14px;
                            fill: var(--text-base-color);
                        }

                        &:hover {
                            opacity: 1;
                        }
                    }
                }
            }

            .bio-image-wrapper {
                position: relative;
                width: 100%;
            }

            .bio-image-container {
                width: 6rem;
                height: 6rem;
                overflow: hidden;
                border-radius: 3px;
                margin-bottom: 0.6em;
                display: flex;
                align-items: center;
            }

            .name {
                margin: 0;
            }

            p {
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
                    Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
                margin: 0;
                //line-height: 1.2;
                margin-bottom: 0.5rem;
                font-size: 14px;
                margin-top: 0.5rem;
                opacity: 0.5;
                font-weight: 400;
                margin-bottom: 1.5rem;
            }

            .metas {
                color: red;
            }

            .actions {
                display: flex;
                gap: 1em;
                padding: 0;

                .Button {
                    padding: 0;
                    background: none;
                    opacity: 0.75;

                    svg {
                        max-width: 16px;
                        fill: var(--text-base-color);
                    }

                    &:hover {
                        opacity: 1;
                    }
                }
            }
            .wavy {
                padding: 0.25em 0;
                color: var(--blue-200);
            }
        }
    }
</style>
