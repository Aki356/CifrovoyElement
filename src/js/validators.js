// src/js/validators.js

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

// --- Индивидуальные валидаторы (как было) ---
export function validateName(value) {
  const v = String(value || '').trim();
  if (v.length < 2) return 'Please enter at least 2 characters';
  return '';
}

export function validateEmail(value) {
  const v = String(value || '').trim();
  if (!EMAIL_RE.test(v)) return 'Please enter a valid email';
  return '';
}

export function validateMessage(value) {
  const v = String(value || '').trim();
  if (v.length < 10) return 'Message must be 10+ characters';
  return '';
}

// --- Универсальные правила для атрибутной валидации (п.8) ---
const rules = {
  required: (v) => (String(v ?? '').trim().length ? '' : 'This field is required'),
  email:    (v) => (EMAIL_RE.test(String(v ?? '').trim()) ? '' : 'Invalid email'),
  tel:      (v) => (/^\+?\d[\d ()-]{6,}$/.test(String(v ?? '').trim()) ? '' : 'Invalid phone'),
  min:      (v, n) => (String(v ?? '').trim().length >= +n ? '' : `Min ${n} characters`),
  max:      (v, n) => (String(v ?? '').trim().length <= +n ? '' : `Max ${n} characters`),
  pattern:  (v, p) => (new RegExp(p).test(String(v ?? '')) ? '' : 'Invalid value'),
};

function applyRule(value, token) {
  const [name, arg] = token.split(':');
  const fn = rules[name];
  return fn ? fn(value, arg) : '';
}

/**
 * Проверяет все элементы с data-validate внутри формы.
 * Показывает ошибки в [data-error-for="<name>"] (если есть) и ставит aria-invalid.
 * Возвращает { ok: boolean, errors: Record<string,string> }.
 */
export function validateForm(form) {
  const fields = [...form.querySelectorAll('[data-validate]')];
  const errors = {};

  for (const el of fields) {
    const name = el.name || el.id;
    const tokens = (el.dataset.validate || '').split('|').filter(Boolean);

    let msg = '';
    for (const t of tokens) {
      msg = applyRule(el.value, t);
      if (msg) break;
    }

    const box = form.querySelector(`[data-error-for="${name}"]`);
    if (msg) {
      errors[name] = msg;
      if (box) { box.textContent = msg; box.hidden = false; }
      el.setAttribute('aria-invalid', 'true');
    } else {
      if (box) { box.textContent = ''; box.hidden = true; }
      el.removeAttribute('aria-invalid');
    }
  }

  if (Object.keys(errors).length) {
    const first = Object.keys(errors)[0];
    form.querySelector(`[name="${first}"], #${first}`)?.focus();
  }

  return { ok: !Object.keys(errors).length, errors };
}
