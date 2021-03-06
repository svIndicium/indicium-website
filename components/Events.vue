<template>
  <div id="events" class="events-container">
    <h2 class="center">
      Aankomende activiteiten
    </h2>
    <div class="categories">
      <ul>
        <li v-for="(category, idx) in allCategories" :key="idx" :class="{ 'in-active': !activeCategories.includes(category.courseTitle) }" @click="filterCategories(category)">
          <span :style="{backgroundColor: `#${category.hex}`}"></span>{{ category.courseTitle }}
        </li>
      </ul>
    </div>

    <div v-if="!isLoading && events.length > 0" class="events">
      <EventTile v-for="(event, idx) in filteredEvents" :key="idx" :event="event" :allCategories="allCategories" />
    </div>
    <Loading v-else-if="isLoading" />
    <div v-else-if="!isLoading && events.length === 0">
      <p class="center">
        Geen aankomende activiteiten gevonden... 😢
      </p>
    </div>
    <div class="container center">
      <p class="center">
        Wil je automatisch alle evenementen in je agenda krijgen? Zorg ervoor dat alle richtingen waar je activiteiten van wilt ontvangen aan staan en klik op onderstaande knop om de link te kopiëren en importeer deze in je favoriete agenda applicatie!
      </p>
      <Button
        size="l"
        :center="true"
        url=""
        @click.native="copyFeedLinkToClipboard"
      >
        Kopieër naar klembord
      </Button>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import axios from 'axios'
import EventTile from './EventTile'
import Loading from './Loading'
import Button from './interactions/button'

export default {
  name: 'Events',
  components: {
    Button,
    EventTile,
    Loading
  },
  data: () => ({
    isLoading: true,
    events: [],
    activeCategories: ['SD', 'TI', 'CSC', 'BIM', 'AI'],
    allCategories: [
      {
        courseTitle: 'SD',
        hex: 'E17272'
      },
      {
        courseTitle: 'TI',
        hex: 'A2E172'
      },
      {
        courseTitle: 'CSC',
        hex: 'E1DB72'
      },
      {
        courseTitle: 'BIM',
        hex: '727AE1'
      },
      {
        courseTitle: 'AI',
        hex: '72E1AD'
      },
    ]
  }),
  mounted() {
    this.fetchEvents()
  },
  computed: {
    filteredEvents() {
      return this.events.filter(event => {
          return event.categories.filter(cat => this.activeCategories.includes(cat)).length > 0;
      })
    },
    feedLink() {
      const url = 'https://ics.indicium.hu/v1/ics'
      const categories = this.activeCategories.join(",")
      if (this.activeCategories.length === this.allCategories.length) {
        return url
      }
      return `${url}?categories=${categories}`
    }
  },
  methods: {
    stripHTMLFromString(str = '') {
      return str.replace(/(<([^>]+)>)/ig, '').replace(/\n|\r/g, ' ').replace('&nbsp;', ' ')
    },
    fetchEvents() {
      axios.get('https://old.indicium.hu/json/events?filter[status]=published&page%5Bsize%5D=1000')
        .then((response) => {
          const events = response.data.data
          const today = new Date().getTime()
          const featureEvents = events
            .filter(evt => new Date(evt.attributes.start).getTime() > today)
            .sort((eventA, eventB) => new Date(eventA.attributes.start) - new Date(eventB.attributes.start))
            .map(evt => ({
              title: evt.attributes.title,
              description: this.stripHTMLFromString(evt.attributes.contentblocks[0].content),
              date: new Date(evt.attributes.start).getTime() / 1000,
              url: `/activiteiten/${evt.attributes.slug}-${evt.id}`,
              categories: evt.attributes.categories
            }))

          this.$set(this, 'isLoading', false)
          this.$set(this, 'events', featureEvents)
        })
        .then(this.addSampleEvents)
    },
    filterCategories({ courseTitle }) {
      const catIdx = this.activeCategories.indexOf(courseTitle)
      if(this.activeCategories.includes(courseTitle)) {
        this.activeCategories.splice(catIdx, 1)
      } else {
        this.activeCategories.push(courseTitle)
      }
    },
    copyFeedLinkToClipboard() {
      this.copyToClipboard(this.feedLink)
        .then(() => {
          console.log('Copied to clipboard')
        }).catch(err => {
          console.error(err)
      })
    },
    async copyToClipboard(text) {
      try {
        await navigator.clipboard.writeText(text)
      } catch (e) {
        console.error(e)
      }
    }
  }
}
</script>

<style lang="scss">
@import '../assets/scss/variables.scss';

.events-container {
  max-width: 1084px;
  margin: 0 auto 128px;

  .categories {
    ul {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;

      li {
        cursor:pointer;
        display: inline-flex;
        align-items: center;
        padding: 16px;

        &.in-active span {
          background-color: lightgrey !important;
        }

        @media screen and (max-width: $bp-tablet-sm) {
          padding: 8px;
        }

        span {
          display: inline-flex;
          width: 24px;
          height: 24px;
          background-color: #f2f2f2;
          margin-right: 8px;
          box-shadow: 0 0 20px 0 rgba(186, 186, 186, .3);
          transition: box-shadow 300ms;

        }
      }
    }
  }

  .events {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    flex-wrap: wrap;
  }
}
</style>
