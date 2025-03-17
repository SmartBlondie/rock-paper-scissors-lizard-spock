<template>
  <section v-if="isOpened" class="rules-modal" @click="isOpened = false">
    <div class="rules-modal__content" @click.stop>
      <h2>RULES</h2>
      <CloseIcon
          class="rules-modal__content-button"
          @click="isOpened = false"
      />
      <component :is="getRulesIcon"
                 class="rules-modal__content-rules"
      />
    </div>
  </section>
</template>

<script setup>
import CloseIcon from '../assets/icons/icon-close.svg';
import StandardRulesIcon from '../assets/icons/image-rules.svg';
import ExtendedRulesIcon from '../assets/icons/image-rules-bonus.svg';
import { useRulesConfig } from "../compositions/useRulesConfig.js";
import { computed } from "vue";

const isOpened = defineModel({ type: Boolean, default: false });

const { isStandardVersion } = useRulesConfig();
const getRulesIcon = computed(() => isStandardVersion.value ? StandardRulesIcon : ExtendedRulesIcon);
</script>

<style lang="scss">
.rules-modal {
  position: fixed;
  inset: 0;
  background: var(--overlay-shadow);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9;

  &__content {
    background-color: var(--text-primary);
    border-radius: 5px;
    padding: 3rem;
    display: inline-flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 2rem;
    font: normal 600 normal 24px/24px "Barlow Semi Condensed";
    color: var(--text-primary--inverted);

    &-button {
      width: 2rem;
      transition: transform 0.4s ease-in-out;
      cursor: pointer;
      &:active {
        transform: scale(.9);
      }
    }

    &-rules {
      width: 100%;
    }
  }

  @media (max-width: 600px) {
    &__content {
      min-height: 100%;
      min-width: 100%;
      flex-direction: column;
      align-items: center;
      padding: 9rem 3rem 6rem;

      &-rules {
        order: 2;
      }

      &-button {
        order: 3;
      }
    }
  }
}
</style>