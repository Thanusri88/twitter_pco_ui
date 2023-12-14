<template>
  <sidenav :class="[this.$store.state.isTransparent, 'fixed-start']" />
  <main
    class="
      main-content
      position-relative
      max-height-vh-100
      h-100
      border-radius-lg
    "
  >
    <router-view />
  </main>
</template>
<script>
import Sidenav from "./examples/Sidenav";
import { mapMutations } from "vuex";
export default {
  name: "App",
  components: {
    Sidenav,
  },
  methods: {
    ...mapMutations(["toggleConfigurator", "navbarMinimize"]),
  },
  computed: {
    navClasses() {
      return {
        "position-sticky blur shadow-blur mt-4 left-auto top-1 z-index-sticky":
          this.$store.state.isNavFixed,
        "position-absolute px-4 mx-0 w-100 z-index-2":
          this.$store.state.isAbsolute,
        "px-0 mx-4 mt-4": !this.$store.state.isAbsolute,
      };
    },
  },
  beforeMount() {
    this.$store.state.isTransparent = "bg-dark";
  },
};
</script>
