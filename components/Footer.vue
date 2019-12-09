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
        <div class="contrast-toggle">
          <input id="contrast-toggle" type="checkbox" @change="changeContrast" />
          <label for="contrast-toggle">Hoger contrast</label>
        </div>
      </div>

      <div class="column">
        <h4>Contact</h4>
        <ul class="footer-menu contact">
          <li v-for="(value, key) in contactInfo" :key="key">
            {{ value }}
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  data: () => ({
    contactInfo: {
      address: 'Heidelberglaan 15',
      postcode: '3584 CS Utrecht',
      lokaal: 'HL15-4.092',
      email: 'bestuur@indicium.hu'
    },
    menuItems: [
      {
        title: 'Inschrijven',
        link: 'https://docs.google.com/forms/d/e/1FAIpQLSeYE3T-IdYrxb1FB2wKGtltf5D16aLzsDdaW3g1IZAj5Lxj3Q/viewform'
      },
      // {
      //   title: 'Vacatures',
      //   link: '#'
      // },
      {
        title: 'Statuten',
        link: '/statuten'
      },
      {
        title: 'Over Indicium',
        link: '/over-indicium'
      },
      // {
      //   title: 'Uitleenservice',
      //   link: '#'
      // },
      {
        title: 'Activiteiten',
        link: '/activiteiten'
      },
      {
        title: 'Sponsoren en partners',
        link: '/partners'
      },
      {
        title: 'Privacyreglement',
        link: '/privacyreglement'
      }
    ]
  }),
  methods: {
    changeContrast(e) {
      const isChecked = e.target.checked
      document.documentElement.style.setProperty('--text-color', isChecked ? '#000' : '#8d8f91')
    }
  }

}
</script>

<style lang="scss" scoped>
@import '../assets/scss/variables.scss';

footer {
  background: #DBEFF4;
  padding: 80px;
  color: var(--text-color);
  margin-top: 32px;

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
