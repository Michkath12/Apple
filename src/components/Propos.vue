<template>
  <section class="py-16 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
    <div class="container mx-auto px-4">
      <h2 class="text-4xl font-bold text-center mb-16 text-gray-800">
        À Propos
      </h2>
      
      <div
        ref="sectionRef"
        :class="[
          'flex flex-row items-center gap-12',
          isVisible ? 'animate-in' : 'opacity-0'
        ]"
      >
        <!-- Image -->
        <div :class="[
          'relative group flex-shrink-0',
          isHome ? 'w-1/3' : 'w-1/2'
        ]">
          <div class="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
          <div class="relative">
            <img
              src="../assets/images/apple.jpg"
              alt="Technologie innovante"
              :class="[
                'rounded-2xl shadow-2xl w-full object-cover transform transition-all duration-700',
                isHome ? 'h-64' : 'h-96',
                isVisible ? 'scale-100 rotate-0' : 'scale-95 -rotate-1'
              ]"
            />
            <div class="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>
        </div>

        <!-- Texte -->
        <div :class="[
          'space-y-6 flex-shrink-0',
          isHome ? 'w-2/3' : 'w-1/2'
        ]">
          <div :class="[
            'transform transition-all duration-700 delay-200',
            isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
          ]">
            <h3 class="text-3xl font-bold text-gray-800 mb-4 relative inline-block">
              Notre Histoire
              <span class="absolute -bottom-2 left-0 w-20 h-1 bg-blue-400 rounded-full"></span>
            </h3>
          </div>

          <div :class="[
            'transform transition-all duration-700 delay-300',
            isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
          ]">
            <p class="text-gray-600 text-lg leading-relaxed">
              <template v-if="isHome">
                Découvrez des produits conçus avec précision, performance et
                élégance. Notre objectif est de vous offrir une technologie
                innovante qui s'adapte parfaitement à votre quotidien.
              </template>
              <template v-else>
                Découvrez des produits conçus avec précision, performance et élégance. 
                Notre objectif est de vous offrir une technologie innovante qui s'adapte 
                parfaitement à votre quotidien. Depuis notre création, nous nous engageons 
                à repousser les limites de l'innovation pour créer des expériences 
                exceptionnelles. Chaque produit est le résultat d'années de recherche et 
                développement, conçu avec une attention méticuleuse aux détails. Nous croyons 
                que la technologie doit être accessible, intuitive et belle. Notre équipe 
                passionnée travaille sans relâche pour transformer votre vision en réalité, 
                en combinant design moderne et fonctionnalités avancées. Rejoignez-nous dans 
                cette aventure vers un avenir où la technologie enrichit véritablement la vie.
              </template>
            </p>
          </div>

          <div
            v-if="isHome"
            :class="[
              'transform transition-all duration-700 delay-500',
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
            ]"
          >
            <button class="group relative px-8 py-3 bg-blue-400 text-white font-semibold rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105">
             <RouterLink>
                 <span class="relative z-10">Voir plus</span>
             </RouterLink>
              <div class="absolute inset-0 bg-blue-900 to-blue-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div class="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300">
                <div class="absolute inset-0 bg-white transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12"></div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'AboutSection',
  props: {
    variant: {
      type: String,
      default: 'home',
      validator: (value) => ['home', 'about'].includes(value)
    }
  },
  data() {
    return {
      isVisible: false,
      observer: null
    };
  },
  computed: {
    isHome() {
      return this.variant === 'home';
    }
  },
  mounted() {
    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.isVisible = true;
        }
      },
      { threshold: 0.1 }
    );

    if (this.$refs.sectionRef) {
      this.observer.observe(this.$refs.sectionRef);
    }
  },
  beforeUnmount() {
    if (this.observer && this.$refs.sectionRef) {
      this.observer.unobserve(this.$refs.sectionRef);
    }
  }
};
</script>

<style scoped>
.animate-in {
  animation: fadeInUp 0.8s ease-out forwards;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.delay-200 {
  animation-delay: 0.2s;
}

.delay-300 {
  animation-delay: 0.3s;
}

.delay-500 {
  animation-delay: 0.5s;
}
</style>