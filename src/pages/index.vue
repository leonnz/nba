<template>
  <div>
    <div ref="gmb" class="level gameBoxCtn">
      <div class="level-item noGames" v-if="todaysGames.length == 0">
        No games today
      </div>
      <!-- <gameboxes
        v-else
        ref="gameBoxes"
        class="level-item"
        :todaysGames="todaysGames"
        @scrollGamesLeft="gameBoxesScrollToLeft"
        @scrollGamesRight="gameBoxesScrollToRight"
      ></gameboxes> -->
      <gameboxes
        v-else
        ref="gameBoxes"
        class="level-item"
        @scrollGamesLeft="gameBoxesScrollToLeft"
        @scrollGamesRight="gameBoxesScrollToRight"
      ></gameboxes>
    </div>

    <section class="main-container">
      <div class="columns is-multiline pbp-container">
        <!-- <playbyplay
          v-for="game in selectedGames"
          :key="game"
          :gameData="{
            gameId: game,
            game: todaysGames.filter(e => e.gameId === game)[0]
          }"
        ></playbyplay> -->
        <playbyplay
          v-for="game in selectedGames"
          :key="game"
          :gameData="todaysGames[game]"
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
// import { db } from "../services/firebase";
import { initGameService } from "../services/gameService";

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
    initGameService();
    // const nba = db.collection("playbyplay");
    // nba.onSnapshot(snapshot => {
    //   if (!snapshot.empty) {
    //     let todaysGames = [];
    //     snapshot.docs.forEach(game => {
    //       let data = game.data();
    //       let gameData = {
    //         gameId: data.gameId,
    //         isGameActivated: data.isGameActivated,
    //         statusNum: data.statusNum,
    //         endTimeUTC: data.endTimeUTC,
    //         startTimeUTC: data.startTimeUTC,
    //         period: data.period,
    //         vTeamName: data.vTeamName,
    //         vTeamScore: data.vTeamScore,
    //         hTeamName: data.hTeamName,
    //         hTeamScore: data.hTeamScore
    //       };
    //       todaysGames.push(gameData);
    //     });
    //     this.$store.commit("addTodaysGames", todaysGames);
    //   }
    // });
  }
};
</script>

<style lang="scss" scoped>
.gameBoxCtn {
  // background-image: linear-gradient(#cccccc, #efefef);
  min-height: 120px;
  background-image: linear-gradient(
    var(--secondaryColor),
    var(--secondaryColorAlt)
  );
  color: var(--textColor);
  overflow-x: hidden;
  scroll-behavior: smooth;
  margin-bottom: 0 !important;
  box-shadow: 0 2px 5px 0 rgba(black, 0.4);
  border-top: 2px solid var(--thirdColor);
  // border-bottom: 2px solid var(--thirdColor);
}
.noGames {
  font-size: 1.5em;
  color: var(--textColor);
}

.main-container {
  padding: 1.5rem 1.5rem;
}

.pbp-container {
  justify-content: center;
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
