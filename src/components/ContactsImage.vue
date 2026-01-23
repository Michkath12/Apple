<template>
  <section class="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
    <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-6 sm:mb-8 lg:mb-10 text-gray-800 px-4">
      Contactez-nous
    </h2>
    <div
      ref="contactSection"
      class="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2
             rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg sm:shadow-xl bg-white
             opacity-0 translate-y-6 transition-all duration-700"
      :class="isVisible && 'opacity-100 translate-y-0'"
    >
      <!-- Image (cachée sur mobile et tablette, visible sur desktop) -->
      <div class="hidden lg:block relative overflow-hidden">
        <img
          src="../assets/images/bbbb.jpg"
          alt="Contact"
          class="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        />
      </div>

      <!-- Formulaire -->
      <div class="p-6 sm:p-8 lg:p-10 xl:p-12">
        <h3 class="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 text-gray-800">
          Envoyez-nous un message
        </h3>

        <form @submit.prevent="submitForm" class="space-y-4 sm:space-y-5 flex flex-col">
          <!-- Objet -->
          <div class="w-full">
            <label class="block text-sm sm:text-base font-semibold text-gray-600 mb-1 sm:mb-2">
              Objet
            </label>
            <select
              v-model="selectedObject"
              class="w-full px-3 sm:px-4 py-2 sm:py-2.5 lg:py-3 rounded-lg border-2 border-gray-300 bg-gray-50
                     text-sm sm:text-base
                     focus:outline-none focus:ring-2 focus:ring-blue-200
                     focus:border-blue-600 transition-all duration-300
                     appearance-none cursor-pointer
                     hover:border-gray-400"
              style="background-image: url('data:image/svg+xml;charset=UTF-8,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27currentColor%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3e%3cpolyline points=%276 9 12 15 18 9%27%3e%3c/polyline%3e%3c/svg%3e');
                     background-repeat: no-repeat;
                     background-position: right 0.75rem center;
                     background-size: 1.25em 1.25em;
                     padding-right: 2.5rem;"
            >
              <option disabled value="">Choisissez un objet</option>
              <option value="info">Information</option>
              <option value="devis">Devis</option>
              <option value="support">Support</option>
            </select>
          </div>

          <!-- Description -->
          <div class="w-full">
            <label class="block text-sm sm:text-base font-semibold text-gray-600 mb-1 sm:mb-2">
              Description
            </label>
            <textarea
              v-model="description"
              rows="3"
              maxlength="500"
              placeholder="Décrivez votre demande en détail..."
              class="w-full px-3 sm:px-4 py-2 sm:py-2.5 lg:py-3 rounded-lg border-2 border-gray-300 bg-gray-50
                     text-sm sm:text-base
                     focus:outline-none focus:ring-2 focus:ring-blue-200
                     focus:border-blue-600 transition-all duration-300 resize-none
                     hover:border-gray-400
                     min-h-[100px] sm:min-h-[120px]"
            ></textarea>
            <p class="text-right text-xs sm:text-sm text-gray-400 mt-1">
              {{ description.length }} / 500
            </p>
          </div>

          <!-- Téléphone -->
          <div class="w-full">
            <label class="block text-sm sm:text-base font-semibold text-gray-600 mb-1 sm:mb-2">
              Téléphone
            </label>
            <input
              type="tel"
              v-model="phone"
              placeholder="+33 6 12 34 56 78"
              class="w-full px-3 sm:px-4 py-2 sm:py-2.5 lg:py-3 rounded-lg border-2 border-gray-300 bg-gray-50
                     text-sm sm:text-base
                     focus:outline-none focus:ring-2 focus:ring-blue-200
                     focus:border-blue-600 transition-all duration-300
                     hover:border-gray-400"
            />
          </div>

          <!-- Bouton -->
          <button
            type="submit"
            :disabled="!isFormValid"
            class="w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg 
                   text-sm sm:text-base font-semibold text-white
                   bg-blue-500 hover:bg-blue-600 active:bg-blue-700
                   transition-all duration-300
                   disabled:opacity-50 disabled:cursor-not-allowed
                   disabled:hover:bg-blue-500
                   shadow-md hover:shadow-lg
                   transform hover:-translate-y-0.5 active:translate-y-0
                   focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2
                   self-start"
          >
            Envoyer le message
          </button>

          <!-- Message de succès -->
          <div
            v-if="showSuccess"
            class="w-full p-3 sm:p-4 rounded-lg bg-green-50 border-2 border-green-200 animate-fade-in"
          >
            <p class="text-center text-green-700 text-sm sm:text-base font-semibold flex items-center justify-center gap-2">
              <span class="text-lg sm:text-xl">✓</span>
              Message envoyé avec succès !
            </p>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      selectedObject: '',
      description: '',
      phone: '',
      showSuccess: false,
      isVisible: false
    }
  },
  computed: {
    isFormValid() {
      return this.selectedObject && this.description.trim() && this.phone.trim()
    }
  },
  mounted() {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.isVisible = true
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )

    if (this.$refs.contactSection) {
      observer.observe(this.$refs.contactSection)
    }
  },
  methods: {
    submitForm() {
      if (!this.isFormValid) return

      console.log({
        objet: this.selectedObject,
        description: this.description,
        phone: this.phone
      })

      this.showSuccess = true

      setTimeout(() => {
        this.selectedObject = ''
        this.description = ''
        this.phone = ''
        this.showSuccess = false
      }, 3000)
    }
  }
}
</script>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.5s ease-out;
}

