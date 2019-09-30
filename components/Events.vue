<template>
  <div id="events" class="events-container">
    <h2 class="center">
      Opkomende activiteiten
    </h2>

    <div class="categories">
      <ul>
        <li v-for="(category, idx) in allCategories" :key="idx">
          <span :style="{backgroundColor: `#${category.hex}`}"></span>{{ category.courseTitle }}
        </li>
      </ul>
    </div>

    <div v-if="!isLoading && events.length > 0" class="events">
      <EventTile v-for="(event, idx) in events" :key="idx" :event="event" :allCategories="allCategories" />
    </div>
    <Loading v-else-if="isLoading" />
    <div v-else-if="!isLoading && events.length === 0">
      <p class="center">
        Geen opkomende activiteiten gevonden... 😢
      </p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import EventTile from './EventTile'
import Loading from './Loading'

export default {
  name: 'Events',
  components: {
    EventTile,
    Loading
  },
  data: () => ({
    isLoading: true,
    events: [],
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
        courseTitle: 'SNE',
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
  methods: {
    stripHTMLFromString(str = '') {
      return str.replace(/(<([^>]+)>)/ig, '').replace(/\n|\r/g, '')
    },
    fetchEvents() {
      axios.get('https://old.indicium.hu/json/events?page%5Bsize%5D=1000')
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
              url: `https://old.indicium.hu/evenement/${evt.attributes.slug}`,
              categories: evt.attributes.categories
            }))

          this.$set(this, 'isLoading', false)
          this.$set(this, 'events', featureEvents)
        })
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
        display: inline-flex;
        align-items: center;
        padding: 16px;

        @media screen and (max-width: $bp-tablet-sm) {
          padding: 8px;
        }

        span {
          display: inline-flex;
          width: 24px;
          height: 24px;
          background-color: #f2f2f2;
          margin-right: 8px;
          box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2);
          transition: box-shadow 300ms;

          &:hover {
            box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.5);
          }

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
