<template>
  <div class="list-item" @click="togglePokemonDetails">
    <span>{{ $capitalize(pokemonName ?? '') }}</span>

    <span class="fav-atom" @click.stop>
      <fav-atom
        :isFavorite="isFavorite"
        @update:isFavorite="toggleFavorite"
      />
    </span>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, ref, watch } from 'vue';

import FavAtom from '@/components/atoms/FavAtom.vue';

const props = defineProps({
  pokemonName: String,
  isFavorite: Boolean,
});

const isFavorite = ref(props.isFavorite ?? false);

const emit = defineEmits(['update:isFavorite','open:modal']);

const toggleFavorite = () => {
  emit('update:isFavorite', !isFavorite.value);
};

const togglePokemonDetails = () => {
  emit('open:modal');
};

watch(() => props.isFavorite, (newVal) => {
  isFavorite.value = newVal;
});

</script>

<style scoped>
.list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  max-width: 570px;
  margin: 0 auto;
  height: 60px;
  padding: 10px;
  background-color: var(--c-white);
  margin-bottom: 10px;
  cursor: pointer;
}

span {
  font: 22px "Lato", sans-serif;
  font-weight: 500;
}
</style>
