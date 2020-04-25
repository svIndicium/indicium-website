<template>
  <span class="ti">
    <svg width="100%" height="100%">
      <use :xlink:href="`/tabler-sprite.svg#tabler-${type}`" />
    </svg>
  </span>
</template>

<script>
export default {
  name: 'Icon',
  props: {
    type: {
      type: String,
      required: true
    },
  }
}
</script>

<style lang="scss" scoped>
</style>
