<template>
  <div class="page-container">
    <div class="logo-container">
      <div class="ellipse">
        <img src="@\assets\welcome-image.svg" alt="Welcome Logo" class="logo-image" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.page-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
}

.logo-container {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
  width: 206px;
  height: 206px;
  overflow: visible;
}

.ellipse {
  width: 100%;
  height: 100%;
  background-color: var(--c-bright-red);
  border-radius: 50%;
  position: relative;
  border: 2px solid var(--c-very-dark-gray);
}

.logo-image {
  width: 325px;
  object-fit: cover;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-47%, -60.5%);
  z-index: 1;
}
</style>
