<template>
  <div id="app">
    <nav class="header" role="navigation">
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
          <!-- <router-link tag="span" to="/about">
            <a class="about">about</a>
          </router-link>
          <div class="beta">beta v0.1</div>-->
          <!-- <div class="level-item level-right">
            <a class="button themes-select-button" @click="showThemes">
              <span class="icon">
                <i class="fas fa-chevron-down"></i>
              </span>
            </a>
          </div>-->

          <div class="dropdown is-right is-hoverable themes-label" v-if="cssCustomPropsSupported">
            <div class="dropdown-trigger">
              <button class="button" aria-haspopup="true" aria-controls="dropdown-menu">
                <span>Team themes</span>
                <span class="icon is-small">
                  <i class="fas fa-angle-down" aria-hidden="true"></i>
                </span>
              </button>
            </div>
            <div class="dropdown-menu" id="dropdown-menu" role="menu">
              <div class="dropdown-content">
                <a
                  class="dropdown-item"
                  v-for="(option, index) in themeOptions"
                  :key="index"
                  :value="option.team"
                  @click="themeChange(option.team)"
                >{{ option.value }}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
import teams from "./assets/data/teams.json";
export default {
  data() {
    return {
      selectedTheme: "",
      themeOptions: teams,
      cssCustomPropsSupported: false
    };
  },
  methods: {
    showThemes: function() {
      console.log("Leon");
    },
    themeChange: function(theme) {
      document.querySelector(":root").className = theme;
      localStorage.setItem("theme", theme);
    }
  },
  mounted() {
    if (window.CSS && window.CSS.supports && window.CSS.supports("--a", 0)) {
      this.cssCustomPropsSupported = true;
      let theme = localStorage.getItem("theme");
      this.selectedTheme = theme;
      let root = document.querySelector(":root");
      root.className = theme;
    } else {
      // CSS custom properties not supported
      console.log("Not supported");
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/css/themes.scss";
html {
  height: 100%;
  background: var(--backgroundTeamLogo);
}
body {
  color: #000000 !important;
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
  // background-color: #1d428a;
  // background-color: var(--baseColor);
  background-image: linear-gradient(var(--headerColor), var(--headerColorAlt));
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
  color: var(--secondColor);
  &:hover {
    color: var(--secondColor);
  }
}
.ball-icon {
  color: var(--icon);
}
.theme-changer {
  margin-right: 1rem;
}
.themes-select-button {
  margin: 0 1rem;
}
.themes-label {
  margin: 0 1rem;
  color: white;
}
</style>



