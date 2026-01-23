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
            Description
          </label>
          <textarea 
            v-model="description" 
            rows="3" 
            class="form-textarea"
            :class="{ filled: description }"
            placeholder="Décrivez votre demande en détail..."
            maxlength="500"
          ></textarea>
          <div class="char-count">{{ description.length }} / 500</div>
        </div>

        <div class="form-group">
          <label class="form-label">
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
      
      // Réinitialiser le formulaire après 3 secondes
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
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  /* Mobile first: padding pour éviter le header */
  padding: 100px 16px 24px 16px;
  min-height: 100vh;
}

.form-container {
  width: 100%;
  /* Mobile: quasi pleine largeur */
  max-width: 100%;
  background: white;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  overflow: hidden;
  animation: slideUp 0.6s ease-out;
  position: relative;
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
  /* Mobile: padding réduit */
  padding: 24px 20px;
  text-align: center;
  color: #262626;
}

.form-title {
  margin: 0 0 8px 0;
  /* Mobile: taille réduite */
  font-size: 22px;
  font-weight: 700;
  letter-spacing: -0.5px;
}

.form-subtitle {
  margin: 0;
  /* Mobile: taille réduite */
  font-size: 14px;
  opacity: 0.9;
}

.contact-form {
  /* Mobile: padding réduit */
  padding: 28px 20px;
}

.form-group {
  /* Mobile: espacement réduit */
  margin-bottom: 20px;
  position: relative;
}

.form-label {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  font-weight: 600;
  color: #2d3748;
  /* Mobile: taille réduite */
  font-size: 14px;
}

.input-wrapper {
  position: relative;
}

.form-select,
.form-input,
.form-textarea {
  width: 100%;
  /* Mobile: padding réduit */
  padding: 12px 16px;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  /* Mobile: taille de police réduite */
  font-size: 14px;
  font-family: inherit;
  transition: all 0.3s ease;
  background-color: #f7fafc;
  outline: none;
}

.form-select {
  padding-right: 42px;
  appearance: none;
  cursor: pointer;
}

.select-arrow {
  position: absolute;
  right: 16px;
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
  /* Mobile: padding réduit */
  padding: 14px 20px;
  background: #0071E3;
  color: white;
  border: none;
  border-radius: 12px;
  /* Mobile: taille réduite */
  font-size: 15px;
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
  /* Mobile: padding réduit */
  padding: 14px 18px;
  background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
  color: white;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 500;
  /* Mobile: taille réduite */
  font-size: 14px;
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

/* ========== TABLETTE (≥ 640px) ========== */
@media (min-width: 640px) {
  .form-wrapper {
    padding: 100px 24px 32px 24px;
  }

  .form-container {
    max-width: 500px;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
  }

  .form-header {
    padding: 28px 24px;
  }

  .form-title {
    font-size: 26px;
  }

  .form-subtitle {
    font-size: 15px;
  }

  .contact-form {
    padding: 32px 24px;
  }

  .form-group {
    margin-bottom: 22px;
  }

  .form-label {
    font-size: 15px;
  }

  .form-select,
  .form-input,
  .form-textarea {
    padding: 13px 17px;
    font-size: 15px;
  }

  .submit-btn {
    padding: 15px 22px;
    font-size: 16px;
  }

  .success-message {
    padding: 15px 19px;
    font-size: 15px;
  }
}

/* ========== DESKTOP (≥ 768px) ========== */
@media (min-width: 768px) {
  .form-wrapper {
    padding: 80px 32px 40px 32px;
  }

  .form-container {
    max-width: 550px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  }

  .form-header {
    padding: 32px 28px;
  }

  .form-title {
    font-size: 28px;
    margin-bottom: 10px;
  }

  .form-subtitle {
    font-size: 16px;
  }

  .contact-form {
    padding: 35px 28px;
  }

  .form-group {
    margin-bottom: 24px;
  }

  .form-select,
  .form-input,
  .form-textarea {
    padding: 14px 18px;
    font-size: 15px;
  }

  .submit-btn {
    padding: 16px 24px;
  }

  .success-message {
    padding: 16px 20px;
  }
}

/* ========== GRAND ÉCRAN (≥ 1024px) ========== */
@media (min-width: 1024px) {
  .form-wrapper {
    padding: 60px 40px;
  }

  .form-container {
    max-width: 600px;
  }

  .form-header {
    padding: 36px 32px;
  }

  .form-title {
    font-size: 32px;
  }

  .contact-form {
    padding: 40px 32px;
  }

  .form-group {
    margin-bottom: 26px;
  }
}

/* ========== TRÈS PETIT MOBILE (≤ 375px) ========== */
@media (max-width: 375px) {
  .form-wrapper {
    padding: 90px 12px 20px 12px;
  }

  .form-title {
    font-size: 20px;
  }

  .form-subtitle {
    font-size: 13px;
  }

  .contact-form {
    padding: 24px 16px;
  }

  .form-select,
  .form-input,
  .form-textarea {
    padding: 10px 14px;
    font-size: 14px;
  }

  .submit-btn {
    padding: 12px 18px;
    font-size: 14px;
  }

  .btn-text {
    font-size: 14px;
  }

  .success-message {
    font-size: 13px;
    padding: 12px 16px;
  }
}

/* ========== TOUCH DEVICES - Amélioration UX ========== */
@media (hover: none) and (pointer: coarse) {
  .form-select,
  .form-input,
  .form-textarea {
    /* Plus grand pour faciliter le tap sur mobile */
    min-height: 48px;
  }

  .submit-btn {
    /* Bouton plus grand pour le touch */
    min-height: 52px;
  }

  /* Désactiver les effets hover sur touch */
  .submit-btn:hover:not(:disabled) {
    transform: none;
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
  }
}

/* ========== LANDSCAPE MOBILE ========== */
@media (max-height: 500px) and (orientation: landscape) {
  .form-wrapper {
    padding: 20px 16px;
    min-height: auto;
  }

  .form-header {
    padding: 16px 20px;
  }

  .form-title {
    font-size: 20px;
    margin-bottom: 4px;
  }

  .form-subtitle {
    font-size: 13px;
  }

  .contact-form {
    padding: 20px;
  }

  .form-group {
    margin-bottom: 16px;
  }

  .form-textarea {
    min-height: 80px;
  }
}
</style>