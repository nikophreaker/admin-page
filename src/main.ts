import { createApp } from 'vue'
import { VueFire, VueFireAuth } from 'vuefire'
import './style.css'
import App from './App.vue'
import router from './plugins/router'
import { firebaseApp } from './firebase'

const app = createApp(App)
    .use(VueFire, {
        firebaseApp,
        modules: [
            VueFireAuth(),
        ],
    })
    .use(router)
    .mount('#app');
