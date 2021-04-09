
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
  
</style>