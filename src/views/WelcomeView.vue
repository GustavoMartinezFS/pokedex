<template>
  <div class="welcome">
    <logo-atom />
    <h1>Welcome to Pokédex</h1>
    <p>
      The digital encyclopedia created by Professor Oak is an invaluable tool to
      Trainers in the Pokémon world.
    </p>
    <btn-atom
      name="Get started"
      :maxWidthBt="131"
      :icon="null"
      :active="true"
      :pressed="true"
      @manage:click="goToList"
    />
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
import LogoAtom from "@/components/atoms/LogoAtom.vue";
import BtnAtom from "@/components/atoms/BtnAtom.vue";

const router = useRouter();

const goToList = () => {
  router.push({ name: "home" });
};
</script>

<style scoped>
.welcome {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  text-align: center;
  background-color: var(--c-white);
}

h1 {
  color: var(--c-very-dark-gray);
  font: bold 26px 'Lato', sans-serif;
  padding-top: 60px;
}

p{
  color: var(--c-dark-gray);
  max-width: 570px;
  font: 18px 'Lato', sans-serif;
  padding: 50px 10px;
}
</style>
