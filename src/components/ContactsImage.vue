<template>
  <section class="min-h-screen flex items-center justify-center bg-gray-100 px-4">
    <div
      ref="contactSection"
      class="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2
             rounded-3xl overflow-hidden shadow-xl bg-white
             opacity-0 translate-y-6 transition-all duration-700"
      :class="isVisible && 'opacity-100 translate-y-0'"
    >

      <!-- Image -->
      <div class="hidden md:block relative">
        <img
          src="../assets/images/humm.jpg"
          class="absolute inset-0 w-full h-full object-cover"
        />

        <!-- Overlay + texte -->
        <div class="relative z-10 h-full flex items-end p-8 bg-black/40">
          <p class="text-white text-lg font-semibold">
            Contactez-nous pour plus d’informations
          </p>
        </div>
      </div>

      <!-- Formulaire -->
      <div class="p-10">
        <h3 class="text-2xl font-bold mb-6">
          Envoyez-nous un message
        </h3>

        <form @submit.prevent="submitForm" class="space-y-5">
          <!-- Objet -->
          <div>
            <label class="text-sm font-semibold text-gray-600">
              📋 Objet
            </label>
            <select
              v-model="selectedObject"
              class="w-full mt-1 px-4 py-2.5 rounded-lg border border-gray-300 bg-gray-50
                     focus:outline-none focus:ring-2 focus:ring-blue-200
                     focus:border-blue-600 transition"
            >
              <option disabled value="">Choisissez un objet</option>
              <option value="info">Information</option>
              <option value="devis">Devis</option>
              <option value="support">Support</option>
            </select>
          </div>

          <!-- Description -->
          <div>
            <label class="text-sm font-semibold text-gray-600">
              ✍️ Description
            </label>
            <textarea
              v-model="description"
              rows="3"
              maxlength="500"
              placeholder="Décrivez votre demande..."
              class="w-full mt-1 px-4 py-2.5 rounded-lg border border-gray-300 bg-gray-50
                     focus:outline-none focus:ring-2 focus:ring-blue-200
                     focus:border-blue-600 transition resize-none"
            ></textarea>
            <p class="text-right text-xs text-gray-400">
              {{ description.length }} / 500
            </p>
          </div>

          <!-- Téléphone -->
          <div>
            <label class="text-sm font-semibold text-gray-600">
              📞 Téléphone
            </label>
            <input
              type="tel"
              v-model="phone"
              placeholder="+33 6 12 34 56 78"
              class="w-full mt-1 px-4 py-2.5 rounded-lg border border-gray-300 bg-gray-50
                     focus:outline-none focus:ring-2 focus:ring-blue-200
                     focus:border-blue-600 transition"
            />
          </div>

          <!-- Bouton -->
          <button
            type="submit"
            :disabled="!isFormValid"
            class="w-full py-2.5 rounded-lg text-sm font-semibold text-white
                   bg-blue-600 hover:bg-blue-700 transition
                   disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Envoyer
          </button>

          <!-- Succès -->
          <p
            v-if="showSuccess"
            class="text-center text-green-600 text-sm font-semibold animate-fade-in"
          >
            ✓ Message envoyé avec succès
          </p>
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

    observer.observe(this.$refs.contactSection)
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
    transform: translateY(-4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.4s ease-out;
}
</style>
