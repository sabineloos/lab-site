<script>
    import {mapState} from "vuex";
    import MaxWidth from "../components/global/MaxWidth.vue";
    import LightBox from "@/components/global/Lightbox.vue";

    export default {
        name: "Index",
        components: {
            MaxWidth,
            LightBox,
        },
        data() {
            return {
                isLoaded: false,
                lightbox: {
                    images: {
                        thumbnails: ["team-usgs.jpg"],
                        large: ["team-usgs.jpg"],
                    },
                    captions: [
                        "AIDD labs getting ice cream after work. Pictured clockwise: Dr. Sabine Loos, Marísa Macías, David Wald, Alex Brunson, Eli Knodel, Maddie Karr.",
                    ],
                    thumbnailsPath: "/img/",
                    largePath: "/img/",
                },
            };
        },
        computed: {
            ...mapState({
                members: state => state.members,
                contents: state => state.contents,
                recentPosts: state => [...state.posts.slice(0, 3)],
            }),
        },

        methods: {},
        mounted() {
            this.isLoaded = true;
        },
    };
</script>

<template>
    <SEO meta-title="Team" meta-description="About our diverse group of scientists and engineers."/>
    <MaxWidth class="team-page container" size="m">
        <div class="team__about">
            <h1>Team</h1>
            Our team is a group of disaster analysts with multiple backgrounds &emd; including
            humanitarian engineering, civil engineering, statistics &emd; and we're looking to
            grow. We strive to conduct convergent research, blending our knowledge of data
            and statistics on disasters and/or the built environment with an understanding
            of the social and natural systems that surround them. Therefore, our team
            members employ multiple methods bridging multiple disciplines.
        </div>
        <div class="team__members">
            <h2>Current members</h2>
            <div class="members">
                <div v-for="member in members" :key="member.id" class="member">
                    <div class="img-container">
                        <img :src="member.meta.img" />
                    </div>
                    <Link :to="member.meta.url" class="member">
                        <h3>{{ member.meta.name }}</h3>
                        <div>{{ member.meta.title }}</div>
                        <div>{{ member.meta.affiliation }}</div>
                    </Link>
                </div>
            </div>
        </div>
        <div class="team__alumni">
            <h2>Alumni</h2>
            <Link to="https://www.linkedin.com/in/kei-tomozawa-640060151/"
                >Kei Tomozawa</Link
            >, '22 - now at <Link to="https://www.fervoenergy.com/">Fervo Energy</Link>
            <br />
            <Link to="https://www.linkedin.com/in/jenny-levitt-89b1551a2/"
                >Jennifer Levitt</Link
            >, '23 - Stanford University
            <br />
            Jing Cheng Ng, '23 - Nanyang Technological University
        </div>
        <div class="team__opportunities">
            <h2>Opportunities</h2>
            <p>
                <b>Interested in joining our team?</b> <br /><br />
                <b
                    >If you'd like to pursue a PhD in AIDD labs, please consider applying
                    to Civil & Environmental Engineering program at University of
                    Michigan.</b
                >
                Please indicate in your application that you're interested in working with
                Professor Loos to ensure she is sent your application for review. We are
                open to folks from multiple disciplines, including engineering, geography,
                urban planning, computer science, geology, among many more. You are also
                more than welcome to email Professor Loos with the subject line
                “Prospective PhD student: ___” before applying, including your CV, a
                description of your research interests and how they align with AIDD labs
                research, what you're hoping to gain from a PhD, and any other relevant
                material. Please know that while she would like to be able to respond to
                all inquiries, you may not receive a personal response given the number of
                emails received each year.
                <br /><br />
                <b
                    >If you'd like to be a postdoc at AIDD labs, we are always looking for
                    talented individuals to contribute to our team through skill sharing,
                    mentorship, and conducting research.</b
                >
                If you are interested in joining our team as a postdoc, please email
                Professor Loos with the subject line “Prospective Postdoc: ___” including
                your CV and the ways you believe you can contribute to AIDD labs.
                <br /><br />
                <b
                    >If you'd like to collaborate or partner with AIDD labs, especially as
                    a community organization or as a user of disaster information, please
                    email Professor Loos with a description of your ideas and she'll
                    respond as soon as she can.
                </b>
                <br />
            </p>
            <!-- <div class="img-fullwidth"><img src="/img/team-usgs.jpg" alt="AIDD team USGS"></div> -->
            <LightBox
                :thumbnails="lightbox.images.thumbnails"
                :largeImages="lightbox.images.large"
                :thumbnailsPath="lightbox.thumbnailsPath"
                :largePath="lightbox.largePath"
                :captions="lightbox.captions"
                class="lightBox"
            />
        </div>
    </MaxWidth>
</template>

<style lang="scss">
    .team-page {
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding-bottom: 5em;
        padding-top: 4em;

        .light-box {
            &__thumbnail {
                display: block;
                margin-left: auto;
                margin-right: auto;
                height: auto;
                max-width: 60%;
            }
        }

        .members {
            display: flex;
            gap: 1.5em;
            justify-items: start;
            align-items: start;
            width: 100%;

            @media (max-width: 900px) {
                flex-wrap: wrap;
                gap: 1em;
            }
        }

        .member {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;

            .Link {
                
            }

            .img-container {
                max-height: 20em;
                width: 100%;
                max-width: 20em;
                overflow: hidden;
                display: flex;
                align-items: center;

                @media (max-width: 900px) {
                    max-height: 14em;
                }
            }
        }
    }
</style>
