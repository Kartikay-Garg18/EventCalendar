import { useState } from "react";
import { format, parseISO } from "date-fns";

const recurrenceOptions = [
  {label:"None", value:"NONE"},
  {label:"Daily", value:"DAILY"},
  {label:"Weekly", value:"WEEKLY"},
  {label:"Monthly", value:"MONTHLY"},
  {label:"Custom (every 2 weeks)", value:"CUSTOM"}
];
const categoryOptions = ["blue", "red", "green", "purple", "orange"];

export default function EventForm({ mode, event, day, onSave, onDelete, onCancel, conflictWarning }) {
  const [form, setForm] = useState(
    event || {
      title: "",
      start: day ? format(day, "yyyy-MM-dd'T'HH:mm") : "",
      description: "",
      color: "blue",
      recurrence: { type: "NONE", every: 1 }
    }
  );
  function updateField(e) {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  }
  function updateRecurrence(e) {
    setForm(f => ({
      ...f,
      recurrence: {
        ...f.recurrence,
        type: e.target.value,
        every: e.target.value === "CUSTOM" ? 2 : 1,
        interval: e.target.value === "CUSTOM" ? 2 : undefined
      }
    }));
  }
  return (
    <div className="bg-white w-96 rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-4">
        <h2 className="text-xl font-bold text-white flex items-center">
          <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {mode === 'add' ? "Add New Event" : "Edit Event"}
        </h2>
      </div>

      {/* Form Content */}
      <div className="p-6 space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Event Title</label>
          <input 
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200" 
            name="title" 
            value={form.title} 
            onChange={updateField}
            placeholder="Enter event title..."
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Date & Time</label>
          <input 
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200" 
            type="datetime-local" 
            name="start"
            value={form.start.slice(0,16)} 
            onChange={updateField} 
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
          <textarea 
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 resize-none" 
            name="description" 
            value={form.description} 
            onChange={updateField}
            rows={3}
            placeholder="Add event description..."
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Recurrence</label>
          <select 
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200" 
            value={form.recurrence.type} 
            onChange={updateRecurrence}
          >
            {recurrenceOptions.map(opt =>
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            )}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
          <div className="grid grid-cols-5 gap-2">
            {categoryOptions.map(color => (
              <button
                key={color}
                type="button"
                className={`h-10 rounded-lg border-2 transition-all duration-200 hover:scale-105 ${
                  form.color === color 
                    ? 'border-gray-800 ring-2 ring-gray-300' 
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                style={{
                  backgroundColor: {
                    blue: '#3B82F6',
                    red: '#EF4444', 
                    green: '#10B981',
                    purple: '#8B5CF6',
                    orange: '#F97316'
                  }[color]
                }}
                onClick={() => setForm(f => ({ ...f, color }))}
                title={color.charAt(0).toUpperCase() + color.slice(1)}
              />
            ))}
          </div>
        </div>

        {conflictWarning && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center">
            <svg className="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <span className="text-red-700 text-sm font-medium">{conflictWarning}</span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4 border-t border-gray-200">
          <button 
            className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-4 py-3 rounded-lg cursor-pointer transition-all duration-200 font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5" 
            onClick={()=>onSave(form)}
          >
            <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            {mode === 'add' ? 'Create Event' : 'Update Event'}
          </button>
          
          {mode === 'edit' && (
            <button 
              className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-3 rounded-lg cursor-pointer transition-all duration-200 font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5" 
              onClick={()=>onDelete(form)}
            >
              <svg className="w-5 h-5 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Delete
            </button>
          )}
          
          <button 
            className="px-4 py-3 border border-gray-300 text-gray-700 rounded-lg cursor-pointer hover:bg-gray-50 transition-all duration-200 font-semibold" 
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
