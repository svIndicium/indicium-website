<template>
  <div class="activiteiten">
    <div class="container">
      <h2>{{ page.title }}</h2>
      <no-ssr>
        <full-calendar />
      </no-ssr>
    </div>
  </div>
</template>

<script>
import content from '../content.json';
import { getBlockContentByTitle, getPageData } from '../utils';

export default {
  data: () => ({
    page: getPageData('activiteiten')
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
.activiteiten {
  padding: 0 0 64px 0;
}
</style>
