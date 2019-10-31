<template>
  <div :class="['page', $route.params.page]">
    <div v-if="page.image" :style="{'background-image': 'url(' + page.image + ')'}" class="image-container">
    </div>
    <div class="container">
      <h2>{{ page.title }}</h2>
      <h5 v-if="page.categories">
        Gerelateerde studierichtingen: {{ page.categories.join(", ") }}
      </h5>
      <p v-if="page.description" v-html="page.description"></p>
      <Button v-if="page.inschrijflink" id="activity_sign_up" :url="page.inschrijflink" size="l">
        Schrijf je in
      </Button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

import Button from '../../components/interactions/button'

export default {
  components: {
    Button
  },
  data: () => ({
    page: {}
  }),
  async validate({ params }) {
    const { data } = await axios.get(`https://old.indicium.hu/json/events/${params.activiteit.split('-').reverse()[0]}`)
    return data.data.id !== undefined
  },
  mounted() {
    axios.get(`https://old.indicium.hu/json/events/${this.$route.params.activiteit.split('-').reverse()[0]}`)
      .then(res => res.data.data)
      .then(res => ({
        id: res.id,
        title: res.attributes.title,
        inschrijflink: res.attributes.inschrijflink,
        description: res.attributes.contentblocks[0].content,
        image: res.attributes.contentblocks.length > 1 ? res.attributes.contentblocks[1].image.url : null,
        categories: res.attributes.categories
      }))
      .then(res => this.$set(this, 'page', res))
  },
  head() {
    return {
      title: this.page.title !== undefined ? this.page.title : 'Indicium',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
              this.page.description !== undefined
                ? this.page.description
                : 'content.description'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.image-container {
  height: 500px;
  background-position: bottom;
  background-size: cover;
  position: relative;
  z-index: -11;
  margin-top: -35px;

  &:after {
    content: '';
    background-color: rgba(255, 255, 255, 1.0);
    height: 300px;
    width: 105%;
    display: block;
    position: absolute;
    left: -10px;
    bottom: -200px;
    transform: rotate(-10deg);
    z-index: -10;
  }
}

  .container {
    h2, p, button {
      z-index: -9;
    }
  }
</style>
