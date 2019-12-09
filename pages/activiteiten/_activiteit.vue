<template>
  <div v-if="error === null" :class="['page', $route.params.page]">
    <div v-if="page.image" :style="getHeaderImage" class="image-container">
    </div>
    <div class="container">
      <h2>{{ page.title }}</h2>
      <h5 v-if="page.start">
        {{ getEventDate }}
      </h5>
      <h5 v-if="page.categories">
        Gerelateerde studierichtingen: {{ page.categories.join(", ") }}
      </h5>
      <div v-if="page.description" v-html="page.description"></div>
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
  computed: {
    getHeaderImage() {
      return { 'background-image': `url(${this.page.image})` }
    },
    getEventDate() {
      const { start, end } = this.page
      return `${this.getDateAsString(start)} - ${this.isSameDay(start, end)
        ? this.getTimeAsString(end)
        : this.getDateAsString(end)}`
    }
  },
  asyncData({ params }) {
    const activityId = params.activiteit.split('-').reverse()[0]
    return axios.get(`https://old.indicium.hu/json/events/${activityId}`)
      .then(res => res.data.data)
      .then(res => ({
        page: {
          id: res.id,
          title: res.attributes.title,
          signUpLink: res.attributes.inschrijflink,
          description: res.attributes.contentblocks[0].content,
          image: res.attributes.contentblocks.length > 1 ? res.attributes.contentblocks[1].image.url : null,
          categories: res.attributes.categories,
          start: new Date(res.attributes.start),
          end: new Date(res.attributes.end)
        },
        error: null
      }))
      .catch(err => ({
        error: {
          statusCode: err.response.status,
          message: err.response.data
        },
        page: null
      }))
  },
  validate({ params }) {
    const activityId = params.activiteit.split('-').reverse()[0]
    return /^\d+$/.test(activityId)
  },
  methods: {
    isSameDay(date1, date2) {
      if (date1 === undefined || date2 === undefined) {
        return false
      }

      const isSameDay = date1.getDate() === date2.getDate()
      const isSameMonth = date1.getMonth() === date2.getMonth()
      const isSameYear = date1.getFullYear() === date2.getFullYear()

      return (
        isSameDay &&
        isSameMonth &&
        isSameYear
      )
    },
    getMonthAsString(currentMonth = new Date().getMonth()) {
      const monthList = [
        'Januari',
        'Februari',
        'Maart',
        'April',
        'Mei',
        'Juni',
        'Juli',
        'Augustus',
        'September',
        'Oktober',
        'November',
        'December'
      ]

      return monthList[currentMonth]
    },
    getDayAsString(currentDay = new Date().getDay()) {
      const week = [
        'Maandag',
        'Dinsdag',
        'Woensdag',
        'Donderdag',
        'Vrijdag',
        'Zaterdag',
        'Zondag'
      ]

      return week[currentDay - 1]
    },
    getDateAsString(date) {
      return `${this.getDayAsString(date.getDay())} ${date.getDate()} ${this.getMonthAsString(date.getMonth())} ${date.getFullYear()} ${this.getTimeAsString(date)}`
    },
    getTimeAsString(date) {
      const minutes = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes()
      return `${date.getHours()}:${minutes}`
    }
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
                : 'Indicium - De studievereniging voor ICT bij Hogeschool Utrecht'
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
