import { addDays, addWeeks, addMonths, isSameDay, isBefore } from 'date-fns';

export function expandRecurring(event, monthStart, monthEnd) {
  if (!event.recurrence || event.recurrence.type === 'NONE') return [event];
  let occurrences = [];
  let current = new Date(event.start);
  let n = 0;
  while (isBefore(current, monthEnd) || isSameDay(current, monthEnd)) {
    if ((isBefore(monthStart, current) || isSameDay(monthStart, current)) && (isBefore(current, monthEnd) || isSameDay(current, monthEnd))) {
      occurrences.push({ ...event, start: current.toISOString(), instance: n });
    }
    switch (event.recurrence.type) {
      case 'DAILY':     current = addDays(current, event.recurrence.every || 1); break;
      case 'WEEKLY':    current = addWeeks(current, event.recurrence.every || 1); break;
      case 'MONTHLY':   current = addMonths(current, event.recurrence.every || 1); break;
      case 'CUSTOM':    current = addWeeks(current, event.recurrence.interval || 2); break;
      default: return occurrences;
    }
    n++;
  }
  return occurrences;
}
