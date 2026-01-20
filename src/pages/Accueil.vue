<script setup>
import TVideo from '../components/TVideo.vue'
import Propos from '../components/Propos.vue'
import ContactsImage from '../components/ContactsImage.vue'
</script>

<template>
  <main class="home-page bg-gray-50 text-gray-800 overflow-hidden">
    
    <section class="relative">
      <TVideo />

      <div class="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-gray-50 to-transparent"></div>
    </section>

    <section class="section-spacing">
      <Propos variant="home" />
    </section>

    <section class="section-spacing bg-gray-100">
      <ContactsImage />
    </section>

  </main>
</template>
