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
          <router-link tag="span" to="/about">
            <a class="about">about</a>
          </router-link>
          <div class="beta">beta v0.1</div>
          <div class="select is-small theme-changer" v-if="cssCustomPropsSupported">
            <select v-model="selectedTheme" name="theme" @change="themeChange($event)">
              <option
                v-for="(option, index) in themeOptions"
                :key="index"
                :value="option.team"
              >{{ option.value }}</option>
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
      selectedTheme: "",
      themeOptions: [
        {
          team: "default",
          value: "Default"
        },
        {
          team: "atlanta",
          value: "Atlanta Hawks"
        },
        {
          team: "boston",
          value: "Boston Celtics"
        },
        {
          team: "brooklyn",
          value: "Brroklyn Nets"
        },
        {
          team: "charlotte",
          value: "Charlotte Hornets"
        }
      ],
      cssCustomPropsSupported: false
    };
  },
  methods: {
    themeChange: function(event) {
      let root = document.querySelector(":root");
      root.className = event.target.value;
    }
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
@import "@/assets/css/themes.scss";
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
  // background-color: #1d428a;
  // background-color: var(--baseColor);
  background-image: linear-gradient(var(--baseColorAlt), var(--baseColor));
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
.theme-changer {
  margin-right: 1rem;
}
</style>



