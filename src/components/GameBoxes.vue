<template>
  <div class="game-boxes">
    <div
      class="game-box test"
      :class="{ 'selectedGame': selectedGames.includes(game.gameId), 'has-text-white': selectedGames.includes(game.gameId) }"
      v-for="game in todaysGames"
      :key="game.gameId"
      @click="showGamePlayByPlay(game.gameId)"
    >
      <div class="level">
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
        <!-- <img class="image" src="../assets/team_logos/toronto_raptors.gif" /> -->
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
      if (this.$store.getters.getSelectedGames.indexOf(gameId) === -1) {
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
  // background: black;
  flex-grow: 0 !important;
}
.game-box {
  padding: 1rem;
  background-color: #cccccc;
  border-radius: 5px;
  margin: 0 1rem 0 0;
  width: 120px;
}
.game-box:hover {
  cursor: pointer;
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
  padding: 0.1rem 0.4rem;
  letter-spacing: 1px;
  border-radius: 3px;
  margin: 0 1rem;
}
.live {
  background-color: red;
}

.final {
  background-color: grey;
}
</style>


