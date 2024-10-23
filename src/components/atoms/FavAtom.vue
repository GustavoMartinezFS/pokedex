<template>
  <div class="fav-button" @click="toggleFavorite">
    <i v-if="isFavorite">
      <img src="@/assets/star-gold.svg" alt="star-gold">
    </i>
    <i v-else>
      <img src="@/assets/star-gray.svg" alt="star">
    </i>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, ref, watch } from 'vue';

const props = defineProps({
  isFavorite: Boolean,
});

const isFavorite = ref(props.isFavorite ?? false);

const emit = defineEmits(['update:isFavorite']);

const toggleFavorite = () => {
  emit('update:isFavorite', !isFavorite.value);
};

watch(() => props.isFavorite, (newVal) => {
  isFavorite.value = newVal;
});
</script>

<style scoped>
.fav-button {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: var(--c-dark-white);
}
</style>
