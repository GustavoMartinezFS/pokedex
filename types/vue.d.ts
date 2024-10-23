// types/vue.d.ts
import { ComponentCustomProperties } from 'vue';

declare module '@vue/runtime-core' {
  // Extiende la interfaz para agregar las propiedades globales
  interface ComponentCustomProperties {
    $capitalize: (value: string) => string;
    $capitalizeWords: (value: string) => string;
  }
}
