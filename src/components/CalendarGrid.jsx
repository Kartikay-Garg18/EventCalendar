import { getMonthGrid } from "../utils/dateUtils";
import { isSameDay, format } from "date-fns";
import EventItem from "./EventItem";
import { expandRecurring } from "../features/events/recurrence";
import { useState } from "react";

export default function CalendarGrid({ currentMonth, events = [], onDayClick, onEventClick }) {
  const days = getMonthGrid(currentMonth);
  const today = new Date();
  const [showAllEvents, setShowAllEvents] = useState({});

  // Expand recurring events for this grid month - fix the duplication issue
  const allEvents = events.flatMap(ev => expandRecurring(ev, days[0], days[days.length-1]));

  function eventsOn(day) {
    return allEvents.filter(ev => isSameDay(new Date(ev.start), day));
  }

  function toggleShowAllEvents(dayKey) {
    setShowAllEvents(prev => ({
      ...prev,
      [dayKey]: !prev[dayKey]
    }));
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
      {/* Header with day names */}
      <div className="grid grid-cols-7 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
        {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map((d, index)=>(
          <div key={d} className={`text-sm font-semibold text-center py-4 text-gray-700 ${
            index === 0 || index === 6 ? 'text-blue-600' : ''
          }`}>
            {d}
          </div>
        ))}
      </div>
      
      {/* Calendar days grid */}
      <div className="grid grid-cols-7">
        {days.map((day, index) => {
          const dayEvents = eventsOn(day);
          const dayKey = format(day, 'yyyy-MM-dd');
          const showAll = showAllEvents[dayKey];
          const maxVisible = 2;
          const visibleEvents = showAll ? dayEvents : dayEvents.slice(0, maxVisible);
          const hasMore = dayEvents.length > maxVisible;

          return (
            <div
              key={day}
              className={`min-h-[120px] border-r border-b border-gray-100 p-3 cursor-pointer flex flex-col transition-all duration-200 hover:bg-blue-50 hover:shadow-inner ${
                isSameDay(today, day) 
                  ? "bg-gradient-to-br from-blue-100 to-indigo-100 border-blue-300" 
                  : "bg-white hover:bg-gray-50"
              } ${index % 7 === 6 ? 'border-r-0' : ''}`}
              onClick={e => { 
                // Only prevent if clicking on an event item or +more button
                if (e.target.closest('.event-item') || e.target.closest('.more-events-btn')) return;
                onDayClick(day); 
              }}
            >
              <div className={`text-sm font-medium mb-2 flex-shrink-0 ${
                isSameDay(today, day) 
                  ? "text-blue-700 font-bold" 
                  : "text-gray-600"
              }`}>
                {format(day, "d")}
              </div>
              
              <div className="flex-grow flex flex-col gap-1 overflow-y-auto">
                {visibleEvents.map(ev => (
                  <EventItem key={ev.id+(ev.start||"")} event={ev} onClick={()=>onEventClick(ev)} />
                ))}
                
                {hasMore && !showAll && (
                  <button
                    className="more-events-btn text-xs text-blue-600 hover:text-blue-800 font-medium py-1 px-2 rounded bg-blue-50 hover:bg-blue-100 transition-all duration-200 flex items-center justify-center gap-1"
                    onClick={() => toggleShowAllEvents(dayKey)}
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    {dayEvents.length - maxVisible} more
                  </button>
                )}
                
                {showAll && hasMore && (
                  <button
                    className="more-events-btn text-xs text-gray-600 hover:text-gray-800 font-medium py-1 px-2 rounded bg-gray-50 hover:bg-gray-100 transition-all duration-200 flex items-center justify-center gap-1"
                    onClick={() => toggleShowAllEvents(dayKey)}
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 12H6" />
                    </svg>
                    Show less
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
