import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import CapitalizePlugin from './plugins/capitalize';
import CapitalizeWordsPlugin from './plugins/capitalizeWords';

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(CapitalizePlugin)
app.use(CapitalizeWordsPlugin)

app.mount('#app')
