<template>
  <button
    :class="[
      'btn',
      disabled ? 'btn--disabled' : '',
      icon ? 'btn--with-icon' : 'btn--no-icon',
      `btn--${color}`
    ]"
    :style="{
      width: widthBt,
      maxWidth: `${maxWidthBt}px`,
      minWidth: `${minWidthBt}px`,
      height: `${height}px`,
      padding: `${padding}px`,
      margin: `${margin}px`,
      backgroundColor: isPressed ? pressedColor : active? color : disabledColor
    }"
    @click="handleClick"
    @mousedown="handleMouseDown"
    @mouseup="handleMouseUp"
    @mouseleave="handleMouseUp"
    :disabled="disabled"
  >
    <template v-if="icon">
      <span class="icon">
        <img :src="selectedIcon" alt="icon" />
      </span>
    </template>
    <span class="text">{{ name }}</span>
  </button>
</template>

<script lang="ts" setup>
import { defineProps, computed, ref } from 'vue';

const props = defineProps({
  color: {
    type: String,
    default: '#F22539',
  },
  disabledColor: {
    type: String,
    default: '#BFBFBF',
  },
  pressedColor: {
    type: String,
    default: '#C00E20',
  },
  active: {
    type: Boolean,
    default: false,
  },
  pressed: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  widthBt: {
    type: String,
    default: '100%',
  },
  minWidthBt: {
    type: Number,
    default: 131,
  },
  maxWidthBt: {
    type: Number,
    default: 275,
  },
  height: {
    type: Number,
    default: 44,
  },
  padding: {
    type: Number,
    default: 10,
  },
  margin: {
    type: String,
    default: '0',
  },
  name: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    default: null,
  },
});

const iconMap = {
  star: new URL('@/assets/star.svg', import.meta.url).href,
  list: new URL('@/assets/list.svg', import.meta.url).href,
};

const isPressed = ref(false);

const emit = defineEmits(['manage:click']);

const handleClick = () => {
  if (!props.disabled) {
    emit('manage:click');
  }
};

const handleMouseDown = () => {
  if (props.pressed) {
    isPressed.value = true;
  }
};

const handleMouseUp = () => {
  if (props.pressed) {
    isPressed.value = false;
  }
};

const selectedIcon = computed(() => iconMap[props.icon] || '');
</script>

<style scoped>
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  box-sizing: border-box;
  border: none;
}

.btn--disabled {
  background-color: #d3d3d3;
  color: #a9a9a9;
  cursor: not-allowed;
}

.icon {
  margin-right: 10px;
}

.text {
  display: inline-block;
  font: 18px "Lato",sans-serif;
  color: var(--vt-c-white);
}
</style>
