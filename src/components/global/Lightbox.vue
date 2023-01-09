<template>
    <div>
        <img
            @click="lightboxEffect(index)"
            v-for="(thumbnail, index) in thumbnails"
            :key="thumbnail"
            :src="thumbnailsPath + thumbnail"
            class="light-box__thumbnail"
        />
        <transition name="fade" mode="out-in">
            <div @click.stop="bg = !bg" class="light-box__bg" v-if="bg"></div>
        </transition>

        <div v-if="bg">
            <div class="light-box__close" @click.stop="bg = !bg"></div>
            <!-- <p class="light-box__count" v-if="count">
          {{currentImage + 1 }}/
          <span>{{ thumbnails.length}}</span>
        </p> -->
            <!-- <div @click="prev" class="light-box__prev light-box__btn"></div> -->

            <div v-if="bg" class="light-box__container">
                <transition name="fade" mode="out-in">
                    <img
                        :key="currentImage"
                        :src="largePath + largeImages[currentImage]"
                        class="light-box__container__img"
                    />
                </transition>
                <div class="light-box__caption" v-if="caption">
                    <p v-if="captions[currentImage]">{{ captions[currentImage] }}</p>
                </div>
            </div>

            <!-- <div @click="next" class="light-box__next light-box__btn"></div> -->
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                bg: false,
                currentImage: 0,
                count: true,
                caption: true,
            };
        },
        props: {
            thumbnails: {
                type: Array,
                required: true,
            },
            largeImages: {
                type: Array,
                required: true,
            },
            captions: {
                type: Array,
                required: true,
            },
            thumbnailsPath: {
                type: String,
                required: true,
            },
            largePath: {
                type: String,
                required: true,
            },
        },
        methods: {
            lightboxEffect(curr) {
                this.currentImage = curr;
                this.bg = !this.bg;
            },
            next() {
                if (this.currentImage < this.largeImages.length - 1) {
                    this.currentImage++;
                } else {
                    this.currentImage = 0;
                }
            },
            prev() {
                if (this.currentImage > 0) {
                    this.currentImage--;
                } else {
                    this.currentImage = this.largeImages.length - 1;
                }
            },
        },
    };
</script>

<style lang="scss">
    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.2s;
    }
    .fade-enter,
    .fade-leave-to {
        opacity: 0;
    }
    .light-box {
        &__bg {
            position: fixed;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(255, 249, 238, 0.89);
            z-index: 1000;
        }

        &__thumbnail {
            cursor: zoom-in;
        }

        &__close {
            padding: 10px;
            position: fixed;
            right: 20px;
            top: 20px;
            color: #000;
            background-image: url(/img/lightbox/close.svg);
            background-size: contain;
            background-position: center;
        }
        &__container {
            position: fixed;
            z-index: 2000;
            display: flex;
            justify-content: center;
            align-items: center;
            max-width: 80%;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            min-height: 40%;
            img {
                align-self: center;
            }
        }
        &__btn {
            background-size: contain;
            background-position: center;
            align-self: center;
            padding: 15px;
        }

        &__close,
        &__btn {
            cursor: pointer;
        }

        &__close,
        &__btn,
        &__caption,
        &__count {
            position: fixed;
            z-index: 3000;
        }

        &__next {
            background-image: url(/img/lightbox/next.svg);
            right: 20px;
        }
        &__prev {
            background-image: url(/img/lightbox/prev.svg);
            left: 20px;
        }
        &__next,
        &__prev {
            top: 50%;
            transform: translateY(-50%);
        }

        &__caption {
            position: fixed;
            bottom: 0;
            max-width: 90%;
            height: 0px;
            display: flex;
            align-items: flex-start;
            color: #000;
            text-align: center;
            justify-content: center;
        }

        &__count {
            left: 20px;
            font-size: 16px;
            color: #fff;
            top: 14px;
            padding: 0;
            margin: 0;
        }
    }
</style>

<!-- https://github.com/harrybeckwith/vue-lightbox/blob/master/src/App.vue -->
