import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import capitalize from './plugins/capitalize';
import capitalizeWords from './plugins/capitalizeWords';

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(capitalize)
app.use(capitalizeWords)

app.mount('#app')
