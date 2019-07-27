<template>
  <div ref="gameBoxesContainer" class="game-boxes">
    <div
      ref="scrollLeftBtn"
      :class="{ gameBoxesScrollLeftBtnVisible: gameBoxesOverflowingLeft }"
      class="button gameBoxesScroll leftBtn"
      @click="gameBoxesScrollToLeft"
    >
      <i class="material-icons">arrow_left</i>
    </div>
    <div
      class="game-box"
      :class="{ 'selectedGame': selectedGames.includes(game.gameId), 'has-text-white': selectedGames.includes(game.gameId) }"
      v-for="game in todaysGames"
      :key="game.gameId"
      @click="showGamePlayByPlay(game.gameId)"
    >
      <div class="status-tag final" v-if="!game.isGameActivated && game.endTimeUTC">{{ "FINAL" }}</div>
      <div
        class="status-tag live"
        v-if="game.isGameActivated && game.period.current !== 0"
      >{{ "LIVE" }}</div>
      <div class="level is-mobile scores">
        <div class="level-item level-left">
          <div>
            <div
              class="is-size-6"
              :class="{ 'higher-score': leadingTeam(game) === 'vteam' }"
            >{{ game.vTeam.triCode }}</div>
            <div
              class="is-size-6"
              :class="{ 'higher-score': leadingTeam(game) === 'hteam' }"
            >{{ game.hTeam.triCode }}</div>
          </div>
        </div>
        <div class="level-item level-right">
          <div>
            <div
              class="is-size-6"
              :class="{ 'higher-score': leadingTeam(game) === 'vteam'  }"
            >{{ game.vTeam.score || "0" }}</div>
            <div
              class="is-size-6"
              :class="{ 'higher-score': leadingTeam(game) === 'hteam' }"
            >{{ game.hTeam.score || "0" }}</div>
          </div>
        </div>
      </div>
    </div>
    <div
      ref="scrollRightBtn"
      :class="{ gameBoxesScrollRightBtnVisible: gameBoxesOverflowingRight }"
      class="button gameBoxesScroll rightBtn"
      @click="gameBoxesScrollToRight"
    >
      <i class="material-icons">arrow_right</i>
    </div>
  </div>
</template>

<script>
export default {
  props: ["todaysGames"],
  data() {
    return {
      gameBoxesOverflowingRight: false,
      gameBoxesOverflowingLeft: false
    };
  },
  computed: {
    selectedGames: function() {
      return this.$store.getters.getSelectedGames;
    }
  },
  created() {
    window.addEventListener("resize", this.setGameBoxesOverflowing);
  },
  methods: {
    showGamePlayByPlay: function(gameId) {
      if (this.selectedGames.indexOf(gameId) === -1) {
        this.$store.commit("addSelectedGame", gameId);
      }
    },
    getTeamLogo: function(team) {
      return require("../assets/team_logos/" + team + ".png");
    },
    leadingTeam: function(game) {
      let vteamScore = parseInt(game.vTeam.score);
      let hteamScore = parseInt(game.hTeam.score);
      return vteamScore > hteamScore ? "vteam" : "hteam";
    },
    setGameBoxesOverflowing() {
      let gameBoxesWidth = this.$refs.gameBoxesContainer.__vue__.$el
        .scrollWidth;
      if (gameBoxesWidth > window.innerWidth) {
        this.gameBoxesOverflowingRight = true;
      } else {
        this.gameBoxesOverflowingLeft = false;
        this.gameBoxesOverflowingRight = false;
      }
    },
    gameBoxesScrollToRight() {
      this.$emit("scrollGamesRight");
      this.gameBoxesOverflowingRight = false;
      this.gameBoxesOverflowingLeft = true;
    },
    gameBoxesScrollToLeft() {
      this.$emit("scrollGamesLeft");
      this.gameBoxesOverflowingLeft = false;
      this.gameBoxesOverflowingRight = true;
    }
  },
  mounted() {
    this.setGameBoxesOverflowing();
  }
};
</script>

<style lang="scss" scoped>
.gameBoxesScroll {
  padding: 5px;
  position: absolute;
  opacity: 0;
  transition: 0.5s;
  min-height: 100px;
}

.leftBtn {
  left: 10px;
}
.rightBtn {
  right: 10px;
}
.gameBoxesScrollLeftBtnVisible {
  cursor: pointer;
  opacity: 1;
}
.gameBoxesScrollRightBtnVisible {
  cursor: pointer;
  opacity: 1;
}
.game-boxes {
  padding: 0.5rem;
  justify-content: flex-start;
}

div.game-box + div.game-box {
  margin-left: 10px;
}

.game-box {
  padding: 0.5rem;
  // background-color: #cccccc;
  border-radius: 5px;
  // margin: 0;
  min-width: 105px;
  min-height: 100px;
}
.game-box:hover {
  cursor: pointer;
}
.scores {
  padding: 0 0.3rem;
}
.higher-score {
  font-weight: bold;
}
.team-logo {
  width: 40px;
  height: 40px;
}
.selectedGame {
  // background-image: linear-gradient(var(--baseColor), var(--baseColorAlt));
  background-image: linear-gradient(var(--secondColor), var(--secondColorAlt));
}
.status-tag {
  color: white;
  text-align: center;
  letter-spacing: 1px;
  border-radius: 3px;
  margin: 0.2rem 0.2rem 0.5rem 0.2rem;
}
.live {
  background-color: red;
}
.final {
  background-color: grey;
}
</style>


