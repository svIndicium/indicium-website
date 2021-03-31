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

      <ul>
        <li v-show="isMobile">
          <n-link to="/" prefetch @click.native="hideNav">Home</n-link>
        </li>
        <li v-for="item in items" :key="item.title + item.url + item.childs">
          <a
            v-if="item.url.startsWith('http')"
            :href="item.url"
            target="_blank"
            @click="hideNav"
          >
            {{ item.title }}
          </a>

          <n-link
            v-else-if="item.childs"
            :to="item.url"
            prefetch
            @click.native="hideNav"
          >
            {{ item.title }} ▽
          </n-link>

          <n-link v-else :to="item.url" prefetch @click.native="hideNav">
            {{ item.title }}
          </n-link>
          <ul class="sub-menu">
            <li class="sub-menu-li" v-for="child in item.childs" :key="child.title + child.url">
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
            </li>
          </ul>
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
    isNavShown: false,
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
        title: "Over ons",
        url: "/over-indicium",
        childs: [
          {
            title: "Over Indicium",
            url: "/over-indicium",
          },
          {
            title: "Commissies",
            url: "/over-indicium",
          },
        ],
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
        childs: [
          {
            title: "Hoe moet je drinken",
            url: "/over-indicium",
          },
          {
            title: "Feut 101",
            url: "/over-indicium",
          },
          {
            title: "php haat voor beginners",
            url: "/over-indicium",
          },
          {
            title: "Welke koffie moet ik halen?",
            url: "/over-indicium",
          },
          {
            title: "Help mijn docent is Wouter😢Help mijn docent is Wouter😢Help mijn docent is Wouter😢",
            url: "/over-indicium",
          },
        ],
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
      padding-left: 10px;
      padding-right: 10px;
    }
  }

  .container.flex {
    position: relative;
    /* center the menu if made bigger
    top: 50%;
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
    */
    padding-left: 10px;
    padding-right: 10px;
  }

  ul {
    display: flex;
    margin: 0;
    justify-content: space-between;
    align-items: center;
    overflow: auto;

    a:hover {
      text-decoration: underline;
      cursor: pointer;
    }

    a:focus-within {
      outline: none;
      text-decoration: underline overline;
    }

    li {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 60px;
      width: 150px;
      padding-top: 15px;
      padding-bottom: 15px;
      a {
        top: 50%;
        display: flex;
        font-size: 1rem;
        font-weight: 500;
        color: var(--text-color);
        text-align: center;
        text-decoration: none;
      }
    }

    .sub-menu {
      display: none;
      position: absolute;
      background: var(--root-background-color);
      top: 100%;
      box-shadow: inset 0 0 0 2px var(--indi-blue-1);
      transition: 0.2s ease-out;
      opacity: 1;
      visibility: hidden; /*hidden   inset 0 -2px 0 var(--indi-blue-1);*/
      z-index: 1;

      a {
        padding-left: 15px;
        padding-right: 15px;
      }
    }

    li:hover,
    li:focus-within {
      .sub-menu {
        display: list-item;
        opacity: 1;
        visibility: visible;
        width: 250px;

        .sub-menu-li{
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

  .close {
    cursor: pointer;
    display: none;
  }

  // mobile nav
  @media screen and (max-width: $bp-tablet-md) {
    opacity: 1;
    position: fixed;
    top: 0;
    left: -100%;
    height: 100%;
    width: 100%;
    background: var(--root-background-color);
    z-index: 100;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 100ms linear;

    &.open {
      transform: translateX(100%);
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
