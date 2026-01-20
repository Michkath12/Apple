<template>
  <div class="partner-slider-section">
    <h2 class="title">Nos Partenaires</h2>
    
    <div class="slider-container">
      <div class="gradient-left"></div>
      <div class="gradient-right"></div>
      
      <div class="slider-track">
        <!-- Première série -->
        <div
          v-for="partner in partners"
          :key="`first-${partner.id}`"
          class="partner-item"
        >
          <img
            :src="partner.logo"
            :alt="partner.name"
            class="partner-logo"
          />
        </div>
        
        <!-- Duplication pour effet infini -->
        <div
          v-for="partner in partners"
          :key="`second-${partner.id}`"
          class="partner-item"
        >
          <img
            :src="partner.logo"
            :alt="partner.name"
            class="partner-logo"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Import de tous tes logos
import accenture from '../assets/images/Accenture.png'
import amusic from '../assets/images/Amusic.png'
import apay from '../assets/images/Apay.png'
import atv from '../assets/images/Atv.jpg'
import chase from '../assets/images/chase.png'
import deloitte from '../assets/images/deloitte.png'
import google from '../assets/images/google.webp'
import miyake from '../assets/images/miyake.png'
import sachs from '../assets/images/sachs.png'
import salesforce from '../assets/images/salesforce.png'

const partners = ref([
  { id: 1, name: 'Accenture', logo: accenture },
  { id: 2, name: 'Apple Music', logo: amusic },
  { id: 3, name: 'Apple Pay', logo: apay },
  { id: 4, name: 'Apple TV', logo: atv },
  { id: 5, name: 'Chase', logo: chase },
  { id: 6, name: 'Deloitte', logo: deloitte },
  { id: 7, name: 'Google', logo: google },
  { id: 8, name: 'Miyake', logo: miyake },
  { id: 9, name: 'Goldman Sachs', logo: sachs },
  { id: 10, name: 'Salesforce', logo: salesforce },
])
</script>

<style scoped>
.partner-slider-section {
  padding: 4rem 1rem;
  background-color: #f9fafb;
}

.title {
  text-align: center;
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 3rem;
  color: #1f2937;
}

.slider-container {
  position: relative;
  overflow: hidden;
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  padding: 2rem 0;
  max-width: 1200px;
  margin: 0 auto;
}

.gradient-left,
.gradient-right {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 5rem;
  z-index: 10;
  pointer-events: none;
}

.gradient-left {
  left: 0;
  background: linear-gradient(to right, white, transparent);
}

.gradient-right {
  right: 0;
  background: linear-gradient(to left, white, transparent);
}

.slider-track {
  display: flex;
  animation: slide 25s linear infinite;
}

.slider-track:hover {
  animation-play-state: paused;
}

.partner-item {
  flex-shrink: 0;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 150px;
}

.partner-logo {
  height: 4rem;
  width: auto;
  max-width: 150px;
  object-fit: contain;
  filter: grayscale(100%) opacity(0.7);
  transition: all 0.3s ease;
}

.partner-logo:hover {
  filter: grayscale(0%) opacity(1);
  transform: scale(1.1);
}

@keyframes slide {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

/* Responsive */
@media (max-width: 768px) {
  .title {
    font-size: 2rem;
  }
  
  .partner-item {
    padding: 0 1.5rem;
    min-width: 120px;
  }
  
  .partner-logo {
    height: 3rem;
    max-width: 120px;
  }
}
</style>