<template>
  <div class="map-wrapper">
    <div class="map-container">
      <h2 class="map-title">Apple France - Siège Social</h2>
      <div class="address-info">
        <div class="address-content">
          <svg class="address-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
          </svg>
          <div>
            <p class="address-label">Adresse</p>
            <p class="address-text">7 Place d'Iéna, 75016 Paris, France</p>
          </div>
        </div>
      </div>
      
      <div ref="mapContainer" class="map" :style="{ height: mapHeight + 'px' }"></div>
      
      <div class="map-controls">
        <button 
          @click="zoomIn" 
          class="control-btn"
          aria-label="Zoom avant"
          title="Zoom avant"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
          </svg>
        </button>
        <button 
          @click="zoomOut" 
          class="control-btn"
          aria-label="Zoom arrière"
          title="Zoom arrière"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"/>
          </svg>
        </button>
        <button 
          @click="resetView" 
          class="control-btn"
          aria-label="Réinitialiser la vue"
          title="Réinitialiser la vue"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
          </svg>
        </button>
        <button 
          @click="toggleMapStyle" 
          class="control-btn satellite-btn" 
          :class="{ active: mapStyle === 'satellite' }"
          aria-label="Vue satellite"
          title="Vue satellite"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppleMapLeaflet',
  data() {
    return {
      map: null,
      mapHeight: 400,
      zoom: 16,
      mapStyle: 'street',
      appleLocation: [48.8639, 2.2933],
      streetLayer: null,
      satelliteLayer: null
    }
  },
  mounted() {
    this.updateMapHeight()
    window.addEventListener('resize', this.updateMapHeight)
    this.loadLeaflet()
  },
  methods: {
    updateMapHeight() {
      // Adapter la hauteur de la carte selon la taille d'écran
      const width = window.innerWidth
      if (width < 640) {
        this.mapHeight = 300 // Mobile
      } else if (width < 1024) {
        this.mapHeight = 400 // Tablette
      } else {
        this.mapHeight = 500 // Desktop
      }
      
      // Mettre à jour la carte si elle existe déjà
      if (this.map) {
        this.$nextTick(() => {
          this.map.invalidateSize()
        })
      }
    },
    
    loadLeaflet() {
      // Charger les feuilles de style CSS de Leaflet
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
      link.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY='
      link.crossOrigin = ''
      document.head.appendChild(link)
      
      // Charger le script JavaScript de Leaflet
      const script = document.createElement('script')
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
      script.integrity = 'sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo='
      script.crossOrigin = ''
      script.onload = () => {
        this.initMap()
      }
      document.head.appendChild(script)
    },
    
    initMap() {
      this.$nextTick(() => {
        // Initialiser la carte
        this.map = L.map(this.$refs.mapContainer, {
          zoomControl: false // Désactiver les contrôles par défaut
        }).setView(this.appleLocation, this.zoom)
        
        // Créer les couches de tuiles
        this.streetLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
          maxZoom: 19
        })
        
        this.satelliteLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
          attribution: '&copy; Esri',
          maxZoom: 19
        })
        
        // Ajouter la couche par défaut
        this.streetLayer.addTo(this.map)
        
        // Ajouter un marqueur personnalisé
        const customIcon = L.divIcon({
          html: `
            <div style="
              background: linear-gradient(135deg, #FF3B30 0%, #D32F2F 100%);
              width: 44px;
              height: 44px;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              color: white;
              font-size: 20px;
              border: 3px solid white;
              box-shadow: 0 4px 12px rgba(255, 59, 48, 0.4);
              animation: pulse 2s infinite;
            ">
              🍎
            </div>
          `,
          className: 'custom-icon',
          iconSize: [44, 44],
          iconAnchor: [22, 44]
        })
        
        // Ajouter le marqueur
        const marker = L.marker(this.appleLocation, { icon: customIcon })
          .addTo(this.map)
          .bindPopup(`
            <div style="padding: 12px; min-width: 200px;">
              <h3 style="margin: 0 0 12px 0; color: #333; font-size: 16px; font-weight: 600; display: flex; align-items: center; gap: 8px;">
                🍎 Apple France
              </h3>
              <div style="color: #666; line-height: 1.6; font-size: 14px;">
                <p style="margin: 6px 0; font-weight: 600;">Siège Social</p>
                <p style="margin: 6px 0;">7 Place d'Iéna</p>
                <p style="margin: 6px 0;">75016 Paris, France</p>
                <p style="margin: 8px 0 0 0; color: #999; font-size: 12px; font-style: italic; border-top: 1px solid #eee; padding-top: 8px;">
                  ${this.appleLocation[0].toFixed(4)}, ${this.appleLocation[1].toFixed(4)}
                </p>
              </div>
            </div>
          `, {
            maxWidth: 300,
            className: 'custom-popup'
          })
        
        // Ouvrir la popup automatiquement
        marker.openPopup()
        
        // Mettre à jour le zoom
        this.map.on('zoomend', () => {
          this.zoom = this.map.getZoom()
        })
      })
    },
    
    zoomIn() {
      if (this.map) {
        this.map.zoomIn()
      }
    },
    
    zoomOut() {
      if (this.map) {
        this.map.zoomOut()
      }
    },
    
    resetView() {
      if (this.map) {
        this.map.setView(this.appleLocation, 16, {
          animate: true,
          duration: 0.5
        })
      }
    },
    
    toggleMapStyle() {
      if (!this.map) return
      
      if (this.mapStyle === 'street') {
        this.map.removeLayer(this.streetLayer)
        this.satelliteLayer.addTo(this.map)
        this.mapStyle = 'satellite'
      } else {
        this.map.removeLayer(this.satelliteLayer)
        this.streetLayer.addTo(this.map)
        this.mapStyle = 'street'
      }
    }
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.updateMapHeight)
    if (this.map) {
      this.map.remove()
    }
  }
}
</script>

