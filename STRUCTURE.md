# 📁 Project Structure

```
kodbank/
│
├── 📄 Configuration Files
│   ├── package.json              # Dependencies and scripts
│   ├── tsconfig.json             # TypeScript configuration
│   ├── tailwind.config.js        # Tailwind CSS configuration
│   ├── postcss.config.js         # PostCSS configuration
│   ├── next.config.js            # Next.js configuration
│   ├── vercel.json               # Vercel deployment configuration
│   ├── middleware.ts             # Route protection middleware
│   └── .gitignore                # Git ignore rules
│
├── 📄 Documentation
│   ├── README.md                 # Full project documentation
│   ├── QUICKSTART.md            # Quick start guide
│   ├── DEPLOYMENT.md            # Detailed deployment guide
│   ├── CHECKLIST.md             # Deployment checklist
│   └── STRUCTURE.md             # This file
│
├── 📄 Database
│   ├── schema.sql               # Database schema (run this in Aiven)
│   └── lib/
│       └── db.ts                # Database connection utility
│
├── 📄 Environment
│   ├── .env.example             # Environment variables template
│   └── .env.local.sample        # Sample env file with notes
│
├── 🎨 Frontend (app/)
│   ├── layout.tsx               # Root layout component
│   ├── page.tsx                 # Home page (redirects to login)
│   ├── globals.css              # Global styles
│   │
│   ├── 🔐 Authentication Pages
│   │   ├── login/
│   │   │   └── page.tsx         # Login page
│   │   └── register/
│   │       └── page.tsx         # Registration page
│   │
│   └── 💼 Dashboard
│       └── dashboard/
│           └── page.tsx         # Main dashboard with AI chat
│
└── 🔌 API Routes (app/api/)
    │
    ├── auth/                    # Authentication endpoints
    │   ├── login/
    │   │   └── route.ts         # POST /api/auth/login
    │   ├── register/
    │   │   └── route.ts         # POST /api/auth/register
    │   └── logout/
    │       └── route.ts         # POST /api/auth/logout
    │
    ├── dashboard/               # Dashboard data
    │   └── route.ts             # GET /api/dashboard
    │
    └── chat/                    # AI Chat
        └── route.ts             # POST & GET /api/chat
```

## 🗂️ File Descriptions

### Configuration Files

**package.json**
- Lists all npm dependencies
- Defines build and dev scripts
- Project metadata

**tsconfig.json**
- TypeScript compiler settings
- Path aliases configuration
- Build output settings

**tailwind.config.js**
- Tailwind CSS customization
- Theme configuration
- Content paths

**next.config.js**
- Next.js framework settings
- Build optimization
- API routes configuration

**middleware.ts**
- Route protection logic
- Redirects unauthenticated users
- Prevents access to auth pages when logged in

### App Structure

**app/layout.tsx**
- Root layout for all pages
- Loads global CSS
- Sets up fonts and metadata

**app/page.tsx**
- Landing page
- Redirects to /login
- Entry point for the app

**app/globals.css**
- Tailwind directives
- Custom CSS variables
- Scrollbar styling
- Global styles

### Authentication Pages

**app/login/page.tsx**
- Login form
- Email and password inputs
- Calls /api/auth/login
- Redirects to dashboard on success

**app/register/page.tsx**
- Registration form
- Name, email, password inputs
- Calls /api/auth/register
- Redirects to login on success

### Dashboard

**app/dashboard/page.tsx**
- Main dashboard interface
- Stats cards (balance, income, expenses, savings)
- Transaction list
- AI chat sidebar
- Navigation sidebar
- Logout functionality

### API Routes

**app/api/auth/login/route.ts**
- Handles POST /api/auth/login
- Validates credentials
- Generates JWT token
- Sets httpOnly cookie

**app/api/auth/register/route.ts**
- Handles POST /api/auth/register
- Hashes password with bcrypt
- Creates user in database
- Creates default stats and transactions

**app/api/auth/logout/route.ts**
- Handles POST /api/auth/logout
- Clears authentication cookie
- Returns success message

**app/api/dashboard/route.ts**
- Handles GET /api/dashboard
- Verifies JWT token
- Fetches user data, stats, transactions
- Returns dashboard data

**app/api/chat/route.ts**
- POST: Sends message to AI
- GET: Fetches chat history
- Integrates with Hugging Face API
- Stores messages in database

### Database

**schema.sql**
- Creates users table
- Creates transactions table
- Creates user_stats table
- Creates chat_messages table
- Defines foreign key relationships

**lib/db.ts**
- MySQL connection pool
- Database configuration
- SSL settings for Aiven
- Exports connection for use in API routes

