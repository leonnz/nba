<template>
  <div v-if="active" class="tile box is-parent is-3 parent-tile">
    <div class="content tile is-child child-tile">
      <div class="pbp-header">
        <i @click="closePbp" class="material-icons close-pbp">close</i>
        <p>{{ gameData.teams }}</p>
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
export default {
  props: { gameData: {}, active: Boolean },
  data() {
    return {
      pbp: []
    };
  },
  methods: {
    closePbp() {
      this.$emit("close-pbp", this.gameData.gameId);
    }
  },
  mounted() {
    console.log(this.active);
    axios
      .get(
        `/json/cms/noseason/game/${this.gameData.date}/${this.gameData.gameId}/pbp_all.json`
      )
      .then(response => {
        this.pbp = response.data.sports_content.game.play.reverse();
      });
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
