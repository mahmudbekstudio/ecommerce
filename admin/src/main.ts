import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './plugins/router';

createApp(App)
    .use(router)
    .use(vuetify)
    .mount('#app')
