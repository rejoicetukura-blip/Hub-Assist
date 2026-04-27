import { Transform } from 'class-transformer';

export function SanitizeString() {
  return Transform(({ value }) => {
    if (typeof value !== 'string') {
      return value;
    }
    // Trim whitespace
    let sanitized = value.trim();
    // Strip HTML tags
    sanitized = sanitized.replace(/<[^>]*>/g, '');
    return sanitized;
  });
}
