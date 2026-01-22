<template>
  <div class="map-container">
    <h2 class="map-title">Apple France - Siège Social</h2>
    <div class="address-info">
      <p><strong>Adresse :</strong> 7 Place d'Iéna, 75016 Paris, France</p>
    </div>
    
    <div ref="mapContainer" class="map" :style="{ height: mapHeight + 'px' }"></div>
    
    <div class="map-controls">
      <button @click="zoomIn" class="control-btn">+</button>
      <button @click="zoomOut" class="control-btn">-</button>
      <button @click="resetView" class="control-btn">↺</button>
      <button @click="switchToSatellite" class="control-btn" :class="{ active: mapStyle === 'satellite' }">
        🛰️
      </button>
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
      appleLocation: [48.8639, 2.2933]
    }
  },
  mounted() {
    this.loadLeaflet()
  },
  methods: {
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
        this.map = L.map(this.$refs.mapContainer).setView(this.appleLocation, this.zoom)
        
        // Ajouter les tuiles OpenStreetMap
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          maxZoom: 19
        }).addTo(this.map)
        
        // Ajouter un marqueur personnalisé
        const customIcon = L.divIcon({
          html: `
            <div style="
              background: #FF3B30;
              width: 40px;
              height: 40px;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              color: white;
              font-size: 18px;
              border: 3px solid white;
              box-shadow: 0 2px 8px rgba(0,0,0,0.3);
            ">
              🍎
            </div>
          `,
          className: 'custom-icon',
          iconSize: [40, 40],
          iconAnchor: [20, 40]
        })
        
        // Ajouter le marqueur
        const marker = L.marker(this.appleLocation, { icon: customIcon })
          .addTo(this.map)
          .bindPopup(`
            <div style="padding: 10px;">
              <h3 style="margin: 0 0 10px 0; color: #333;">🍎 Apple France</h3>
              <p style="margin: 5px 0;"><strong>Siège Social</strong></p>
              <p style="margin: 5px 0;">7 Place d'Iéna</p>
              <p style="margin: 5px 0;">75016 Paris, France</p>
              <p style="margin: 5px 0; color: #666; font-size: 12px;">
                <em>Coordonnées : ${this.appleLocation[0].toFixed(4)}, ${this.appleLocation[1].toFixed(4)}</em>
              </p>
            </div>
          `)
        
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
        this.map.setView(this.appleLocation, 16)
      }
    },
    
    switchToStreet() {
      if (this.map) {
        this.mapStyle = 'street'
        this.map.eachLayer((layer) => {
          if (layer._url && layer._url.includes('openstreetmap')) {
            layer.setUrl('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')
          }
        })
      }
    },
    
    switchToSatellite() {
      if (this.map) {
        this.mapStyle = 'satellite'
        this.map.eachLayer((layer) => {
          if (layer._url && layer._url.includes('openstreetmap')) {
            layer.setUrl('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}')
          }
        })
      }
    }
  },
  beforeUnmount() {
    if (this.map) {
      this.map.remove()
    }
  }
}
</script>

<style scoped>
.map-container {
  max-width: 900px;
  border: 1px solid #e0e0e0;
  border-radius: px;
  background-color: #f9f9f9;
  position: relative; /* Important pour le z-index */
  z-index: 1; /* S'assure que la carte reste sous la navbar */
}

.map-title {
  margin-top: 0;
  margin-bottom: 15px;
  color: #333;
  font-size: 24px;
  font-weight: 600;
}

.address-info {
  margin-bottom: 20px;
  padding: 15px;
  background-color: white;
  border-radius: 6px;
  border-left: 4px solid #FF3B30;
}

.address-info p {
  margin: 0;
  color: #555;
}

.map {
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  margin-bottom: 20px;
  background-color: #f0f0f0;
  position: relative; /* Important */
  z-index: 1; /* S'assure que la carte reste sous la navbar */
}

.map-controls {
  display: flex;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
}

.control-btn {
  padding: 10px 16px;
  border: 2px solid #ddd;
  border-radius: 6px;
  background-color: white;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  min-width: 45px;
}

.control-btn:hover {
  background-color: #f0f0f0;
  border-color: #FF3B30;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.15);
}

.control-btn:active {
  transform: translateY(0);
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.control-btn.active {
  background-color: #FF3B30;
  color: white;
  border-color: #FF3B30;
}

/* Assurez-vous que Leaflet s'affiche correctement */
:deep(.leaflet-container) {
  font-family: inherit;
  z-index: 1 !important; /* Force le z-index de Leaflet */
}

:deep(.leaflet-popup-content) {
  font-family: inherit;
}

:deep(.leaflet-popup) {
  z-index: 1000; /* Popup au-dessus de la carte mais sous la navbar */
}

:deep(.leaflet-control-zoom) {
  display: none; /* Cache les contrôles par défaut de Leaflet */
}


</style>