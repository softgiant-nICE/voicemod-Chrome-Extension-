<script>
import reactive_state from "../js/reactive_state";
import PageMiniPopup from "./PageMiniPopup.vue";
import PagePopupNative from "./PagePopupNative.vue";

export default {
  components: { PageMiniPopup, PagePopupNative },
  data() {
    return {
      active_page_name: "progress",
    };
  },
  async mounted() {
    reactive_state.watch(["nav_info"], ({ nav_info }) => {
      if (nav_info) {
        this.active_page_name = nav_info.active_page_name;
      }
    });
  },
  methods: {},
};
</script>
<template>
  <div class="app">
    <div class="pages">
      <PageMiniPopup v-if="this.active_page_name === 'mini-popup'" />
      <PagePopupNative v-if="this.active_page_name === 'native-popup'" />
    </div>
  </div>
</template>

<style>
body {
  font-size: 100%;
  font-weight: 400;
}
html,
body,
#root,
.app {
  width: 100%;
  height: 100%;
  margin: 0px;
  padding: 0px;
}
* {
  box-sizing: border-box;
  font-family: "Roboto", sans-serif !important;
}
</style>
