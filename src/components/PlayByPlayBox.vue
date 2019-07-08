<template>
  <div v-if="active" class="tile is-parent is-3">
    <div class="tile is-child pbp-container">
      <div class="pbp-header">
        <i @click="closePbp" class="material-icons close-pbp">close</i>
        <p>{{ gameData.game.vTeam.triCode + " vs " + gameData.game.hTeam.triCode }}</p>
        <p>{{ gameData.date }}</p>
        <p>{{ gameData.gameId }}</p>
      </div>
      <div class="pbp-box is-size-7" ref="pbp">
        <button
          ref="scrollToTopButton"
          class="scrollToTopButton button is-small is-link"
          :class="{ buttonEase: scrolling }"
          @click="scrollToTop"
        >back to top</button>
        <div v-for="event in pbp" :key="event.event">{{ event.clock + " - " + event.description }}</div>
      </div>
    </div>
  </div>
</template>


<script>
import axios from "../services/axios";
import { setInterval, clearInterval } from "timers";
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
    },

    getPlayByPlay() {
      axios
        .get(
          `/json/cms/noseason/game/${this.gameData.date}/${this.gameData.gameId}/pbp_all.json`
        )
        .then(response => {
          let game = response.data.sports_content.game;
          this.teams = game.game_url;
          let pbp = game.play.reverse();
          console.log(pbp.length, this.pbp.length);
          if (this.pbp.length !== pbp.length) this.pbp = pbp;
        });
    }
  },
  mounted() {
    this.$refs.pbp.onscroll = () => {
      this.showTopButton();
    };
    console.log(this.gameData.game);
    this.getPlayByPlay();
    this.interval = setInterval(() => {
      this.getPlayByPlay();
      console.log("polling...");
    }, 5000);
  },
  destroyed() {
    console.log("destroyed");
    clearInterval(this.interval);
  }
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
  height: 300px;
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
  height: 300px;
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
