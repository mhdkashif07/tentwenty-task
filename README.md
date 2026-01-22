# Timesheet Management System

A modern, full-stack timesheet management application built with Next.js 16, React 19, TypeScript, and Tailwind CSS. This application allows users to track their work hours, manage tasks, and monitor weekly progress.

## 🚀 Features

- **User Authentication** - Secure login system using NextAuth.js
- **Dashboard View** - Overview of all timesheets with filtering and pagination
- **List View** - Detailed weekly timesheet with task management
- **Task Management** - Add, edit, and delete tasks with detailed information
- **Progress Tracking** - Visual progress bars showing hours worked vs weekly targets
- **Status Management** - Track timesheet status (Pending, Submitted, Approved, Rejected)
- **Responsive Design** - Mobile-friendly interface using Tailwind CSS
- **Type Safety** - Full TypeScript support for robust development

## 📋 Prerequisites

Before running this project, ensure you have the following installed:

- **Node.js** (v18.0.0 or higher)
- **npm** (v9.0.0 or higher) or **yarn** (v1.22.0 or higher)
- **Git** (for version control)

## 🛠️ Technology Stack

- **Framework:** Next.js 16.1.4 (App Router)
- **Frontend:** React 19.2.3
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 4
- **Authentication:** NextAuth.js 4.22.1
- **Testing:** Vitest 1.2.0
- **Linting:** ESLint 9

## 📦 Installation

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd tentwenty-task
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables:**

   Create a `.env.local` file in the root directory and add the following:

   ```env
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-secret-key-here
   ```

   To generate a secure secret, run:

   ```bash
   openssl rand -base64 32
   ```

## 🚀 Running the Project

### Development Mode

Start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

### Production Build

1. **Build the application:**

   ```bash
   npm run build
   # or
   yarn build
   ```

2. **Start the production server:**
   ```bash
   npm run start
   # or
   yarn start
   ```

### Running Tests

```bash
npm run test
# or
yarn test

# Watch mode
npm run test:watch
```

### Linting

```bash
npm run lint
# or
yarn lint
```

## 📁 Project Structure

```
tentwenty-task/
├── app/                      # Next.js app router
│   ├── api/                  # API routes
│   │   ├── auth/            # Authentication endpoints
│   │   ├── timesheets/      # Timesheet CRUD operations
│   │   └── users/           # User management
│   ├── dashboard/           # Dashboard pages
│   │   ├── listview/        # Weekly timesheet view
│   │   └── page.tsx         # Main dashboard
│   ├── login/               # Login page
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Home page (redirects to login)
│   ├── Providers.tsx        # Context providers
│   └── globals.css          # Global styles
├── components/              # Reusable components
│   ├── Header/              # Navigation header
│   ├── Footer/              # Footer component
│   ├── TimesheetModal/      # Task entry modal
│   ├── TimesheetTable/      # Timesheet table view
│   └── IconButton/          # Reusable button component
├── hooks/                   # Custom React hooks
│   ├── useAuth.ts           # Authentication hook
│   └── useTimesheets.ts     # Timesheet data management
├── services/                # API service layer
│   └── TimesheetService.ts  # Timesheet API calls
├── types/                   # TypeScript type definitions
│   └── Timesheet.ts         # Timesheet interfaces
├── public/                  # Static assets
├── next.config.ts           # Next.js configuration
├── tailwind.config.js       # Tailwind CSS configuration
├── tsconfig.json            # TypeScript configuration
└── package.json             # Project dependencies
```

## 🎯 How It Works

### 1. **Authentication Flow**

- Users land on the login page (`/login`)
- Authentication is handled via NextAuth.js
- Successful login redirects to the dashboard

### 2. **Dashboard**

- View all timesheets with filtering by status
- Pagination support for large datasets
- Create, edit, and delete timesheet entries
- Track submission status

### 3. **List View (Weekly Timesheet)**

- View tasks organized by day
- Visual progress tracking (hours/target)
- Add new tasks with detailed information:
  - Project selection
  - Work type (Bug fixes, Feature Development, etc.)
  - Task description
  - Hours worked
- Edit or delete existing tasks
- Real-time progress calculation

### 4. **API Routes**

- `/api/auth/[...nextauth]` - Authentication endpoints
- `/api/timesheets` - CRUD operations for timesheets
- `/api/users` - User management

## 🎨 Key Features Explained

### Task Entry Modal

- **Project Selection:** Choose from available projects
- **Work Type:** Categorize work (Bug fixes, Features, Testing, etc.)
- **Description:** Detailed task description
- **Hours:** Adjustable hour counter with +/- buttons

### Progress Tracking

- Visual progress bar showing completion percentage
- Display format: "20/40 hrs" with percentage
- Hover tooltip for detailed information

### Status Management

- **INCOMPLETE** - Draft/Pending timesheets
- **COMPLETED** - Submitted/Approved timesheets
- **MISSING** - Rejected or incomplete entries

## 🔧 Development

### Adding New Features

1. Create components in `components/` directory
2. Add types in `types/` directory
3. Create API routes in `app/api/` directory
4. Use custom hooks from `hooks/` for state management

### Code Style

- Follow TypeScript best practices
- Use functional components with hooks
- Maintain consistent Tailwind CSS classes
- Write tests for critical functionality

## 📝 Environment Variables

| Variable          | Description            | Required |
| ----------------- | ---------------------- | -------- |
| `NEXTAUTH_URL`    | Application URL        | Yes      |
| `NEXTAUTH_SECRET` | Secret for NextAuth.js | Yes      |

## 🐛 Troubleshooting

**Port already in use:**

```bash
# Kill the process on port 3000
npx kill-port 3000
# Or use a different port
PORT=3001 npm run dev
```

**Build errors:**

```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

**Type errors:**

```bash
# Check TypeScript errors
npx tsc --noEmit
```

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Write/update tests
4. Submit a pull request

---

Built with ❤️ using Next.js and React
