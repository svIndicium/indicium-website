<template>
  <div class="container">
    <div class="head">
      <div>
        <h2>{{ vacancy.title }}</h2>
        <p class="bold">
          {{ vacancy.description.short }}
        </p>
      </div>
      <div class="rightside">
        <div class="image-container">
          <img :src="getPartner(vacancy.partner).logo" :alt="getPartner(vacancy.partner).name + 'logo'" />
        </div>
        <h5>{{ getPartner(vacancy.partner).name }}</h5>
        <p>{{ vacancy.address }}</p>
        <p>{{ vacancy.email }}</p>
        <div class="buttons">
          <Button v-if="vacancy.url !== ''" :url="vacancy.url" size="l">
            Meer info over deze sollicitatie
          </Button>
          <Button :url="'/partners/' + getPartner(vacancy.partner).slug" size="l">
            Bekijk deze partner
          </Button>
        </div>
      </div>
    </div>
    <div v-html="vacancy.description.long"></div>
    <Button v-if="vacancy.url !== ''" :url="vacancy.url" size="l">
      Meer info over deze sollicitatie
    </Button>
  </div>
</template>

<script>
import axios from 'axios'
import content from '@/content.json'
import Button from '@/components/interactions/button'

export default {
  components: { Button },
  async asyncData({ params }) {
    const vacancyId = params.vacature.split('-')[0]
    const request = await axios.get(`https://old.indicium.hu/json/vacancies/${vacancyId}`)
    const vacancy = request.data.data
    return {
      vacancy: {
        id: vacancy.id,
        title: vacancy.attributes.title,
        description: {
          short: vacancy.attributes.shortdescription,
          long: vacancy.attributes.longdescription
        },
        date: new Date(vacancy.attributes.date).getTime() / 1000,
        email: vacancy.attributes.email,
        phone: vacancy.attributes.phone,
        address: vacancy.attributes.address,
        partner: vacancy.attributes.partner,
        slug: vacancy.attributes.slug,
        url: vacancy.attributes.url,
      }
    }
  },
  validate({ params }) {
    const vacancyId = params.vacature.split('-')[0]
    return /^\d+$/.test(vacancyId)
  },
  methods: {
    getPartner(oldId) {
      switch (oldId) {
        case '9':
          return content.partners[3]
        case '10':
          return content.partners[5]
        default:
          return content.partners[0]
      }
    },
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/variables.scss';

.bold {
  font-weight: 450;
}

.rightside {
  margin: 16px 8px 0 8px;
  padding: 0 8px;
  p {
    margin: 8px 16px;
  }
}

.buttons {
  display: flex;
  * {
    margin: 0 8px;
  }
}

.head {
  display: flex;

  @media screen and (max-width: $bp-tablet-sm) {
    flex-flow: column-reverse;
  }

  div {
    flex-basis: 50%;
  }
}

.image-container {
  height: auto;
  img {
    width: 50%;
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
}
</style>