## 🔄 Data Flow

### Registration Flow
```
User fills form (register/page.tsx)
    ↓
POST /api/auth/register (register/route.ts)
    ↓
Hash password with bcrypt
    ↓
Insert user into database
    ↓
Create default stats and transactions
    ↓
Return success
    ↓
Redirect to login page
```

### Login Flow
```
User fills form (login/page.tsx)
    ↓
POST /api/auth/login (login/route.ts)
    ↓
Verify email and password
    ↓
Generate JWT token
    ↓
Set httpOnly cookie
    ↓
Return success
    ↓
Redirect to dashboard
```

### Dashboard Load Flow
```
Navigate to /dashboard (dashboard/page.tsx)
    ↓
Middleware checks for token
    ↓
GET /api/dashboard (dashboard/route.ts)
    ↓
Verify JWT token
    ↓
Fetch user, stats, transactions from DB
    ↓
Return data
    ↓
Render dashboard UI
```

### AI Chat Flow
```
User types message (dashboard/page.tsx)
    ↓
POST /api/chat (chat/route.ts)
    ↓
Verify JWT token
    ↓
Save user message to database
    ↓
Send to Hugging Face API
    ↓
Receive AI response
    ↓
Save AI response to database
    ↓
Return response
    ↓
Display in chat panel
```

## 🛡️ Security Features

1. **Password Hashing**: bcrypt with salt rounds
2. **JWT Tokens**: Secure, httpOnly cookies
3. **Route Protection**: Middleware guards protected routes
4. **SQL Injection Prevention**: Parameterized queries
5. **SSL/TLS**: Encrypted database connections
6. **Environment Variables**: Secrets not in code

## 🎨 UI Components

### Sidebar Navigation
- Kodbank logo
- Dashboard link (active)
- Analytics, Cards, Assets (placeholders)
- Profile link
- AI Chat toggle
- Settings link
- Logout button

### Stats Cards (4 cards)
- Total Balance with 12.5% increase indicator
- Monthly Income with 8.2% increase indicator
- Monthly Expenses with 4.1% decrease indicator
- Total Savings with 15.3% increase indicator

### Transactions List
- Transaction icon (based on category)
- Title and category
- Date
- Amount (colored green for income, white for expenses)
- Status (Completed/Pending)

### AI Chat Panel (Right Sidebar)
- Header with close button
- Message list (scrollable)
- User messages (orange, right-aligned)
- AI messages (gray, left-aligned)
- Input field
- Send button

## 🎯 Key Technologies

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: MySQL (Aiven)
- **Auth**: JWT + bcrypt
- **AI**: Hugging Face API
- **Deployment**: Vercel

## 📦 Dependencies

### Production
- next: React framework
- react & react-dom: UI library
- mysql2: Database driver
- bcryptjs: Password hashing
- jsonwebtoken: JWT tokens
- next-auth: Authentication (planned for future)

### Development
- typescript: Type safety
- @types/*: Type definitions
- tailwindcss: CSS framework
- autoprefixer: CSS processing
- postcss: CSS transformation

## 🚀 Build Process

1. TypeScript compilation
2. Next.js optimization
3. Static page generation
4. API route bundling
5. CSS processing with Tailwind
6. Image optimization
7. Output to .next/ directory

## 📊 Database Schema

**users** (Authentication)
- id, email, password, name, created_at

**user_stats** (Financial Data)
- id, user_id, total_balance, monthly_income, monthly_expenses, total_savings

**transactions** (Transaction History)
- id, user_id, title, category, amount, type, status, date

**chat_messages** (AI Chat History)
- id, user_id, message, role, created_at

## 🔗 API Endpoints

| Method | Endpoint | Auth Required | Description |
|--------|----------|---------------|-------------|
| POST | /api/auth/register | No | Register new user |
| POST | /api/auth/login | No | Login user |
| POST | /api/auth/logout | Yes | Logout user |
| GET | /api/dashboard | Yes | Get dashboard data |
| POST | /api/chat | Yes | Send chat message |
| GET | /api/chat | Yes | Get chat history |

## 📱 Pages & Routes

| Route | Auth Required | Description |
|-------|---------------|-------------|
| / | No | Redirects to /login |
| /login | No | Login page |
| /register | No | Registration page |
| /dashboard | Yes | Main dashboard |

---

This structure is optimized for:
- ✅ Easy deployment to Vercel
- ✅ Clear separation of concerns
- ✅ Scalable architecture
- ✅ Type safety with TypeScript
- ✅ Security best practices
- ✅ Performance optimization
