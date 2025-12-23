import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createHead } from '@vueuse/head'
import App from './App.vue'
import router from './router'
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faMastodon, faGithub,faXTwitter,faLinkedin,faFacebook,faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope,faBookOpen,faGlobe,faCopy,faX,faBars,faHeart as fasHeart,faCopyright } from '@fortawesome/free-solid-svg-icons'
import { faHeart,faComment } from '@fortawesome/free-regular-svg-icons'

const app = createApp(App)
const pinia = createPinia()
const head = createHead()

library.add(
	faMastodon,
	faGithub,
	faEnvelope,
	faHeart,
	fasHeart,
	faBookOpen,
	faGlobe,
	faCopyright,
	faCopy,
	faXTwitter,
	faLinkedin,
	faFacebook,
	faWhatsapp,
	faComment,
	faX,
	faBars
)
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(head)
app.use(router)
app.use(pinia)
app.mount('#app')
