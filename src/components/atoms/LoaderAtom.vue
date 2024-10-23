<template>
  <div class="loader">
    <img src="@/assets/pokeball.svg" alt="Loading" class="pokeball-loader" />
  </div>
</template>

<style>
.loader {
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.pokeball-loader {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
