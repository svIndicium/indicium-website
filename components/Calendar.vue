<template>
  <FullCalendar
    v-if="calendarOptions.events.length > 0"
    :options="calendarOptions"
  />
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
    calendarOptions: {
      plugins: [dayGridPlugin],
      defaultView: "dayGridMonth",
      events: [],
      firstDay: 1,
      eventTimeFormat: {
        hour: 'numeric',
        minute: '2-digit',
        hour12: false
      }
    },
    calendarPlugins: [dayGridPlugin],
    events: []
  }),
  mounted() {
    axios.get('https://old.indicium.hu/json/events?&filter[start]<2019-10-13&filter[end]=>2017-09-01&filter[status]=published&page[size]=1000')
      .then((response) => {
        const events = response.data.data
        this.mapFetchedEvents(events)
      })
  },
  methods: {
    mapFetchedEvents(events) {
      this.calendarOptions.events = events.map(event => ({
        id: event.id,
        title: event.attributes.title,
        start: event.attributes.start,
        end: event.attributes.end,
        url: `/activiteiten/${event.attributes.slug}-${event.id}`,
        allday: true
      }));
    }
  }
}
</script>

<style lang="scss">
.fc-toolbar h2 {
  font-size: 1.2rem !important;
}
</style>
