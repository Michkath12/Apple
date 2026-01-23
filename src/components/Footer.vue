<template>
  <footer class="bg-gray-900 text-gray-100 py-8 sm:py-10 lg:py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Container principal responsive -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12">
        
        <!-- Section Logo & Description -->
        <aside class="flex flex-col items-center sm:items-start text-center sm:text-left">
          <a href="/" class="inline-flex items-center mb-3 sm:mb-4 hover:opacity-80 transition-opacity">
            <img 
              src="../assets/images/logo-apple.png" 
              alt="Apple Logo" 
              class="h-10 w-10 sm:h-12 sm:w-12 object-contain"
            />
          </a>
          <div class="space-y-1 sm:space-y-2">
            <p class="font-semibold text-base sm:text-lg lg:text-xl text-white">
              Apple Industries Ltd.
            </p>
            <p class="text-sm sm:text-base text-gray-400">
              Providing reliable tech since 1976
            </p>
          </div>
        </aside>

        <!-- Section Navigation -->
        <nav class="flex flex-col items-center sm:items-start text-center sm:text-left">
          <h6 class="font-bold text-base sm:text-lg lg:text-xl text-white mb-3 sm:mb-4 uppercase tracking-wider">
            Company
          </h6>
          <ul class="space-y-2 sm:space-y-3">
            <li>
              <a 
                href="#about" 
                class="text-sm sm:text-base lg:text-lg text-gray-300 hover:text-blue-400 transition-colors duration-300 inline-block"
              >
                À propos
              </a>
            </li>
            <li>
              <a 
                href="#products" 
                class="text-sm sm:text-base lg:text-lg text-gray-300 hover:text-blue-400 transition-colors duration-300 inline-block"
              >
                Produits
              </a>
            </li>
            <li>
              <a 
                href="#contact" 
                class="text-sm sm:text-base lg:text-lg text-gray-300 hover:text-blue-400 transition-colors duration-300 inline-block"
              >
                Contacts
              </a>
            </li>
          </ul>
        </nav>

        <!-- Section Newsletter -->
        <div class="flex flex-col items-center sm:items-start text-center sm:text-left sm:col-span-2 lg:col-span-1">
          <h6 class="font-bold text-base sm:text-lg lg:text-xl text-white mb-3 sm:mb-4 uppercase tracking-wider">
            Newsletter
          </h6>
          <form @submit.prevent="handleSubscribe" class="w-full max-w-md">
            <label for="email" class="block text-sm sm:text-base text-gray-400 mb-2 sm:mb-3">
              Enter your email address
            </label>
            <div class="flex flex-col sm:flex-row gap-2">
              <input
                id="email"
                type="email"
                v-model="email"
                placeholder="username@site.com"
                required
                class="flex-1 px-4 py-2 sm:py-2.5 lg:py-3 
                       text-sm sm:text-base
                       bg-gray-800 text-white 
                       border-2 border-gray-700 
                       rounded-lg sm:rounded-l-lg sm:rounded-r-none
                       focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50
                       placeholder-gray-500
                       transition-all duration-300"
              />
              <button
                type="submit"
                class="px-6 py-2 sm:py-2.5 lg:py-3
                       text-sm sm:text-base font-semibold
                       bg-blue-600 hover:bg-blue-700 active:bg-blue-800
                       text-white rounded-lg sm:rounded-l-none sm:rounded-r-lg
                       transition-all duration-300
                       transform hover:-translate-y-0.5 active:translate-y-0
                       shadow-md hover:shadow-lg
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900
                       disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-600"
                :disabled="!email"
              >
                Subscribe
              </button>
            </div>
            
            <!-- Message de succès -->
            <p 
              v-if="showSuccess" 
              class="mt-3 text-sm sm:text-base text-green-400 font-medium animate-fade-in"
            >
              ✓ Subscribed successfully!
            </p>
          </form>
        </div>
      </div>

      <!-- Séparateur -->
      <div class="border-t border-gray-700 mt-8 sm:mt-10 lg:mt-12 pt-6 sm:pt-8">
        <!-- Copyright & Social -->
        <div class="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
          <p class="text-xs sm:text-sm text-gray-400 text-center sm:text-left">
            © {{ currentYear }} Apple Industries Ltd. All rights reserved.
          </p>
          
          <!-- Réseaux sociaux -->
          <div class="flex items-center gap-4 sm:gap-5">
            <a 
              href="#" 
              aria-label="Facebook"
              class="text-gray-400 hover:text-blue-500 transition-colors duration-300 transform hover:scale-110"
            >
              <svg class="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a 
              href="#" 
              aria-label="Twitter"
              class="text-gray-400 hover:text-blue-400 transition-colors duration-300 transform hover:scale-110"
            >
              <svg class="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </a>
            <a 
              href="#" 
              aria-label="Instagram"
              class="text-gray-400 hover:text-pink-500 transition-colors duration-300 transform hover:scale-110"
            >
              <svg class="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      showSuccess: false,
      currentYear: new Date().getFullYear()
    }
  },
  methods: {
    handleSubscribe() {
      if (!this.email) return
      
      console.log('Newsletter subscription:', this.email)
      
      this.showSuccess = true
      
      setTimeout(() => {
        this.email = ''
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

/* Touch devices - zones de clic plus grandes */
@media (hover: none) and (pointer: coarse) {
  input,
  button {
    min-height: 48px;
  }
  
  /* Désactiver les effets hover/scale sur tactile */
  button:hover,
  a:hover {
    transform: none;
  }
}

/* Très petit mobile */
@media (max-width: 375px) {
  nav ul li a,
  aside p {
    font-size: 0.875rem;
  }
  
  h6 {
    font-size: 1rem;
  }
}

/* Landscape mobile */
@media (max-height: 600px) and (orientation: landscape) {
  footer {
    padding-top: 2rem;
    padding-bottom: 2rem;
  }
}

/* Amélioration accessibilité - focus visible */
a:focus-visible,
button:focus-visible,
input:focus-visible {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}
</style>