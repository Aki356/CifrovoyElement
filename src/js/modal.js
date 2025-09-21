import { qs } from './dom.js';
import { trapFocus } from './utils/focusTrap.js';

export class Modal {
  constructor(selector) {
    this.root = qs(selector);
    this.window = qs('.modal__window', this.root);
    this.onKeydown = this.onKeydown.bind(this);
    this.onOverlay = this.onOverlay.bind(this);
    this.onCloseBtn = this.onCloseBtn.bind(this);
  }

  open() {
    if (!this.root) return;
    this.root.classList.add('is-open');
    document.body.classList.add('scroll-lock');
    this.root.setAttribute('aria-hidden', 'false');
    const firstFocusable = this.window.querySelector('button, input, textarea');
    (firstFocusable || this.window).focus();
    this.attach();
  }

  close() {
    if (!this.root) return;
    this.root.classList.remove('is-open');
    document.body.classList.remove('scroll-lock');
    this.root.setAttribute('aria-hidden', 'true');
    this.detach();
  }

  attach() {
    document.addEventListener('keydown', this.onKeydown, { passive: true });
    this.root.addEventListener('click', this.onOverlay);
    const closeBtn = qs('[data-close="button"]', this.root);
    if (closeBtn) closeBtn.addEventListener('click', this.onCloseBtn);
  }

  detach() {
    document.removeEventListener('keydown', this.onKeydown);
    this.root.removeEventListener('click', this.onOverlay);
    const closeBtn = qs('[data-close="button"]', this.root);
    if (closeBtn) closeBtn.removeEventListener('click', this.onCloseBtn);
  }

  onKeydown(e) {
    if (e.key === 'Escape') this.close();
    if (e.key === 'Tab') trapFocus(this.window, e);
  }

  onOverlay(e) {
    if (e.target?.dataset?.close === 'overlay') this.close();
  }

  onCloseBtn() {
    this.close();
  }
}
