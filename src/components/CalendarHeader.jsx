import { format } from "date-fns";
export default function CalendarHeader({ currentMonth, onPrev, onNext }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-gray-200">
      <div className="flex items-center justify-between">
        <button 
          className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-xl font-bold cursor-pointer hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5" 
          onClick={onPrev}
        >
          ←
        </button>
        
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-1">
            {format(currentMonth, "MMMM yyyy")}
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mx-auto"></div>
        </div>
        
        <button 
          className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-xl font-bold cursor-pointer hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5" 
          onClick={onNext}
        >
          →
        </button>
      </div>
    </div>
  );
}
