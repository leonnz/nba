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
        </div>
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<style lang="scss" scoped>
.playbyplay-title {
  margin-left: 5px;
  color: white;
}
.header {
  background-color: #1d428a;
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



