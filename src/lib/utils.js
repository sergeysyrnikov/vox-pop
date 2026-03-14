import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatDateTime(isoString) {
  if (!isoString) return '';
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(new Date(isoString));
}

/**
 * Converts a Date (or value accepted by Date) to ISO 8601 string for DB/API.
 * @param {Date|string|number} value - Date instance, ISO string, or timestamp
 * @returns {string} ISO string or ''
 */
export function toISODateTime(value) {
  if (value == null) return '';
  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? '' : date.toISOString();
}
