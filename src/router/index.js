import { createRouter, createWebHistory } from 'vue-router'
import Accueil from '../pages/Accueil.vue'
import Apropos from '../pages/Apropos.vue'
import Contacts from '../pages/Contacts.vue'

const routes = [
  {
    path: '/',
    name: 'accueil',
    component: Accueil
  },
  {
     path: '/Apropos',
     name: 'apropos',
    component: Apropos
   },
  {
     path: '/Contacts',
     name: 'contacts',
    component: Contacts
   },
   
]

const router = createRouter({
  history: createWebHistory(), // obligatoire
  routes                       // obligatoire
})

export default router
