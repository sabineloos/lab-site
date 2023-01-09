<script>
    export default {
        name: "YouTubeEmbed",
        components: {},
        props: {
            videoSrc: {
                type: String,
                required: true,
            },
            title: {
                type: String,
                default: "AIDD Video"
            }
        },
        data() {
            return {};
        },
        methods: {},
        mounted() {},
    };
</script>
<template>
    <div class="youtube-embed">
        <iframe
            width="560"
            height="315"
            :src="videoSrc"
            :title="title"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
            allowfullscreen
        ></iframe>
    </div>
</template>
<style lang="scss">
    .youtube-embed {
    }
</style>
