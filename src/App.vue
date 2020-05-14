<template>
  <div id="app">
    <navbar name="Kursvärderingsportalen" url="/portal"></navbar>
    <router-view />
  </div>
</template>

<style lang="scss">
// Import custom SASS variable overrides, or alternatively
// define your variable overrides here instead
@import "assets/custom-vars.scss";

// Import Bootstrap and BootstrapVue source SCSS files
@import "~bootstrap/scss/bootstrap.scss";
@import "~bootstrap-vue/src/index.scss";
</style>

  <script>
import navbar from "@/components/navbar";
export default {
  components: {
    navbar
  },
  metaInfo: {
    title: "Start",
    titleTemplate: "%s | Kursvärderingsportalen"
  }
};
</script>