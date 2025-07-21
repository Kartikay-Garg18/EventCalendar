import { isSameDay, parseISO } from 'date-fns';

export function hasConflict(newEvent, events) {
  const sameDayEvents = events.filter(
    ev => isSameDay(parseISO(ev.start), parseISO(newEvent.start)) && ev.id !== newEvent.id
  );
  return sameDayEvents.some(ev => isTimeOverlap(ev, newEvent));
}

function isTimeOverlap(ev1, ev2) {
  const t1 = parseISO(ev1.start).toTimeString().slice(0,5);
  const t2 = parseISO(ev2.start).toTimeString().slice(0,5);
  return t1 === t2;
}
