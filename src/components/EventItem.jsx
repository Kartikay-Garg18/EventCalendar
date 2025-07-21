export default function EventItem({ event, onClick }) {
  const colorClasses = {
    blue: "bg-blue-500 hover:bg-blue-600 border-blue-600",
    red: "bg-red-500 hover:bg-red-600 border-red-600", 
    green: "bg-green-500 hover:bg-green-600 border-green-600",
    purple: "bg-purple-500 hover:bg-purple-600 border-purple-600",
    orange: "bg-orange-500 hover:bg-orange-600 border-orange-600"
  };

  return (
    <div
      className={`event-item rounded-lg px-3 py-2 text-xs cursor-pointer text-white font-medium shadow-sm hover:shadow-md transition-all duration-200 transform hover:-translate-y-0.5 border-l-4 ${
        colorClasses[event.color] || colorClasses.blue
      }`}
      title={event.description}
      onClick={onClick}
    >
      <div className="truncate font-semibold">{event.title}</div>
      {event.start && (
        <div className="text-xs opacity-90 mt-1">
          {new Date(event.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      )}
    </div>
  );
}
