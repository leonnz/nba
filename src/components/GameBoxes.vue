<template>
  <div class="tile is-vertical is-parent">
    <div
      class="tile is-child game-box"
      :class="{ 'has-background-link': selectedGames.includes(game.gameId), 'has-text-white': selectedGames.includes(game.gameId) }"
      v-for="game in todaysGames"
      :key="game.gameId"
      @click="showGameCard(game.gameId)"
    >
      <span class="final-tag" v-if="!game.isGameActivated && game.endTimeUTC">{{ "FINAL" }}</span>
      <span class="live-tag" v-if="game.isGameActivated && game.period.current !== 0">{{ "LIVE" }}</span>
      <!-- <img class="image" src="../assets/team_logos/toronto_raptors.gif" /> -->
      <span>{{ " " + game.vTeam.triCode + " vs " + game.hTeam.triCode }} {{ game.vTeam.score || "0" }} - {{ game.hTeam.score || "0" }}</span>
      <!-- <img
        class="image"
        src="../assets/team_logos/toronto_raptors.gif"
      />-->
    </div>
  </div>
</template>

<script>
export default {
  props: ["todaysGames", "selectedGames"],
  methods: {
    showGameCard(gameId) {
      if (this.selectedGames.indexOf(gameId) === -1) {
        this.selectedGames.push(gameId);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.game-box {
  padding: 1rem;
  background-color: #efefef;
  border: 1px solid hsl(0, 0%, 71%);
  border-radius: 5px;
}
.game-box:hover {
  cursor: pointer;
}

.live-tag {
  background-color: red;
  color: white;
  padding: 0.1rem 0.4rem;
  letter-spacing: 1px;
  border-radius: 3px;
}

.final-tag {
  background-color: black;
  color: white;
  padding: 0.1rem 0.4rem;
  letter-spacing: 1px;
  border-radius: 3px;
}
</style>


