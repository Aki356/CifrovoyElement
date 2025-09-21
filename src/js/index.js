import '../styles/main.scss';
import { qs, qsa } from './dom.js';
import { Modal } from './modal.js';
import { ContactForm } from './form.js';

// Модалка «Let’s Talk»
const contactModal = new Modal('#contact-modal');

// Именованный обработчик открытия
function onOpenContactModal() {
  contactModal.open();
}

qsa('[data-modal="contact"]').forEach((btn) => {
  btn.addEventListener('click', onOpenContactModal);
});

// Закрытие модалки после успешной отправки
const contactForm = new ContactForm('#contact-form');
contactForm.init();

qs('#contact-form')?.addEventListener('form:sent', () => {
  contactModal.close();
});
