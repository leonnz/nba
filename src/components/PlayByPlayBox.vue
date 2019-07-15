<template>
  <div v-if="active" class="tile is-parent is-4">
    <div class="tile is-child pbp-container">
      <div class="pbp-header is-size-5">
        <i @click="closePbp" class="material-icons close-pbp">close</i>

        <div class="level">
          <div class="level-item is-hidden-touch">
            <img class="image team-logo" :src="getTeamLogo(gameData.game.vTeam.triCode)" />
          </div>
          <div class="level-item has-text-centered">
            <div>
              <p class="is-size-5 title has-text-white">{{ gameData.game.vTeam.triCode }}</p>
              <p v-if="playsExist" class="title has-text-white">{{ pbp[0].visitor_score || "0" }}</p>
            </div>
          </div>
          <div class="level-item has-text-centered">
            <div>
              <span
                class="is-size-5 title has-text-white"
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
              <p class="is-size-5 title has-text-white">{{ gameData.game.hTeam.triCode }}</p>
              <p v-if="pbp.length > 0" class="title has-text-white">{{ pbp[0].home_score || "0" }}</p>
            </div>
          </div>
          <div class="level-item is-hidden-touch">
            <img class="image team-logo" :src="getTeamLogo(gameData.game.hTeam.triCode)" />
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
        <transition-group name="slide" class="play-event">
          <div
            class="play-event-item"
            v-for="event in pbp"
            :key="event.event"
          >{{ event.clock + " - " + event.description }}</div>
        </transition-group>
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
      pbpQueue: [],
      pbpQueueStartLength: 100,
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
    },
    pbpQueueExists: function() {
      return this.pbpQueue.length > 0 ? true : false;
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
    },
    getTeamLogo(team) {
      return require("../assets/team_logos/" + team + ".png");
    },
    pbpQueueManager() {
      let startPosition = 0; // This would be starting length of the pbpQueue
      // Every 5 seconds push a new event onto start of pbp from the pbpQueue if a new event exists
      setInterval(() => {
        // if (this.pbpQueueStartLength > this.pbp.length) {
        // console.log(startPosition, this.pbpQueue.length, this.pbp.length);
        // Testing version
        if (startPosition < this.pbp.length) {
          let event = this.pbpQueue[startPosition];
          this.pbp.unshift(event);
          startPosition++;
        }
      }, 5000);
    }
  },
  mounted() {
    this.$refs.pbp.onscroll = () => {
      this.showTopButton();
    };
    console.log(this.gameData.game, this.gameData.game.gameId);

    const nba = db.collection("playbyplay").doc("game-" + this.gameData.gameId);

    // Set the main pbp events.
    nba
      .get()
      .then(doc => {
        if (doc.exists) {
          this.pbp = doc.data().plays.reverse();
        } else {
          console.log("No such document!");
        }
      })
      .catch(err => {
        console.log("Error getting document", err);
      });

    // Set the pbpQueue and watch for changes, the queue update time is determined
    // by the node process gameTimeService.js
    nba.onSnapshot(doc => {
      if (doc.exists) {
        this.pbpQueue = doc.data().plays;
      } else {
        console.log("No such document!");
      }
    });
    this.pbpQueueManager();
  }
  // destroyed() {
  //   console.log("destroyed");
  // }
};
</script>

<style lang="scss" scoped>
.pbp-header {
  padding: 1rem;
  background-color: #1d428a;
  color: white;
}

.team-logo {
  width: 80px;
  height: 80px;
}

.pbp-box {
  background-color: white;
  padding: 1rem;
  width: 100%;
  height: 56.5vh;
  overflow-x: hidden;
  // scroll-behavior: smooth;
}

.pbp-box > div:first-of-type {
  text-shadow: 1px 0px 0px black;
  margin-top: -2rem;
}

.close-pbp {
  float: right;
}
.close-pbp:hover {
  cursor: pointer;
}

.live-tag {
  color: red;
  letter-spacing: 2px;
}

.pbp-container {
  border: 1px solid #1d428a;
  border-radius: 5px;
  overflow: hidden;
}

.scrollToTopButton {
  position: sticky;
  display: block;
  margin: auto;
  top: 0;
  opacity: 0;
  transition: 0.5s;
  cursor: default;
  background-color: #1d428a !important;
}

.buttonEase {
  visibility: visible;
  opacity: 1;
  cursor: pointer;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 1s;
}
.slide-enter, .slide-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(-50px);
}

.play-event > div:first-of-type {
  text-shadow: 1px 0px 0px black;
  margin-top: -2rem;
  padding: 1rem 0rem;
}

.play-event-item {
  transition: all 1s;
  padding: 0.5rem 0rem;
}
</style>

// Player images
// https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/203095.png

// Team logos
// https://neulionms-a.akamaihd.net/nba/player/v3/nba/site/images/teams/BOS_p.png