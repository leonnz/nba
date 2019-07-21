<template>
  <div ref="gameBoxesContainer" class="game-boxes">
    <div
      class="game-box"
      :class="{ 'selectedGame': selectedGames.includes(game.gameId), 'has-text-white': selectedGames.includes(game.gameId) }"
      v-for="game in todaysGames"
      :key="game.gameId"
      @click="showGamePlayByPlay(game.gameId)"
    >
      <div class="status-tag final" v-if="!game.isGameActivated && game.endTimeUTC">{{ "FINAL" }}</div>
      <div
        class="status-tag live"
        v-if="game.isGameActivated && game.period.current !== 0"
      >{{ "LIVE" }}</div>
      <div class="level is-mobile scores">
        <div class="level-item level-left">
          <div>
            <div
              class="is-size-6"
              :class="{ 'higher-score': leadingTeam(game) === 'vteam' }"
            >{{ game.vTeam.triCode }}</div>
            <div
              class="is-size-6"
              :class="{ 'higher-score': leadingTeam(game) === 'hteam' }"
            >{{ game.hTeam.triCode }}</div>
          </div>
        </div>
        <div class="level-item has-text-centered level-right">
          <div>
            <div
              class="is-size-6"
              :class="{ 'higher-score': leadingTeam(game) === 'vteam'  }"
            >{{ game.vTeam.score || "0" }}</div>
            <div
              class="is-size-6"
              :class="{ 'higher-score': leadingTeam(game) === 'hteam' }"
            >{{ game.hTeam.score || "0" }}</div>
          </div>
        </div>
      </div>
    </div>
    <div
      :class="{ gameBoxesScrollBtnVisible: gameBoxesOverflowing }"
      class="button gameBoxesScrollBtn"
      @click="gameBoxesScrollToRight"
    >></div>
  </div>
</template>

<script>
export default {
  props: ["todaysGames"],
  data() {
    return {
      gameBoxesOverflowing: false
    };
  },
  computed: {
    selectedGames: function() {
      return this.$store.getters.getSelectedGames;
    }
  },
  created() {
    window.addEventListener("resize", this.setGameBoxesOverflowing);
  },
  methods: {
    showGamePlayByPlay: function(gameId) {
      if (this.selectedGames.indexOf(gameId) === -1) {
        this.$store.commit("addSelectedGame", gameId);
      }
    },
    getTeamLogo: function(team) {
      return require("../assets/team_logos/" + team + ".png");
    },
    leadingTeam: function(game) {
      let vteamScore = parseInt(game.vTeam.score);
      let hteamScore = parseInt(game.hTeam.score);
      return vteamScore > hteamScore ? "vteam" : "hteam";
    },
    setGameBoxesOverflowing() {
      let gameBoxesWidth = this.$refs.gameBoxesContainer.__vue__.$el
        .scrollWidth;
      console.log(gameBoxesWidth > window.innerWidth);
      gameBoxesWidth > window.innerWidth
        ? (this.gameBoxesOverflowing = true)
        : (this.gameBoxesOverflowing = false);
    },
    gameBoxesScrollToRight() {
      // this.$refs.gameBoxesContainer.scrollLeft = 2000;
      this.$emit("scrollGamesRight");
    }
  }
};
</script>

<style lang="scss" scoped>
.gameBoxesScrollBtn {
  position: sticky;
  right: 0;
  opacity: 0;
  transition: 0.5s;
  min-height: 100px;
}
.gameBoxesScrollBtnVisible {
  opacity: 1;
}
.game-boxes {
  // overflow-x: scroll;
  // scroll-behavior: smooth;
  background: #cccccc;
  padding: 0.5rem;
  justify-content: flex-start;
}
.game-box {
  padding: 0.5rem;
  background-color: #cccccc;
  border-radius: 5px;
  margin: 0 1rem 0 0;
  min-width: 105px;
  min-height: 100px;
}
.game-box:hover {
  cursor: pointer;
}
.scores {
  padding: 0 0.3rem;
}
.higher-score {
  font-weight: bold;
}
.team-logo {
  width: 40px;
  height: 40px;
}
.selectedGame {
  background-color: #1d428a;
}
.status-tag {
  color: white;
  text-align: center;
  letter-spacing: 1px;
  border-radius: 3px;
  margin: 0.2rem 0.2rem 0.5rem 0.2rem;
}
.live {
  background-color: red;
}
.final {
  background-color: grey;
}
</style>


