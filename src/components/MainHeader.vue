<template>
  <header class="main-header">
    <div class="main-header__labels">
      <p v-for="throwObj in currentRulesConfig"
         :key="throwObj"
         class="main-header__label"
      >
        {{ throwObj.name.toUpperCase() }}
      </p>
    </div>
    <section class="main-header__score">
      <h2 class="main-header__score-description">SCORE</h2>
      <p>{{ userScore }}</p>
    </section>
  </header>
</template>

<script setup>
import { useRulesConfig } from "../compositions/useRulesConfig.js";
import { useGamePlay } from "../compositions/useGamePlay.js";

const { currentRulesConfig } = useRulesConfig();
const { userScore } = useGamePlay();
</script>

<style lang="scss">
.main-header {
  margin: 0 auto;
  padding: 1rem 1.5rem;
  width: 45vw;
  background-color: transparent;
  border: .2rem solid var(--header-outline);
  border-radius: 1.5rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  &__labels {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: left;
    font: normal 700 normal 1.7rem/1.3rem "Barlow Semi Condensed";
    letter-spacing: .1rem;
  }

  &__score {
    background-color: var(--text-primary);
    border-radius: 1rem;
    padding: 1rem 3.5rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    text-align: center;
    font: normal 700 normal 4rem/4rem "Barlow Semi Condensed";
    color: var(--text-primary--inverted);

    &-description {
      font: normal 600 normal 1.2rem/1.4rem "Barlow Semi Condensed";
      letter-spacing: .1rem;
      color: var(--text-score);
    }
  }

  @media (max-width: 600px) {
    width: 75vw;
  }
}
</style>