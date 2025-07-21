const STORAGE_KEY = "events_v1";
export function loadEvents() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? []; }
  catch { return []; }
}
export function saveEvents(events) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
}
