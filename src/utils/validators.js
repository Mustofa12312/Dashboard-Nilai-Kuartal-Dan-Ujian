export function isRequired(value) {
  return value !== undefined && value !== null && String(value).trim() !== "";
}

export function isEmail(value) {
  if (!value) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function isNumberInRange(value, min = 0, max = 100) {
  const num = Number(value);
  if (Number.isNaN(num)) return false;
  return num >= min && num <= max;
}
