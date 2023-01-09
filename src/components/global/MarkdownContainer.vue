<script>
    import {mapState} from "vuex";
    export default {
        name: "MarkdownContainer",
        components: {},
        props: {},
        emits: [],
        data() {
            return {
                frontmatter: this.$attrs.frontmatter
            };
        },
        computed: {
            componentName() {
                if (this.$route.path.includes("/team/") && this.frontmatter.component == "Member") {
                    return this.frontmatter.component;
                }
                else {
                    return "Post"
                }
            }
        },
        methods: {},
        mounted() {},
    };
</script>
<template>
    <div class="MarkdownContainer">
        <component :is="componentName" :frontmatter="frontmatter">
            <slot />
        </component>
    </div>
</template>
<style lang="scss">
    .MarkdownContainer {
    }
</style>
