<template>
  <div :class="[!!error ? 'error' : '']">
    <label :for="label"><input v-model="internalValue" :name="label" type="checkbox" @change="update" /> <slot> </slot><span class="required">{{ required ? ' *' : '' }}</span></label>
  </div>
</template>

<script>
export default {
  name: 'CheckBox',
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: '',
    },
    error: {
      type: String,
      default: '',
    },
    required: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      internalValue: this.value,
    }
  },
  methods: {
    update() {
      this.$emit('input', this.internalValue)
    },
  },
}
</script>

<style lang="scss" scoped>
  .required {
    color: red;
  }

  .error {
    color: var(--indi-error);
  }
</style>