<style scoped>
/* Wrapper pour centrer et gérer le padding */
.map-wrapper {
  width: 100%;
  padding: 16px;
  background-color: #f9fafb;
}

.map-container {
  max-width: 100%;
  margin: 0 auto;
  padding: 16px;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  background-color: white;
  position: relative;
  z-index: 1;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.map-title {
  margin: 0 0 16px 0;
  color: #1f2937;
  font-size: 20px;
  font-weight: 700;
  text-align: center;
}

.address-info {
  margin-bottom: 20px;
  padding: 14px 16px;
  background: linear-gradient(135deg, #fff5f5 0%, #fff 100%);
  border-radius: 10px;
  border-left: 4px solid #FF3B30;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.address-content {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.address-icon {
  width: 24px;
  height: 24px;
  color: #FF3B30;
  flex-shrink: 0;
  margin-top: 2px;
}

.address-label {
  margin: 0 0 4px 0;
  font-weight: 700;
  font-size: 13px;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.address-text {
  margin: 0;
  color: #374151;
  font-size: 15px;
  line-height: 1.5;
}

.map {
  width: 100%;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  margin-bottom: 20px;
  background-color: #f3f4f6;
  position: relative;
  z-index: 1;
}

.map-controls {
  display: flex;
  justify-content: center;
  gap: 8px;
  flex-wrap: wrap;
}

.control-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  min-width: 44px;
  min-height: 44px;
  border: 2px solid #e5e7eb;
  border-radius: 10px;
  background-color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
  color: #374151;
}

.control-btn svg {
  width: 20px;
  height: 20px;
}

.control-btn:hover {
  background-color: #f9fafb;
  border-color: #FF3B30;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(255, 59, 48, 0.2);
}

.control-btn:active {
  transform: translateY(0);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
}

.control-btn.active {
  background: linear-gradient(135deg, #FF3B30 0%, #D32F2F 100%);
  color: white;
  border-color: #FF3B30;
  box-shadow: 0 4px 8px rgba(255, 59, 48, 0.3);
}

/* Classes utilitaires pour les SVG */
.w-5 {
  width: 1.25rem;
}

.h-5 {
  height: 1.25rem;
}

/* Styles Leaflet */
:deep(.leaflet-container) {
  font-family: inherit;
  z-index: 1 !important;
}

:deep(.leaflet-popup-content-wrapper) {
  border-radius: 10px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

:deep(.leaflet-popup-content) {
  font-family: inherit;
  margin: 0;
}

:deep(.leaflet-popup-tip) {
  box-shadow: 0 3px 14px rgba(0, 0, 0, 0.1);
}

:deep(.leaflet-popup) {
  z-index: 1000;
}

:deep(.leaflet-control-zoom) {
  display: none;
}

/* Animation du marker */
:deep(.custom-icon > div) {
  animation: markerPulse 2s ease-in-out infinite;
}

@keyframes markerPulse {
  0%, 100% {
    transform: scale(1);
    box-shadow: 0 4px 12px rgba(255, 59, 48, 0.4);
  }
  50% {
    transform: scale(1.05);
    box-shadow: 0 6px 16px rgba(255, 59, 48, 0.6);
  }
}

/* ========== RESPONSIVE ========== */

/* Très petit mobile (≤ 375px) */
@media (max-width: 375px) {
  .map-wrapper {
    padding: 12px;
  }

  .map-container {
    padding: 12px;
    border-radius: 10px;
  }

  .map-title {
    font-size: 18px;
    margin-bottom: 12px;
  }

  .address-info {
    padding: 12px;
    margin-bottom: 16px;
  }

  .address-text {
    font-size: 14px;
  }

  .map-controls {
    gap: 6px;
  }

  .control-btn {
    min-width: 40px;
    min-height: 40px;
    padding: 8px;
  }

  .control-btn svg {
    width: 18px;
    height: 18px;
  }
}

/* Mobile (376px - 639px) */
@media (min-width: 376px) and (max-width: 639px) {
  .map-title {
    font-size: 20px;
  }
}

/* Tablette (≥ 640px) */
@media (min-width: 640px) {
  .map-wrapper {
    padding: 24px;
  }

  .map-container {
    padding: 20px;
    border-radius: 16px;
    max-width: 700px;
  }

  .map-title {
    font-size: 24px;
    margin-bottom: 20px;
  }

  .address-info {
    padding: 16px 18px;
  }

  .address-text {
    font-size: 16px;
  }

  .map-controls {
    gap: 10px;
  }
}

/* Desktop (≥ 1024px) */
@media (min-width: 1024px) {
  .map-wrapper {
    padding: 32px;
  }

  .map-container {
    padding: 28px;
    max-width: 900px;
    border-radius: 20px;
  }

  .map-title {
    font-size: 28px;
    margin-bottom: 24px;
  }

  .address-info {
    padding: 18px 20px;
  }

  .map-controls {
    gap: 12px;
  }

  .control-btn {
    min-width: 48px;
    min-height: 48px;
  }

  .control-btn svg {
    width: 22px;
    height: 22px;
  }
}

/* Grand écran (≥ 1280px) */
@media (min-width: 1280px) {
  .map-container {
    max-width: 1000px;
    padding: 32px;
  }

  .map-title {
    font-size: 32px;
  }
}

/* Touch devices */
@media (hover: none) and (pointer: coarse) {
  .control-btn {
    min-width: 48px;
    min-height: 48px;
  }

  .control-btn:hover {
    transform: none;
  }

  .control-btn:active {
    background-color: #f3f4f6;
  }
}

/* Landscape mobile */
@media (max-height: 600px) and (orientation: landscape) {
  .map-wrapper {
    padding: 12px;
  }

  .map-title {
    font-size: 18px;
    margin-bottom: 12px;
  }

  .address-info {
    margin-bottom: 12px;
  }

  .map {
    margin-bottom: 12px;
  }
}

/* Mode sombre (optionnel) */
@media (prefers-color-scheme: dark) {
  .map-wrapper {
    background-color: #1f2937;
  }

  .map-container {
    background-color: #374151;
    border-color: #4b5563;
  }

  .map-title {
    color: #f9fafb;
  }

  .address-info {
    background: linear-gradient(135deg, #4b5563 0%, #374151 100%);
  }

  .address-text {
    color: #e5e7eb;
  }

  .control-btn {
    background-color: #4b5563;
    border-color: #6b7280;
    color: #f9fafb;
  }

  .control-btn:hover {
    background-color: #6b7280;
  }
}
</style>