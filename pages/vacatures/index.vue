<template>
  <div class="container">
    <div v-if="isLoading">
      <Loading />
    </div>
    <div v-else class="vacancy-container">
      <div v-for="(vacancy, i) in vacancies" :key="i" class="vacancy">
        <div class="logo">
          <div class="logo-container">
            <img :src="getPartner(vacancy.partner).logo" :alt="getPartner(vacancy.partners).name + ' logo'" />
          </div>
        </div>
        <div class="text">
          <h4>{{ vacancy.title }}</h4>
          <p>{{ getDescription(vacancy.description.short) }}</p>
          <Button :url="'/vacatures/' + vacancy.id + '-' + vacancy.slug">
            Lees meer
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import content from '../../content.json'
import Button from '@/components/interactions/button'
import Loading from '@/components/Loading'

export default {
  components: {
    Loading,
    Button,
  },
  data: () => ({
    isLoading: true,
    vacancies: [],
    partners: {},
  }),
  mounted() {
    this.fetchVacancies()
  },
  methods: {
    getDescription(description) {
      const text = description.slice(0, 140).trim()
      if (description.length > 140) {
        return `${text}...`
      }
      return text
    },
    stripHTMLFromString(str = '') {
      return str.replace(/(<([^>]+)>)/ig, '').replace(/\n|\r/g, ' ').replace('&nbsp;', ' ')
    },
    fetchVacancies() {
      axios.get('https://old.indicium.hu/json/vacancies?filter[status]=published&page%5Bsize%5D=9')
        .then((response) => {
          const vacancies = response.data.data
          const shownVacancies = vacancies
            .map(vacancy => ({
              id: vacancy.id,
              title: vacancy.attributes.title,
              description: {
                short: this.stripHTMLFromString(vacancy.attributes.shortdescription),
                long: vacancy.attributes.longdescription
              },
              date: new Date(vacancy.attributes.date).getTime() / 1000,
              email: vacancy.attributes.email,
              phone: vacancy.attributes.phone,
              address: vacancy.attributes.address,
              partner: vacancy.attributes.partner,
              slug: vacancy.attributes.slug,
            }))

          this.$set(this, 'isLoading', false)
          this.$set(this, 'vacancies', shownVacancies)
        })
    },
    getPartner(oldId) {
      switch (oldId) {
        case '9':
          return content.partners[3]
        default:
          return content.partners[2]
      }
    },
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/variables.scss';

.vacancy-container {
  display: grid;
  @media screen and (max-width: $bp-desktop-sm) {
    grid-template-columns: 50% 50%;
  }
  @media screen and (max-width: $bp-tablet-sm) {
    grid-template-columns: 100%;
  }
  grid-template-columns: 33% 33% 33%;
  .vacancy {
    position: relative;
    margin: 8px;
    padding: 48px;
    border-radius: 8px;
    box-shadow: 0 0 20px 0 rgba(124, 124, 124, 0.3);
    transition: box-shadow 300ms;
    max-width: 360px;

    .logo {
      display: block;
      width: 100%;
      height: 100px;
      .logo-container {
        display: flex;
        height: 100%;
        justify-content: center;
        align-items: center;
      }
    }
  }
}
</style>
