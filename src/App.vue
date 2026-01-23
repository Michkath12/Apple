<script setup>
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue';


</script>

<template>
  <Navbar  />
  <div class="">
    
    <router-view />
  </div>
  

  <Footer/>

</template>


<style scoped>
  
</style>