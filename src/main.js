import { createApp } from 'vue'
import App from './App.vue'
import store from './store/store.js'
import {library} from "@fortawesome/fontawesome-svg-core"
import {fas} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome"
import {fass} from "@fortawesome/sharp-solid-svg-icons"
// import {far} from "@fortawesome/free-regular-svg-icons"
library.add(fas,fass);
createApp(App).component("font-awesome-icon", FontAwesomeIcon).use(store).mount('#app')
