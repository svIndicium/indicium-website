<template>
  <div
    :class="['animated-line', { 'not-on-mobile': doHideMobile }, { 'not-on-desktop': !doHideMobile }]"
    :style="{
      top,
      left,
      right,
      bottom,
      transform: `rotate(${this.rotate}deg)`
    }"
  >
    <svg
      id="illu"
      xmlns="http://www.w3.org/2000/svg"
      width="400"
      height="240"
      viewBox="0 0 386 239"
    >
      <g>
        <polyline
          fill="none"
          stroke="#DBEDEA"
          stroke-width="4"
          points="1112 148 977.937 148 877.937 248 752 248"
          transform="translate(-742 -146)"
        />
        <polyline
          :class="['to-trace', { 'trace': isTracing }]"
          fill="none"
          stroke="#97CFC7"
          stroke-width="4"
          points="1112 148 977.937 148 877.937 248 752 248"
          transform="translate(-742 -146)"
        />
        <circle :class="['to-pulse', { 'pulse': isPulsing }]" cx="12" cy="101" r="12" fill="#97CFC7" />
      </g>
    </svg>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  props: ['top', 'left', 'right', 'bottom', 'interval', 'rotate', 'doHideMobile'],
  data: () => ({
    isTracing: false,
    isPulsing: false
  }),
  methods: {
    toggleTrace() {
      const PULSE_TIME = 450
      this.$set(this, 'isTracing', true)
      setTimeout(() => {
        this.$set(this, 'isPulsing', true)
      }, PULSE_TIME)

      setTimeout(() => {
        this.$set(this, 'isTracing', false)
        this.$set(this, 'isPulsing', false)
      }, PULSE_TIME * 4)
    }
  },
  computed: {
    isMobile() {
      return process.browser
        ? window.innerWidth < 700
        : false
    },
    hideMobile() {
      if(this.doHideMobile) {
        return true
      } else if(this.doHideMobile && this.isMobile) {
        return true
      }

      return this.doHideMobile
    }
  },
  mounted() {
    this.tracingInterval = setInterval(this.toggleTrace, this.interval)
  },
  destroyed() {
    clearInterval(this.tracingInterval)
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/variables.scss';

.animated-line {
  margin: 64px auto 16px;
  width: 386px;
  position: absolute;
  z-index: -1;

  &.not-on-mobile {
    @media screen and (max-width: $bp-tablet-sm) {
      display: none;
    }
  }

  &.not-on-desktop {
    display: block;
    @media screen and (min-width: $bp-tablet-sm) {
      display: none;
    }
  }

  .to-trace {
    stroke-dasharray: 500;
    stroke-dashoffset: 500;
  }

  .to-pulse {
    fill: #dbedea;
    stroke: #97cfc7;
    stroke-width: 0;
    transition: fill 300ms ease;
  }

  .trace {
    animation: dash 1000ms linear forwards;
  }

  .pulse {
    animation: pulse 1500ms ease;
  }

  @keyframes dash {
    0% {
      stroke-dashoffset: 500;
    }
    50% {
      stroke-dashoffset: 0;
    }
    100% {
      stroke-dashoffset: -500;
    }
  }

  @keyframes pulse {
    0% {
      fill: #97cfc7;
      stroke-width: 0;
      stroke-opacity: 1;
    }
    20% {
      stroke-width: 0;
      stroke-opacity: 1;
    }
    90% {
      stroke-width: 10;
      stroke-opacity: 0;
      fill: #97cfc7;
    }
    100% {
      stroke-opacity: 0;
      fill: #dbedea;
    }
  }
}
</style>