/* Amélioration du focus pour l'accessibilité */
select:focus,
textarea:focus,
input:focus {
  outline: none;
}

/* Touch devices - zones de clic plus grandes */
@media (hover: none) and (pointer: coarse) {
  select,
  textarea,
  input,
  button {
    min-height: 48px;
  }
  
  /* Désactiver les effets hover sur tactile */
  button:hover:not(:disabled) {
    transform: none;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }
}

/* Landscape mobile */
@media (max-height: 600px) and (orientation: landscape) {
  section {
    min-height: auto;
    padding-top: 60px;
    padding-bottom: 60px;
  }
  
  h2 {
    margin-bottom: 1rem;
    font-size: 1.5rem;
  }
  
  .min-h- {
    min-height: 80px;
  }
}

/* Très petit mobile (iPhone SE, etc.) */
@media (max-width: 375px) {
  h2 {
    font-size: 1.75rem;
  }
  
  h3 {
    font-size: 1.25rem;
  }
  
  .space-y-4 > * + * {
    margin-top: 0.875rem;
  }
}

/* Tablette portrait */
@media (min-width: 640px) and (max-width: 1023px) {
  /* Le formulaire prend plus d'espace sur tablette */
  .max-w-6xl {
    max-width: 640px;
  }
}

/* Desktop large */
@media (min-width: 1280px) {
  h2 {
    font-size: 3rem;
  }
  
  h3 {
    font-size: 2rem;
  }
}

/* Amélioration de l'accessibilité - mode sombre système */
@media (prefers-color-scheme: dark) {
  /* Si tu veux supporter le mode sombre plus tard */
  /* Décommente et adapte :
  section {
    background-color: #1a202c;
  }
  
  .bg-white {
    background-color: #2d3748;
  }
  
  .text-gray-800 {
    color: #e2e8f0;
  }
  */
}

/* Animation de l'image au survol (desktop uniquement) */
@media (min-width: 1024px) {
  img {
    transition: transform 0.5s ease-in-out;
  }
  
  img:hover {
    transform: scale(1.05);
  }
}

/* Amélioration du contraste pour l'accessibilité */
::placeholder {
  opacity: 0.6;
}

/* Focus visible pour la navigation au clavier */
button:focus-visible,
select:focus-visible,
input:focus-visible,
textarea:focus-visible {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}
</style>