# Portfolio Frontend

Next.js frontend for the Data Science Portfolio website with TypeScript and Tailwind CSS.

## Features

- **Modern Stack**: Next.js 14 with App Router, TypeScript, and Tailwind CSS
- **Responsive Design**: Mobile-first, fully responsive layout
- **Server-Side Rendering**: Fast page loads with SSR
- **Interactive ML Demos**: Real-time model predictions
- **Dark Mode Ready**: Built-in dark mode support

## Quick Start

### 1. Install Dependencies

```bash
cd frontend
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env.local
```

Edit `.env.local` to set your backend API URL (default: `http://localhost:8000`)

### 3. Run Development Server

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

## Available Scripts

- `npm run dev` - Start development server (http://localhost:3000)
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Project Structure

```
frontend/
├── app/
│   ├── layout.tsx           # Root layout with navbar/footer
│   ├── page.tsx             # Home page
│   ├── globals.css          # Global styles
│   └── projects/
│       ├── page.tsx         # Projects list page
│       └── [id]/
│           └── page.tsx     # Individual project page
├── components/
│   ├── Navbar.tsx           # Navigation bar
│   ├── Footer.tsx           # Footer
│   ├── ProjectCard.tsx      # Project card component
│   └── ModelDemo.tsx        # Interactive ML demo
├── lib/
│   ├── api.ts               # API client functions
│   └── types.ts             # TypeScript types
├── public/
│   └── images/              # Static images
├── .env.example             # Environment variables template
├── next.config.mjs          # Next.js configuration
├── tailwind.config.ts       # Tailwind CSS configuration
└── package.json
```

## Pages

### Home Page (`/`)
- Hero section with photo, bio, and contact links
- Tech stack showcase
- Featured projects grid

### Projects Page (`/projects`)
- Grid layout of all projects
- Filterable project cards with metrics and tech stack

### Project Detail Page (`/projects/[id]`)
- Full project information
- Problem statement, methodology, and results
- Interactive ML model demo
- GitHub link

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the repository in Vercel
3. Set root directory to `frontend`
4. Add environment variable:
   - `NEXT_PUBLIC_API_URL`: Your backend API URL
5. Deploy!

Vercel will automatically detect Next.js and configure the build settings.

### Other Platforms

Build command:
```bash
npm run build
```

Start command:
```bash
npm start
```

Environment variables:
- `NEXT_PUBLIC_API_URL`: Backend API URL (required)

## Customization

### Update Personal Information

Edit `app/page.tsx` to update:
- Name and tagline
- Bio text
- Tech stack
- Contact links

### Styling

- Global styles: `app/globals.css`
- Tailwind config: `tailwind.config.ts`
- Color scheme: Modify `primary` colors in Tailwind config

### Add New Pages

Create new pages in the `app/` directory. Next.js uses file-based routing.

## API Integration

The frontend communicates with the FastAPI backend using fetch calls defined in `lib/api.ts`:

- `fetchProjects()` - Get all projects
- `fetchFeaturedProjects(limit)` - Get featured projects
- `fetchProjectById(id)` - Get project details
- `makePrediction(endpoint, input)` - Make ML predictions

## Troubleshooting

### CORS Errors
Make sure the backend is configured to allow requests from your frontend URL in the `CORS_ORIGINS` environment variable.

### API Connection Failed
Verify:
1. Backend is running at the URL specified in `.env.local`
2. `NEXT_PUBLIC_API_URL` is set correctly
3. No firewall blocking the connection

### Build Errors
Try:
```bash
rm -rf .next node_modules
npm install
npm run build
```
