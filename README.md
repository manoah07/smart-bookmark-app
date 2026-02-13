# Smart Bookmark App

A real-time bookmark manager built with Next.js, Supabase, and Tailwind CSS.

**Live URL:** https://smart-bookmark-app-puce.vercel.app

## Features

- Google OAuth sign-in (no email/password)
- Add bookmarks with title and URL
- Delete bookmarks with confirmation
- Real-time updates across tabs (powered by Supabase Realtime)
- Private bookmarks (each user sees only their own)
- Search/filter bookmarks
- URL validation
- Favicon display for bookmarked sites
- Copy URL to clipboard
- Responsive dark theme UI

## Tech Stack

- **Frontend:** Next.js 16 (App Router), React, TypeScript
- **Styling:** Tailwind CSS
- **Backend/Auth/Database:** Supabase (Google OAuth, PostgreSQL, Realtime)
- **Deployment:** Vercel

## Problems I Faced and How I Solved Them

### 1. Google Cloud 2-Step Verification
Google Cloud Console blocked access because my account didn't have 2-Step Verification enabled. I had to enable it in Google Account security settings and wait 60 seconds before I could access the console.

### 2. OAuth Provider Not Enabled Error
After setting up Google credentials, I got "Unsupported provider: provider is not enabled" error. The issue was that the Google provider toggle in Supabase was OFF. Turning it ON and saving fixed it.

### 3. 404 on Dashboard After Sign-In
After successful Google sign-in, the app redirected to /dashboard but showed a 404. The dashboard page.tsx file was missing from src/app/dashboard/. Creating the file with proper server-side auth check fixed it.

### 4. 404 on Home Page After Sign-Out
Sign-out redirected to / but showed 404. The src/app/page.tsx file was accidentally deleted. Recreating it with the landing page component fixed it.

### 5. JSX Errors in BookmarkItem Component
The BookmarkItem component had JSX parsing errors due to formatting issues when pasting code. Clearing the file completely and pasting clean code resolved it.

### 6. Git Author Showing Wrong Name
Commits were showing under a different GitHub account. Used git filter-branch to rewrite commit authors and force pushed to fix it.

### 7. Redirect URL Mismatch After Deployment
Google sign-in on the deployed Vercel app redirected to localhost:3000 instead of the Vercel URL. Added the Vercel URL to both Google Cloud Console redirect URIs and Supabase URL Configuration.

## Setup Instructions

1. Clone the repo
2. Run `npm install`
3. Create `.env.local` with your Supabase URL and Anon Key
4. Set up Supabase: create bookmarks table with RLS policies, enable Google OAuth
5. Set up Google Cloud: create OAuth credentials with redirect URI
6. Run `npm run dev`
