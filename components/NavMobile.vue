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
        @click="NavToggle()"
        v-bind:class="{ active: 0 > NavLevel }"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          viewBox="0 0 30 20"
          fill="none"
          stroke-width="2"
          stroke-linecap="square"
          stroke-linejoin="arcs"
        >
          <line class="A" x1="10" y1="5" x2="25" y2="5"></line>
          <line class="B" x1="10" y1="10" x2="25" y2="10"></line>
          <line class="C" x1="10" y1="15" x2="25" y2="15"></line>
        </svg>
      </div>
    </div>

    <div class="mobile-menu">
      <div
        class="mobile-menu-shadow"
        v-bind:class="{ hidden: !NavLevel }"
        @click="setNavLevel(0)"
      />
      <div class="menubar blue" @click="setNavLevel(1)" />
      <div class="menubar bluegreen" @click="setNavLevel(2)" />
      <div class="menubar green" />
    </div>
    <!-- class="mobile-menu-shadow" -->
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
      this.$NavLevel = value;
      if (value == 0) {
      } else if (value == 1) {
      } else if (value == 2) {
      } else if (value == 3) {
      }
    },
    NavToggle() {
      if (this.$NavLevel == 0) {
        this.setNavLevel(1);
      } else {
        this.setNavLevel(0);
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
:root {
  --navbar-height: 16vw;
  --navbar-max-height: 68px;
}
.mobile-nav {
  padding-top: 68px;

  .mobile-container.flex {
    background-color: var(--root-background-color);
    z-index: 100;
    background-color: green;
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

      svg {
        display: block;
        width: 16vw;
        max-width: 68px;
        height: 16vw;
        max-height: 68px;
      }
      // @media screen and (max-width: $bp-tablet-md) {
      // display: block;
      // }
    }
  }

  .mobile-menu-shadow {
    display: flex;
    position: relative;
    z-index: 99;
    background-color: hsla(0, 0, 0, 0.9);
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;

    &hidden {
      // visibility: hidden;
    }
  }

  .mobile-menu {
    // visibility: hidden;
    opacity: 1;
    position: fixed;
    top: clamp(0px, 16vw, 68px);
    left: 0;
    height: 100%;
    width: 100%;
    background: red;
    z-index: 100;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 100ms linear;

    &:focus-within,
    &:focus {
      transform: translateX(-100%);
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