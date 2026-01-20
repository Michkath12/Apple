<script setup>
import Navbar from './components/Navbar.vue'
import Footer from './components/footer.vue';
import ContactForm from './components/ContactForm.vue';
import Partenaire from './components/Partenaire.vue';
import Video from './components/TVideo.vue';
import Produits from './components/Produits.vue';

</script>

<template>
  <Navbar  />
  <div class="">
    <!-- <Video/>
    <ContactForm/>
    <Partenaire/>
    <Produits/> -->
    <router-view />
  </div>
  

  <Footer/>

</template>


<style scoped>
  
</style>