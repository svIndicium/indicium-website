<template>
  <div class="nav-toggle">
    <div class="logo" v-if="!isHome">
      <n-link to="/">
        <img :src="logoUrl" alt="Indicium Logo" />
      </n-link>
    </div>
    <div class="toggle" @click="emitNavToggle">
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
        <line x1="3" y1="12" x2="21" y2="12"></line>
        <line x1="3" y1="6" x2="21" y2="6"></line>
        <line x1="3" y1="18" x2="21" y2="18"></line>
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavToggle",
  computed: {
    isHome() {
      return this.$route.path === "/";
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
  },
  methods: {
    emitNavToggle() {
      this.$eventBus.$emit("nav-toggle", true);
    },
  },
  data: () => ({
    logoUrl: "/logo/indicium-logo-left.svg",
  }),
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/variables.scss";

.nav-toggle {
  display: flex;
  justify-content: space-between;
  padding: 24px 24px 16px;

  .logo {
    max-width: 60%;
    display: none;

    @media screen and (max-width: $bp-tablet-md) {
      display: block;
    }
  }

  .toggle {
    cursor: pointer;
    stroke: var(--text-color);
    padding: 3px;
    padding-bottom: 0px;
    background-color: var(--root-background-color);
    display: none;
    position: fixed;
    z-index: 90;
    top: 24px;
    right: 24px;

    @media screen and (max-width: $bp-tablet-md) {
      display: block;
    }
  }
}
</style>
