import { qs } from './dom.js';
import { validateEmail, validateMessage, validateName } from './validators.js';
import { showToast } from './dom.js';

export class ContactForm {
  constructor(selector, options = {}) {
    this.form = qs(selector);
    this.endpoint = options.endpoint || 'https://httpbin.org/post';
    this.onSubmit = this.onSubmit.bind(this);
  }

  init() {
    if (!this.form) return;
    this.form.addEventListener('submit', this.onSubmit);
  }

  destroy() {
    if (!this.form) return;
    this.form.removeEventListener('submit', this.onSubmit);
  }

  getValues() {
    const data = new FormData(this.form);
    return {
      fullName: data.get('fullName') || '',
      email: data.get('email') || '',
      message: data.get('message') || ''
    };
  }

  setError(name, text) {
    const el = qs(`[data-error-for="${name}"]`, this.form);
    if (!el) return;
    el.textContent = text;
    el.style.display = "block";
    if(text == '') el.style.display = "none";
  }

  clearErrors() {
    ['fullName', 'email', 'message'].forEach((f) => this.setError(f, ''));
  }

  validate(values) {
    this.clearErrors();
    const errors = {
      fullName: validateName(values.fullName),
      email: validateEmail(values.email),
      message: validateMessage(values.message)
    };

    Object.entries(errors).forEach(([k, v]) => v && this.setError(k, v));

    const isValid = !errors.fullName && !errors.email && !errors.message;
    return { isValid, errors };
  }

  async onSubmit(e) {
    e.preventDefault();
    const values = this.getValues();
    const { isValid } = this.validate(values);
    if (!isValid) return;

    const payload = {
      name: values.fullName,
      email: values.email,
      message: values.message
    };

    try {
      await fetch(this.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      this.form.reset();
      showToast('Your message successfully sent');
      const evt = new CustomEvent('form:sent');
      this.form.dispatchEvent(evt);
    } catch {
      showToast('Something went wrong. Try again');
    }
  }
}
