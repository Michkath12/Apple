<script setup>
import { ref, computed } from 'vue';
import ProduitsCards from '../components/ProduitsCards.vue';

// TES PRODUITS - copie ce tableau exactement
const produits = ref([
  {
    "name": "Samsonite Image Biz Sac à Dos 14.1\"",
    "description": "Sac à dos professionnel pour ordinateur jusqu'à 14.1\", avec organisation interne et design élégant.",
    "image": "macbookpro-.jpg",
    "category": "sac à dos"
  },
  {
    "name": "Samsonite Image Biz Sac à Dos 15.6\"",
    "description": "Version plus grande du sac à dos Image Biz pour ordinateurs jusqu'à 15.6\", nylon de qualité et finition soignée.",
    "image": "MGD74.png",
    "category": "sac à dos"
  },
  {
    "name": "Sac à Dos Urbain Varié",
    "description": "Divers sacs à dos urbains et de voyage listés dans des guides d'achat avec des images de modèles variés.",
    "image": "macbook-air-.jpg",
    "category": "sac à dos"
  },
  {
    "name": "Headphones Audio Produit Exemple",
    "description": "Casque audio / headphones de haute qualité — voir photo d'exemple de produits audio.",
    "image": "v.jpg",
    "category": "audio"
  },
  {
    "name": "Headphones Large Over-Ear",
    "description": "Image type de casque audio over-ear, bon pour illustration de produit audio.",
    "image": "g.jpg",
    "category": "audio"
  },
  // ... (tous tes autres produits - garde-les tous)
]);

// Variable pour la recherche
const searchQuery = ref('');

// Fonction pour la recherche (quand on clique sur le bouton)
const searchProducts = () => {
  // La recherche se fait automatiquement via filteredProducts
  console.log('Recherche avec:', searchQuery.value);
};

// Produits filtrés - SE MET À JOUR AUTOMATIQUEMENT
const filteredProducts = computed(() => {
  // Si la recherche est vide, on montre tous les produits
  if (!searchQuery.value.trim()) {
    return produits.value;
  }
  
  const query = searchQuery.value.toLowerCase();
  
  // Recherche dans le nom ET la catégorie ET la description
  return produits.value.filter(produit => 
    produit.name.toLowerCase().includes(query) ||
    produit.category.toLowerCase().includes(query) ||
    (produit.description && produit.description.toLowerCase().includes(query))
  );
});

</script>

<template> 
    
    <section class="py-16 bg-gray-50 mt-8">
            <h2 class="text-3xl font-bold text-center text-gray-800 mb-12">
            Nos Produits
            </h2>

        <div class="max-w-7xl mx-auto px-6">
            <ProduitsCards :produits="filteredProducts" />
        </div>
    </section>
</template>
