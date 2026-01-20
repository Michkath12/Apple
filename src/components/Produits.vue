<template>
  <div class="cards-container px-6 py-3">
  <div 
    v-for="(card, index) in cards" 
    :key="index"
    class="card group"
    :style="{ animationDelay: `${index * 0.2}s` }"
  >
    <figure class="h-full w-5/6">
      <img :src="card.image" class="w-full h-full object-cover object-center group-hover:scale-110 transition-all transform duration-300 " :alt="card.title" />
      <!-- <div class="image-overlay"></div> -->
    </figure>

    <div class="card-body">
      <h3 class="card-title">{{ card.title }}</h3>
      <p class="card-description">{{ card.description }}</p>

      <div class="card-actions">
        <button class="btn-primary">
          {{ card.buttonText }}
          <span class="arrow">→</span>
        </button>
      </div>
    </div>
  </div>
</div>

</template>

<script setup>
import { ref } from 'vue'


import webImg from '../assets/images/v.jpg'
import uiImg from '../assets/images/airtag-single-select-202104.png'
import consultingImg from '../assets/images/6.jpg'

const cards = ref([
  {
    image: webImg,
    title: 'Développement Web',
    description: 'Créez des applications web modernes et performantes avec les dernières technologies.',
    buttonText: 'En savoir plus'
  },
  {
    image: uiImg,
    title: 'Design UI/UX',
    description: 'Des interfaces élégantes et intuitives pour améliorer l’expérience utilisateur.',
    buttonText: 'Découvrir'
  },
  {
    image: consultingImg,
    title: 'Consulting Digital',
    description: 'Accompagnement personnalisé pour votre transformation digitale et stratégie.',
    buttonText: 'Consulter'
  }
])
</script>

<style scoped>
.cards-section {
  padding: 4rem 2rem;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.section-title {
  font-size: 3rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 3rem;
  color: #1f2937;
  position: relative;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  height: 4px;
  background: linear-gradient(90deg, #3b82f6, #8b5cf6);
  border-radius: 2px;
}

.cards-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
  max-width: 1400px;
  width: 100%;
}

.card {
  background: white;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  opacity: 0;
  animation: fadeInUp 0.8s ease-out forwards;
  cursor: pointer;
  display: flex;
  flex-direction: row;
}

.card:hover {
  transform: translateY(-10px) scale(1.02);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
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

.card-image {
  position: relative;
  height: 250px;
  overflow: hidden;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
}

.card:hover .card-image img {
  transform: scale(1.15);
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.3) 100%);
  opacity: 0;
  transition: opacity 0.4s ease;
}

.card:hover .image-overlay {
  opacity: 1;
}

.card-body {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.card-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #1f2937;
  margin: 0;
  position: relative;
  display: inline-block;
}

.card-title::before {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 3px;
  background: linear-gradient(90deg, #3b82f6, #8b5cf6);
  transition: width 0.4s ease;
}

.card:hover .card-title::before {
  width: 100%;
}

.card-description {
  color: #6b7280;
  line-height: 1.6;
  margin: 0;
}

.card-actions {
  margin-top: auto;
  display: flex;
  justify-content: flex-end;
}

.btn-primary {
  background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  position: relative;
  overflow: hidden;
}

.btn-primary::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.2);
  transition: left 0.5s ease;
}

.btn-primary:hover::before {
  left: 100%;
}

.btn-primary:hover {
  transform: translateX(5px);
  box-shadow: 0 10px 25px rgba(59, 130, 246, 0.4);
}

.arrow {
  font-size: 1.2rem;
  transition: transform 0.3s ease;
}

.btn-primary:hover .arrow {
  transform: translateX(5px);
}

/* Responsive */
@media (max-width: 768px) {
  .section-title {
    font-size: 2rem;
  }

  .cards-container {
    grid-template-columns: 1fr;
    padding: 0 1rem;
  }

  .card-image {
    height: 200px;
  }
}

/* Animation au scroll (optionnel - nécessite Intersection Observer) */
@media (prefers-reduced-motion: no-preference) {
  .card {
    animation: fadeInUp 0.8s ease-out forwards;
  }
}
</style>