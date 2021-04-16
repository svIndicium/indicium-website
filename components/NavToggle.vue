<script>
export default {
  name: "NavToggle",
  computed: {
    isHome() {
      return this.$route.path === "/";
    },
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
  cursor: pointer;
  stroke: var(--text-color);
  padding: 3px;
  padding-bottom: 0px;
  border-radius: 4px;
  background-color: var(--root-background-color);
  background-color: yellow;
  // display: none;
  position: fixed;
  z-index: 1001;
  top: 24px;
  right: 24px;

  // @media screen and (max-width: $bp-tablet-md) {
  // display: block;
  // }
}
</style>
