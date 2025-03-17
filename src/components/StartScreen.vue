<template>
  <section
      class="start-screen"
      :style="getBackgroundStyle"
  >
    <div class="start-screen__content">
      <component
          :is="getBackgroundIcon"
          class="start-screen__background"
      />
      <template v-for="(icon, index) in getIconValues"
                :key="index"
      >
        <ThrowIcon
            class="start-screen__icon"
            :value="icon"
            :size="getIconSize"
            :style="getIconStyle(index)"
            @click="$emit('startGame', icon)"
        />
      </template>
    </div>
  </section>
</template>

<script setup>
import BackgroundIcon from "../assets/icons/bg-triangle.svg";
import ExtendedBackgroundIcon from "../assets/icons/bg-pentagon.svg";
import { useRulesConfig } from "../compositions/useRulesConfig.js";
import { computed } from "vue";
import { EXTENDED_THROWS, STANDARD_THROWS } from "../const/throw.const.js";
import ThrowIcon from "./ThrowIcon.vue";

defineEmits(["startGame"]);

const { isStandardVersion } = useRulesConfig();

const getBackgroundIcon = computed(() =>
    isStandardVersion.value ? BackgroundIcon : ExtendedBackgroundIcon
);

const getIconSize = computed(() => (isStandardVersion.value ? "10rem" : "8rem"));

const getIconValues = computed(() =>
    isStandardVersion.value ? STANDARD_THROWS : EXTENDED_THROWS
);

const getIconStyle = (index) => ({ "--i": index });

const getBackgroundStyle = computed(() => {
  return {
    '--sides': isStandardVersion.value ? 3 : 5,
    '--triangle-turn': isStandardVersion.value ? '(180deg / var(--sides))' : '0deg',
  }
});
</script>

<style lang="scss">
.start-screen {
  position: relative;
  width: 100%;
  height: 70%;
  display: flex;
  justify-content: center;
  align-items: center;
  --sides: 5;
  --radius: 9rem;
  --triangle-turn: 0deg;

  &__content {
    position: relative;
    width: 18rem;
    height: 18rem;
  }

  &__background {
    width: 100%;
  }

  &__icon {
    position: absolute;
    --angle: calc((360deg / var(--sides) * var(--i)) - 90deg + var(--triangle-turn));
    left: calc(50% + var(--radius) * cos(var(--angle)));
    top: calc(10%*var(--sides) + var(--radius) * sin(var(--angle)));
    transform: translate(-50%, -50%);
  }
}
</style>