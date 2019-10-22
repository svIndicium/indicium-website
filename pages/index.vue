<template>
  <div>
    <Heading />

    <no-ssr>
      <Sponsoren />
    </no-ssr>

    <div class="container">
      <TextBlock
        :type="getBlockContentByTitle('Over Indicium', page.content).type"
        :title="getBlockContentByTitle('Over Indicium', page.content).title"
        :text="getBlockContentByTitle('Over Indicium', page.content).description"
        :contained="true"
      />
    </div>

    <Events />

    <div class="container">
      <TextBlock
        :type="getBlockContentByTitle('Lid zijn is meedoen!', page.content).type"
        :title="getBlockContentByTitle('Lid zijn is meedoen!', page.content).title"
        :text="getBlockContentByTitle('Lid zijn is meedoen!', page.content).description"
        :button="getBlockContentByTitle('Lid zijn is meedoen!', page.content).button"
        :contained="true"
      />
      <TextBlock
        :type="getBlockContentByTitle('Commissies?', page.content).type"
        :title="getBlockContentByTitle('Commissies?', page.content).title"
        :text="getBlockContentByTitle('Commissies?', page.content).description"
        :button="getBlockContentByTitle('Commissies?', page.content).button"
        :contained="true"
      />
    </div>
  </div>
</template>

<script>
import Heading from '../components/Heading';
import Sponsoren from '../components/Sponsoren';
import TextBlock from '../components/TextBlock';
import Events from '../components/Events';
import content from '../content.json';
import { getBlockContentByTitle, getPageData } from '../utils';

export default {
  name: 'Home',
  components: {
    Heading,
    Sponsoren,
    TextBlock,
    Events
  },
  methods: {
    getBlockContentByTitle: getBlockContentByTitle
  },
  data: () => ({
    page: getPageData('')
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

* {
  box-sizing: border-box;
}

.text-block, .image-block {
  padding: 80px 0;

  @media screen and (max-width: $bp-tablet-sm) {
    padding: 12px 0;
  }
}
</style>
