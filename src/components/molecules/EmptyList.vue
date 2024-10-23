<template>
  <div class="empty-list">
    <h1>Uh-oh!</h1>
    <p>You look lost on your journey!</p>
    <btn-atom @manage:click="handleClick" name="Go back home" widthBt="155" :active="true"/>
  </div>
</template>

<script lang="ts" setup>
import BtnAtom from "@/components/atoms/BtnAtom.vue";

const emit = defineEmits(['manage:goBack']);

const handleClick = () => {
  emit('manage:goBack');
};
</script>

<style scoped>
.empty-list {
  width: 100%;
  text-align: center;
  padding: 20px;
}

h1 {
  color: #333;
  font: bold 36px "Lato", sans-serif;
}

p {
  font: 20px "Lato", sans-serif;
  font-weight: 500;
  padding: 10px 0 30px 0;
}
</style>
