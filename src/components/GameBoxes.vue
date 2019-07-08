<template>
  <div>
    <div
      class="game-box box"
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

