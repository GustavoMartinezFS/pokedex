import type { App } from 'vue';

export default {
  install(app: App) {
    app.config.globalProperties.$capitalizeWords = (value: string) => {
      if (typeof value !== 'string') return value;
      return value
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    };
  },
};
