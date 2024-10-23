<template>
  <div class="detail-container">
    <span class="attribute-title">{{ $capitalize(attribute ?? '') }}: </span>
    <span class="detail-pokemon">{{ $capitalizeWords(detail ?? '') }}</span>
    <hr />
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';

const props = defineProps({
  attribute: String,
  detail: String,
});
</script>

<style scoped>
.detail-container {
  text-align: left;
  max-width: 510px;
  margin: 0 auto;
}

.attribute-title {
  font: 18px "Lato",sans-serif;
  font-weight: bolder;
}

.detail-pokemon {
  font: 18px "Lato",sans-serif;
  font-weight: 500;
  color: var(--c-dark-gray);
}

hr {
  margin: 10px 0;
  max-width: 510px;
  width: 100%;
  border: none;
  border-top: 1px solid #ddd;
}
</style>
