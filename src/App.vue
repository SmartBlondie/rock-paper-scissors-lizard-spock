<template>
  <div class="app">
    <MainHeader />
    <GameScreen
        v-if="firstStep.length"
        :player-throw="firstStep"
        @play-again="changeScreenWithAnimation"
    />
    <StartScreen
        v-else
        @start-game="changeScreenWithAnimation"
    />
    <RulesModal
      v-if="isRulesOpened"
      v-model="isRulesOpened"
    />
    <div
        v-if="isAnimating"
        class="app__overlay"
    />
    <div class="app__buttons">
      <SimpleButton
          label="RULES"
          button-type="secondary"
          @click="openRules"
      />
      <SimpleButton
          v-show="!firstStep.length"
          :label="getButtonName"
          button-type="secondary"
          @click="transitionWithAnimation(changeVersion)"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { throttle } from "lodash/function.js";
import MainHeader from "./components/MainHeader.vue";
import GameScreen from "./components/GameScreen.vue";
import StartScreen from "./components/StartScreen.vue";
import SimpleButton from "./components/SimpleButton.vue";
import { useRulesConfig } from "./compositions/useRulesConfig.js";
import { useGamePlay } from "./compositions/useGamePlay.js";
import RulesModal from "./components/RulesModal.vue";

const { getVersionFromStorage, isStandardVersion, changeVersion } = useRulesConfig();
const { getScoreFromStorage } = useGamePlay();

const isAnimating = ref(false);
const isRulesOpened = ref(false);
const firstStep = ref("");

const openRules = () => isRulesOpened.value = true;

const getButtonName = computed(() => (isStandardVersion.value ? "EXTENDED" : "STANDARD"));

const transitionWithAnimation = throttle((func, ...args) => {
  isAnimating.value = true;
  func(...args);
  setTimeout(() => {
    isAnimating.value = false;
  }, 200);
}, 200);

const changeScreen = (playerMove = "") => {
  firstStep.value = playerMove;
};

const changeScreenWithAnimation = (...args) => transitionWithAnimation(changeScreen, ...args);

onMounted(() => {
  getVersionFromStorage();
  getScoreFromStorage();
});
</script>

<style lang="scss">
.app {
  position: relative;
  height: 100%;
  padding: 3rem 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1rem;

  &__overlay {
    position: absolute;
    inset: 0;
    background: var(--background-gradient);
    animation: rippleEffect .2s ease-out;
    pointer-events: none;
    z-index: 99;
  }

  &__buttons {
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
    align-items: baseline;
    flex-wrap: wrap;
  }

  @media (max-width: 600px) {
    &__buttons {
      flex-direction: column-reverse;
      justify-content: center;
      align-items: center;
      gap: 1rem;
    }
  }
}
</style>
