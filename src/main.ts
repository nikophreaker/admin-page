import { createApp } from 'vue'
import { createStore } from 'vuex'
import { VueFire, VueFireAuth } from 'vuefire'
import './style.css'
import App from './App.vue'
import router from './plugins/router'
import { firebaseApp } from './firebase'

const store = createStore({
    state() {
        return {
            isLogged: false
        }
    },
    mutations: {
        isLogin(state) {
            state.isLogged = !state.isLogged
        }
    }
});
// store.commit('isLogin')
// console.log(store.state.isLogged)
const app = createApp(App)
    .use(VueFire, {
        firebaseApp,
        modules: [
            VueFireAuth(),
        ],
    })
    .use(store)
    .use(router)
    .mount('#app');
