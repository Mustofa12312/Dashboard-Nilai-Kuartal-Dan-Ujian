export function calculateAverage(values = []) {
  if (!Array.isArray(values) || values.length === 0) return 0;

  const nums = values.map((v) => Number(v)).filter((v) => !Number.isNaN(v));

  if (nums.length === 0) return 0;

  const total = nums.reduce((sum, v) => sum + v, 0);
  return Math.round((total / nums.length) * 100) / 100;
}
