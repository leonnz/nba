<template>
  <div v-if="active" class="tile is-parent is-3">
    <div class="tile is-child pbp-container">
      <div class="pbp-header">
        <i @click="closePbp" class="material-icons close-pbp">close</i>
        <p>{{ gameData.game.vTeam.triCode + " vs " + gameData.game.hTeam.triCode }}</p>
        <p>{{ gameData.gameId }}</p>
      </div>
      <div class="pbp-box is-size-7" ref="pbp">
        <button
          ref="scrollToTopButton"
          class="scrollToTopButton button is-small is-link"
          :class="{ buttonEase: scrolling }"
          @click="scrollToTop"
        >back to top</button>
        <div
          v-if="!gameData.game.isGameActivated && gameData.game.period.current == 0"
        >Game has not started.</div>

        <div v-for="event in pbp" :key="event.event">{{ event.clock + " - " + event.description }}</div>
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
      scrolling: false
    };
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
    console.log(this.gameData.game);
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
  height: 200px;
  overflow-x: hidden;
  //scroll-behavior: smooth;
}

.pbp-box > div:first-of-type {
  font-weight: bold;
  margin-top: -2rem;
}

.close-pbp {
  float: right;
}
.close-pbp:hover {
  cursor: pointer;
}

.pbp-container {
  background-color: #efefef;
  border: 1px solid hsl(217, 71%, 53%);
  border-radius: 5px;
  overflow: hidden;
  height: 200px;
}

.scrollToTopButton {
  position: sticky;
  display: block;
  margin: auto;
  top: 0;
  opacity: 0;
  transition: 0.5s;
}

.buttonEase {
  visibility: visible;
  opacity: 1;
}
</style>
