<template>
  <div id="app">
    <nav class="has-shadow header" role="navigation">
      <div class="level is-mobile">
        <div class="is-size-4 banner level-item level-left">
          <router-link tag="span" to="/">
            <a class="is-size-4" to="/">
              <i class="fas fa-basketball-ball ball-icon"></i>
              <span class="playbyplay-title">nbaplay</span>
            </a>
          </router-link>
        </div>

        <div class="level-item level-right">
          <router-link tag="span" to="/about">
            <a class="about">about</a>
          </router-link>
          <div class="beta">beta v0.1</div>
          <div id="theme-changer" class="select is-small" v-if="cssCustomPropsSupported">
            <select name="theme" id="theme">
              <option
                data-base-color="#111"
                data-bg-color="#eee"
                data-brand-color="green"
                value="default"
              >default</option>
              <option
                data-base-color="#444"
                data-bg-color="white"
                data-brand-color="#222"
                value="light"
              >light</option>
              <option
                data-base-color="white"
                data-bg-color="black"
                data-brand-color="#eee"
                value="dark"
              >dark</option>
            </select>
          </div>
        </div>
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cssCustomPropsSupported: false
    };
  },
  mounted() {
    if (window.CSS && window.CSS.supports && window.CSS.supports("--a", 0)) {
      this.cssCustomPropsSupported = true;
    } else {
      // CSS custom properties not supported
      console.log("Not supported");
    }
  }
};
</script>

<style lang="scss">
:root {
  --baseColor: #1d428a;
  --brandColor: green;
  --bgColor: #eee;

  --secondaryColor: orange;
}
html {
  height: 100%;
  background-color: #efefef !important;
  background: url("./assets/site_images/basketball.svg") no-repeat 50% 70%;
}
.bball-background {
  display: block;
  margin: auto;
}
.playbyplay-title {
  margin-left: 5px;
  color: white;
}
.header {
  background-color: #1d428a;
  background-color: var(--baseColor);
}
.banner {
  display: inline-block;
  padding: 0.5rem;
}
.beta {
  color: white;
  vertical-align: top; /* here */
  float: right;
  padding: 0.5rem;
}
.about {
  color: orange;
  &:hover {
    color: orange;
  }
}
.ball-icon {
  color: orange;
}
</style>



