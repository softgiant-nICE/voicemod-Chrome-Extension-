<script>
import logo_wide from "../img/logo-header.svg";
export default {
  data() {
    return {
      logo_wide,
    };
  },
};
</script>

<template>
  <div class="popup-native">
    <div
      class="svg-wrap"
      v-html="logo_wide"
    ></div>
    <p>
      To start working with this extension go to the Google Meet page, start your meeting and type
      <span> "CTRL" + "SHIFT" + "E" </span>
    </p>
  </div>
</template>

<style>
body {
  background: black;
}
.svg-wrap svg {
  height: 28px;
  margin-bottom: 6px;
}
p {
  padding: 0px;
  margin: 0px;
}

.popup-native {
  width: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 20px;
}

.popup-native p {
  color: white;
  font-size: 16px;
  line-height: 1.4;
}
.popup-native p span {
  font-weight: 600;
}
</style>
