import { createRouter, createWebHistory } from 'vue-router'
import Accueil from '../pages/Accueil.vue'
import Apropos from '../pages/Apropos.vue'
import Contacts from '../pages/Contacts.vue'
import Products from '../pages/Products.vue'

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
   {
     path: '/Products',
     name: 'produits',
    component: Products
   }
   
]

const router = createRouter({
  history: createWebHistory(), // obligatoire
  routes                       // obligatoire
})

export default router
