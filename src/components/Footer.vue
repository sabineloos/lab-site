<script>
    import {mapState} from "vuex";
    export default {
        name: "Footer",
        components: {},
        props: {},
        data() {
            return {
                socialLinks: [
                    {
                        label: "Twitter",
                        url: "https://twitter.com/sab_loos",
                    },
                    {
                        label: "Github",
                        url: "https://github.com/sabineloos",
                    },
                    {
                        label: "Researchgate",
                        url: "https://www.researchgate.net/profile/Sabine-Loos",
                    },
                    {
                        label: "Google Scholar",
                        url: "https://scholar.google.com/citations?user=WEt_N8AAAAAJ&hl=en",
                    },
                ],
                otherLinks: [
                    {
                        label: "DAT/Artathon",
                        url: "https://datartathon.com/",
                    },
                    {
                        label: "University of Michigan Civil & Environmental Engineering",
                        url: "https://cee.engin.umich.edu/",
                    },
                ],
            };
        },
        computed: {},
    };
</script>

<template>
    <MaxWidth class="footer-container" size="xl">
        <MaxWidth class="footer-content" size="m">
            <div class="contact">
                <Link to="/" class="img-logo">
                    <img src="/img/logo-light.png" alt="AIDD labs logo" />
                </Link>
                <div class="contacttext">
                    <p>
                        Send us an email
                        <Link to="mailto:sloos@umich.edu" class="footer"
                            >sloos [at] umich [dot] edu</Link
                        >
                    </p>
                    <p>We are looking for new team members and partners!</p>
                    <p>
                        <Link to="https://goo.gl/maps/9JHpZbNSBSz7ajgr8" class="footer">
                            Office Address: GG Brown, 2350 Hayward St, Ann Arbor, MI 48109
                        </Link>
                    </p>
                    <p>
                        <Link
                            is-button
                            to="https://www.researchgate.net/profile/Sabine-Loos"
                        >
                            Check out our recent articles
                        </Link>
                    </p>
                    <div class="copyright">© Dr. Sabine Loos 2022 – 2023</div>
                </div>
            </div>
            <div class="socials">
                <Link to="/" class="img-logo">
                    <img src="/img/logo-light.png" alt="AIDD labs logo" />
                </Link>
                <div class="social">
                    <h4>Follow us</h4>
                    <div class="links">
                        <Link v-for="link in socialLinks" :to="link.url" :key="link">{{
                            link.label
                        }}</Link>
                    </div>
                </div>
                <div class="related">
                    <h4>Related</h4>
                    <div class="links">
                        <Link v-for="link in otherLinks" :to="link.url" :key="link">{{
                            link.label
                        }}</Link>
                    </div>
                </div>
            </div>
        </MaxWidth>
    </MaxWidth>
</template>

<style lang="scss">
    @import "./../styles/globals.scss";
    .footer-container {
        background: var(--blue-500);
        color: white;

        .footer-content {
            display: grid;
            grid-template-columns: 1fr minmax(200px 1fr);
            grid-template-areas: "contact socials";
            grid-gap: 1rem;
            width: 100%;

            font-size: 0.9rem;
            padding-top: 3em;
            padding-bottom: 3em;

            @media (max-width: 600px) {
                display: flex;
                flex-direction: column-reverse;
                gap: 2em;
                padding-bottom: 2em;
            }
        }

        h4 {
            margin: 0;
            margin-bottom: 1em;
        }

        .contact {
            grid-area: contact;
            display: flex;
            flex-direction: column;
            height: 100%;

            .img-logo {
                @media (max-width: 600px) {
                    display: none;
                }
            }

            .copyright {
                margin-top: 8em;
                opacity: 0.55;
            }
        }

        .socials {
            display: flex;
            gap: 2em;
            grid-area: socials;
            justify-content: flex-end;
            position: relative;

            .img-logo {
                display: none;
            }

            @media(max-width: 600px) {
                padding-top: 5em;

                .img-logo {
                    display: block;
                    position: absolute;
                    top: 0;
                    left: 0;
                }
            }
        }

        .img-logo {
            max-width: 175px;
            width: 100%;
        }

        .links {
            display: flex;
            flex-direction: column;
            gap: 0.75em;
        }

        .social,
        .related {
            display: flex;
            flex-direction: column;
            grid-gap: 1em;
        }
    }
</style>
