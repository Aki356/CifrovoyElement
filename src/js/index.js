import '../styles/main.scss';

// Автоимпорт всех SCSS-блоков
import.meta.glob('../styles/blocks/**/*.scss', { eager: true });

import { qsa } from './dom.js';
import { Modal } from './modal.js';
import { ContactForm } from './form.js';

// --- Модалка «Let’s Talk»
const contactModal = new Modal('#contact-modal');
qsa('[data-modal="contact"]').forEach((btn) => {
  btn.addEventListener('click', () => contactModal.open());
});

// --- Toast
const toastEl = (() => {
  let el = document.getElementById('toast');
  if (!el) {
    el = document.createElement('div');
    el.id = 'toast';
    el.className = 'toast';
    el.setAttribute('role', 'status');
    el.setAttribute('aria-live', 'polite');
    document.body.appendChild(el);
  }
  return el;
})();

let toastTimer;
function showToast(message, { timeout = 4000, type = 'success' } = {}) {
  toastEl.textContent = message;
  toastEl.classList.toggle('toast--error', type === 'error');
  toastEl.classList.add('is-shown');

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toastEl.classList.remove('is-shown');
  }, timeout);

  toastEl.onclick = () => {
    toastEl.classList.remove('is-shown');
    clearTimeout(toastTimer);
  };
}

// --- Инициализация формы
const contactForm = new ContactForm('#contact-form', {
  onSent: () => {
    contactModal.close();
    showToast('The message has been sent! We will contact you shortly.');
  },
  onError: () => {
    showToast('Failed to submit the form. Please try again.', { type: 'error' });
  }
});
contactForm.init();
