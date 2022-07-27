export function optional(name: string, value: string | number | null): string {
  if (value === null) return '';
  return `${name}=${value}`;
}
