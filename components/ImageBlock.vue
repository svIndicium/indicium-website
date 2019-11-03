<template>
  <div v-if="type === 'image-left'" :class="['image-block', type]">
    <div class="image">
      <img :src="image" alt="sponsor logo title" />
    </div>
    <div class="text">
      <h1>{{ title }}</h1>
      <h4 v-if="subTitle">
        {{ subTitle }}
      </h4>
      <p>{{ text }}</p>
      <Button v-if="button" size="l" :url="button.url">
        {{ button.text }}
      </Button>
    </div>
  </div>

  <div v-else-if="type === 'image-right'" :class="['image-block', type]">
    <div class="text">
      <h1>{{ title }}</h1>
      <h4 v-if="subTitle">
        {{ subTitle }}
      </h4>
      <p>{{ text }}</p>

      <Button v-if="button" size="l" :url="button.url">
        {{ button.text }}
      </Button>
    </div>
    <div class="image">
      <img :src="image" alt="sponsor logo title" />
    </div>
  </div>

  <div v-else class="image-block full-width">
    <img :src="image" />
  </div>
</template>

<script>
import Button from './interactions/button'

export default {
  name: 'ImageBlock',
  components: { Button },
  props: {
    type: {
      type: String,
      default: ''
    },
    url: {
      type: String,
      default: '#'
    },
    title: {
      type: String,
      default: 'title'
    },
    subTitle: {
      type: String,
      default: null
    },
    text: {
      type: String,
      default: 'text'
    },
    image: {
      type: String,
      default: ''
    },
    button: {
      type: Object,
      default: null
    }
  }
}
</script>

<style lang="scss">
@import '../assets/scss/variables.scss';

.image-block {
  max-width: 928px;
  margin: 0 auto;

  &.full-width {
    img {
      width: 100%;
    }
  }

  &.image-right, &.image-left {
    display: flex;
    flex-wrap: wrap;
    align-items: center;

    .image {
      flex-grow: 1;
      flex-basis: calc(50% - 32px);
      padding: 0 16px;
      min-width: 348px;

      @media screen and (min-width: 414px) {
        margin-top: 32px;
      }

      img {
        display: block;
        max-width: 100%;
      }
    }
    .text {
      flex-grow: 1;
      flex-basis: calc(50% - 32px);
      padding: 0 16px;

      @media screen and (max-width: $bp-tablet-sm) {
        padding: 0;
      }
    }
  }

  &.image-right Button {
    margin-bottom: 8px;
  }
}
</style>
