# [Ninja Character Database 🥷](https://ninja-characters.netlify.app)

Live Demo: https://ninja-characters.netlify.app

A high-performance, accessible table application built with React and TypeScript for managing ninja character data. Features advanced filtering, sorting, searching, and selection capabilities optimized for 1000+ entries.

## ✨ Features

### Core Functionality
- **Performance Optimized**: Efficiently handles 10,000+ entries with virtual scrolling and smooth interactions
- **Advanced Filtering**: Multi-select health status filter (Healthy, Injured, Critical) with intuitive checkbox UI
- **Real-time Search**: Instant search across character names and locations
- **Smart Sorting**: Sortable power levels with visual indicators
- **Bulk Selection**: Select individual rows, all visible rows, or use filtered selections
- **View Status Management**: Mark characters as viewed/unviewed with console logging of selected IDs
- **Responsive Design**: Mobile-first approach with optimized layouts for all screen sizes

### UI/UX Excellence
- **Dark/Light Theme**: System preference detection with manual toggle
- **Accessibility First**: Full ARIA support, keyboard navigation, and screen reader compatibility
- **Beautiful Design**: Modern, clean interface with smooth animations and micro-interactions
- **Loading States**: Elegant loading animations while data loads
- **Visual Feedback**: Color-coded health status, location badges, and selection states
- **Sticky Headers**: Table headers remain visible during scrolling

### Technical Excellence
- **TypeScript**: Fully typed with strict TypeScript configuration
- **Component Architecture**: Modular, reusable components with clear separation of concerns
- **Custom Hooks**: Centralized state management with useTableData and useTheme
- **Performance Optimizations**: Virtualized table rendering, React.memo, useMemo, and useCallback
- **Testing**: Comprehensive tests with React Testing Library
- **Modern Tooling**: Vite for fast development, ESLint for code quality

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd ninja-character-table

# Install dependencies
npm install

# If the above command doesn't work
npm install --legacy-peer-deps

# Start development server
npm run dev
```

Visit `http://localhost:5173` to view the application.

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Check Test Coverage
npm run test:coverage
```

### Test Coverage
- Component rendering and data loading
- Search functionality across name and location fields
- Character selection and bulk operations
- Sorting by power levels
- Filter interactions
- Console logging verification for view status changes

## 📱 Usage Guide

### Character Management
1. **Viewing Characters**: All characters load automatically with their ninja stats
2. **Searching**: Use the search bar to filter by character name or village location
3. **Health Filtering**: Click the filter icon in the Health column to filter by status
4. **Sorting**: Click the chevron next to "Power" to sort by power level
5. **Selection**: Use checkboxes to select individual characters or select all
6. **Bulk Actions**: Select characters and use "Mark Viewed" or "Mark Unviewed" buttons

### Theme Switching
- Click the sun/moon icon in the top right to toggle between light and dark themes
- The app respects your system's theme preference by default

### Mobile Experience
- Responsive design adapts to all screen sizes
- Touch-friendly interface elements
- Optimized scrolling performance

## 🏗️ Architecture

### Project Structure
```
src/
├── components/          # React components
│   ├── DataTable.tsx   # Main table component
│   ├── TableHeader.tsx # Table header with sorting/filtering
│   ├── TableRow.tsx    # Individual table rows
│   ├── SearchInput.tsx # Search functionality
│   ├── HealthFilter.tsx# Health status filtering
│   ├── ActionButtons.tsx# Bulk action buttons
│   ├── LoadingSpinner.tsx# Loading state
│   ├── ThemeToggle.tsx # Dark/light mode toggle
│   └── __tests__/      # Component tests
├── hooks/              # Custom React hooks
│   ├── useTableData.ts # Table state management
│   └── useTheme.ts     # Theme management
├── types/              # TypeScript type definitions
│   └── index.ts        # All type definitions
├── utils/              # Utility functions
│   └── dataGenerator.ts# Character data generation
└── test/               # Test configuration
    └── setup.ts        # Test setup file
```

### Data Model
```typescript
interface Character {
  id: string;              // Unique identifier
  name: string;            // Character name
  location: Location;      // Village: Konoha, Suna, Kiri, Iwa, Kumo
  health: HealthStatus;    // Status: Healthy, Injured, Critical
  power: number;           // Power level: 100-10,000
  isViewed?: boolean;      // View status
}
```

### State Management
- **useTableData**: Centralized hook managing all table state including:
  - Character data loading and caching
  - Search and filter state
  - Sorting configuration
  - Selection management
  - View status updates
- **useTheme**: Theme preference management with localStorage persistence

## 🎯 Performance Optimizations

### React Optimizations
- **Virtual Scrolling**: Only visible rows render using react-virtual for 10k+ datasets
- **React.memo**: Prevents unnecessary re-renders of table rows
- **useMemo**: Memoizes expensive filtering and sorting operations
- **useCallback**: Stable references for event handlers

### Data Handling
- **Efficient Filtering**: Smart filter combination reduces computation
- **Debounced Search**: Real-time search without performance impact
- **Selective Updates**: Only re-renders affected components

### Bundle Optimization
- **Tree Shaking**: Unused code elimination
- **Code Splitting**: Component-level code splitting ready
- **Asset Optimization**: Optimized build with Vite

## 🎨 Design System

### Color Palette
- **Primary**: Blue (selection, actions, focus states)
- **Health Status**: Green (Healthy), Yellow (Injured), Red (Critical)
- **Locations**: Unique color for each village
- **Neutral**: Gray scale for text and backgrounds
- **Dark Theme**: Carefully chosen colors for accessibility

### Typography
- **Headers**: Bold, clear hierarchy
- **Body**: Optimized for readability
- **Monospace**: Power values for alignment

### Spacing
- **8px Grid System**: Consistent spacing throughout
- **Responsive Breakpoints**: Mobile-first design
- **Touch Targets**: 44px minimum for mobile accessibility

## 🔧 Configuration

### Environment Setup
The application works out of the box with no additional configuration required. All data is generated client-side for demo purposes.

### Customization
- **Data Generation**: Modify `src/utils/dataGenerator.ts` to change character data
- **Styling**: Update `tailwind.config.js` for theme customization
- **Components**: All components are modular and easily customizable

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

The application is optimized for deployment on any static hosting service (Vercel, Netlify, GitHub Pages, etc.).

## 🧭 Future Enhancements

### Potential Features (TODOs)
- **Advanced Filters**: Date ranges, multiple attribute filtering
- **Export Functionality**: CSV/JSON export of filtered data
- **Keyboard Shortcuts**: Power user keyboard navigation
- **Column Customization**: Hideable/reorderable columns
- **Drag and Drop**: Reorder rows or bulk actions

### Technical Improvements
- **Offline Support**: Service worker for offline functionality
- **Real API Integration**: Connect to actual backend services
- **Advanced State Management**: Redux Toolkit for complex state
- **Storybook Integration**: Component documentation and testing

## 📄 License

This project is built as a technical assessment and serves as a demonstration of modern React development practices.

---

Built with ❤️ using React, TypeScript, and Tailwind CSS