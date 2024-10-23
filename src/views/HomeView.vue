<template>
  <div class="home-view">
    <div v-if="loading" class="loader">
      <loader-atom />
    </div>

    <div class="home-bar" ref="homeList" @scroll="handleScroll" v-if="!loading" >

      <search-bar :model-value="searchQuery" @update:modelValue="updateSearchQuery" />

      <div v-if="filteredPokemons.length === 0">
        <empty-list @manage:goBack="goWelcome"/>
      </div>

      <div
        v-else
        class="home-list"
        v-for="pokemon in filteredPokemons"
        :key="pokemon.name"
      >
        <list-pokemon
          :pokemon-name="pokemon.name"
          :is-favorite="pokemon.isFavorite"
          @update:isFavorite="addToFavorites(pokemon)"
          @open:modal="showPokemonDetails(pokemon)"
        />
      </div>

      <bottom-bar />
    </div>

    <pokemon-modal
      v-if="showModal"
      :name="selectedPokemon.name"
      :isFavorite="selectedPokemon.isFavorite"
      @close-modal="closeModal"
      @update:isFavorite="addToFavorites(selectedPokemon)"
    />

  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from 'vue';
import { storeToRefs } from 'pinia';
import { useRouter } from "vue-router";

import { usePokemonStore } from '@/stores/pokemonStore';

import LoaderAtom from "@/components/atoms/LoaderAtom.vue"

import BottomBar from '@/components/molecules/BottomBar.vue';
import EmptyList from '@/components/molecules/EmptyList.vue';
import SearchBar from '@/components/molecules/SearchBar.vue';
import ListPokemon from '@/components/molecules/ListPokemon.vue';

import PokemonModal from '@/components/organisms/PokemonModal.vue';

const store = usePokemonStore();
const { loading, currentView } = storeToRefs(store);
const searchQuery = ref("");

const homeList = ref<HTMLElement | null>(null);
const router = useRouter();

const showModal = ref(false);
const selectedPokemon = ref<{name: string; isFavorite: boolean }>(null);

let lastScrollTop = 0;

onMounted(async () => {
  if (store.pokemons.length === 0) {
    await store.fetchPokemons();
  }
});

const addToFavorites = (pokemon: {name: string; isFavorite: boolean }) => {
  store.addToFavorites(pokemon);
};

const updateSearchQuery = (query: string) => {
  searchQuery.value = query.toLowerCase();
};

const goWelcome = () => {
  store.setView("all");
  router.push({ name: "welcome" });
};

const showPokemonDetails = (pokemon: {name: string; isFavorite: boolean }) => {
  selectedPokemon.value = pokemon;
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  selectedPokemon.value = null;
};

const handleScroll = (event: Event) => {
  const { scrollTop, scrollHeight, clientHeight } = event.target as HTMLElement;
  lastScrollTop = scrollTop;

  if (scrollTop + clientHeight >= scrollHeight - 10) {
    store.fetchPokemons().then(() => {
      nextTick(() => {
        if (homeList.value) {
          homeList.value.scrollTop = lastScrollTop;
        }
      });
    });
  }
};

const filteredPokemons = computed(() => {
  const base = currentView.value === "all" ? store.pokemons : store.favorites;
  return base.filter((pokemon) =>
    pokemon.name?.toLowerCase().includes(searchQuery.value)
  );
});
</script>

<style scoped>
.home-view {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.home-bar {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 100%;
  flex: 1;
  box-sizing: border-box;
  background-color: var(--vt-c-white);
  overflow-y: auto;
  margin-bottom: 80px;
}

.home-list {
  margin: 0 20px
}
</style>
