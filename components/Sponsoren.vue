<template>
  <div class="sponsoren">
    <h5 class="center">
      Sponsoren
    </h5>
    <!-- <n-link to="/partners"> -->
    <slick
      :options="slickOptions"
    >
      <img v-for="(s, idx) in sponsoren" :key="idx" :src="s.path" alt="sponsor logo title" />
    </slick>
    <!-- </n-link> -->
  </div>
</template>

<script>
/* eslint-disable */
import content from '../content.json'
export default {
  name: 'Sponsoren',
  data: () => ({
    slickOptions: {
      initialSlide: 2,
      slidesToShow: 5,
      variableWidth: true,
      slidesToScroll: 1,
      centerMode: true,
      prevArrow: false,
      nextArrow: false,
      autoplay: true,
      responsive: [
        {
          breakpoint: 1100,
          settings: {
            centerMode: false,
            initialSlide: 0,
            slidesToShow: 2,
            slidesToScroll: 2
          }
        }
      ]
    },
    sponsoren: []
  }),
  created() {
    content.partners.forEach(partner => {
      if (partner.show) {
        this.sponsoren.push({path: partner.logo})
      }
    })
  }
}
</script>

<style lang="scss">
@import '../assets/scss/variables.scss';

.sponsoren {
  background: #fff;
  box-shadow: inset 0 -1px 0 0 #C6D1E0, inset 0 1px 0 0 #C6D1E0;
  padding: 8px 0 32px;
  overflow: hidden;

  @media screen and (max-width: $bp-tablet-sm) {
    padding: 8px 0 12px;
  }

  h5 {
    margin-bottom: 16px;
  }

  .slick-slider {
    // width: 90%;
    margin: 0 auto;
    box-sizing: border-box;
    position: relative;

    @media screen and (max-width: $bp-tablet-sm) {
      width: 100%;
    }

    .slick-arrow {
      display: none;
      position: absolute;
      bottom: 0;
      left: 0;
      color: var(--text-color);

      &.slick-next {
        left: auto;
        right: 0
      }

    }

    .slick-track {
      display: flex;
      align-items: center;


      .slick-slide {
        width: 128px;
        padding: 0 32px;
        display: inline-flex;
        justify-content: center;
      }
    }
  }
}
</style>
