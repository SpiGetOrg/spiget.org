// Small helpers shared by the page scripts.

export const API_BASE = 'https://api.spiget.org/v2';

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
  }
}

/**
 * GET a JSON endpoint of the Spiget API.
 * `ua` is sent as `spiget___ua` so the API's request stats keep working like before.
 * Requests time out after `timeoutMs` so a slow endpoint can't hang the page.
 */
export async function apiGet<T = unknown>(
  path: string,
  params: Record<string, string | number> = {},
  { ua = 'SpigetWeb', timeoutMs = 10_000 }: { ua?: string; timeoutMs?: number } = {},
): Promise<T> {
  const url = new URL(API_BASE + path);
  url.searchParams.set('spiget___ua', ua);
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, String(value));
  }
  const response = await fetch(url, { signal: AbortSignal.timeout(timeoutMs) });
  if (!response.ok) {
    throw new ApiError(response.status, `Request failed with status ${response.status}`);
  }
  return response.json() as Promise<T>;
}

/** Read the `error` field of a JSON error body, if there is one. */
export async function readError(response: Response): Promise<string> {
  try {
    const body = await response.json();
    if (body && typeof body.error === 'string') return body.error;
  } catch {
    // Body was not JSON
  }
  return `Request failed with status ${response.status}`;
}

const numberFormat = new Intl.NumberFormat('en-US');
export const formatNumber = (value: number) => numberFormat.format(value);

const relativeFormat = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
const UNITS: [Intl.RelativeTimeFormatUnit, number][] = [
  ['year', 365 * 24 * 3600],
  ['month', 30 * 24 * 3600],
  ['week', 7 * 24 * 3600],
  ['day', 24 * 3600],
  ['hour', 3600],
  ['minute', 60],
  ['second', 1],
];

/** "3 hours ago", "in 5 minutes" */
export function fromNow(timestamp: number): string {
  const seconds = (timestamp - Date.now()) / 1000;
  for (const [unit, size] of UNITS) {
    if (Math.abs(seconds) >= size || unit === 'second') {
      return relativeFormat.format(Math.round(seconds / size), unit);
    }
  }
  return '';
}

/** Metrics timestamps are milliseconds; older API responses used seconds */
export function metricMillis(timestamp: number): number {
  return timestamp > 1e12 ? timestamp : timestamp * 1000;
}

/** Drop today's entry (UTC days): it only counts requests so far and would drag averages and charts down */
export function completeDays<T extends { timestamp: number }>(days: T[]): T[] {
  const now = new Date();
  const startOfToday = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  return days.filter((day) => metricMillis(day.timestamp) < startOfToday);
}

export const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Build an element from a tag, attributes and children. Text children are never parsed as HTML. */
export function el<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  attrs: Record<string, string> = {},
  ...children: (Node | string | null | undefined)[]
): HTMLElementTagNameMap[K] {
  const element = document.createElement(tag);
  for (const [key, value] of Object.entries(attrs)) {
    element.setAttribute(key, value);
  }
  for (const child of children) {
    if (child != null) element.append(child);
  }
  return element;
}
