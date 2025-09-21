const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

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
