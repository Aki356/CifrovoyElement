import { qs } from './dom.js';
import { validateForm } from './validators.js';

const isDev = import.meta.env.DEV;

export class ContactForm {
  constructor(selector, options = {}) {
    this.form = qs(selector);
    this.options = {
      endpoint: isDev ? '/api/post' : 'https://httpbingo.org/post',
      onSent: null,
      onError: null,
      ...options,
    };
    this.isSubmitting = false;
    this.ctrl = null;

    this.onSubmit = this.onSubmit.bind(this);
  }

  init() { if (this.form) this.form.addEventListener('submit', this.onSubmit); }
  destroy() { if (this.form) this.form.removeEventListener('submit', this.onSubmit); }

  get btn() { return this.form?.querySelector('[type="submit"], .form__submit'); }

  setSubmitting(state) {
    this.isSubmitting = state;
    if (this.btn) {
      this.btn.disabled = state;
      this.btn.setAttribute('aria-disabled', String(state));
      this.btn.classList.toggle('is-loading', state);
    }
    this.form?.setAttribute('aria-busy', String(state));
  }

  serialize() {
    const fd = new FormData(this.form);
    const obj = {};
    for (const [k, v] of fd.entries()) {
      if (k in obj) obj[k] = Array.isArray(obj[k]) ? [...obj[k], v] : [obj[k], v];
      else obj[k] = v;
    }
    return obj;
  }

  async onSubmit(e) {
    e.preventDefault();
    if (this.isSubmitting || !this.form) return;

    const { ok } = validateForm(this.form);
    if (!ok) return;

    const payload = this.serialize();

    try {
      this.setSubmitting(true);

      if (this.ctrl) this.ctrl.abort();
      this.ctrl = new AbortController();

      const res = await fetch(this.options.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: this.ctrl.signal,
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      this.form.reset();

      // событие + колбэк
      this.form.dispatchEvent(new CustomEvent('form:sent', {
        bubbles: true,
        detail: { payload, res }
      }));
      if (typeof this.options.onSent === 'function') {
        this.options.onSent(payload, res);
      }

    } catch (err) {
      this.form.dispatchEvent(new CustomEvent('form:error', {
        bubbles: true,
        detail: err
      }));
      if (err.name !== 'AbortError' && typeof this.options.onError === 'function') {
        this.options.onError(err);
      }
    } finally {
      setTimeout(() => this.setSubmitting(false), 250);
    }
  }
}
