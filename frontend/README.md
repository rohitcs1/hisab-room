# HisabRoom - Expense Sharing App

A mobile-first, fully responsive SaaS web application for expense sharing among roommates and travel groups. Built with React and inspired by WhatsApp-style UI patterns.

## Features

- **Multi-Group System**: Create or join multiple groups (like WhatsApp groups)
- **Group-Based Data Isolation**: Each group has its own separate expense data
- **Mobile-First Design**: Optimized primarily for mobile phones with PWA-style UI
- **WhatsApp-Inspired UI**: Familiar, icon-driven interface with minimal text
- **Expense Management**: Add expenses, view history, and track balances
- **Balance Settlement**: Visual balance tracking with settlement suggestions
- **Admin Panel**: Separate admin interface for managing users, groups, ads, and payments

## Tech Stack

- **React** (JSX format)
- **React Router** for navigation
- **Tailwind CSS** for styling
- **Vite** as build tool
- **Supabase** (placeholder integration ready)

## Project Structure

```
src/
├── components/
│   ├── Layout/
│   │   ├── MobileLayout.jsx      # Mobile layout with bottom nav
│   │   ├── DesktopLayout.jsx      # Desktop layout with sidebar
│   │   └── AdminLayout.jsx       # Admin panel layout
│   └── common/
│       ├── Avatar.jsx             # Reusable avatar component
│       └── FAB.jsx                # Floating Action Button
├── contexts/
│   └── AuthContext.jsx           # Authentication context
├── pages/
│   ├── auth/
│   │   ├── Login.jsx             # Login page
│   │   └── Signup.jsx            # Signup page
│   ├── admin/
│   │   ├── AdminDashboard.jsx    # Admin dashboard
│   │   ├── AdminAds.jsx          # Ads management
│   │   ├── AdminPayments.jsx     # Payments management
│   │   ├── AdminUsers.jsx        # Users management
│   │   └── AdminGroups.jsx       # Groups management
│   ├── GroupList.jsx             # Home - Group list (WhatsApp style)
│   ├── GroupDashboard.jsx        # Group dashboard
│   ├── AddExpense.jsx            # Add expense form
│   ├── ExpenseList.jsx           # Expense history
│   ├── Balance.jsx               # Balance & settlement
│   └── Profile.jsx               # User profile
├── services/
│   └── supabase.js               # Supabase service placeholders
├── App.jsx                        # Main app component with routing
├── main.jsx                       # Entry point
└── index.css                      # Global styles
```

## Getting Started

### Prerequisites

- Node.js 16+ and npm/yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables (optional for Supabase):
```bash
# Create .env file
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

3. Start development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

## Design Principles

- **Mobile-First**: Optimized for mobile phones first, then tablets and desktops
- **Icon-Driven**: Minimal text, maximum icons for quick recognition
- **WhatsApp-Inspired**: Familiar navigation patterns and UI elements
- **Clean & Soft**: Rounded cards, soft colors, subtle animations
- **Touch-Friendly**: Large buttons and touch targets for mobile
- **Bottom Navigation**: Mobile uses bottom nav, desktop uses sidebar

## Screens

1. **Authentication**: Simple login/signup with email or phone
2. **Group List**: WhatsApp-style group listing with search
3. **Group Dashboard**: Main actions (Add Expense, Expenses, Balance)
4. **Add Expense**: Category selection, amount input, split options
5. **Expense List**: Filterable expense history
6. **Balance**: Visual balance tracking with settlement suggestions
7. **Profile**: User settings and logout
8. **Admin Panel**: Separate admin interface for management

## Database Schema (Supabase)

The app assumes the following tables:
- `users` - User accounts
- `groups` - Expense groups
- `group_members` - Group membership
- `expenses` - Individual expenses
- `expense_splits` - Expense splitting details
- `ads` - Advertisement data
- `ad_payments` - Payment records for ads

## Notes

- All Supabase services are placeholders with mock data
- Replace placeholder services with actual Supabase queries
- Admin routes are protected (check `isAdmin` flag in user object)
- Razorpay integration is placeholder UI only

## License

MIT

