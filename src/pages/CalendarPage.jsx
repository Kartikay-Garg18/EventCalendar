import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import CalendarHeader from "../components/CalendarHeader";
import CalendarGrid from "../components/CalendarGrid";
import EventForm from "../components/EventForm";
import Modal from "../components/Modal";
import SearchBar from "../components/SearchBar";
import { addEvent, updateEvent, deleteEvent } from "../features/events/eventsSlice";
import { hasConflict } from "../features/events/conflict";
import { subMonths, addMonths } from "date-fns";

export default function CalendarPage() {
  const { list: events } = useSelector(s => s.events);
  const dispatch = useDispatch();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState();
  const [formMode, setFormMode] = useState(null); // 'add' or 'edit'
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [conflictWarning, setConflictWarning] = useState(null);
  const [filter, setFilter] = useState("");

  // Ensure events is always an array
  const safeEvents = events || [];

  // Filtering for search
  const shownEvents = filter
    ? safeEvents.filter(e =>
        e.title.toLowerCase().includes(filter.toLowerCase()) ||
        (e.description && e.description.toLowerCase().includes(filter.toLowerCase()))
      )
    : safeEvents;

  function openAddEvent(day) {
    setSelectedDay(day);
    setFormMode("add");
    setSelectedEvent(null);
    setConflictWarning(null);
  }
  function openEditEvent(event) {
    setSelectedEvent(event);
    setFormMode("edit");
    setConflictWarning(null);
  }
  function handleFormSave(ev) {
    if (hasConflict(ev, safeEvents)) { setConflictWarning("Conflict: Event exists at that time."); return; }
    formMode==="add"
      ? dispatch(addEvent({ ...ev, id: Date.now().toString() })) 
      : dispatch(updateEvent(ev));
    setFormMode(null);
    setSelectedDay(null);
    setSelectedEvent(null);
    setConflictWarning(null);
  }
  function handleDeleteEvent(event) {
    dispatch(deleteEvent(event.id));
    setFormMode(null);
    setSelectedDay(null); setSelectedEvent(null);
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Event Calendar</h1>
          <p className="text-gray-600">Manage your events and schedule</p>
        </div>
        
        <CalendarHeader
          currentMonth={currentMonth}
          onPrev={() => setCurrentMonth(subMonths(currentMonth, 1))}
          onNext={() => setCurrentMonth(addMonths(currentMonth, 1))}
        />
        
        <div className="mb-6">
          <SearchBar filter={filter} setFilter={setFilter} />
        </div>
        
        <CalendarGrid
          currentMonth={currentMonth}
          events={shownEvents}
          onDayClick={openAddEvent}
          onEventClick={openEditEvent}
        />
        
        {formMode && (
          <Modal onClose={() => { setFormMode(null); setConflictWarning(null); }}>
            <EventForm
              key={formMode + (selectedEvent?.id || "") + (selectedDay||"")}
              mode={formMode}
              event={selectedEvent}
              day={selectedDay}
              onSave={handleFormSave}
              onDelete={handleDeleteEvent}
              onCancel={()=> { setFormMode(null); setConflictWarning(null); }}
              conflictWarning={conflictWarning}
            />
          </Modal>
        )}
      </div>
    </div>
  );
}
