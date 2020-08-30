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
    sponsoren: [
      {
        path: '/partners/axians-logo.png'
      },
      {
        path: '/partners/logo_cegeka.png'
      },
      {
        path: '/partners/moneymonk-logo.png'
      },
      {
        path: '/partners/sue.png'
      },
      {
        path: '/partners/SAH.svg'
      },
      {
        path: '/partners/utrecht-promotions-logo.png'
      },
      {
        path: '/partners/moneymonk-logo.png'
      },
      {
        path: '/partners/hu-logo.svg'
      }
    ]
  })
}
</script>

<style lang="scss">
@import '../assets/scss/variables.scss';

.sponsoren {
  background: var(--secondary-background-color);
  box-shadow: inset 0 -1px 0 0 var(--root-background-color), inset 0 1px 0 0 var(--root-background-color);
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
