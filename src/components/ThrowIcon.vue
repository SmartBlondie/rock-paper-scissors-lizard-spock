<template>
  <figure class="throw-icon" :class="getThrowIconClass" :style="getThrowIconStyle">
    <div class="throw-icon__icon">
      <component :is="getThrowIcon" />
    </div>
    <div class="throw-icon__circle"></div>
  </figure>
</template>

<script setup>
import { computed } from "vue";
import { useRulesConfig } from "../compositions/useRulesConfig.js";

const props = defineProps({
  value: {
    type: String,
    default: 'scissors',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  isWinner: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String,
    default: '8rem',
  },
});

const { getRuleByName } = useRulesConfig();

const getThrowIconClass = computed(() => ({
  'throw-icon--winner': props.isWinner,
  'throw-icon--disabled': props.disabled,
}));

const getThrowIconStyle = computed(() => ({
  '--bg-color': `var(--${props.value}-gradient)`,
  '--throw-icon-size': props.size,
}));

const getThrowIcon = computed(() => getRuleByName(props.value).icon);
</script>

<style lang="scss">
.throw-icon {
  position: relative;
  --throw-icon-size: 8rem;
  --bg-color: var(--text-primary);
  width: var(--throw-icon-size);
  height: var(--throw-icon-size);
  display: flex;
  align-items: center;
  justify-content: center;

  &__icon {
    display: grid;
    place-items: center;
    transition: transform 0.4s ease-in-out;

    svg {
      width: 40%;
      height: 40%;
      grid-area: 1 / 1;
      z-index: 1;
    }

    &::before {
      content: "";
      width: var(--throw-icon-size);
      height: var(--throw-icon-size);
      background: var(--bg-color);
      border-radius: 50%;
      box-shadow: inset 0 -6px 2px var(--overlay-shadow);
      grid-area: 1 / 1;
    }

    &::after {
      content: "";
      width: calc(var(--throw-icon-size) / 4 * 3);
      height: calc(var(--throw-icon-size) / 4 * 3);
      background-color: var(--text-primary);
      border-radius: 50%;
      grid-area: 1 / 1;
      box-shadow: inset 0 6px 2px var(--overlay-shadow);
    }
  }

  &__circle {
    pointer-events: none;
    position: absolute;
    top: 50%;
    left: 50%;
    width: calc(var(--throw-icon-size) * 2.5);
    height: calc(var(--throw-icon-size) * 2.5);
    background: var(--winner-gradient);
    border-radius: 50%;
    transform: translate(-50%, -50%) scale(0);
    transition: transform 0.4s ease-in-out;
    z-index: -1;

    @media (max-width: 600px) {
      width: calc(var(--throw-icon-size) * 2);
      height: calc(var(--throw-icon-size) * 2);
    }
  }

  &:hover:not(.throw-icon--disabled) {
    .throw-icon__circle {
      transform: translate(-50%, -50%) scale(1);
    }
    .throw-icon__icon {
      transform: scale(1.2);
      cursor: pointer;
    }
  }

  &--winner .throw-icon__circle {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0;
    animation: fadeIn 1s ease-in-out 4s forwards;
  }

}
</style>