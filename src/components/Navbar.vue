<template>
  <div 
    :class="[
      'navbar shadow-sm fixed px-7 top-0 z-50 transition-all duration-300',
      isScrolled ? 'bg-white' : 'bg-transparent'
    ]"
  >
    <div class="navbar-start">
      <RouterLink to="/" class="text-xl">
        <img 
          src="../assets/images/logo-apple.png" 
          :style="{ filter : isHomePage ? (isScrolled ? 'invert(0%)' : 'invert(100%)') : 'invert(0%)' }" 
          alt="" 
          class="h-10 w-10 object-contain transition-all duration-300"
        >
      </RouterLink>
    </div>
    <div class="navbar-center lg:flex">
      <ul class="menu menu-horizontal gap-10 px-1 text-xl">
        <li>
          <RouterLink to="/apropos"
            :class="[
              'hover:underline cursor-pointer font-semibold transition-colors duration-300',
              isHomePage ? ( isScrolled ? 'text-black' : 'text-white') : 'text-black'
            ]"
          >
            A propos
          </RouterLink>
        </li>
        <li>
          <a 
            
              :class="[
                'hover:underline cursor-pointer font-semibold transition-colors duration-300',
                isHomePage ? ( isScrolled ? 'text-black' : 'text-white') : 'text-black'
              ]"
          >
         
            Produits
            
          </a>
        </li>
        <li>
          <a 
            :class="[
              'hover:underline cursor-pointer font-semibold transition-colors duration-300',
              isHomePage ? ( isScrolled ? 'text-black' : 'text-white') : 'text-black'
            ]"
          >
          <RouterLink to="/contacts">
            Contacts
          </RouterLink>
          </a>
        </li>
      </ul>
    </div>
    <div class="navbar-end">
      <a class="btn">Connexion</a>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRoute } from 'vue-router'

const isScrolled = ref(false)

const route = useRoute()

const handleScroll = () => {
 
  isScrolled.value = window.scrollY > 50
}

const isHomePage = computed(() => route.path === '/')

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>

</style>