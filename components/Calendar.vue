<template>
  <FullCalendar v-if="events.length > 0" defaultView="dayGridMonth" :plugins="calendarPlugins" :events="events" />
  <div v-else class="height-fix">
    <Loading />
  </div>
</template>

<script>
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import axios from 'axios'

import Loading from './Loading'

export default {
  components: {
    FullCalendar,
    Loading
  },
  data: () => ({
    calendarPlugins: [dayGridPlugin],
    events: []
  }),
  mounted() {
    axios.get('https://old.indicium.hu/json/events?&filter[start]<2019-10-13&filter[end]=>2017-09-01&page[size]=1000')
      .then((response) => {
        const events = response.data.data
        this.mapFetchedEvents(events)
      })
  },
  methods: {
    mapFetchedEvents(events) {
      const mappedEvents = events.map(event => ({
        id: event.id,
        title: event.attributes.title,
        start: event.attributes.start,
        end: event.attributes.end,
        url: `https://old.indicium.hu/evenement/${event.attributes.slug}`,
        allday: true
      }))

      this.$set(this, 'events', mappedEvents)
    }
  }
}
</script>

<style lang="scss">
@import "~/node_modules/@fullcalendar/core/main.css";
@import "~/node_modules/@fullcalendar/daygrid/main.css";

.fc-toolbar h2 {
  font-size: 1.2rem !important;
}
</style>
