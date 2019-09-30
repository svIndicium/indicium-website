<template>
  <div v-if="type === 'text-center'" :class="['text-block', type, { contained }, { card }]">
    <h2 v-if="title">
      {{ title }}
    </h2>
    <h4 v-if="subTitle">
      {{ subTitle }}
    </h4>
    <p v-if="text" v-html="text"></p>

    <Button v-if="button" size="l" :center="type === 'center'" :url="button.url">
      {{ button.text }}
    </Button>

    <TextLink v-if="textLink" :url="textLink.url">
      {{ textLink.text }}
    </TextLink>
  </div>

  <div v-else-if="type === 'text-left'" :class="['text-block', type, { contained }, { card }]">
    <h2 v-if="title">
      {{ title }}
    </h2>
    <h4 v-if="subTitle">
      {{ subTitle }}
    </h4>
    <p v-if="text" v-html="text"></p>

    <Button v-if="button" size="l" :center="type === 'center'" :url="button.url">
      {{ button.text }}
    </Button>

    <TextLink v-if="textLink" :url="textLink.url">
      {{ textLink.text }}
    </TextLink>
  </div>

  <div v-else-if="type === 'text-right'" :class="['text-block', type, { contained }, { card }]">
    <h2 v-if="title">
      {{ title }}
    </h2>
    <h4 v-if="subTitle">
      {{ subTitle }}
    </h4>
    <p v-if="text" v-html="text"></p>

    <Button v-if="button" size="l" :center="type === 'center'" :url="button.url">
      {{ button.text }}
    </Button>

    <TextLink v-if="textLink" :url="textLink.url">
      {{ textLink.text }}
    </TextLink>
  </div>

  <div v-else class="text-block">
    <h2 v-if="title">
      {{ title }}
    </h2>
    <h4 v-if="subTitle">
      {{ subTitle }}
    </h4>
    <p v-if="text" v-html="text"></p>

    <Button v-if="button" size="l" :url="button.url">
      {{ button.text }}
    </Button>

    <TextLink v-if="textLink" :url="textLink.url">
      {{ textLink.text }}
    </TextLink>
  </div>
</template>

<script>
/* eslint-disable */
import Button from './interactions/button'
import TextLink from './interactions/TextLink'

export default {
  name: 'TextBlock',
  components: { TextLink, Button },
  props: {
    contained: {
      type: Boolean,
      default: false
    },
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
    },
    subTitle: {
      type: String,
    },
    text: {
      type: String,
      default: ''
    },
    button: {
      type: Object,
      default: null
    },
    textLink: {
      type: Object,
      default: null
    },
    card: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss">
@import '../assets/scss/variables.scss';

.text-block {
  margin: 0 auto 128px;

  @media screen and (max-width: $bp-tablet-sm) {
    margin: 0 auto 48px;
  }

  &.contained {
    max-width: 928px;
  }

  &.text-center {
    text-align: center;
    @media screen and (max-width: $bp-tablet-sm) {
      margin: 0;
      text-align: left;
    }
  }

  &.text-right {
    text-align: right;
  }

  &.card {
    @media screen and (max-width: $bp-tablet-sm) {
      padding: 24px;
    }
    padding: 48px;
    box-shadow: 0 0 20px 0 rgba(124, 124, 124, 0.1);
    transition: box-shadow 300ms;
  }
}
</style>
