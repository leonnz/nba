<template>
  <div id="app">
    <nav class="navbar is-link has-shadow" role="navigation">
      <div class="navbar-brand is-size-4">
        <a class="navbar-item" href>
          <i class="fas fa-basketball-ball fa-2x ball-icon"></i>
          NBA playbyplay beta
        </a>
      </div>
    </nav>
    <section class="main-container">
      <div class="columns">
        <div class="column is-2">
          <div class="tile is-ancestor">
            <gameboxes :todaysGames="todaysGames" :selectedGames="selectedGames"></gameboxes>
          </div>
        </div>
        <div class="column">
          <div class="tile is-ancestor wrap">
            <playbyplay
              v-for="game in selectedGames"
              :key="game"
              :gameData="{ gameId: game, game: todaysGames.filter(e => e.gameId === game)[0] }"
              :active="selectedGames.includes(game)"
              @close-pbp="removeGame"
            ></playbyplay>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import playbyplay from "./components/PlayByPlayBox";
import gameboxes from "./components/GameBoxes";
import { db } from "./services/firebase";

export default {
  name: "app",
  components: { playbyplay, gameboxes },
  data() {
    return {
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
    }
  },
  mounted() {
    const nba = db.collection("playbyplay").doc("nba");
    nba.onSnapshot(doc => {
      if (doc.exists) {
        this.todaysGames = doc.data().todaysGames;
      } else {
        console.log("No such document!");
      }
    });
  }
};
</script>

<style lang="scss">
.ball-icon {
  margin-right: 1rem;
  // color: grey;
}
.main-container {
  padding: 1.5rem 1.5rem;
}

.wrap {
  flex-wrap: wrap;
  align-items: flex-start;
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
