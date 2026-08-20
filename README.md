# Tickify — Client

**Tickify** is an online ticket booking platform for buses, trains, launches, and flights. Users can browse tickets, book seats, and pay securely. Vendors manage trips and bookings; admins approve tickets, manage users, and feature advertisements.

## Live Site

**Frontend:** [https://tickify-psi.vercel.app/](https://tickify-psi.vercel.app/)



---

## Features

### Public
- Home page with hero slider, latest tickets, advertisements, trending destinations, and testimonials
- **All Tickets** — search by from/to, filter by transport type, sort by price, pagination
- Ticket details (protected route) with booking modal, quantity rules, and departure countdown
- Dark / light mode
- About, Help & Support, 404 page

### User Dashboard
- Profile
- My booked tickets (status, countdown, Stripe payment)
- Transaction history

### Vendor Dashboard
- Add tickets (image upload via imgbb or image URL)
- My tickets (edit / delete)
- Requested bookings (accept / reject)
- Revenue summary

### Admin Dashboard
- Manage tickets (approve / reject)
- Manage users (promote role, mark fraud vendors)
- Advertise tickets (max 6 featured)

### Auth & Payments
- Email/password and Google sign-in (Better Auth)
- **Email verification by one-time code (OTP)** — a 6-digit code is emailed on sign-up, and email/password login is blocked until it's entered
- **Passwordless sign-in** — "Email me a login code" on the login page
- **Password reset by OTP** — `/forgot-password`
- Role-based access: `user`, `vendor`, `admin`
- Stripe checkout for accepted bookings

#### OTP details

| | |
|---|---|
| Code length | 6 digits |
| Valid for | 5 minutes |
| Wrong attempts allowed | 3 |
| Resend limit | 3 per minute (server), 60s cooldown in the UI |
| Delivery | Gmail SMTP via nodemailer |

Google sign-in accounts arrive already verified and skip the code entirely.
If `GMAIL_USER` / `GMAIL_APP_PASSWORD` are missing, the code is printed to the
server console instead of emailed, so local development still works.

---

## Tech Stack

- **Next.js 16** (App Router, Server Components, Server Actions)
- **React 19**
- **Tailwind CSS 4**
- **HeroUI**
- **Better Auth** + MongoDB adapter (with the `emailOTP` plugin)
- **Nodemailer** (Gmail SMTP) for one-time codes
- **Stripe**
- **Swiper**, **react-countdown**, **react-icons**

---

## Run Locally

### Prerequisites
- Node.js 18+
- MongoDB Atlas database
- Stripe test keys
- Google OAuth credentials (optional, for Google login)
- imgbb API key (for image upload)

### 1. Clone and install

```bash
cd tickify
npm install
```

### 2. Environment variables

Create a `.env` file in the `tickify` folder:

```env
# Auth
BETTER_AUTH_SECRET=your_random_secret_key
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000

# API
TICKIFY_API_URL=http://localhost:5000

# Database
MONGODB_URI=your_mongodb_connection_string

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...

# Google OAuth (optional)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Image upload (imgbb)
NEXT_PUBLIC_IMAGE_UPLOAD_API=your_imgbb_api_key

# OTP emails (Gmail SMTP)
GMAIL_USER=your_gmail_address@gmail.com
GMAIL_APP_PASSWORD=your_16_character_app_password
```

#### Getting a Gmail App Password

`GMAIL_APP_PASSWORD` is **not** your normal Gmail password — Google blocks those
for SMTP. To create one:

1. Turn on 2-Step Verification at [myaccount.google.com/security](https://myaccount.google.com/security).
2. Go to [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords).
3. Create a password named "Tickify" and copy the 16 characters.
4. Paste it into `GMAIL_APP_PASSWORD` (spaces are fine to remove).

Gmail allows roughly 500 emails per day, which is plenty for this project.

### 3. Start the backend

In a separate terminal:

```bash
cd tickify-server
npm install
# create .env with MONGODB_URI
npm start
```

### 4. Start the frontend

```bash
cd tickify
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Deploy to Vercel (Frontend)

1. Push the `tickify` folder to GitHub and import the repo in [Vercel](https://vercel.com).
2. Set **Root Directory** to `tickify` if the repo contains both client and server.
3. Add these **Environment Variables** in Vercel project settings:

| Variable | Example / Notes |
|----------|-----------------|
| `BETTER_AUTH_SECRET` | Same secret as local (long random string) |
| `BETTER_AUTH_URL` | `https://tickify-psi.vercel.app` |
| `NEXT_PUBLIC_BETTER_AUTH_URL` | `https://tickify-psi.vercel.app` |
| `TICKIFY_API_URL` | `https://tickify-server-psi.vercel.app` |
| `MONGODB_URI` | Your MongoDB Atlas URI |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key |
| `STRIPE_SECRET_KEY` | Stripe secret key |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret |
| `NEXT_PUBLIC_IMAGE_UPLOAD_API` | imgbb API key |
| `GMAIL_USER` | Gmail address that sends the OTP emails |
| `GMAIL_APP_PASSWORD` | 16-character Gmail App Password |

4. Redeploy after saving env vars.

### Google OAuth (production)

In [Google Cloud Console](https://console.cloud.google.com/), add authorized redirect URI:

```
https://tickify-psi.vercel.app/api/auth/callback/google
```

---

## Project Structure (main paths)

```
tickify/
├── src/
│   ├── app/              # Pages & API routes
│   ├── actions/          # Server actions (tickets, bookings, users)
│   ├── Components/       # UI components
│   └── lib/              # Auth, API, Stripe, format helpers
├── public/
├── .env                  # Local env (do not commit)
└── package.json
```

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

---

## Image Upload

Vendors can add ticket images in two ways:

1. **Upload** — file sent to imgbb via `NEXT_PUBLIC_IMAGE_UPLOAD_API`
2. **Image URL** — paste a direct image link

If browser upload fails (CORS), use the **Image URL** tab or upload to [imgbb.com](https://imgbb.com) manually and paste the link.

---

## Related Repository

Backend Express API: see `tickify-server/README.md`

---

## Author


