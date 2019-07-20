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
            <div class="is-size-6">{{ game.vTeam.triCode }}</div>
            <div class="is-size-6">{{ game.hTeam.triCode }}</div>
          </div>
        </div>

        <!-- <div
          class="level-item status-tag final"
          v-if="!game.isGameActivated && game.endTimeUTC"
        >{{ "FINAL" }}</div>
        <div
          class="level-item status-tag live"
          v-if="game.isGameActivated && game.period.current !== 0"
        >{{ "LIVE" }}</div>-->
        <div class="level-item has-text-centered level-right">
          <div>
            <div class="is-size-6">{{ game.vTeam.score || "0" }}</div>
            <div class="is-size-6">{{ game.hTeam.score || "0" }}</div>
          </div>
        </div>
      </div>
      <!-- <img
        class="image"
        src="../assets/team_logos/toronto_raptors.gif"
      />-->
    </div>
  </div>
</template>

<script>
export default {
  props: ["todaysGames"],
  computed: {
    selectedGames() {
      return this.$store.getters.getSelectedGames;
    }
  },
  methods: {
    showGamePlayByPlay(gameId) {
      if (this.selectedGames.indexOf(gameId) === -1) {
        this.$store.commit("addSelectedGame", gameId);
      }
    },
    getTeamLogo(team) {
      return require("../assets/team_logos/" + team + ".png");
    }
  }
};
</script>

<style lang="scss" scoped>
.game-boxes {
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


