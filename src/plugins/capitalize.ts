export default {
  install(app: App) {
    app.config.globalProperties.$capitalize = (value: string) => {
      if (typeof value !== 'string') return value;
      return value.charAt(0).toUpperCase() + value.slice(1);
    };
  },
};
