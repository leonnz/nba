<template>
  <div id="app">
    <nav class="navbar is-primary has-shadow" role="navigation">
      <div class="navbar-brand">
        <a class="navbar-item" href>NBA</a>
      </div>
    </nav>
    <section class="section">
      <div class="columns">
        <div class="column is-2">
          <div
            class="game-box box"
            :class="{ selectedBox: selectedGames.includes(game.gameId) }"
            v-for="game in todaysGames"
            :key="game.gameId"
            @click="showGameCard(game.gameId)"
          >{{ game.vTeam.triCode + " vs " + game.hTeam.triCode + " " + game.vTeam.score + " - " + game.hTeam.score}}</div>
        </div>
        <div class="column">
          <div class="tile is-ancestor wrap">
            <pbp
              v-for="game in selectedGames"
              :key="game"
              :gameData="{ date: todaysDate, gameId: game }"
              :active="selectedGames.includes(game)"
              @close-pbp="removeGame"
            ></pbp>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import axios from "./services/axios";
import pbp from "./components/PlayByPlayBox";

export default {
  name: "app",
  components: { pbp },
  data() {
    return {
      todaysDate: null,
      todaysGames: [],
      selectedGames: [],
      data: null
    };
  },
  methods: {
    showGameCard(gameId) {
      if (this.selectedGames.indexOf(gameId) === -1) {
        this.selectedGames.push(gameId);
      }
    },
    test() {
      console.log("test");
    },
    removeGame(value) {
      let index = this.selectedGames.indexOf(value);
      if (index !== -1) this.selectedGames.splice(index, 1);
    },

    getGames() {
      axios.get("/prod/v3/today.json").then(response => {
        this.todaysDate = response.data.links.currentDate;
        axios
          .get(`/prod/v2/${this.todaysDate}/scoreboard.json`)
          .then(response => {
            this.todaysGames = response.data.games;
          });
      });
    }
  },
  mounted() {
    this.getGames();
  }
};
</script>

<style lang="scss">
.custom-box {
  height: 400px;
  overflow: scroll;
  overflow-x: hidden;
  scroll-behavior: auto;
  width: 340px;
  margin-right: 1.5rem;
  margin-bottom: 1.5rem;
}

.game-box {
  background-color: aqua;
}
.game-box:hover {
  cursor: pointer;
}

.selectedBox {
  background-color: aqua !important;
}

.wrap {
  flex-wrap: wrap;
}
</style>
