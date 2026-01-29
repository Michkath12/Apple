<template>
  <section class="py-8 sm:py-12 md:py-16 bg-gradient-to-b from-gray-50 to-white overflow-hidden px-4">
    <div class="container mx-auto max-w-6xl">
      
      <div
        ref="sectionRef"
        :class="[
          'flex flex-col md:flex-row items-center gap-6 sm:gap-8 md:gap-12',
          isVisible ? 'animate-in' : 'opacity-0'
        ]"
      >
        
        <!-- Image Container -->
        <div :class="[
          'relative group flex-shrink-0 w-full',
          isHome ? 'md:w-1/3' : 'md:w-1/2'
        ]">
          <div class="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
          <div class="relative">
            <img
              src="../assets/images/apple.jpg"
              alt="Technologie innovante"
              :class="[
                'rounded-2xl shadow-2xl w-full object-cover transform transition-all duration-700',
                isHome ? 'h-48 sm:h-56 md:h-64' : 'h-56 sm:h-72 md:h-96',
                isVisible ? 'scale-100 rotate-0' : 'scale-95 -rotate-1'
              ]"
            />
            <div class="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>
        </div>

        <!-- Text Content -->
        <div :class="[
          'space-y-4 sm:space-y-5 md:space-y-6 flex-shrink-0 w-full',
          isHome ? 'md:w-2/3' : 'md:w-1/2'
        ]">
          <div :class="[
            'transform transition-all duration-700 delay-200',
            isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
          ]">
            <h3 class="text-2xl sm:text-3xl md:text-3xl font-bold text-gray-800 mb-3 sm:mb-4 relative inline-block">
              Notre Histoire
              <span class="absolute -bottom-2 left-0 w-16 sm:w-20 h-1 bg-blue-400 rounded-full"></span>
            </h3>
          </div>

          <div :class="[
            'transform transition-all duration-700 delay-300',
            isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
          ]">
            <p class="text-gray-600 text-base sm:text-lg leading-relaxed text-justify">
              <template v-if="isHome">
                Découvrez des produits conçus avec précision, performance et
                élégance. Notre objectif est de vous offrir une technologie
                innovante qui s'adapte parfaitement à votre quotidien.
              </template>
              <template v-else>
                Apple, fondée en 1976 par Steve Jobs, Steve Wozniak et Ronald Wayne, est devenue l'une des entreprises technologiques les plus influentes au monde grâce à sa capacité à innover et à anticiper les usages. Sa vision repose sur la création de produits simples, performants et intuitifs qui améliorent le quotidien des utilisateurs. Apple place l'innovation au cœur de sa stratégie, non pour multiplier les fonctionnalités, mais pour proposer des solutions nouvelles et cohérentes. La qualité de ses produits se reflète dans le choix de matériaux haut de gamme, la fiabilité et la durabilité, tandis que le design épuré et fonctionnel constitue une véritable signature de la marque, alliant esthétique et expérience utilisateur.
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
            <button class="group relative px-4 sm:px-5 py-2.5 sm:py-3 bg-blue-400 text-white font-semibold rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 text-sm sm:text-base w-full sm:w-auto">
              <RouterLink to="/apropos" class="relative z-10">
                Voir plus
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

/* Ensure proper spacing on very small screens */
@media (max-width: 360px) {
  .container {
    padding-left: 0.75rem;
    padding-right: 0.75rem;
  }
}
</style>