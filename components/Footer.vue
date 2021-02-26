<template>
  <footer>
    <div class="container">
      <div class="column">
        <h4>Pagina's</h4>
        <ul class="footer-menu pages">
          <li v-for="(menuItem, idx) in menuItems" :key="idx">
            <a :href="menuItem.link">{{ menuItem.title }}</a>
          </li>
        </ul>
        <div class="toggle contrast">
          <input
            id="toggle-contrast"
            type="checkbox"
            @change="changeContrast"
            :checked="isContrasted"
          />
          <label for="toggle-contrast">Hoger contrast</label>
        </div>
        <div class="toggle dark-mode">
          <input
            id="dark-mode"
            type="checkbox"
            @change="changeDarkMode"
            :checked="isDark"
          />
          <label for="dark-mode">Dark Mode</label>
        </div>
      </div>

      <div class="column">
        <h4>Contact</h4>
        <ul class="footer-menu contact">
          <li v-for="(value, key) in contactInfo" :key="key">{{ value }}</li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  data: () => ({
    isDark: false,
    isContrasted: false,
    contactInfo: {
      address: "Heidelberglaan 15",
      postcode: "3584 CS Utrecht",
      lokaal: "HL15-4.092",
      email: "bestuur@indicium.hu",
    },
    menuItems: [
      {
        title: "Inschrijven",
        link:
          "https://docs.google.com/forms/d/e/1FAIpQLSeYE3T-IdYrxb1FB2wKGtltf5D16aLzsDdaW3g1IZAj5Lxj3Q/viewform",
      },
      // {
      //   title: 'Vacatures',
      //   link: '#'
      // },
      {
        title: "Statuten",
        link: "/statuten",
      },
      {
        title: "Over Indicium",
        link: "/over-indicium",
      },
      // {
      //   title: 'Uitleenservice',
      //   link: '#'
      // },
      {
        title: "Activiteiten",
        link: "/activiteiten",
      },
      {
        title: "Sponsoren en partners",
        link: "/partners",
      },
      {
        title: "Privacyreglement",
        link: "/privacyreglement",
      },
    ],
  }),
  methods: {
    changeContrast(e) {
      const isChecked = e.target.checked;
      this.$set(this, "isContrasted", isChecked);
      if (!this.isDark) {
        document.documentElement.style.setProperty(
          "--text-color",
          this.isContrasted ? "#000" : "#616364"
        );
      }
    },
    changeDarkMode(e) {
      this.$set(this, "isDark", e.target.checked);
      this.$eventBus.$emit("dark-mode", this.isDark);
      window.localStorage.setItem("IS_DARK", this.isDark);
      if (this.isDark) {
        document.documentElement.setAttribute("data-theme", "dark");
        document.documentElement.style.setProperty("--text-color", "#fff"); // ugly guard...
      } else {
        document.documentElement.setAttribute("data-theme", "light");
        document.documentElement.style.setProperty(
          "--text-color",
          this.isContrasted ? "#000" : "#616364"
        ); // ugly guard...
      }
    },
    saveDarkMode() {
      const isDarkPersisted = window.localStorage.getItem("IS_DARK");
      const isDark = isDarkPersisted === "true";
      const doesntWantDark = isDarkPersisted === "false";
      const isNativeDark =
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;
      const shouldBeDarkOrNot = (isNativeDark || isDark) && !doesntWantDark;
      if (shouldBeDarkOrNot) {
        this.$set(this, "isDark", shouldBeDarkOrNot);
        this.changeDarkMode({ target: { checked: this.isDark } }); // h4c
      }
    },
  },
  watch: {
    $route(to, from) {
      // h4c: correct logo render on page change
      console.log("hehe");

      setTimeout(this.saveDarkMode);
    },
  },
  mounted() {
    this.saveDarkMode();
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/variables.scss";

footer {
  background: var(--indi-green-3);
  padding: 80px;
  color: var(--text-color);
  margin-top: 16px;
  border-top: 2px solid var(--indi-green-1);

  @media screen and (max-width: $bp-tablet-sm) {
    padding: 12px;
  }

  .container {
    max-width: 1084px;
    margin: 0 auto;
    padding: 0 24px;
    display: flex;
    justify-content: space-between;

    @media screen and (max-width: $bp-tablet-sm) {
      display: block;
    }

    .footer-menu {
      &.pages {
        columns: 2;
      }

      li {
        line-height: 1.6;
      }
    }
  }
}
</style>
