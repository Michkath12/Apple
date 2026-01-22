<template>
  <section class="py-16 bg-gray-50">
    <div class="max-w-7xl mx-auto px-6">
      
      <!-- Titre -->
      <h2 class="text-3xl font-bold text-center text-gray-800 mb-12">
        Nos Produits
      </h2>

      <!-- Grille -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        <!-- Card -->
        <div
          v-for="(product, index) in products"
          :key="index"
          class="bg-white rounded-2xl shadow-lg overflow-hidden
                 hover:shadow-2xl transition duration-300"
        >
          <!-- Image -->
          <img
            :src="product.image"
            :alt="product.title"
            class="h-56 w-full object-cover"
          />

          <!-- Contenu -->
          <div class="p-6">
            <h3 class="text-xl font-semibold text-gray-800 mb-2">
              {{ product.title }}
            </h3>
            <p class="text-gray-600 text-sm mb-4">
              {{ product.description }}
            </p>

            <!-- Bouton -->
            <button
              class="px-5 py-2 rounded-xl bg-blue-400 text-white font-medium
                     hover:bg-blue-900 transition"
            >
              Détail
            </button>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
const products = [
  {
    title: "Sac à dos moderne",
    description: "Sac élégant et résistant, idéal pour le travail et les voyages.",
    image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f"
  },
  {
    title: "Casque audio",
    description: "Casque confortable avec une excellente qualité sonore.",
    image: "https://images.unsplash.com/photo-1518441902113-f0c7f87c6f1a"
  },
  {
    title: "Montre connectée",
    description: "Suivez votre activité et restez connecté toute la journée.",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30"
  }
]
</script>
