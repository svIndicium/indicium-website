<template>
  <nav class="mobile-nav">
    <div
      class="mobile-container flex"
      @click="$eventBus.$emit('nav-toggle', false)"
    >
      <div v-show="!isHome" class="logo">
        <n-link to="/">
          <img :src="logoUrl" alt="Indicium Logo" />
        </n-link>
      </div>

      <div v-show="isHome" class="logo">
        <img :src="logoUrl" alt="Indicium Logo" />
      </div>

      <div class="nav-toggle" @click="emitNavToggle">
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
          <line x1="10" y1="5" x2="25" y2="5"></line>
          <line x1="10" y1="10" x2="25" y2="10"></line>
          <line x1="10" y1="15" x2="25" y2="15"></line>
        </svg>
      </div>
    </div>

    <div class="mobile-menu flex">
      <ul>
        <li v-for="item in items" :key="item.title + item.url + item.childs">
          <a
            v-if="item.url.startsWith('http')"
            :href="item.url"
            target="_blank"
            @click="hideNav"
          >
            {{ item.title }}
          </a>

          <n-link v-else :to="item.url" prefetch @click.native="hideNav">
            {{ item.title }}
          </n-link>

          <span v-if="item.childs" prefetch class="drop-icon-desktop-header"
            >▾</span
          >
          <label
            v-if="item.childs"
            title="Toggle Drop-down"
            class="drop-icon-mobile"
            >▸</label
          >

          <ul class="sub-menu">
            <li
              class="sub-menu-li"
              v-for="child in item.childs"
              :key="child.title + child.url + child.childs + child.childs_side"
            >
              <label
                v-if="child.childs && child.childs_left"
                title="Toggle Drop-down"
                class="drop-icon"
                >◂</label
              >

              <a
                v-if="child.url.startsWith('http')"
                :href="child.url"
                target="_blank"
                @click="hideNav"
              >
                {{ child.title }}
              </a>

              <n-link v-else :to="item.url" prefetch @click.native="hideNav">
                {{ child.title }}
              </n-link>

              <label
                v-if="child.childs && !child.childs_left"
                title="Toggle Drop-down"
                class="drop-icon"
                >▸</label
              >

              <ul v-if="!child.childs_left" class="sub-sub-menu">
                <li
                  class="sub-sub-menu-li"
                  v-for="grand_child in child.childs"
                  :key="grand_child.title + grand_child.url"
                >
                  <a
                    v-if="grand_child.url.startsWith('http')"
                    :href="grand_child.url"
                    target="_blank"
                    @click="hideNav"
                  >
                    {{ grand_child.title }}
                  </a>

                  <n-link
                    v-else
                    :to="item.url"
                    prefetch
                    @click.native="hideNav"
                  >
                    {{ grand_child.title }}
                  </n-link>
                </li>
              </ul>

              <ul v-if="child.childs_left" class="sub-sub-menu-left">
                <li
                  class="sub-sub-menu-li"
                  v-for="grand_child in child.childs"
                  :key="grand_child.title + grand_child.url"
                >
                  <a
                    v-if="grand_child.url.startsWith('http')"
                    :href="grand_child.url"
                    target="_blank"
                    @click="hideNav"
                  >
                    {{ grand_child.title }}
                  </a>

                  <n-link
                    v-else
                    :to="item.url"
                    prefetch
                    @click.native="hideNav"
                  >
                    {{ grand_child.title }}
                  </n-link>
                </li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </div>

    <div class="shadow" />
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

  .shadow {
    display: flex;
    position: absolute;
    z-index: 99;
    background-color: cyan;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
  }

  .mobile-menu {
    // visibility: hidden;
    opacity: 1;
    position: fixed;
    top: clamp(0px, 16vw, 68px);
    left: 80vw;
    height: 100%;
    width: 80vw;
    border-left-width: 3vw;
    border-left-style: solid;
    border-left-color: red;
    background: var(--root-background-color);
    z-index: 100;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 100ms linear;

    &.open {
      transform: translateX(-100%);
    }

    ul {
      flex-direction: column;

      li {
        height: 40px;

        .drop-icon-desktop-header {
          display: none;
        }

        .drop-icon-mobile {
          display: flex;
        }
      }

      .sub-menu {
        display: none;
      }

      li:hover,
      li:focus-within {
        .sub-menu {
          display: none;

          .sub-menu-li {
            width: 100%;
            height: auto;
            .a {
              text-decoration: none;
              width: 100%;
            }
          }
        }
      }
    }
  }

  // @media screen and (max-width: $bp-tablet-md) {
  //   display: block;
  // }
  @media screen and (min-width: $bp-tablet-md) {
    display: block;
    visibility: hidden;
    width: 0;
    height: 0;
  }
}
</style>