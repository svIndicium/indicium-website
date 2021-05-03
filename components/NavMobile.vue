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
        @click.self="setNavLevel(1)"
      >
        <div class="menu level-1" v-bind:class="{ visible: navLevel > 0 }">
          <ul>
            <li v-show="isMobile">
              <n-link to="/" prefetch @click.native="setNavLevel(0)"
                >Home</n-link
              >
            </li>
            <li
              v-for="item in items"
              :key="item.title + item.url + item.childs"
              @click.self="setNavLevel(0)"
            >
              <a
                v-if="item.url.startsWith('http')"
                :href="item.url"
                target="_blank"
                @click.self="setNavLevel(0)"
              >
                {{ item.title }}
              </a>

              <n-link v-else :to="item.url" prefetch @click="setNavLevel(0)">
                {{ item.title }}
              </n-link>

              <label
                v-if="item.childs"
                title="Toggle Drop-down"
                class="sub-menu-toggle"
                @click="setCurrentLevel2(item.title)"
                >‌‌ ‌‌ ‌‌ ▸‌‌ ‌‌ ‌‌‌‌ ‌‌‌‌
              </label>
              <div
                class="menu level-2"
                v-bind:class="{ visible: item.title == currentLevel2 }"
              >
                <ul class="sub-menu">
                  <li
                    class="sub-menu-li"
                    v-for="child in item.childs"
                    :key="
                      child.title + child.url + child.childs + child.childs_side
                    "
                  >
                    <a
                      v-if="child.url.startsWith('http')"
                      :href="child.url"
                      target="_blank"
                      @click="hideNav"
                    >
                      {{ child.title }}
                    </a>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </div>
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
      if (value != this.$navLevel) {
        console.log("NavLevel: " + value);
        if (value < 3) {
          this.$currentLevel3 = "-";
        }
        if (value < 2) {
          this.$currentLevel2 = "-";
        }

        this.$set(this, "navLevel", value);
        this.$nNavLevel = value;
      }
    },
    setCurrentLevel2(name) {
      console.log("currentLevel2: " + name);
      this.$set(this, "currentLevel2", name);
      this.$currentLevel2 = name;
      setNavLevel(2);
    },
    setCurrentLevel3(name) {
      console.log("currentLevel3: " + name);
      this.$set(this, "currentLevel3", name);
      this.$currentLevel3 = name;
      setNavLevel(3);
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
$linespace: 7%;

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

    &.visible {
      visibility: visible;
    }

    .menubar {
      display: flex;
      position: relative;
      z-index: 0;
      top: 0;
      left: 100%;
      height: 100%;
      width: 100%- ($linespace * 2); // 100%
      transition: $transition-time ease-in-out;
      transition-delay: $transition-time;

      &.blue {
        background-color: var(--indi-blue-1);
      }

      &.bluegreen {
        background-color: var(--indi-blue-green-1);
      }

      &.green {
        background-color: var(--indi-green-1);
      }

      &.visible {
        left: ($linespace * 2);
        transition-delay: 0s;
      }

      .menu {
        display: flexbox;
        position: relative;
        height: 100%;
        left: 100%;
        background-color: var(--root-background-color);
        width: 100%-$linespace;
        transition-delay: 0s;
        transition: $transition-time ease-in-out;

        ul {
          margin: 0;
          li {
            a {
              display: inline-block;
              padding: 1em;
            }

            .sub-menu-toggle {
              padding: 1em;
              padding: auto;
              float: right;

              :focus {
                background-color: red;
              }
            }
          }
        }

        &.level-1 {
          ul {
            li {
              border-bottom: solid 1px var(--indi-blue-1);

              .sub-menu-toggle {
                border-left: solid 1px var(--indi-blue-1);
              }
              //border-bottom: solid 10px red;
            }
          }
        }

        &.level-2 {
          position: absolute;
          top: 0;
          width: 100%;
          background-color: red;

          &.visible {
            left: 0px;
            transition-delay: $transition-time;
          }
        }

        &.visible {
          left: $linespace;
          transition-delay: $transition-time;
        }
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

    @media screen and (min-width: $bp-tablet-md) {
      display: block;
      visibility: hidden;
      width: 0;
      height: 0;
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