<script setup>
import { ref } from 'vue';
import ProduitsCards from '../components/ProduitsCards.vue';

</script>

<template> 
    
    <section class="py-16 bg-gray-50 mt-8">
            <h2 class="text-3xl font-bold text-center text-gray-800 mb-12">
            Nos Produits
            </h2>

        <form class="max-w-2xl mx-auto mb-12">
  <div class="flex rounded-lg shadow-sm">
    
    

    <input
      type="search"
        
      class="flex-1 px-4 py-2 border-t border-b border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder="Search for products"
    />

    <button
      type="submit"
      class="px-4 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700"
    >
      Search
    </button>

  </div>
        </form>


        
        <div class="max-w-7xl mx-auto px-6">
            <!-- Titre -->
            
            <!-- Grille -->
            
                <ProduitsCards  />
        </div>
    </section>
</template>