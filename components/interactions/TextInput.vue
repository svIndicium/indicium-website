<template>
  <div class="text-input">
    <label>{{ label }}<span class="required">{{ required ? ' *' : '' }}</span></label>
    <br />
    <input
      v-model="internalValue"
      type="text"
      :name="name"
      :placeholder="placeholder"
      :class="[!!error ? 'error' : '']"
      @input="update"
      @focusin="focusin"
      @focusout="focusout"
    />
    <div class="error-message">
      {{ error }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'TextInput',
  props: {
    value: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    error: {
      type: String,
      default: '',
    },
    name: {
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
    focusin(e) {
      this.$emit('focusin', e)
    },
    focusout(e) {
      this.$emit('focusout', e)
    },
  },
}
</script>

<style lang="scss" scoped>

  .text-input {
    margin-bottom: 8px;
  }

  .required {
    color: red;
  }

  input {
    background: var(--secondary-background-color);
    border: 2px var(--indi-grey) solid;
    padding: 8px 16px;
    border-radius: 8px;
    color: var(--text-color);
    transition: .3s;
    &::placeholder {
      color: #8d8f9199;
    }

    &:focus {
      border: 2px var(--indi-blue-1) solid;
      outline: none;
      &::placeholder {
        transition: .3s;
        color: transparent;
      }
    }

    &.error {
      border: 2px var(--indi-error) solid;
    }
  }

  .error-message {
    margin-left: 16px;
    color: var(--indi-error);
    font-size: 12px;
  }
</style>
