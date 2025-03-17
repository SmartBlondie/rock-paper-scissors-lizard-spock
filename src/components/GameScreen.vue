<template>
  <section class="game-screen">
    <article class="game-screen__gamer">
      <p>YOU PICKED</p>
      <div class="game-screen__gamer-choice">
        <ThrowIcon
            class="game-screen__player"
            :value="playerThrow"
            :is-winner="isPlayerWin"
            :disabled="true"
            size="15rem"
        />
      </div>
    </article>

    <aside class="game-screen__result">
      <h2>{{ winnerText }}</h2>
      <SimpleButton
          label="PLAY AGAIN"
          @button-click="$emit('playAgain')"
      />
    </aside>

    <article class="game-screen__gamer">
      <p>THE HOUSE PICKED</p>
      <div class="game-screen__gamer-choice">
        <ThrowIcon
            class="game-screen__computer"
            :value="lastComputerThrow.name"
            :is-winner="!isPlayerWin"
            :disabled="true"
            size="15rem"
        />
      </div>
    </article>
  </section>
</template>

<script setup>
import { computed, ref, onMounted } from "vue";
import ThrowIcon from "./ThrowIcon.vue";
import SimpleButton from "./SimpleButton.vue";
import { useGamePlay } from "../compositions/useGamePlay.js";
import { useRulesConfig } from "../compositions/useRulesConfig.js";
import { END_USER_LOST, END_USER_WIN } from "../const/throw.const.js";

const props = defineProps({
  playerThrow: {
    type: String,
    required: true,
  },
});

defineEmits(["playAgain"]);

const { defineWinner, lastComputerThrow } = useGamePlay();
const { getRuleByName } = useRulesConfig();

const isPlayerWin = ref(false);

const winnerText = computed(() => isPlayerWin.value ? END_USER_WIN : END_USER_LOST);

onMounted( () => {
  isPlayerWin.value = defineWinner(getRuleByName(props.playerThrow));
});
</script>

<style lang="scss">
.game-screen {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 5rem;
  font: normal 600 normal 1.6rem/1.6rem "Barlow Semi Condensed";
  letter-spacing: .08rem;
  color: var(--text-primary);

  &__gamer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 4rem;

    &-choice {
      border-radius: 50%;
      background-color: rgba(0, 0, 0, .4);
      width: var(--throw-icon-size);
      height: var(--throw-icon-size);
    }
  }

  &__player {
    opacity: 0;
    animation: fadeIn 1s ease-in-out 1s forwards;
  }

  &__computer {
    opacity: 0;
    animation: fadeIn 2s ease 2s forwards;
  }

  &__result {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    text-wrap: nowrap;
    gap: 2rem;
    font: normal 700 normal 3.2rem/3.2rem "Barlow Semi Condensed";
    max-width: 0;
    overflow: hidden;
    opacity: 0;
    animation: expandItem 3s ease 5s forwards;
  }

  @media (max-width: 600px) {
    &__gamer {
      order: 0;
      flex-direction: column-reverse;
    }

    &__result {
      order: 1;
    }
  }
}
</style>