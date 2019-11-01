<template>
  <div v-if="error === null" :class="['page', $route.params.page]">
    <div v-if="page.image" :style="getHeaderImage" class="image-container">
    </div>
    <div class="container">
      <h2>{{ page.title }}</h2>
      <h5 v-if="page.categories">
        Gerelateerde studierichtingen: {{ page.categories.join(", ") }}
      </h5>
      <p v-if="page.description" v-html="page.description"></p>
      <Button v-if="page.signUpLink" id="activity_sign_up" :url="page.signUpLink" size="l">
        Schrijf je in
      </Button>
    </div>
  </div>
  <div v-else class="container">
    <h2>Evenement niet gevonden!</h2>
    <Button url="/activiteiten">
      Ga terug
    </Button>
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
    page: {},
    error: null
  }),
  validate({ params }) {
    const activityId = params.activiteit.split('-').reverse()[0]
    return /^\d+$/.test(activityId)
  },
  computed: {
    getHeaderImage() {
      return { 'background-image': `url(${this.page.image})` }
    }
  },
  mounted() {
    const activityId = this.$route.params.activiteit.split('-').reverse()[0]
    axios.get(`https://old.indicium.hu/json/events/${activityId}`)
      .then(res => res.data.data)
      .then(res => ({
        id: res.id,
        title: res.attributes.title,
        signUpLink: res.attributes.inschrijflink,
        description: res.attributes.contentblocks[0].content,
        image: res.attributes.contentblocks.length > 1 ? res.attributes.contentblocks[1].image.url : null,
        categories: res.attributes.categories
      }))
      .then(res => this.$set(this, 'page', res))
      .catch((err) => {
        this.error = {
          statusCode: err.response.status,
          message: err.response.data
        }
      })
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
  background-position: center;
  background-size: cover;
  position: relative;
  z-index: -11;
  overflow: hidden;
  //margin-top: -35px;

}

 // .container {
 //   position: relative;
 //   overflow-x: hidden;
//
//    &:before {
//      content: '';
//      background-color: black;
//      height: 300px;
//      width: 120%;
//      display: block;
//      overflow: hidden;
//      position: absolute;
//      left: -10px;
//      top: 0;
//      transform: rotate(-10deg);
//      z-index: -10;
//     }
//  }
</style>
