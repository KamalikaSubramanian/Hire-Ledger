export function calculateMatch(
  matched: number,
  total: number
) {
  if (total === 0) return 0;

  return Math.round((matched / total) * 100);
}