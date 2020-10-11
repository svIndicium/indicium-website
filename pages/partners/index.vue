<template>
  <div class="container">
    <div class="partner-container">
      <div v-for="(partner, i) in partners" :key="i" class="partner">
        <div class="logo">
          <div class="logo-container">
            <img :src="partner.logo" :alt="partner.name + ' logo'" />
          </div>
        </div>
        <div class="text">
          <h4>{{ partner.name }}</h4>
          <p>{{ getDescription(partner.description) }}</p>
          <Button :url="'/partners/' + partner.slug">Lees meer</Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import content from '../../content.json'
import Button from "~/components/interactions/button";

export default {
  name: 'Index',
  components: {Button},
  data: () => ({ partners: content.partners }),
  methods: {
    getDescription(description) {
      const text = description.slice(0, 140).trim()
      if (description.length > 140) {
        return `${text}...`
      }
      return text
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/variables.scss';
.partner-container {
  display: grid;
  @media screen and (max-width: $bp-desktop-sm) {
    grid-template-columns: 50% 50%;
  }
  @media screen and (max-width: $bp-tablet-sm) {
    grid-template-columns: 100%;
  }
  grid-template-columns: 33% 33% 33%;
  .partner {
    position: relative;
    margin: 8px;
    padding: 48px;
    border-radius: 8px;
    box-shadow: 0 0 20px 0 rgba(124, 124, 124, 0.3);
    transition: box-shadow 300ms;
    height: 200px;
    max-width: 360px;
    .text, .logo {
      position: absolute;
      left: 0;
      padding: 0 48px;
      transition: opacity 300ms;
    }

    .logo {
      display: block;
      width: calc(100% - 96px);
      height: calc(100% - 96px);
      .logo-container {
        display: flex;
        height: 100%;
        justify-content: center;
        align-items: center;
      }
    }

    .text {
      opacity: 0;

      p {
        color: var(--text-color);
        font-size: 14px;
      }
    }

    &:hover {
      .text {
        opacity: 1;
      }
      .logo {
        opacity: 0;
      }
    }
  }
}
</style>
