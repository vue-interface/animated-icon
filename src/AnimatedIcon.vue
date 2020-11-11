<template>
    <div
        class="animated-icon"
        @mouseenter="hover && play()"
        @mouseleave="hover && pause()">
        <lottie
            v-if="loaded"
            :options="options"
            :style="{width: `${dimensions.width}px`, height: `${dimensions.height}px`, fontSize: `${dimensions.height}px`, lineHeight: 0}"
            @animCreated="onAnimCreated" />
    </div>
</template>

<script>
import ComponentRegistry from '@vue-interface/component-registry';
import { registry } from './registry';

export default {

    components: {
        Lottie: () => import(/* webpackChunkName: 'lottie'*/'vue-lottie')
    },

    props: {
        /**
         * The available size aliases. Should be key/value pair. The key is the
         * name of the size alias, and the value is a number that represents
         * the width and height (in pixels).
         *
         * @param {Object}
         */
        availableSizes: {
            type: Object,
            default() {
                return {
                    'xs': 16,
                    'sm': 32,
                    'md': 64,
                    'lg': 128,
                    'xl': 192
                };
            }
        },

        /**
         * Should the animation autoplay.
         *
         * @param {Boolean}
         */
        autoplay: Boolean,

        /**
         * The animated direction. Should be `1` for forward or `-1` for
         * backwards.
         *
         * @param {Number}
         */
        direction: {
            type: Number,
            default: 1,
            validate: value => value === 1 || value === -1
        },

        /**
         * The icon height.
         *
         * @param {Number}
         */
        height: Number,

        /**
         * Animate the icon on hover.
         *
         * @param {Boolean}
         */
        hover: Boolean,

        /**
         * The icon. Should be a JSON object or Promise that returns a JSON
         * object.
         *
         * @param {String|Object|Promise}
         */
        icon: {
            type: [String, Object, Promise],
            required: true
        },

        /**
         * Should the animation loop. If a number is passed, will loop X amount
         * of times.
         *
         * @param {Boolean|Number}
         */
        loop: [Boolean, Number],

        /**
         * The icon registry. Uses the default registry unless specified.
         *
         * @param {IconRegistry}
         */
        registry: {
            type: ComponentRegistry,
            default: () => registry
        },

        /**
         * The size of the icon. Can pass a string like "sm", "md", "lg", or
         * an integer which will be the height and width.
         *
         * @param {Number|String}
         */
        size: {
            type: [Number, String],
            default: 'sm',
            validate(value) {
                if(typeof value === 'number') {
                    return value;
                }
                
                return typeof this.availableSizes[value] !== 'undefined';
            }
        },

        /**
         * The animation speed. Should be integer 0 to 1.
         *
         * @param {Number}
         */
        speed: {
            type: Number,
            default: .5,
            validate: value => value >= 0 && value <= 1
        },

        /**
         * The icon width.
         *
         * @param {Number}
         */
        width: Number

    },

    data() {
        return {
            loaded: false,
            dimensions: {
                width: this.dimension('width'),
                height: this.dimension('height')
            },
            options: {
                animationData: null,
                autoplay: this.autoplay,
                container: this.$el,
                loop: this.loop,
                name: this.name
            }
        };
    },

    watch: {

        autoplay(value) {
            if(value) {
                this.animation.play();
            }
            else {
                this.animation.pause();
            }
        },

        direction(value) {
            this.animation.setDirection(value);
        },

        loop(value) {
            this.animation.loop = this.options.loop = value;
        },

        size(value) {
            this.dimensions = {
                width: this.dimension('width'),
                height: this.dimension('height')
            };
        },

        speed(value) {
            this.animation.setSpeed(value);
        }

    },

    created() {
        this.promise().then(animationData => {
            this.options.animationData = animationData;
            this.loaded = true;
            this.$emit('load');
        }, e => {
            this.$emit('error', e);

            throw e;
        });
    },

    methods: {

        dimension(param) {
            if(typeof this.size === 'number') {
                return this.size;
            }

            if(typeof this[param] === 'undefined') {
                return this.availableSizes[this.size];
            }

            return this[param];
        },

        promise() {
            if(typeof this.icon === 'object') {
                return Promise.resolve(this.icon);
            }
            
            if(typeof this.icon === 'string') {
                return Promise.resolve(
                    this.registry.get(this.icon)
                );
            }
            
            return this.icon;
        },

        stop() {
            this.animation.stop();
        },

        play() {
            this.animation.play();
        },

        pause() {
            this.animation.pause();
        },

        onAnimCreated(animation) {
            this.animation = animation;
            this.animation.setSpeed(this.speed);
            this.animation.setDirection(this.direction);
        }

    }

};
</script>