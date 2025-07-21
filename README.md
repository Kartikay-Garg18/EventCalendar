# 📅 Event Calendar

A beautiful, modern, and feature-rich event calendar application built with React, Redux Toolkit, and Tailwind CSS. Manage your events with style and efficiency!

![Event Calendar Preview](https://img.shields.io/badge/React-18.x-blue?style=for-the-badge&logo=react) ![Redux](https://img.shields.io/badge/Redux_Toolkit-1.9.x-purple?style=for-the-badge&logo=redux) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC?style=for-the-badge&logo=tailwind-css)

## ✨ Features

### 📋 Core Functionality
- **Add Events**: Click on any calendar day to create new events
- **Edit Events**: Click on existing events to modify them
- **Delete Events**: Remove events you no longer need
- **Event Search**: Real-time search through event titles and descriptions
- **Persistent Storage**: All events are saved to localStorage

### 🎨 Modern Design
- **Beautiful UI**: Gradient backgrounds and modern card-based design
- **Responsive Layout**: Works perfectly on desktop and mobile devices
- **Smooth Animations**: Hover effects and transitions throughout
- **Color-coded Events**: 5 different color categories (Blue, Red, Green, Purple, Orange)
- **Professional Typography**: Clean, readable fonts with proper hierarchy

### 🚀 Advanced Features
- **Recurring Events**: Support for Daily, Weekly, Monthly, and Custom recurrence patterns
- **Conflict Detection**: Warns when trying to schedule overlapping events
- **Smart Event Display**: Shows up to 2 events per day with "+X more" functionality
- **Event Expansion**: Click "+more" to view all events on busy days
- **Today Highlighting**: Current date is visually distinguished
- **Time Display**: Shows event times in a user-friendly format

### 🔧 Technical Features
- **Redux State Management**: Centralized state with Redux Toolkit
- **Date Utilities**: Powered by date-fns for robust date handling
- **Component Architecture**: Modular, reusable React components
- **Event Recurrence**: Intelligent recurring event generation
- **Local Storage Integration**: Automatic saving and loading of events

## 🛠️ Technology Stack

- **Frontend**: React 18+ with Vite for fast development
- **State Management**: Redux Toolkit for predictable state updates
- **Styling**: Tailwind CSS for rapid, responsive design
- **Date Handling**: date-fns for comprehensive date operations
- **Icons**: Custom SVG icons for a cohesive design
- **Build Tool**: Vite for lightning-fast builds and hot reload

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm/yarn
- Modern web browser with ES6+ support

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Kartikay-Garg18/EventCalendar.git
   cd event-calendar
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to see the application

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory, ready for deployment.

## 📂 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── CalendarGrid.jsx     # Main calendar grid display
│   ├── CalendarHeader.jsx   # Month navigation header
│   ├── EventForm.jsx        # Event creation/editing form
│   ├── EventItem.jsx        # Individual event display
│   ├── Modal.jsx            # Modal wrapper component
│   └── SearchBar.jsx        # Event search functionality
├── features/            # Feature-specific logic
│   └── events/
│       ├── eventsSlice.js   # Redux slice for events
│       ├── conflict.js      # Event conflict detection
│       ├── recurrence.js    # Recurring event logic
│       └── storage.js       # localStorage utilities
├── hooks/              # Custom React hooks
│   ├── useEventDnD.js      # Drag & drop functionality
│   └── useResponsiveView.js # Responsive view handling
├── pages/              # Page components
│   └── CalendarPage.jsx    # Main calendar page
├── utils/              # Utility functions
│   └── dateUtils.js        # Date manipulation helpers
├── App.jsx             # Main application component
├── main.jsx           # Application entry point
└── store.js           # Redux store configuration
```

## 🎯 Usage Guide

### Adding Events
1. Click on any date in the calendar
2. Fill in the event details:
   - **Title**: Event name
   - **Date & Time**: When the event occurs
   - **Description**: Additional details
   - **Recurrence**: How often it repeats
   - **Category**: Color-coded category
3. Click "Create Event"

### Managing Events
- **Edit**: Click on any existing event to modify it
- **Delete**: Use the delete button in the edit form
- **Search**: Use the search bar to find specific events
- **View More**: Click "+X more" on busy days to see all events

### Event Categories
- 🔵 **Blue**: Default/General events
- 🔴 **Red**: Important/Urgent events
- 🟢 **Green**: Work/Professional events
- 🟣 **Purple**: Personal events
- 🟠 **Orange**: Social/Fun events

## 🔧 Configuration

### Customizing Colors
Event colors can be modified in `src/components/EventForm.jsx` and `src/components/EventItem.jsx`.

### Changing Recurrence Options
Recurrence patterns can be customized in `src/features/events/recurrence.js`.

### Storage Options
Currently uses localStorage. Can be extended to support:
- Firebase/Firestore
- REST APIs
- GraphQL endpoints

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- React team for the amazing framework
- Redux team for predictable state management
- Tailwind CSS for rapid styling
- date-fns for robust date handling
- Vite for blazing fast development experience

## 📧 Support

If you have any questions or need help, please open an issue in the repository.

---

**Built with ❤️ using React, Redux Toolkit, and Tailwind CSS**
