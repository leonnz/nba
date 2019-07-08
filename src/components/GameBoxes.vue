<template>
  <!-- <div class="tile is-parent is-3">
    <div
      class="game-box content tile is-child"
      :class="{ 'has-background-link': selectedGames.includes(game.gameId), 'has-text-white': selectedGames.includes(game.gameId) }"
      v-for="game in todaysGames"
      :key="game.gameId"
      @click="showGameCard(game.gameId)"
    >{{ game.vTeam.triCode + " vs " + game.hTeam.triCode + " " + game.vTeam.score + " - " + game.hTeam.score}}</div>
  </div>-->
  <div class="tile is-vertical is-parent">
    <div
      class="tile is-child game-box"
      :class="{ 'has-background-link': selectedGames.includes(game.gameId), 'has-text-white': selectedGames.includes(game.gameId) }"
      v-for="game in todaysGames"
      :key="game.gameId"
      @click="showGameCard(game.gameId)"
    >{{ game.vTeam.triCode + " vs " + game.hTeam.triCode + " " + game.vTeam.score + " - " + game.hTeam.score}}</div>
  </div>
</template>

<script>
export default {
  props: { todaysGames: [], selectedGames: [] },
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
  border: 1px solid hsl(0, 0%, 71%);
  border-radius: 5px;
}
.game-box:hover {
  cursor: pointer;
}
</style>


