<template>
  <transition
    name="bounce"
    enter-active-class="animated tada"
    leave-active-class="animated bounceOutRight"
  >
    <div class="play-event">{{ event.clock + " - " + event.description }}</div>
  </transition>
</template>

<script>
export default {
  props: ["event"],
  data() {
    return {};
  },
  created() {}
};
</script>

<style lang="scss">
.play-event {
  padding: 0.5rem 0rem;
}

.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
</style>


