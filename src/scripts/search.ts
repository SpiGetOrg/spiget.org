// Shared logic for /search/ and /search/version/.
// Both pages accept the old URL format `<mode>:<query>/<limit>`, either as `?q=` or as a path suffix
// (e.g. /search/authors:inventivetalent/20). Old path-style links reach the page through the 404 page.

import { ApiError } from './api';
import { hideAlert, showAlert } from './alert';

export interface ParsedQuery {
  mode: string;
  query: string;
  limit: number;
}

/** Same rules as the old search/index.php */
export function parseQuery(raw: string, modes: string[], defaultMode: string): ParsedQuery {
  const result: ParsedQuery = { mode: defaultMode, query: raw, limit: 10 };
  const lower = raw.toLowerCase();
  for (const mode of modes) {
    if (lower.startsWith(mode + ':')) {
      result.mode = mode;
      result.query = raw.substring(mode.length + 1);
      break;
    }
  }
  const slash = result.query.indexOf('/');
  if (slash !== -1) {
    result.limit = parseInt(result.query.substring(slash + 1), 10) || 10;
    result.query = result.query.substring(0, slash);
  }
  return result;
}

/** Read the search string from `?q=` or from the path after `basePath` */
export function readRawQuery(basePath: string): string {
  const fromParam = new URLSearchParams(window.location.search).get('q');
  if (fromParam) return fromParam;
  let path = window.location.pathname;
  try {
    path = decodeURIComponent(path);
  } catch {
    // Malformed escape sequence, use the path as is
  }
  if (path.startsWith(basePath)) {
    return path.substring(basePath.length).replace(/\/$/, '');
  }
  return '';
}

interface SearchPageOptions<T> {
  basePath: string;
  modes: string[];
  defaultMode: string;
  /** Run the API request and return the raw response */
  fetchResults: (mode: string, query: string, limit: number) => Promise<T>;
  /** Render the parsed result list, return the number of results */
  render: (container: HTMLElement, response: T, mode: string) => number;
  /** Placeholder text for the query field in the given mode */
  placeholder?: (mode: string) => string;
}

export function setupSearchPage<T>(options: SearchPageOptions<T>) {
  const form = document.getElementById('search-form') as HTMLFormElement;
  const modeSelect = document.getElementById('search-mode') as HTMLSelectElement;
  const queryInput = document.getElementById('search-query') as HTMLInputElement;
  const limitInput = document.getElementById('search-limit') as HTMLInputElement;
  const spinner = document.getElementById('search-spinner') as HTMLElement;
  const count = document.getElementById('search-count') as HTMLElement;
  const results = document.getElementById('search-results') as HTMLElement;
  const raw = document.getElementById('search-raw') as HTMLElement;

  const initial = parseQuery(readRawQuery(options.basePath), options.modes, options.defaultMode);
  modeSelect.value = initial.mode;
  queryInput.value = initial.query;
  limitInput.value = String(initial.limit);

  const updatePlaceholder = () => {
    if (options.placeholder) queryInput.placeholder = options.placeholder(modeSelect.value);
  };
  updatePlaceholder();

  let requestId = 0;

  async function search() {
    const query = queryInput.value.trim();
    if (query.length <= 1) return;
    let limit = parseInt(limitInput.value, 10);
    if (!(limit > 0)) {
      limit = 10;
      limitInput.value = '10';
    }
    const mode = modeSelect.value;

    const url = new URL(options.basePath, window.location.origin);
    url.searchParams.set('q', `${mode}:${query}/${limit}`);
    window.history.replaceState(null, '', url);

    const current = ++requestId;
    spinner.hidden = false;
    results.replaceChildren();
    raw.textContent = '';
    count.textContent = '0';

    try {
      const response = await options.fetchResults(mode, query, limit);
      if (current !== requestId) return;
      hideAlert();
      count.textContent = String(options.render(results, response, mode));
      raw.textContent = JSON.stringify(response, null, 4);
    } catch (error) {
      if (current !== requestId) return;
      if (error instanceof ApiError && error.status === 404) {
        showAlert('warning', 'Nothing found');
      } else {
        showAlert('danger', 'Search failed');
      }
    } finally {
      if (current === requestId) spinner.hidden = true;
    }
  }

  let timer: ReturnType<typeof setTimeout> | undefined;
  const delayedSearch = () => {
    clearTimeout(timer);
    timer = setTimeout(search, 250);
  };

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    clearTimeout(timer);
    search();
  });
  queryInput.addEventListener('input', delayedSearch);
  modeSelect.addEventListener('change', () => {
    updatePlaceholder();
    search();
  });

  if (initial.query) search();
}
