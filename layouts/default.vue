<template>
  <div>
    <Nav />
    <NavMobile />
    <nuxt />
    <Footer />
  </div>
</template>

<script>
import Nav from "../components/Nav";
import NavMobile from "../components/NavMobile";
import Footer from "../components/Footer";

export default {
  components: {
    Nav,
    NavMobile,
    Footer,
  },
};
</script>
