# Kodbank - Modern Banking Dashboard

A modern banking dashboard with authentication and AI chat integration built with Next.js, TypeScript, Tailwind CSS, and MySQL.

![Kodbank Dashboard](https://via.placeholder.com/800x400?text=Kodbank+Dashboard)

## Features

- 🔐 **User Authentication** - Register and login with JWT
- 💰 **Financial Dashboard** - View balance, income, expenses, and savings
- 📊 **Transaction History** - Track all your financial transactions
- 🤖 **AI Chat Assistant** - Chat with AI powered by Hugging Face
- 📱 **Responsive Design** - Works on all devices
- 🎨 **Modern UI** - Clean, professional dark theme interface

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React, TypeScript
- **Styling**: Tailwind CSS
- **Database**: MySQL (Aiven)
- **Authentication**: JWT, bcryptjs
- **AI**: Hugging Face API (DialoGPT)
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Aiven MySQL database (free tier available)
- Hugging Face API key (free)

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd kodbank
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Aiven MySQL Database

1. Go to [Aiven Console](https://console.aiven.io/)
2. Create a free MySQL service
3. Wait for it to start (takes ~5 minutes)
4. Get your connection details from the service overview

### 4. Set Up Database Schema

Connect to your Aiven MySQL database and run the SQL from `schema.sql`:

```bash
mysql -h your-host -P your-port -u your-user -p your-database < schema.sql
```

Or use a MySQL client like MySQL Workbench, DBeaver, or phpMyAdmin.

### 5. Get Hugging Face API Key

1. Go to [Hugging Face](https://huggingface.co/)
2. Sign up for a free account
3. Go to Settings → Access Tokens
4. Create a new token with "Read" access
5. Copy the token

### 6. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
# Database (Aiven MySQL)
DB_HOST=your-aiven-mysql-host
DB_PORT=your-port
DB_USER=your-username
DB_PASSWORD=your-password
DB_NAME=your-database-name

# NextAuth
NEXTAUTH_SECRET=your-secret-key-here-generate-a-random-string
NEXTAUTH_URL=http://localhost:3000

# Hugging Face API
HUGGINGFACE_API_KEY=your-huggingface-api-key
```

To generate a secret key:
```bash
openssl rand -base64 32
```

### 7. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment to Vercel

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

### 2. Deploy to Vercel

1. Go to [Vercel](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Add environment variables from your `.env.local` file
5. Click "Deploy"

### 3. Update Environment Variables

In Vercel dashboard:
- Go to Settings → Environment Variables
- Add all variables from `.env.local`
- Update `NEXTAUTH_URL` to your production URL (e.g., `https://your-app.vercel.app`)

## Usage

### Register a New Account

1. Go to `/register`
2. Enter your name, email, and password
3. Click "Create account"

### Login

1. Go to `/login`
2. Enter your email and password
3. Click "Sign in"

### Dashboard Features

- **View Balance**: See your total balance, income, expenses, and savings
- **Transactions**: View recent transactions
- **AI Chat**: Click "AI Chat" in the sidebar to open the chat panel
- **Logout**: Click "Logout" in the sidebar

### AI Chat

The AI chat uses Hugging Face's DialoGPT model. Simply type a message and the AI will respond. All chat history is saved to the database.

## Project Structure

```
kodbank/
├── app/
│   ├── api/
│   │   ├── auth/         # Authentication endpoints
│   │   ├── chat/         # AI chat endpoints
│   │   └── dashboard/    # Dashboard data endpoints
│   ├── dashboard/        # Dashboard page
│   ├── login/            # Login page
│   ├── register/         # Register page
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page (redirects to login)
├── lib/
│   └── db.ts            # Database connection
├── public/              # Static files
├── schema.sql           # Database schema
├── .env.example         # Environment variables template
├── package.json         # Dependencies
├── tailwind.config.js   # Tailwind configuration
└── tsconfig.json        # TypeScript configuration
```

## Database Schema

### Users Table
- `id`: Auto-increment primary key
- `email`: Unique email address
- `password`: Hashed password
- `name`: User's full name
- `created_at`: Registration timestamp

### Transactions Table
- `id`: Auto-increment primary key
- `user_id`: Foreign key to users
- `title`: Transaction title
- `category`: Transaction category
- `amount`: Transaction amount (negative for expenses)
- `type`: 'income' or 'expense'
- `status`: 'Completed' or 'Pending'
- `date`: Transaction timestamp

### User Stats Table
- `id`: Auto-increment primary key
- `user_id`: Foreign key to users (unique)
- `total_balance`: Current balance
- `monthly_income`: Monthly income
- `monthly_expenses`: Monthly expenses
- `total_savings`: Total savings

### Chat Messages Table
- `id`: Auto-increment primary key
- `user_id`: Foreign key to users
- `message`: Message content
- `role`: 'user' or 'assistant'
- `created_at`: Message timestamp

## Troubleshooting

### Database Connection Issues

- Verify your Aiven MySQL service is running
- Check that you're using the correct host, port, and credentials
- Ensure SSL is enabled in your connection settings

### Hugging Face API Issues

- Verify your API key is correct
- Check that you have API quota remaining
- The model might take a few seconds to respond on first use (cold start)

### Deployment Issues

- Make sure all environment variables are set in Vercel
- Check the deployment logs for errors
- Ensure your database is accessible from the internet

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Support

If you have any questions or issues, please open an issue on GitHub.

---

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS
