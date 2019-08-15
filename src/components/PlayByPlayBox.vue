<template>
  <div class="column is-half-tablet is-one-third-tablet is-one-quarter-fullhd">
    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <div class="tile is-child pbp-container">
          <div class="pbp-header is-size-5">
            <i
              @click="closePbp(gameData.gameId)"
              class="material-icons close-pbp"
              >close</i
            >

            <div class="level is-mobile">
              <div class="level-item">
                <img class="image team-logo" :src="getTeamLogo(visitingTeam)" />
              </div>
              <div class="level-item has-text-centered">
                <div>
                  <p class="is-size-5 title has-text-white">
                    {{ visitingTeam }}
                  </p>
                  <p v-if="playsExist" class="title has-text-white">
                    {{ visitingTeamScore }}
                  </p>
                  <p class="title has-text-white" v-else>0</p>
                </div>
              </div>
              <div class="level-item has-text-centered">
                <div>
                  <span
                    class="is-size-5 title has-text-white"
                    v-if="!gameActive && gameData.game.endTimeUTC"
                    >Final</span
                  >
                  <span
                    class="title is-size-5 live-tag"
                    v-if="gameActive && gamePeriod !== 0 && playsExist"
                    >{{ getPeriod[0][gamePeriod] }}</span
                  >
                  <p
                    v-if="gameActive && playsExist"
                    class="title is-size-5 live-tag"
                  >
                    {{ pbp[0].clock }}
                  </p>
                </div>
              </div>
              <div class="level-item has-text-centered">
                <div>
                  <p class="is-size-5 title has-text-white">{{ homeTeam }}</p>
                  <p v-if="pbp.length > 0" class="title has-text-white">
                    {{ homeTeamScore }}
                  </p>
                  <p class="title has-text-white" v-else>0</p>
                </div>
              </div>
              <div class="level-item">
                <img class="image team-logo" :src="getTeamLogo(homeTeam)" />
              </div>
            </div>
          </div>

          <div class="pbp-box is-size-6" ref="pbp">
            <button
              ref="scrollToTopButton"
              class="scrollToTopButton button is-small is-link"
              :class="{ buttonEase: scrolling }"
              @click="scrollToTop"
            >
              back to top
            </button>
            <div class="pbp-message" v-if="!gameActive && gamePeriod == 0">
              Game has not started.
            </div>
            <div
              class="pbp-message"
              v-if="gameActive && gamePeriod == 1 && !gameData.game.clock"
            >
              Game starting.
            </div>

            <transition-group
              v-if="pbp.length !== 0"
              name="slide"
              class="play-event"
            >
              <div
                class="playEventItem"
                :class="{
                  playEventItemTransition: playEventItemClassActive,
                  'points-scored': event.description.includes('PTS')
                }"
                v-for="event in pbp"
                :key="event.event"
              >
                <div class="media" v-if="event.description.includes('PTS)')">
                  <div class="media-content">
                    <div class="content event">
                      <div class="clock">{{ event.clock }}</div>
                      <div class="description">{{ event.description }}</div>
                    </div>
                  </div>
                  <figure class="media-right">
                    <img
                      class="image player"
                      :src="getPlayerPhoto(event.person_id)"
                      @error="imgError"
                    />
                  </figure>
                </div>
                <div v-else class="event">
                  <div class="clock">{{ event.clock }}</div>
                  <div class="description">{{ event.description }}</div>
                </div>
              </div>
            </transition-group>
            <div v-if="pbp.length == 0 && gameActive" class="dots">
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { db } from "../services/firebase";

