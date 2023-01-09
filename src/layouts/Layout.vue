<script>
    export default {
        name: "Layout",
        data() {
            return {};
        },
    };
</script>

<template>
    <div class="layout" id="layout">
        <div class="flex-content">
            <Nav />
            <div class="flex-content">
                <slot />
            </div>
        </div>
        <Footer />
    </div>
</template>

<style lang="scss">
    @import "./../styles/globals";

    .layout {
        display: flex;
        flex-direction: column;
        height: 100%;

        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
            height: 80px;
        }

        .flex-content {
            flex: 1;
            background-color: var(--background-color);
        }
        .nav__link {
            margin-left: 20px;
        }
    }
</style>
