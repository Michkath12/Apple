<template>
  <div class="form-wrapper">
    <div class="form-container">
      <div class="form-header">
        <h2 class="form-title">Contactez-nous</h2>
        <p class="form-subtitle">Nous sommes là pour vous aider</p>
      </div>

      <form @submit.prevent="submitForm" class="contact-form">
        <div class="form-group">
          <label class="form-label">
            <span class="label-icon">📋</span>
            Objet
          </label>
          <div class="input-wrapper">
            <select v-model="selectedObject" class="form-select" :class="{ filled: selectedObject }">
              <option disabled value="">Choisissez un objet</option>
              <option value="info">Information</option>
              <option value="devis">Devis</option>
              <option value="support">Support</option>
            </select>
            <div class="select-arrow">
              <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                <path d="M1 1L6 6L11 1" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </div>
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">
            <span class="label-icon">✍️</span>
            Description
          </label>
          <textarea 
            v-model="description" 
            rows="4" 
            class="form-textarea"
            :class="{ filled: description }"
            placeholder="Décrivez votre demande en détail..."
          ></textarea>
          <div class="char-count">{{ description.length }} / 500</div>
        </div>

        <div class="form-group">
          <label class="form-label">
            <span class="label-icon">📞</span>
            Téléphone
          </label>
          <input 
            type="tel" 
            v-model="phone" 
            class="form-input"
            :class="{ filled: phone }"
            placeholder="+33 6 12 34 56 78"
          >
        </div>

        <button type="submit" class="submit-btn" :disabled="!isFormValid">
          <span class="btn-text">Envoyer le message</span>
          <span class="btn-icon">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M3 10H17M17 10L11 4M17 10L11 16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
        </button>

        <div v-if="showSuccess" class="success-message">
          <span class="success-icon">✓</span>
          Votre message a été envoyé avec succès !
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedObject: '',
      description: '',
      phone: '',
      showSuccess: false
    }
  },
  computed: {
    isFormValid() {
      return this.selectedObject && this.description.trim() && this.phone.trim()
    }
  },
  methods: {
    submitForm() {
      if (!this.isFormValid) return
      
      const formData = {
        object: this.selectedObject,
        description: this.description,
        phone: this.phone
      }
      console.log('Formulaire soumis :', formData)
      
      // Afficher le message de succès
      this.showSuccess = true
      
      // Réinitialiser le formulaire après 2 secondes
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
.form-wrapper {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 120px 20px 40px 20px; /* Espace pour la navbar */
  background: white; /* Fond blanc */
}

.form-container {
  width: 100%;
  max-width: 400px; /* Réduit de 600px à 500px */
  background: white;
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1); /* Ombre plus douce */
  border: 1px solid #e2e8f0; /* Bordure subtile */
  overflow: hidden;
  animation: slideUp 0.6s ease-out;
  position: relative;
  z-index: 1; /* Sous la navbar */
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.form-header {
  background: #0071E3;
  padding: 35px 25px; /* Réduit légèrement */
  text-align: center;
  color: white;
}

.form-title {
  margin: 0 0 10px 0;
  font-size: 28px; /* Réduit de 32px */
  font-weight: 700;
  letter-spacing: -0.5px;
}

.form-subtitle {
  margin: 0;
  font-size: 15px; /* Réduit de 16px */
  opacity: 0.9;
}

.contact-form {
  padding: 35px 25px; /* Réduit de 40px 30px */
}

.form-group {
  margin-bottom: 30px;
  position: relative;
}

.form-label {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
  font-weight: 600;
  color: #2d3748;
  font-size: 15px;
}

.label-icon {
  font-size: 18px;
}

.input-wrapper {
  position: relative;
}

.form-select,
.form-input,
.form-textarea {
  width: 100%;
  padding: 14px 18px;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 15px;
  font-family: inherit;
  transition: all 0.3s ease;
  background-color: #f7fafc;
  outline: none;
}

.form-select {
  padding-right: 45px;
  appearance: none;
  cursor: pointer;
}

.select-arrow {
  position: absolute;
  right: 18px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: #718096;
  transition: transform 0.3s ease;
}

.form-select:focus ~ .select-arrow {
  transform: translateY(-50%) rotate(180deg);
}

.form-select:focus,
.form-input:focus,
.form-textarea:focus {
  border-color: #667eea;
  background-color: white;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.form-select.filled,
.form-input.filled,
.form-textarea.filled {
  border-color: #48bb78;
  background-color: #f0fff4;
}

.form-textarea {
  resize: vertical;
  min-height: 100px;
}

.char-count {
  text-align: right;
  font-size: 12px;
  color: #a0aec0;
  margin-top: 6px;
}

.submit-btn {
  width: 100%;
  padding: 16px 24px;
  background: #0071E3;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 25px rgba(102, 126, 234, 0.5);
}

.submit-btn:active:not(:disabled) {
  transform: translateY(0);
}

.submit-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  box-shadow: none;
}

.btn-icon {
  display: flex;
  align-items: center;
  transition: transform 0.3s ease;
}

.submit-btn:hover:not(:disabled) .btn-icon {
  transform: translateX(5px);
}

.success-message {
  margin-top: 20px;
  padding: 16px 20px;
  background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
  color: white;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 500;
  animation: slideIn 0.4s ease-out;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.success-icon {
  width: 24px;
  height: 24px;
  background: white;
  color: #48bb78;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  flex-shrink: 0;
}

/* Responsive */
@media (max-width: 768px) {
  .form-wrapper {
    padding: 100px 15px 20px 15px; /* Espace pour navbar mobile */
  }

  .form-container {
    border-radius: 15px;
    max-width: 450px; /* Légèrement plus petit sur mobile */
  }

  .form-header {
    padding: 28px 20px;
  }

  .form-title {
    font-size: 24px;
  }

  .contact-form {
    padding: 28px 20px;
  }

  .form-group {
    margin-bottom: 22px;
  }
}

/* Animation pour les champs remplis */
@keyframes pulse {
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(72, 187, 120, 0.4);
  }
  50% {
    box-shadow: 0 0 0 6px rgba(72, 187, 120, 0);
  }
}

.form-select.filled,
.form-input.filled,
.form-textarea.filled {
  animation: pulse 1.5s ease-out;
}
</style>