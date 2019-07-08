<template>
  <div id="app">
    <nav class="navbar is-link has-shadow" role="navigation">
      <div class="navbar-brand">
        <a class="navbar-item" href>NBA</a>
      </div>
    </nav>
    <section class="section">
      <div class="columns">
        <div class="column is-2 tile is-ancestor">
          <gameboxes :todaysGames="todaysGames" :selectedGames="selectedGames"></gameboxes>
        </div>
        <div class="column tile is-ancestor wrap">
          <playbyplay
            v-for="game in selectedGames"
            :key="game"
            :gameData="{ date: todaysDate, gameId: game, game: todaysGames.filter(e => e.gameId === game)[0] }"
            :active="selectedGames.includes(game)"
            @close-pbp="removeGame"
          ></playbyplay>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import axios from "./services/axios";
import playbyplay from "./components/PlayByPlayBox";
import gameboxes from "./components/GameBoxes";

export default {
  name: "app",
  components: { playbyplay, gameboxes },
  data() {
    return {
      todaysDate: null,
      todaysGames: [],
      selectedGames: [],
      data: null
    };
  },
  methods: {
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

.wrap {
  flex-wrap: wrap;
}

/* width */
::-webkit-scrollbar {
  width: 15px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #efefef;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #ccc;
  height: 20px;
}
</style>
