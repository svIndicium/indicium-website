<template>
  <div class="container contact">
    <h2>{{ page.title }}</h2>

    <div class="flex">
      <div class="column left">
        <ul>
          <li v-for="(obj, idx) in getBlockContentByTitle('Info', page.content).list" :key="idx">
            <span class="medium">{{ obj.label }}</span>: {{ obj.value }}
          </li>
        </ul>

        <p>Of stuur direct een e-mail naar het bestuur:</p>
        <Button size="l" url="mailto:bestuur@indicium.hu">Mail direct</Button>
      </div>
      <div class="column right">
        <div class="map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2451.7310543306226!2d5.173675415856721!3d52.08462557973417!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c6693e9a2d0c9f%3A0xa9867c6558813da4!2sHogeschool%20Utrecht%2C%20Heidelberglaan%2015%2C%203584%20CS%20Utrecht!5e0!3m2!1sen!2snl!4v1568892960255!5m2!1sen!2snl"
            frameborder="0"
            style="border:0;"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Button from '../components/interactions/button';
import { getBlockContentByTitle, getPageData } from '../utils';

export default {
  name: 'Contact',
  components: {
    Button
  },
  methods: {
    getBlockContentByTitle: getBlockContentByTitle
  },
  data: () => ({
    page: getPageData('contact')
  }),
  head() {
    return {
      title: this.page.title !== undefined ? this.page.title : content.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            this.page.description !== undefined
              ? this.page.description
              : content.description
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
@import '../assets/scss/variables.scss';
.contact {
  padding-bottom: 64px;

  .flex {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  .map {
    border-radius: 4px;
    position: relative;

    iframe {
      width: 600px;
      height: 450px;
      @media screen and (max-width: $bp-tablet-sm) {
        width: 80vw;
      }
    }

    @media screen and (max-width: $bp-tablet-sm) {
      margin-top: 16px;
    }

    &:after {
      content: '';
      position: absolute;
      left: 16px;
      top: 16px;
      width: 100%;
      height: 100%;
      display: block;
      background: #dbedea;
      border-radius: 4px;
      z-index: -1;
    }
  }
}
</style>