export default {
  props: { gameData: {} },
  data() {
    return {
      teams: "",
      pbp: [],
      pbpQueue: [],
      pbpQueueStartLength: 100,
      interval: null,
      scrolling: false,
      playEventItemClassActive: false,
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
    selectedGames() {
      console.log(this.$store.getters.getSelectedGames);
      return this.$store.getters.getSelectedGames;
    },
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
    },
    gameActive: function() {
      return this.gameData.game.isGameActivated;
    },
    gamePeriod: function() {
      return this.gameData.game.period.current;
    },
    visitingTeam: function() {
      return this.gameData.game.vTeam.triCode;
    },
    homeTeam: function() {
      return this.gameData.game.hTeam.triCode;
    },
    visitingTeamScore: function() {
      return this.pbp[0].visitor_score;
    },
    homeTeamScore: function() {
      return this.pbp[0].home_score;
    }
  },
  methods: {
    getPlayerPhoto: function(playerId) {
      return `https://ak-static.cms.nba.com/wp-content/uploads/headshots/dleague/${playerId}.png`;
    },
    imgError: function(img) {
      img.target.src = require("../assets/site_images/default_player_small.svg");
    },
    test: function() {
      console.log("emition");
      this.down = true;
    },
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
    closePbp(gameId) {
      // this.$emit("close-pbp", this.gameData.gameId);
      let index = this.$store.getters.getSelectedGames.indexOf(gameId);
      if (index !== -1) {
        this.$store.commit("removeSelectedGame", index);
      }
    },
    getTeamLogo(team) {
      return require("../assets/team_logos/" + team + ".png");
    },
    pbpQueueManager() {
      let startPosition = 76; // This would be starting length of the pbpQueue
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
  created() {
    const nba = db.collection("playbyplay").doc("game-" + this.gameData.gameId);

    // Set the main pbp events.
    nba
      .get()
      .then(doc => {
        if (doc.exists) {
          this.pbp = doc.data().plays.reverse();
          this.pbpQueue = doc.data().plays;
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
  },
  mounted() {
    this.$refs.pbp.onscroll = () => {
      this.showTopButton();
    };
    // Code that will run only after the entire view has been rendered
    this.$nextTick(function() {
      this.pbpQueueManager();
      setTimeout(() => {
        this.playEventItemClassActive = true;
      }, 1000);
    });
    console.log(sessionStorage);
  }

  // destroyed() {
  //   console.log("destroyed");
  // }
};
</script>

<style lang="scss" scoped>
.event {
  display: flex;
  flex-direction: row;
}
.description {
  margin-left: 1rem;
  // display: flex;
  // flex-direction: column;
}
.points-scored {
  text-shadow: 1px 0px 0px black;
  background: #efefef;
  // border: 1px solid #efefef;
  border-radius: 5px;
  margin-top: 1rem;
}
.player {
  width: 68px;
  height: 50px;
}
@media screen and (max-width: 768px), print {
  .is-half-tablet {
    flex: none;
    width: 100% !important;

    img.team-logo {
      width: 80px;
      height: 80px;
    }
  }
}

@media screen and (min-width: 769px) and (max-width: 1250px), print {
  .is-half-tablet {
    flex: none;
    width: 50% !important;

    img.team-logo {
      width: 60px;
      height: 60px;
    }
  }
}
@media screen and (min-width: 1250px) and (max-width: 1600px), print {
  .is-one-third-tablet {
    flex: none;
    width: 33% !important;

    img.team-logo {
      width: 60px;
      height: 60px;
    }
  }
}
@media screen and (min-width: 1600px), print {
  .is-one-quarter-fullhd {
    flex: none;
    width: 25% !important;
  }
}
.pbp-header {
  padding: 1rem;
  // background-image: linear-gradient(var(--baseColorAlt), var(--baseColor));
  background-image: linear-gradient(var(--mainColor), var(--mainColorAlt));
  color: white;
}
.team-logo {
  width: 70px;
  height: 70px;
}
.pbp-message {
  text-align: center;
}
.pbp-box {
  background-color: white;
  padding: 1rem;
  width: 100%;
  height: 60vh;
  overflow-x: hidden;
  // scroll-behavior: smooth;
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
  // border: 1px solid var(--baseColor);
  border: 1px solid var(--mainColor);
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 2px 2px 5px 0 rgba(black, 0.4);
}
.scrollToTopButton {
  position: sticky;
  display: block;
  margin: auto;
  top: 0;
  opacity: 0;
  transition: 0.5s;
  cursor: default;
  background-color: var(--mainColor);

  &:hover {
    background-color: var(--mainColor);
  }
}
.buttonEase {
  visibility: visible;
  opacity: 1;
  cursor: pointer;
}
.slide-enter/* .list-leave-active below version 2.1.8 */ {
  -webkit-transform: translate3d(0, -100px, 0);
  transform: translate3d(0, -100px, 0);
}
.play-event > div:first-of-type {
  // text-shadow: 1px 0px 0px black;
  margin-top: -2rem;
  padding: 1rem 1rem;
}
.playEventItem {
  padding: 0.5rem 1rem;
}
.playEventItemTransition {
  transition: all 0.5s ease-out;
}

.dots {
  margin: auto;
  width: 3.5em;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
}

.dots div {
  width: 0.8em;
  height: 0.8em;
  border-radius: 50%;
  background-color: var(--mainColor);
  animation: fade 0.8s ease-in-out alternate infinite;
}

.dots div:nth-of-type(1) {
  animation-delay: -0.4s;
}

.dots div:nth-of-type(2) {
  animation-delay: -0.2s;
}

@keyframes fade {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
</style>

// Player images
// https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/203095.png

// Team logos
// https://neulionms-a.akamaihd.net/nba/player/v3/nba/site/images/teams/BOS_p.png