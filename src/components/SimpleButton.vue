<template>
  <button
    class="simple-button"
    :class="getButtonTypeClass"
    @click="$emit('button-click')"
  >
    {{ label }}
  </button>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  buttonType: {
    type: String,
    default: 'primary',
  },
});

defineEmits(['button-click']);

const getButtonTypeClass = computed(() => `simple-button--${ props.buttonType }`);
</script>


<style lang="scss">
.simple-button {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  border: 1.5px solid var(--text-primary);
  border-radius: 8px;
  font: normal 600 normal 15px/15px "Barlow Semi Condensed";
  letter-spacing: 2px;
  cursor: pointer;
  transition: transform 0.4s ease-in-out;

  &--secondary {
    padding: 10px 30px;
    background-color: transparent;
    color: var(--text-primary);
    @media (min-width: 600px) {
      &:hover {
        background-color: var(--text-primary);
        color: var(--text-primary--inverted);
      }
    }
  }

  &--primary {
    padding: 15px 60px;
    background-color: var(--text-primary);
    color: var(--text-primary--inverted);
    @media (min-width: 600px) {
      &:hover {
        background-color: transparent;
        color: var(--text-primary);
      }
    }
  }

  &:active {
    transform: scale(.9);
  }
}
</style>