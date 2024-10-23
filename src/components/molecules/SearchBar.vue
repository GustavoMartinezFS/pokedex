<template>
  <div class="search-container">
    <i class="icon-search">
      <img src="@/assets/search.svg" alt="search">
    </i>
    <input
      type="text"
      :value="modelValue"
      @input="onInput"
      placeholder="Search"
    />
  </div>
</template>

<script lang="ts" setup>
import { defineEmits, defineProps } from "vue";

const props = defineProps({
  modelValue: String,
});

const emit = defineEmits(["update:modelValue"]);

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit("update:modelValue", target.value);
};
</script>

<style scoped>
.search-container {
  position: relative;
  width: 100%;
  max-width: 570px;
  margin: 35px auto;
}

input {
  width: 100%;
  height: 50px;
  padding: 0 20px;
  padding-left: 45px;
  font-size: 16px;
  border-radius: 5px;
  border: none;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}

.icon-search {
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
}

.icon-search img {
  width: 100%;
  height: auto;
}

@media screen and (max-width: 600px) {
  .icon-search {
    left: 35px;
  }

  .search-container {
   padding: 0 20px;
  }
}
</style>
