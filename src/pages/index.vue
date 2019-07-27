<template>
  <div>
    <div ref="gmb" class="level gameBoxCtn">
      <gameboxes
        ref="gameBoxes"
        class="level-item"
        :todaysGames="todaysGames"
        @scrollGamesLeft="gameBoxesScrollToLeft"
        @scrollGamesRight="gameBoxesScrollToRight"
      ></gameboxes>
    </div>
    <section class="main-container">
      <div class="columns is-multiline">
        <playbyplay
          v-for="game in selectedGames"
          :key="game"
          :gameData="{ gameId: game, game: todaysGames.filter(e => e.gameId === game)[0] }"
        ></playbyplay>
      </div>
    </section>
    <section>
      <!-- <img src="../assets/site_images/CHA_bg.png" /> -->
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

<style lang="scss" scoped>
.gameBoxCtn {
  background-image: linear-gradient(#cccccc, #efefef);
  // background-image: linear-gradient(var(--secondColor), var(--secondColorAlt));
  overflow-x: hidden;
  scroll-behavior: smooth;
  margin-bottom: 0 !important;
  box-shadow: 0 2px 5px 0 rgba(black, 0.4);
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
