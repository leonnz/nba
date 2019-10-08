<template>
  <div
    ref="gameBoxesContainer"
    class="game-boxes"
    :class="{ 'justify-boxes': justifyBoxes }"
  >
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
      :class="{
        selectedGame: selectedGames.includes(game.gameId),
        'has-text-white': selectedGames.includes(game.gameId)
      }"
      v-for="game in todaysGames"
      :key="game.gameId"
      @click="showGamePlayByPlay(game.gameId)"
    >
      <div class="status-tag " v-if="!game.isGameActivated && game.endTimeUTC">
        {{ "FINAL" }}
      </div>
      <div
        class="status-tag"
        v-else-if="game.isGameActivated && game.period !== '0'"
      >
        {{ "LIVE" }}
      </div>
      <div v-else class="status-tag">
        {{ getGameStartTime(game.startTimeUTC) }}
      </div>
      <div class="level is-mobile scores">
        <div class="level-item level-left">
          <div>
            <div
              class="is-size-6"
              :class="{ 'higher-score': leadingTeam(game) === 'vteam' }"
            >
              {{ game.vTeamName }}
            </div>
            <div
              class="is-size-6"
              :class="{ 'higher-score': leadingTeam(game) === 'hteam' }"
            >
              {{ game.hTeamName }}
            </div>
          </div>
        </div>
        <div class="level-item level-right">
          <div>
            <div
              class="is-size-6"
              :class="{ 'higher-score': leadingTeam(game) === 'vteam' }"
            >
              {{ game.vTeamScore || "0" }}
            </div>
            <div
              class="is-size-6"
              :class="{ 'higher-score': leadingTeam(game) === 'hteam' }"
            >
              {{ game.hTeamScore || "0" }}
            </div>
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
import { DateTime } from "luxon";
export default {
  props: ["todaysGames"],
  data() {
    return {
      justifyBoxes: false,
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
    getGameStartTime: function(utcStartTime) {
      let gameStartTime = DateTime.fromISO(utcStartTime)
        .toLocaleString(DateTime.TIME_SIMPLE)
        .toString();
      return gameStartTime;
    },
    showGamePlayByPlay: function(gameId) {
      if (this.selectedGames.indexOf(gameId) === -1) {
        this.$store.commit("addSelectedGame", gameId);
      }
    },
    getTeamLogo: function(team) {
      return require("../assets/team_logos/" + team + ".png");
    },
    leadingTeam: function(game) {
      let vteamScore = parseInt(game.vTeamScore);
      let hteamScore = parseInt(game.hTeamScore);

      if (vteamScore > hteamScore) {
        return "vteam";
      } else if (vteamScore < hteamScore) {
        return "hteam";
      } else {
        return;
      }
    },
    setGameBoxesOverflowing() {
      let gameBoxesWidth = this.$refs.gameBoxesContainer.__vue__.$el
        .scrollWidth;
      if (gameBoxesWidth > window.innerWidth) {
        this.gameBoxesOverflowingRight = true;
        this.justifyBoxes = true;
      } else {
        this.justifyBoxes = false;
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
}

.justify-boxes {
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
  background-image: linear-gradient(var(--mainColor), var(--mainColorAlt));
}
.status-tag {
  height: 100%;
  text-align: center;
  letter-spacing: 1px;
  border-radius: 3px;
  margin: 0.2rem 0.2rem 0.5rem 0.2rem;
  color: var(--statusTagText);
  background-color: var(--statusTag);
  // vertical-align: middle;
  font-size: 14px;
}
.live {
  background-color: #ff0000;
  color: #ffffff;
}
.final {
  color: var(--statusTagText);
  background-color: var(--statusTag);
}
</style>


