<template>
  <div class="modal-container">
    <div class="modal-content">
      <button class="close-btn" @click="closeModal">
        <img src="@/assets/close.svg" alt="">
      </button>

      <div class="pokemon-image-container">
        <img :src="pokemonImage" alt="Pokemon" class="pokemon-image" />
      </div>

      <div class="pokemon-details">
        <detail-pokemon
          v-for="(value,key) in pokemonDetailsDisplay"
          :key="key"
          :attribute="key"
          :detail="value"
        />
      </div>

      <div class="modal-actions">
        <btn-atom
          name="Share to my friends"
          widthBt="195"
          :active="true"
          :pressed="true"
          @manage:click="copyToClipBoard"
        />
        <fav-atom
          :isFavorite="isFavorite"
          @update:isFavorite="toggleFavorite"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, ref, onMounted, watch } from 'vue';
import { usePokemonStore } from '@/stores/pokemonStore';

import DetailPokemon from '@/components/atoms/DetailPokemon.vue';
import BtnAtom from '@/components/atoms/BtnAtom.vue';
import FavAtom from '@/components/atoms/FavAtom.vue';

const props = defineProps({
  name: String,
  isFavorite: Boolean,
});

const isFavorite = ref(props.isFavorite ?? false);
const pokemonDetailsDisplay = ref({
  name: '',
  weight: '',
  height: '',
  types: '',
});
const pokemonImage = ref('');

const store = usePokemonStore();

const emit = defineEmits(['close-modal','update:isFavorite']);

onMounted(async () => {
  const details = await store.fetchPokemonDetails(props.name);
  pokemonImage.value = details.image;

  pokemonDetailsDisplay.value = {
    name: details.name,
    weight: (details.weight).toString(),
    height: (details.height).toString(),
    types: details.types,
  };
});

const closeModal = () => {
  emit('close-modal');
};

const toggleFavorite = () => {
  emit('update:isFavorite', !isFavorite.value);
};

const copyToClipBoard = () => {
  const attributes = [
    `Name: ${pokemonDetailsDisplay.value.name}`,
    `Weight: ${pokemonDetailsDisplay.value.weight}`,
    `Height: ${pokemonDetailsDisplay.value.height}`,
    `Types: ${pokemonDetailsDisplay.value.types}`
  ];

  const textToCopy = attributes.join(', ');
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(textToCopy)
      .catch(err => {
        console.error('Error al copiar texto:', err);
      });
  } else {
    console.warn('El API de portapapeles no está disponible');
  }
};

watch(() => props.isFavorite, (newVal) => {
  isFavorite.value = newVal;
});
</script>

<style scoped>
.modal-container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(128,128,128,0.9);
  z-index: 999;
}

.modal-content {
  background-color: var(--vt-c-white);
  width: 85%;
  max-width: 570px;
  max-height: 506px;
  border-radius: 5px;
  overflow: hidden;
  position: relative;
}

.close-btn {
  position: absolute;
  top: 15px;
  right: 15px;
  width: 26px;
  height: 26px;
  border: none;
  background-color: transparent;
  border-radius: 50%;
  font-size: 20px;
  cursor: pointer;
}

.pokemon-image-container {
  width: 100%;
  height: 220px;
  background-image: url(@/assets/background-image.svg);
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
}

.pokemon-image {
  max-width: 180px;
  max-height: 180px;
  height: auto;
}

.pokemon-details {
  padding: 20px 30px;
  text-align: left;
}

.modal-actions {
  display: flex;
  justify-content: space-between;
  max-width: 510px;
  margin: 0 30px 30px 30px;
}
</style>
