<script setup>
import TVideo from '../components/TVideo.vue'
import Propos from '../components/Propos.vue'
import ContactsImage from '../components/ContactsImage.vue'
import ProduitsCards from '../components/ProduitsCards.vue';


</script>

<template>
  <main class="home-page bg-gray-50 text-gray-800 overflow-hidden">
    
    <section class="relative">
      <TVideo />

      <div class="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-gray-50 to-transparent"></div>
    </section>

    <section class="">
      <Propos variant="home" />
    </section>
    <section class="py-16 bg-gray-50">
      <div class="max-w-7xl mx-auto px-6">
        
        <!-- Titre -->
        <h2 class="text-3xl font-bold text-center text-gray-800 mb-12">
          Nos Produits
        </h2>

        <!-- Grille -->
          <ProduitsCards is_home="true" />
      </div>
    </section>
    <section class="section-spacing bg-gray-100">
      <ContactsImage />
    </section>

  </main>
</template>
