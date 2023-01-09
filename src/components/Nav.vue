<script>
    export default {
        name: "Nav",
        components: {},
        props: {},
        data() {
            return {
                theme: "light",
            };
        },
        computed: {
            pageType() {
                return this.$route.fullPath.includes("/posts/")
                    ? "post"
                    : this.$route.fullPath == "/"
                    ? "index"
                    : "other";
            },
            navClass() {
                return {
                    nav: true,
                    "nav--home": this.$route.name === "Index",
                };
            },
        },
        methods: {
            setTheme() {
                this.theme = this.navClass['nav--home'] ? 'light' : 'dark';
            }
        },
        mounted() {
            this.setTheme();
        }
    };
</script>

<template>
    <MaxWidth size="m" :class="navClass">
        <div class="nav__left">
            <Link to="/" no-decoration>
                <Logo />
                <div class="meta" :style="{borderTop: '1px solid lightgrey'}">
                    Dr. Sabine Loos <span>/ University of Michigan</span>
                </div>
            </Link>
        </div>
        <div class="nav__right">
            <!--
            TODO: implement all routes: ['team','posts', 'projects', 'content', 'events']
            -->
            <Link v-for="item in ['content', 'team']" :key="item" :to="`/${item}`">
                {{ item }}
            </Link>
            <Link class="cta" to="/contact" is-button> Work with us! </Link>
        </div>
    </MaxWidth>
</template>

<style lang="scss">
    .nav {
        z-index: 200;
        position: relative;

        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        font-weight: 500;
        transition: all 100ms linear;
        background-color: none;
        height: $nav-height;

        &--home {
            color: white;
        }

        &__left {
            padding-top: 1rem;
            padding-bottom: 1rem;

            &:hover {
                text-decoration: none;
            }

            .meta {
                font-size: 0.925em;
                border-top: 1px solid rgba(255, 255, 255, 0.4);
                padding-top: 0.5em;
                margin-top: 0.05em;
                padding-right: 1em;

                span {
                    opacity: 0.75;
                }
            }
        }

        &__right {
            padding-top: 1.5rem;
            padding-bottom: 1rem;
            flex-wrap: wrap;
            display: flex;
            justify-content: flex-end;
            gap: 2.5em;
            padding-left: 1em;
            align-items: center;
            text-transform: capitalize;

            a {
                text-decoration: none;
            }
        }
        .logo-img {
            max-width: 15em;
            height: auto;
            pointer-events: none;
            transform: translateX(
                -21px
            ); // Faking left alignment of text A instead of the graphic
        }
    }
</style>
