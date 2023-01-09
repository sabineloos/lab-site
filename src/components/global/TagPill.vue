<script>
    import {mapState} from "vuex";
    export default {
        name: "TagPill",
        components: {},
        props: {
            tag: {
                type: String,
                default: "risk",
            },
            variant: {
                type: String,
                default: "topic",
                validator(value) {
                    return ["type", "topic", "method"].includes(value);
                },
            },
        },
        emits: [],
        data() {
            return {
            };
        },
        computed: {},
        methods: {},
        mounted() {},
    };
</script>
<template>
    <div :class="`tag-pill ${variant}`">
        <div class="title">
            {{ getLabel(tag) }}
        </div>
    </div>
</template>
<style lang="scss">
    .tag-pill {
        font-size: 0.7em;
        color: white;
        background: var(--blue-500);
        display: inline-flex;
        text-transform: capitalize;
        border-radius: 2px;
        padding: 0.25em 0.95em;

        &.type {
            background: var(--orange-500);
        }
    }
</style>
