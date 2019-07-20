<template>
  <div class="game-boxes">
    <div
      class="game-box"
      :class="{ 'selectedGame': selectedGames.includes(game.gameId), 'has-text-white': selectedGames.includes(game.gameId) }"
      v-for="game in todaysGames"
      :key="game.gameId"
      @click="showGamePlayByPlay(game.gameId)"
    >
      <div>
        <div class="status-tag final" v-if="!game.isGameActivated && game.endTimeUTC">{{ "FINAL" }}</div>
        <div
          class="status-tag live"
          v-if="game.isGameActivated && game.period.current !== 0"
        >{{ "LIVE" }}</div>
      </div>
      <div class="level is-mobile scores">
        <div class="level-item level-left">
          <div>
            <div
              class="is-size-6"
              :class="{ 'higher-score': leadingTeam(game) }"
            >{{ game.vTeam.triCode }}</div>
            <div
              class="is-size-6"
              :class="{ 'higher-score': !leadingTeam(game) }"
            >{{ game.hTeam.triCode }}</div>
          </div>
        </div>
        <div class="level-item has-text-centered level-right">
          <div>
            <div
              class="is-size-6"
              :class="{ 'higher-score': leadingTeam(game) }"
            >{{ game.vTeam.score || "0" }}</div>
            <div
              class="is-size-6"
              :class="{ 'higher-score': !leadingTeam(game) }"
            >{{ game.hTeam.score || "0" }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["todaysGames"],
  computed: {
    selectedGames: function() {
      return this.$store.getters.getSelectedGames;
    }
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
      let vteamScore = game.vTeam.score;
      let hteamScore = game.hTeam.score;
      return vteamScore > hteamScore ? true : false;
    }
  }
};
</script>

<style lang="scss" scoped>
.game-boxes {
  background: #cccccc;
  padding: 0.5rem;
  justify-content: flex-start;
}
.game-box {
  padding: 0.5rem;
  background-color: #cccccc;
  border-radius: 5px;
  margin: 0 1rem 0 0;
  width: 100px;
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


