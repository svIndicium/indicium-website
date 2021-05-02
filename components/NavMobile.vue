<template>
  <nav class="mobile-nav">
    <div class="mobile-container flex">
      <div v-show="!isHome" class="logo" @click="setNavLevel(0)">
        <n-link to="/">
          <img :src="logoUrl" alt="Indicium Logo" />
        </n-link>
      </div>

      <div v-show="isHome" class="logo" @click="setNavLevel(0)">
        <img :src="logoUrl" alt="Indicium Logo" />
      </div>

      <div
        class="nav-toggle"
        v-bind:class="{ rotated: navLevel }"
        @click="setNavLevel(Number(!navLevel))"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          viewBox="0 0 30 30"
          fill="none"
          stroke-width="2"
          stroke-linecap="square"
          stroke-linejoin="arcs"
        >
          <line
            v-bind:class="{ green: navLevel > 2 }"
            x1="7.5"
            y1="10"
            x2="22.5"
            y2="10"
          ></line>
          <line
            v-bind:class="{ bluegreen: navLevel > 1 }"
            x1="7.5"
            y1="15"
            x2="22.5"
            y2="15"
          ></line>
          <line
            v-bind:class="{ blue: navLevel > 0 }"
            x1="7.5"
            y1="20"
            x2="22.5"
            y2="20"
          ></line>
        </svg>
      </div>
    </div>

    <div class="mobile-menu" v-bind:class="{ visible: navLevel }">
      <div
        class="menubar blue"
        v-bind:class="{ visible: navLevel > 0 }"
        @click="setNavLevel(1)"
      />
      <div
        class="mobile-menu-shadow"
        v-bind:class="{ hidden: !navLevel }"
        @click="setNavLevel(0)"
      ></div>
    </div>
  </nav>
</template>

<script>
import menu from "../assets/menu.json";
export default {
  name: "NavMobile",
  computed: {
    isHome() {
      return this.$route.path === "/";
    },
    isMobile() {
      return process.browser ? window.innerWidth < 700 : false;
    },
  },
  methods: {
    setNavLevel(value) {
      console.log("NavLevel: " + value);
      this.$set(this, "navLevel", value);
      this.$NavLevel = value;
    },

    NavToggle() {
      if (this.$NavLevel == 0) {
        this.setNavLevel(1);
        this.$set(this, "navLevel", 1);
      } else {
        this.setNavLevel(0);
        this.$set(this, "navLevel", 0);
      }
    },
  },
  mounted() {
    this.$eventBus.$on("dark-mode", (payload) => {
      const isDarkmode = payload;
      this.$set(
        this,
        "logoUrl",
        isDarkmode
          ? "/logo/indicium-logo-left-dark.svg"
          : "/logo/indicium-logo-left.svg"
      );
    });
    const items = menu.items;
  },
  data() {
    return menu;
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/variables.scss";

$navbar-height: 16vw;
$navbar-max-height: 68px;
$transition-time: 0.5s;
$linespace: 10%;

.mobile-nav {
  padding-top: 68px;

  .mobile-container.flex {
    background-color: var(--root-background-color);
    z-index: 100;
    display: flex;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: var(--navbar-heigh);
    max-height: var(--navbar-max-height);
    box-shadow: inset 0 -2px 0 var(--indi-blue-1);

    // visibility: hidden;

    .logo {
      position: relative;
      img {
        transform: translateY(10%);
        position: relative;
        // padding-top: 5%;
        padding-left: 10px;
        height: 12vw;
        max-height: 51px;
      }
    }

    .nav-toggle {
      display: flex;
      cursor: pointer;
      stroke: var(--text-color);
      padding-bottom: 0px;
      position: relative;
      padding-left: 10px;
      padding-right: 10px;
      margin-left: auto;
      width: auto;
      height: auto;
      transition-delay: $transition-time;
      transition-property: transform;

      svg {
        display: block;
        width: 16vw;
        max-width: 68px;
        height: 16vw;
        max-height: 68px;
        transition: $transition-time ease-in-out;
        line {
          transition-property: stroke;
          &.blue {
            transition-delay: $transition-time;
            stroke: var(--indi-blue-1);
          }
          &.bluegreen {
            transition-delay: $transition-time;
            stroke: var(--indi-blue-green-1);
          }
          &.green {
            transition-delay: $transition-time;
            stroke: var(--indi-green-1);
          }
        }
      }

      &.rotated {
        transition-delay: 0s;
        transform: rotate(90deg);
      }

      // @media screen and (max-width: $bp-tablet-md) {
      // display: block;
      // }
    }
  }

  .mobile-menu {
    visibility: hidden;
    position: fixed;
    top: clamp(0px, 16vw, 68px);
    left: 0;
    height: 100%;
    width: 100%;
    z-index: 100;
    display: flex;
    justify-content: center;
    align-items: center;
    &.visible {
      visibility: visible;
    }

    .menubar {
      display: block;
      position: relative;
      z-index: 0;
      background-color: rgba(255, 0, 0, 0.644);
      top: 0;
      left: 100%;
      height: 100%;
      width: 100%; // 100%
      transition: $transition-time ease-in-out;
      transition-delay: $transition-time;
      &.visible {
        left: $linespace * 2;
        transition-delay: 0s;
      }
    }

    .mobile-menu-shadow {
      position: absolute;
      z-index: -1;
      background-color: hsla(0, 0, 0, 0.9);
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      transition: $transition-time ease-in-out;
      opacity: 1;
      &.hidden {
        transition-delay: $transition-time;
        opacity: 0;
      }
    }
  }

  @media screen and (min-width: $bp-tablet-md) {
    display: block;
    visibility: hidden;
    width: 0;
    height: 0;
  }
}
</style>