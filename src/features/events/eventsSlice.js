import { createSlice } from '@reduxjs/toolkit';
import { loadEvents, saveEvents } from './storage';

const initialState = {
  list: loadEvents()
};

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    addEvent(state, action) {
      state.list.push(action.payload);
      saveEvents(state.list);
    },
    updateEvent(state, action) {
      const idx = state.list.findIndex(e => e.id === action.payload.id);
      if (idx !== -1) state.list[idx] = action.payload;
      saveEvents(state.list);
    },
    deleteEvent(state, action) {
      const idx = state.list.findIndex(e => e.id === action.payload);
      if (idx !== -1) state.list.splice(idx, 1);
      saveEvents(state.list);
    },
    setAllEvents(state, action) {
      state.list = action.payload;
      saveEvents(state.list);
    },
  },
});

export const { addEvent, updateEvent, deleteEvent, setAllEvents } = eventsSlice.actions;
export default eventsSlice.reducer;
