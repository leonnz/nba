<template>
  <div id="app">
    <p></p>
  </div>
</template>

<script>
import axios from "./services/axios";
export default {
  name: "app",
  components: {},
  data() {
    return {
      data: null
    };
  },
  mounted() {
    axios
      .get()
      .then(response => {
        this.data = response.data;
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
