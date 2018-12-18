<template>
    <div ref="swiperContainer">
        <div class="swiper-wrapper">
            <slot></slot>
        </div>

        <slot name="pagination"></slot>
        <slot name="button-prev"></slot>
        <slot name="button-next"></slot>
        <slot name="scrollbar"></slot>
    </div>
</template>

<script>
    export default {
        name: 'Swiper',
        props: {
            options: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                swiper: null
            }
        },

        mounted() {
            this.swiper = new Swiper(this.$refs['swiperContainer'], this.options);
        }
    }
</script>