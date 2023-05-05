<script>
import Util from "chromane/js/Util.js";
import reactive_state from "../js/reactive_state";

export default {
  data() {
    return {
      sub_page: "init",
    };
  },

  methods: {
    handle_click_ok() {
      window.window_wrap.exec("mini_popup_ok_click");
    },
  },

  mounted() {
    window.util = new Util();
    window.window_wrap = window.util.create_window_wrap(window, window.parent);
    reactive_state.watch(["sub_page"], ({ sub_page }) => {
      if (sub_page) {
        this.sub_page = sub_page;
      }
    });
  },
};
</script>
<template>
  <div class="popup-mini">
    <div
      class="popup-mini-view init"
      v-if="this.sub_page === 'init'"
    >
      <h3>Recording...</h3>
      <!-- <p>To stop recording you need to tap your combination on the keyboard. Click the button below to close this popup.</p> -->
      <!-- <button @click="handle_click_ok">Ok</button> -->
    </div>
    <div
      class="popup-mini-view genereting"
      v-if="this.sub_page === 'generete'"
    >
      <h3>Generating....</h3>
      <!-- <p>Click the button below to close this popup.</p> -->
      <!-- <button @click="handle_click_ok">Ok</button> -->
    </div>
    <div
      class="popup-mini-view play"
      v-if="this.sub_page === 'play'"
    >
      <h3>Playing...</h3>
      <!-- <p>Click the button below to close this popup.</p> -->
      <!-- <button @click="handle_click_ok">Ok</button> -->
    </div>
    <div
      class="popup-mini-view stop-playing"
      v-if="this.sub_page === 'stop-playing'"
    >
      <h3>Finished.</h3>
      <!-- <p>Click the button below to close this popup.</p> -->
      <!-- <button @click="handle_click_ok">Ok</button> -->
    </div>
  </div>
</template>

<style scoped>
.popup-mini {
  min-width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: white;
  width: 100%;
  height: 100%;
  padding: 18px;
}

.popup-mini > *,
.popup-mini-view > * {
  padding: 0px;
  margin: 0px;
}

.popup-mini-view {
  width: 100%;
  height: 100%;
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  row-gap: 10px;
}
.popup-mini-view h3 {
  color: rgba(0, 0, 0, 0.9);
  font-size: 18px;
  text-align-last: left;
  font-weight: 700;
}

.popup-mini-view p {
  color: rgba(0, 0, 0, 0.7);
  font-size: 14px;
  font-weight: 500;
  flex: 1 1 auto;
}

.popup-mini-view button {
  width: fit-content;
  background: #4285f4;
  padding: 6px 15px;
  font-size: 13px;
  color: white;
  text-transform: uppercase;
  font-weight: 600;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  outline: none;
}

.popup-mini-view.play p {
  flex: 1 1 auto;
}
</style>
