<template>
  <div v-if="active" class="tile is-parent is-4">
    <div class="tile is-child pbp-container">
      <div class="pbp-header is-size-5">
        <i @click="closePbp" class="material-icons close-pbp">close</i>

        <div class="level">
          <div class="level-item has-text-centered">
            <div>
              <p class="is-size-5 title">{{ gameData.game.vTeam.triCode }}</p>
              <p v-if="playsExist" class="title">{{ pbp[0].visitor_score}}</p>
              <p v-else class="title">0</p>
            </div>
          </div>
          <div class="level-item has-text-centered">
            <div>
              <span
                class="is-size-5 title"
                v-if="!gameData.game.isGameActivated && gameData.game.endTimeUTC"
              >Final</span>
              <span
                class="title is-size-5 live-tag"
                v-if="gameData.game.isGameActivated && gameData.game.period.current !== 0 && playsExist"
              >{{ getPeriod[0][gameData.game.period.current] }}</span>
              <p
                v-if="gameData.game.isGameActivated && playsExist"
                class="title is-size-5 live-tag"
              >{{ pbp[0].clock }}</p>
            </div>
          </div>
          <div class="level-item has-text-centered">
            <div>
              <p class="is-size-5 title">{{ gameData.game.hTeam.triCode }}</p>
              <p v-if="pbp.length > 0" class="title">{{ pbp[0].home_score }}</p>
              <p v-else class="title">0</p>
            </div>
          </div>
        </div>
      </div>
      <div class="pbp-box is-size-6" ref="pbp">
        <button
          ref="scrollToTopButton"
          class="scrollToTopButton button is-small is-link"
          :class="{ buttonEase: scrolling }"
          @click="scrollToTop"
        >back to top</button>
        <div
          v-if="!gameData.game.isGameActivated && gameData.game.period.current == 0"
        >Game has not started.</div>
        <div
          v-if="gameData.game.isGameActivated && gameData.game.period.current == 1 && !gameData.game.clock"
        >Game starting.</div>

        <div
          class="play-event"
          v-for="event in pbp"
          :key="event.event"
        >{{ event.clock + " - " + event.description }}</div>
      </div>
    </div>
  </div>
</template>


<script>
import { db } from "../services/firebase";

export default {
  props: { gameData: {}, active: Boolean },
  data() {
    return {
      teams: "",
      pbp: [],
      interval: null,
      scrolling: false,
      periodMap: [
        { 0: "" },
        { 1: "Q1" },
        { 2: "Q2" },
        { 3: "Q3" },
        { 4: "Q4" },
        { 5: "OT" },
        { 6: "2OT" },
        { 7: "3OT" }
      ]
    };
  },
  computed: {
    getPeriod: function() {
      return this.periodMap.filter(period => {
        return period[this.gameData.game.period.current];
      });
    },
    playsExist: function() {
      return this.pbp.length > 0 ? true : false;
    }
  },
  methods: {
    showTopButton() {
      if (this.$refs.pbp.scrollTop > 20) {
        this.scrolling = true;
      } else {
        this.scrolling = false;
      }
    },
    scrollToTop() {
      this.$refs.pbp.scrollTop = 0;
    },
    closePbp() {
      this.$emit("close-pbp", this.gameData.gameId);
    }
  },
  mounted() {
    this.$refs.pbp.onscroll = () => {
      this.showTopButton();
    };
    console.log(this.gameData.game, this.gameData.game.gameId);
    const nba = db.collection("playbyplay").doc("game-" + this.gameData.gameId);
    nba.onSnapshot(doc => {
      if (doc.exists) {
        this.pbp = doc.data().plays;
      } else {
        console.log("No such document!");
      }
    });
  }
  // destroyed() {
  //   console.log("destroyed");
  // }
};
</script>

<style lang="scss" scoped>
.pbp-header {
  padding: 1rem;
  //background-color: #efefef;
}
.pbp-box {
  background-color: white;
  padding: 1rem;
  width: 100%;
  height: 304px;
  overflow-x: hidden;
  //scroll-behavior: smooth;
}

.pbp-box > div:first-of-type {
  font-weight: bold;
  margin-top: -2rem;
}

.play-event {
  padding: 0.5rem 0rem;
}

.close-pbp {
  float: right;
}
.close-pbp:hover {
  cursor: pointer;
}

.live-tag {
  color: red;
}

.pbp-container {
  background-color: #efefef;
  border: 1px solid hsl(217, 71%, 53%);
  border-radius: 5px;
  overflow: hidden;
  height: 304px;
}

.scrollToTopButton {
  position: sticky;
  display: block;
  margin: auto;
  top: 0;
  opacity: 0;
  transition: 0.5s;
  cursor: default;
}

.buttonEase {
  visibility: visible;
  opacity: 1;
  cursor: pointer;
}
</style>
