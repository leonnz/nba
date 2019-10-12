<template>
  <div>
    <div ref="gmb" class="level gameBoxCtn">
      <div class="level-item noGames" v-if="todaysGames.length == 0">
        No games today
      </div>

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
        <playbyplay
          v-for="game in selectedGames"
          :key="game"
          :gameData="todaysGames[game]"
        ></playbyplay>
      </div>
    </section>
    <section></section>
  </div>
</template>
<script>
import playbyplay from "../components/PlayByPlayBox";
import gameboxes from "../components/GameBoxes";
import { initGameService, updateGameService } from "../services/gameService";

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
  created() {
    initGameService();
  },
  mounted() {
    updateGameService();
  }
};
</script>

<style lang="scss" scoped>
.gameBoxCtn {
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
::-webkit-scrollbar {
  width: 15px;
}
::-webkit-scrollbar-track {
  background: #efefef;
}
::-webkit-scrollbar-thumb {
  background: #ccc;
  height: 20px;
}
</style>
