<script>
    import utils from "@/scripts/utils.js";
    export default {
        name: "TOC",
        components: {},
        props: {
            activeHeading: {
                type: String,
            },
        },
        data() {
            return {
                titles: [],
                nodes: [],
                minDepth: 0,
            };
        },
        computed: {},
        methods: {
            initTOC() {
                let titles = utils.getMarkdownTitles();
                Object.keys(titles).forEach(key => {
                    this[key] = {...titles}[key]
                });
            },
            scrollToHeading(headingId, $event) {
                $event.preventDefault();
                let element = document.getElementById(headingId);
                let top = element.offsetTop + 180;
                window.scrollTo({left: 0, top, behavior: "smooth"});
            },
        },
        mounted() {
            this.initTOC();
        },
    };
</script>

<template>
    <div class="TOC">
        <div v-if="titles[0]">
            <div v-for="(heading, index) in titles" :key="heading">
                <a
                    href=""
                    class="heading"
                    :class="activeHeading == nodes[index]['id'] && 'active'"
                    @click="scrollToHeading(nodes[index]['id'], $event)"
                >
                    {{ heading["title"] }}
                </a>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
    .TOC {
        .heading {
            text-decoration: none;
            font-size: 0.85em;
            line-height: 1.15;
            padding: 0.5em 0;
            opacity: 0.3;

            &.active {
                opacity: 1;
            }
        }
    }
</style>