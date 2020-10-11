<template>
  <div class="container">
    <div class="image-container">
      <img :src="partner.logo" :alt="partner.name + 'logo'" />
    </div>
    <h2>{{ partner.name }}</h2>
    <p>{{ partner.description }}</p>
    <Button :url="partner.url" size="l">
      Bezoek website
    </Button>
  </div>
</template>

<script>
import content from '../../content.json'
import Button from "~/components/interactions/button";

export default {
  name: 'Partner',
  components: {
    Button
  },
  data: () => ({
    partner: {}
  }),
  validate({ params }) {
    return content.partners.some(partner => partner.slug === params.partner)
  },
  mounted() {
    const partnerData = content.partners.find(p => p.slug === this.$route.params.partner)
    this.$set(this, 'partner', partnerData)
  },
  head() {
    return {
      title: this.partner.name !== undefined ? this.partner.name : content.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            this.partner.description !== undefined
              ? this.partner.description
              : content.description
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
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
