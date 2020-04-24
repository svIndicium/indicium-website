<template>
  <div class="text-input">
    <label>{{ label }}<span class="required">{{ required ? ' *' : '' }}</span></label>
    <br />
    <div>
      <datepicker
        v-model="internalValue"
        format="d-M-yyyy"
        :inputClass="['box', error ? 'error' : '']"
        class="box"
        :name="name"
        :placeholder="placeholder"
        :disabledDates="getDisabledDates()"
        :useUtc="true"
        :openDate="new Date(2000, 1, 1)"
        @input="update"
      />
    </div>
    <div class="error-message">
      {{ error }}
    </div>
  </div>
</template>

<script>
  import Datepicker from 'vuejs-datepicker'

  export default {
  name: 'DateInput',
  components: {
    Datepicker,
  },
  props: {
    value: {
      type: Date,
      default: () => {},
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
  computed: {
    getCalendarRange() {
      const date = new Date()
      date.setFullYear(date.getFullYear() - 15)
      return date
    }
  },
  methods: {
    getDisabledDates() {
      return {
        from: this.getCalendarRange,
      }
    },
    update() {
      this.$emit('input', this.internalValue)
    },
  }
}
</script>

<style lang="scss">

  .text-input {
    margin-bottom: 8px;
  }

  .required {
    color: red;
  }

  .box input {
    border: 2px var(--indi-grey) solid;
    padding: 8px 16px;
    border-radius: 8px;
    color: var(--text-color);
    transition: .3s;
    width: 218px;
    height: auto;
    font-size: initial;
    font-family: var(--header-font);
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
