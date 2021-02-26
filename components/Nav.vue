<template>
  <nav :class="['nav', { open: isNavShown }]">
    <div class="close" @click="$eventBus.$emit('nav-toggle', false)">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke-width="3"
        stroke-linecap="square"
        stroke-linejoin="arcs"
      >
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    </div>

    <div class="container flex" @click="$eventBus.$emit('nav-toggle', false)">
      <div v-show="!isHome" class="logo">
        <n-link to="/">
          <img :src="logoUrl" alt="Indicium Logo" />
        </n-link>
      </div>

      <div v-show="isHome" class="logo">
        <img :src="logoUrl" alt="Indicium Logo" />
      </div>

      <ul :style="{ margin: isHome ? '0 auto' : '0' }">
        <li v-show="isMobile">
          <n-link to="/" prefetch @click.native="hideNav">Home</n-link>
        </li>
        <li v-for="item in items" :key="item.title + item.url">
          <a
            v-if="item.url.startsWith('http')"
            :href="item.url"
            target="_blank"
            @click="hideNav"
            >{{ item.title }}</a
          >
          <n-link v-else :to="item.url" prefetch @click.native="hideNav">{{
            item.title
          }}</n-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
/* eslint-disable */
export default {
  name: "Nav",
  computed: {
    isHome() {
      return this.$route.path === "/";
    },
    isMobile() {
      return process.browser ? window.innerWidth < 700 : false;
    },
  },
  mounted() {
    this.$set(this, "isNavShown", !this.isMobile);
    this.$eventBus.$on("nav-toggle", (payload) => {
      this.$set(this, "isNavShown", payload);
    });
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
  },
  methods: {
    hideNav() {
      if (this.isMobile) {
        this.$eventBus.$emit("nav-toggle", false);
      }
    },
  },
  data: () => ({
    logoUrl: "/logo/indicium-logo-left.svg",
    isNavShown: true,
    items: [
      {
        title: "Partners",
        url: "/partners",
      },
      {
        title: "Activiteiten",
        url: "/activiteiten",
      },
      {
        title: Math.random() > 0.6 ? "Over Indicium" : "Commissies",
        url: "/over-indicium",
      },
      {
        title: "Vacatures",
        url: "/vacatures",
      },
      {
        title: "Contact",
        url: "/contact",
      },
      {
        title: "Info voor eerstejaars",
        url: "/info-voor-eerstejaars",
      },
      {
        title: "Lid worden",
        url: "/aanmelden",
      },
    ],
  }),
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/variables.scss";

.nav {
  display: block;
  z-index: 1000;
  background: var(--root-background-color);
  box-shadow: inset 0 -2px 0 var(--indi-blue-1);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;

  .logo {
    img {
      max-width: 204px;
    }
  }

  ul {
    list-style: none;
    display: flex;
    max-width: 984px;
    // margin: 0 auto;
    justify-content: space-between;
    align-items: center;
    overflow: auto;

    li {
      a {
        display: block;
        padding: 24px;
        font-size: 1rem;
        font-weight: 500;
        color: var(--text-color);
        text-align: center;
        text-decoration: none;
      }
    }
  }

  .close {
    cursor: pointer;
    display: none;
  }

  // mobile nav
  @media screen and (max-width: $bp-tablet-sm) {
    opacity: 1;
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: var(--root-background-color);
    z-index: 100;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 100ms linear;

    transform: translateX(-100%);

    &.open {
      transform: translateX(00%);
    }

    ul {
      flex-direction: column;
    }

    .container {
      flex-direction: column;
    }

    .close {
      stroke: var(--text-color);
      display: block;
      position: absolute;
      top: 24px;
      right: 24px;
    }
  }
}
</style>
