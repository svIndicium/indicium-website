<template>
  <nav :class="'moible-nav'">
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

    <div
      class="mobile-container flex"
      @click="$eventBus.$emit('nav-toggle', false)"
    >
      <div class="logo">
        <img :src="logoUrl" alt="Indicium Logo" />
      </div>

      <ul>
        <!-- <li v-for="item in items" :key="item.title + item.url + item.childs">
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
        </li> -->
      </ul>
    </div>
  </nav>
</template>

<script>
//import nav from "nav";
export default {
  name: "NavMobile",
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
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/variables.scss";
.nav {
  // mobile nav
  @media screen and (max-width: $bp-tablet-md) {
    opacity: 1;
    position: fixed;
    top: 0;
    left: 100%;
    height: 100%;
    width: 80vw;
    border-left-width: 5vw;
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