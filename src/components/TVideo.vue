<template>
  <section class="video-hero">
    
    <div class="video-container">
      <video
        ref="videoRef"
        class="background-video"
        autoplay
        muted
        loop
        playsinline
        :poster="posterImage"
      >
        <source :src="videoSource" type="video/webm">
        Votre navigateur ne supporte pas la lecture de vidéos.
      </video>
      
      <!-- Overlay pour assombrir la vidéo -->
      <div class="video-overlay"></div>
    </div>

    
    <div class="content">
      <div class="font-extrabold text-white 
             text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight">
        50 years in the game and still 
        <span class="text-blue-400 typing-word">{{ displayedWord }}<span class="cursor">|</span></span>
      </div>
    </div>

    
    <button 
      @click="toggleMute" 
      class="sound-toggle"
      :title="isMuted ? 'Activer le son' : 'Désactiver le son'"
    >
      <span v-if="isMuted">🔇</span>
      <span v-else>🔊</span>
    </button>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import videoFile from '../assets/images/Qgh.webm'

const words = ["winning", "exploring", "innovating", "creating", "growing", "learning"]
const displayedWord = ref('')
let wordIndex = 0
let charIndex = 0
let isDeleting = false
let typingTimeout = null

const props = defineProps({
  videoSource: {
    type: String,
    default: videoFile
  },
  posterImage: {
    type: String,
    default: ''
  }
})

const videoRef = ref(null)
const isMuted = ref(true)

const toggleMute = () => {
  if (videoRef.value) {
    videoRef.value.muted = !videoRef.value.muted
    isMuted.value = videoRef.value.muted
  }
}

const typeWriter = () => {
  const currentWord = words[wordIndex]
  
  if (!isDeleting) {
    // Écriture
    displayedWord.value = currentWord.substring(0, charIndex + 1)
    charIndex++
    
    if (charIndex === currentWord.length) {
      // Mot complet, attendre avant de supprimer
      typingTimeout = setTimeout(() => {
        isDeleting = true
        typeWriter()
      }, 2000)
      return
    }
  } else {
    // Suppression
    displayedWord.value = currentWord.substring(0, charIndex - 1)
    charIndex--
    
    if (charIndex === 0) {
      // Mot supprimé, passer au suivant
      isDeleting = false
      wordIndex = (wordIndex + 1) % words.length
      typingTimeout = setTimeout(typeWriter, 500)
      return
    }
  }
  
  // Vitesse de frappe
  const typingSpeed = isDeleting ? 50 : 100
  typingTimeout = setTimeout(typeWriter, typingSpeed)
}

onMounted(() => {
  if (videoRef.value) {
    videoRef.value.play().catch(error => {
      console.log('Autoplay bloqué:', error)
    })
  }
  
  // Démarrage de l'effet typewriter
  typeWriter()
})

onUnmounted(() => {
  if (typingTimeout) {
    clearTimeout(typingTimeout)
  }
})
</script>

<style scoped>
.video-hero {
  position: relative;
  width: 100%;
  height: 100vh;
  min-height: 600px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.video-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.background-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.video-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
}

.content {
  position: relative;
  z-index: 10;
  text-align: center;
  color: white;
  padding: 2rem;
  max-width: 800px;
  animation: fadeInUp 1s ease-out;
}

.typing-word {
  display: inline-block;
  position: relative;
}

.cursor {
  display: inline-block;
  animation: blink 1s infinite;
  margin-left: 2px;
}

@keyframes blink {
  0%, 50% {
    opacity: 1;
  }
  51%, 100% {
    opacity: 0;
  }
}

.sound-toggle {
  position: absolute;
  bottom: 2rem;
  right: 2rem;
  z-index: 20;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1.5rem;
}

.sound-toggle:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: scale(1.1);
}

@media (max-width: 768px) {
  .video-hero {
    min-height: 500px;
  }

  .sound-toggle {
    bottom: 1rem;
    right: 1rem;
    width: 45px;
    height: 45px;
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>