<template>
  <div class="bottom-bar">
    <btn-atom
      name="All"
      :maxWidthBt="275"
      :minWidthBt="150"
      :margin="buttonMargin"
      icon="list"
      :active="currentView === 'all'"
      @manage:click="setView('all')"
    />

    <div class="spacer"></div>

    <btn-atom
      name="Favorites"
      :maxWidthBt="275"
      :minWidthBt="150"
      :margin="buttonMargin"
      icon="star"
      :active="currentView === 'favorites'"
      @manage:click="setView('favorites')"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, onBeforeUnmount, onMounted } from 'vue';
import { usePokemonStore } from "@/stores/pokemonStore";
import { storeToRefs } from 'pinia';

import BtnAtom from "@/components/atoms/BtnAtom.vue";

const store = usePokemonStore();
const { currentView } = storeToRefs(store);
const buttonMargin = ref("0");

onMounted(() => {
  updateMargin();
  window.addEventListener("resize", updateMargin);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", updateMargin);
});

const setView = (view: string) => {
  store.setView(view);
};

const updateMargin = () => {
  buttonMargin.value = window.innerWidth < 600 ? "0 20px" : "0";
};
</script>

<style scoped>
.bottom-bar {
  display: flex;
  justify-content: center;
  padding: 10px;
  background-color: var(--c-dark-white);
  align-items: center;
  height: 80px;
  position: fixed;
  bottom: 0;
  width: 100%;
  border-top: 2px solid rgba(0, 0, 0, 0.1);
}

.spacer {
  width: 20px;
}
</style>
