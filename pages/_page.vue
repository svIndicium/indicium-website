<template>
  <div :class="['page', $route.params.page]">
    <div class="container">
      <div v-for="(contentObj, idx) in page.content" :key="idx">
        <div v-if="contentObj.type.startsWith('text')">
          <TextBlock
            :type="contentObj.type"
            :title="contentObj.title"
            :subTitle="contentObj.subTitle"
            :text="contentObj.description"
            :button="contentObj.button"
            :card="contentObj.card"
            :textLink="contentObj.textLink"
          />
        </div>

        <div v-if="contentObj.type.startsWith('image')">
          <ImageBlock
            :type="contentObj.type"
            :title="contentObj.title"
            :text="contentObj.description"
            :image="contentObj.imgUrl"
            :button="contentObj.button"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import content from '../content.json'

import TextBlock from '../components/TextBlock'
import ImageBlock from '../components/ImageBlock'

export default {
  components: {
    TextBlock,
    ImageBlock
  },
  data: () => ({
    page: {}
  }),
  validate({ params }) {
    return content.pages.some(page => page.slug === params.page)
  },
  mounted() {
    const pageData = content.pages.find(p => p.slug === this.$route.params.page)
    this.$set(this, 'page', pageData)
    console.log({ pageData })
  },
  head() {
    return {
      title: this.page !== undefined ? (this.page.title !== undefined ? this.page.title : 'Indicium') : 'Indicium'
    }
  }
}
</script>

<style lang="scss" scoped>
.page {
  padding: 24px 0 64px 0;
}
</style>
