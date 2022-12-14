<script>
    export default {
        // website 3rd wall tooltip
        name: "Tooltip",
        components: {},
        props: {
            purpose: {
                type: String,
                validator(value) {
                    return ["aside", "note", "blank"].includes(value);
                },
            },
            position: {
                type: [Array, String],
                default: ["top", "center"], // does nuthin yet
            },
            gradient: {
                type: Boolean,
                default: false,
            },
            dots: {
                type: Boolean,
                default: false,
            },
            neon: {
                type: Boolean,
                default: false,
            },
        },
        data() {
            return {
                isLoaded: false,
                isHovered: false,
                isLocked: false,

                topOffset: 0,
                leftOffset: 0,
            };
        },
        computed: {
            classes() {
                return ["gradient", "dots", "neon"]
                    .filter(prop => this[prop])
                    .map(prop => `toggle-${prop}`)
                    .toString()
                    .replace(",", " ");
            },
        },
        methods: {
            toggleHover() {
                this.isHovered = !this.isHovered;
                if (!this.isLocked) this.setTooltipOffsets(this.isHovered);
            },
            toggleTooltipLocked() {
                this.isHovered = true;
                this.isLocked = !this.isLocked;
            },
            setTooltipOffsets(isHovered) {
                if (isHovered) {
                    let toggleRef = this.$refs["tooltip-toggle"];
                    let tooltipContents = this.$refs["tooltip-contents"];

                    this.topOffset =
                        toggleRef.getBoundingClientRect().top -
                        (toggleRef.getBoundingClientRect().height + 15);
                    this.leftOffset =
                        toggleRef.getBoundingClientRect().left +
                        toggleRef.getBoundingClientRect().width / 2 -
                        tooltipContents.getBoundingClientRect().width / 2;
                } else {
                    this.topOffset = 0;
                    this.leftOffset = 0;
                }
            },
        },
        mounted() {
            this.isLoaded = true;
        },
    };
</script>

<template>
    <div class="Tooltip">
        <div
            :class="`toggle ${classes}`"
            @mouseover="toggleHover"
            @mouseleave="toggleHover"
            @click="toggleTooltipLocked"
            ref="tooltip-toggle"
        >
            <slot name="toggle" />
        </div>
        <Teleport to="#tooltip-teleport" v-if="isLoaded">
            <div
                ref="tooltip-contents"
                class="Tooltip-contents"
                :style="{
                    transform: `translate(${leftOffset}px, ${topOffset}px)`,
                    opacity: isHovered || isLocked ? 1 : 0,
                }"
            >
                <slot name="contents" />
            </div>
        </Teleport>
    </div>
</template>

<style lang="scss">
    .Tooltip {
        display: inline-block;

        .toggle {
            display: inline-block;

            &:hover {
                cursor: pointer;
            }

            &.toggle-gradient {
                position: relative;

                &::after {
                    position: absolute;
                    content: "";
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    height: 4px;
                    background: linear-gradient(90deg, #ffdec9 0%, #fde8ef 100%);
                    opacity: 1;
                    z-index: -1;
                }
            }

            &.toggle-neon {
                text-decoration-line: underline;
                text-decoration-style: wavy;
                text-underline-offset: 2px;
                text-decoration-thickness: 2px;
                text-decoration-color: var(--blue-300);
            }
        }
    }
    .Tooltip-contents {
        position: absolute;
        border: 1px solid #fa71f9;
        z-index: 10;
        background: var(--background-color);
        color: red;
        padding: 0.35em 0.75em;
        border-radius: 4px;
        box-shadow: 0 2px 3px 0px #3d383830;
    }
</style>
