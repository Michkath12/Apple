<template>
  <!-- Card -->
   <form
        class="max-w-2xl mx-auto mb-12"
        @submit.prevent="searchProducts"
        v-if="!props.is_home"
    >
        <div class="flex rounded-lg shadow-sm">
        <input
            type="search"
            v-model="searchQuery"
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
   <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
    <div
      v-for="(product, index) in props.is_home ? filteredProducts.slice(0, 3) : paginatedProducts"
      :key="index"
      :class="[
        'bg-white rounded-2xl overflow-hidden transition duration-300',
        props.is_home
          ? 'shadow-lg hover:shadow-2xl'
          : 'shadow-md hover:shadow-lg scale-[0.96]'
      ]"
    >
      <!-- Image -->
      <img
        :src="product.image"
        :alt="product.name"
        :class="[
          'w-full object-cover transition-all duration-300',
          props.is_home ? 'h-56' : 'h-44'
        ]"
      />

      <!-- Contenu -->
      <div :class="props.is_home ? 'p-6' : 'p-4'">
        <h3
          :class="[
            'font-semibold text-gray-800 mb-2',
            props.is_home ? 'text-xl' : 'text-lg'
          ]"
        >
          {{ product.name }}
        </h3>

        <p
          :class="[
            'text-gray-600 mb-4',
            props.is_home ? 'text-sm' : 'text-xs line-clamp-2'
          ]"
        >
          {{ product.description }}
        </p>

        <!-- Bouton -->
        <button
          :class="[
            'rounded-xl text-white font-medium transition',
            props.is_home
              ? 'px-5 py-2 bg-blue-400 hover:bg-blue-900'
              : 'px-4 py-1.5 bg-blue-500 hover:bg-blue-700 text-sm'
          ]"
        >
          Détail
        </button>
      </div>
    </div>
  </div>
  <div v-if="!filteredProducts || filteredProducts.length === 0">
      <div v-if="!searchQuery">
        No data
      </div>
      <div v-else>
        Aucun produit correspondant à "{{ searchQuery }}"
      </div>
  </div>

  <div v-if="!props.is_home" class="flex items-center justify-between px-6 py-3 text-sm">

      <span class="text-gray-600">
        {{ paginationInfo }}
      </span>

      <div class="flex items-center gap-1">

        <button
          @click="pagination.pageIndex = 0"
          :disabled="pagination.pageIndex === 0"
          class="px-2 py-1 border rounded disabled:opacity-40 cursor-pointer"
        >
          <<
        </button>

        <!-- PREV -->
        <button
          @click="pagination.pageIndex--"
          :disabled="pagination.pageIndex === 0"
          class="px-2 py-1 border rounded disabled:opacity-40 cursor-pointer"
        >
          <
        </button>

        <!-- NUMBERS -->
        <button
          v-for="page in pages"
          :key="page"
          @click="pagination.pageIndex = page"
          class="px-3 py-1 border rounded cursor-pointer"
          :class="page === pagination.pageIndex
            ? 'bg-blue-500 text-white border-blue-700'
            : 'hover:bg-gray-100'"
        >
          {{ page + 1 }}
        </button>

        <!-- NEXT -->
        <button
          @click="pagination.pageIndex++"
          :disabled="pagination.pageIndex >= totalPages - 1"
          class="px-2 py-1 border rounded disabled:opacity-40 cursor-pointer"
        >
          >
        </button>

        <!-- LAST -->
        <button
          @click="pagination.pageIndex = totalPages - 1"
          :disabled="pagination.pageIndex >= totalPages - 1"
          class="px-2 py-1 border rounded disabled:opacity-40 cursor-pointer"
        >
          >>
        </button>

      </div>
    </div>


</template>
<script setup> 
import { ref, computed } from 'vue'

const props = defineProps({ is_home : Boolean,produits: {
    type: Array,
    default: () => []
  } }) 
import productsData from '../components/produits.json'

const produits = ref(productsData)

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


const pagination = ref({
      pageIndex: 0,
      pageSize: 6,
  })
const paginationInfo = computed(() => {
      const total = filteredProducts.value.length
      if (total === 0) return 'Aucune donnée'

      const start = pagination.value.pageIndex * pagination.value.pageSize + 1
      const end = Math.min(start + pagination.value.pageSize - 1, total)

      return `Affichage de ${start} à ${end} sur ${total} produits`
  })
  const paginatedProducts = computed(() => {
      const start = pagination.value.pageIndex * pagination.value.pageSize
      const end = start + pagination.value.pageSize
      return filteredProducts.value.slice(start, end)
  })
  const totalPages = computed(() =>
        Math.ceil(filteredProducts.value.length / pagination.value.pageSize)
    )

    const pages = computed(() => Array.from({ length: totalPages.value }, (_, i) => i))

</script>
