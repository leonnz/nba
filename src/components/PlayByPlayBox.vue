<template>
  <div v-if="active" class="tile box is-parent is-3 parent-tile">
    <div class="content tile is-child child-tile">
      <div class="pbp-header">
        <i @click="closePbp" class="material-icons close-pbp">close</i>
        <p>{{ gameData.game.vTeam.triCode + " vs " + gameData.game.hTeam.triCode }}</p>
        <p>{{ gameData.date }}</p>
        <p>{{ gameData.gameId }}</p>
      </div>
      <div class="content pbp-box">
        <div class="is-size-7 pbp-events">
          <div v-for="event in pbp" :key="event.event">{{ event.clock + " - " + event.description }}</div>
        </div>
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
      interval: null
    };
  },
  methods: {
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
    console.log(this.active);
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
}
.pbp-box {
  background-color: white;
  padding: 1rem;
  width: 100%;
  height: 300px;
  overflow: scroll;
  overflow-x: hidden;
  scroll-behavior: auto;
}

.pbp-events > div:first-of-type {
  font-weight: bold;
}
.close-pbp {
  float: right;
}
.close-pbp:hover {
  cursor: pointer;
}
.parent-tile {
  background-color: lightgrey;
  margin: 0.5rem;
  height: 100%;
  padding: 0 !important;
}
.child-tile {
  background-color: #efefef;
}
</style>
