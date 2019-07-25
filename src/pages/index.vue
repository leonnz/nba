<template>
  <div>
    <nav class="has-shadow header" role="navigation">
      <div class>
        <div class="is-size-4 banner">
          <a class="is-size-4" href>
            <i class="fas fa-basketball-ball ball-icon"></i>
            playbyplay
          </a>
        </div>
        <div class="beta">beta v0.1</div>
      </div>
      <div ref="gmb" class="level gameBoxCtn">
        <gameboxes
          ref="gameBoxes"
          class="level-item"
          :todaysGames="todaysGames"
          @scrollGamesLeft="gameBoxesScrollToLeft"
          @scrollGamesRight="gameBoxesScrollToRight"
        ></gameboxes>
      </div>
    </nav>
    <section class="main-container">
      <div class="columns is-multiline">
        <playbyplay
          v-for="game in selectedGames"
          :key="game"
          :gameData="{ gameId: game, game: todaysGames.filter(e => e.gameId === game)[0] }"
        ></playbyplay>
      </div>
    </section>
  </div>
</template>
<script>
import playbyplay from "../components/PlayByPlayBox";
import gameboxes from "../components/GameBoxes";
import { db } from "../services/firebase";

export default {
  name: "app",
  components: { playbyplay, gameboxes },
  data() {
    return {
      data: null
    };
  },
  computed: {
    selectedGames() {
      return this.$store.getters.getSelectedGames;
    },
    todaysGames() {
      return this.$store.getters.getTodaysGames;
    }
  },
  methods: {
    test() {
      console.log("test");
    },
    gameBoxesScrollToLeft() {
      this.$refs.gmb.scrollLeft = -2000;
    },
    gameBoxesScrollToRight() {
      this.$refs.gmb.scrollLeft = 2000;
    }
  },
  mounted() {
    const nba = db.collection("playbyplay").doc("nba");
    nba.onSnapshot(doc => {
      if (doc.exists) {
        this.$store.commit("addTodaysGames", doc.data().todaysGames);
      } else {
        console.log("No such document!");
      }
    });
    console.log(this.selectedGames);
    console.log(sessionStorage);
    // sessionStorage.clear();
    // localStorage.clear();
  }
};
</script>

<style lang="scss">
html {
  background-color: #efefef !important;
}
.gameBoxCtn {
  background: #cccccc;
  overflow-x: hidden;
  scroll-behavior: smooth;
  margin-bottom: 0 !important;
}

.header {
  background-color: #1d428a;
}
.header a {
  color: white;
  width: auto;
}
.header a:hover {
  color: white !important;
  background-color: #1d428a !important;
  width: auto;
}
.banner {
  display: inline-block;
  padding: 0.5rem;
}
.beta {
  color: white;
  vertical-align: top; /* here */
  float: right;
  padding: 0.5rem;
}
.ball-icon {
  color: orange;
}
.main-container {
  padding: 1.5rem 1.5rem;
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
