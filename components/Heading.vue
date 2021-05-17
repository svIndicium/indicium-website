<template>
  <div class="heading">
    <AnimatedLine
      :top="0"
      right="-10px"
      :interval="2000"
      :doHideMobile="true"
    />
    <AnimatedLine
      right="75px"
      :bottom="0"
      :interval="4000"
      :rotate="90"
      :doHideMobile="true"
    />
    <AnimatedLine
      right="115px"
      :bottom="0"
      :interval="6000"
      :rotate="90"
      :doHideMobile="true"
    />
    <AnimatedLine
      left="-16px"
      top="28px"
      :interval="8000"
      :rotate="180"
      :doHideMobile="true"
    />

    <AnimatedLine
      left="-10%"
      bottom="28px"
      :interval="2500"
      :rotate="180"
      :doHideMobile="false"
    />
    <AnimatedLine
      left="40vw"
      top="2px"
      :interval="3500"
      :rotate="45"
      :doHideMobile="false"
    />

    <div class="heading-content">
      <img class="heading-logo" :src="topLogoUrl" alt="Indicium Logo" />

      <h1 class="fadeInUp">
        Wij zijn dé
        <span class="extra-bold">studie</span>vereniging voor HBO-ICT van
        Hogeschool Utrecht
      </h1>

      <div class="buttons fadeInUp">
        <Button size="l" url="/aanmelden">Word lid</Button>
        <TextLink url="/activiteiten">Bekijk agenda</TextLink>
      </div>
    </div>
  </div>
</template>

<script>
import Button from "../components/interactions/button";
import TextLink from "../components/interactions/TextLink";
import AnimatedLine from "../components/AnimatedLine";

export default {
  name: "Heading",
  data: () => ({
    topLogoUrl: "/logo/indicium-logo-top.svg",
  }),
  mounted() {
    var topLogoUrl = "/logo/indicium-logo-top.svg";
    // this.$eventBus.$on("dark-mode", (payload) => {
    //   const isDarkmode = payload;

    //   this.$set(
    //     this,
    //     topLogoUrl,
    //     isDarkmode
    //       ? "/logo/indicium-logo-top-dark.svg"
    //       : "/logo/indicium-logo-top.svg"
    //   );
    // });
  },
  components: {
    Button,
    TextLink,
    AnimatedLine,
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/variables.scss";

.heading {
  display: flex;
  justify-content: center;
  padding: 128px 0 192px;
  position: relative;
  max-width: 100vw;
  overflow: hidden;

  &-content {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;

    h1 {
      max-width: 832px;
      margin-bottom: 24px;
    }

    @media screen and (max-width: $bp-tablet-sm) {
      .logo {
        margin-bottom: 24px;
      }
    }

    .buttons {
      display: flex;
      align-items: center;
      justify-self: center;

      .btn {
        margin-right: 32px;
      }
    }
  }
}
</style>
