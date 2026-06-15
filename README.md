# Luminal Systems

🔗 **Live:** [luminal-systems-f6b13.web.app](https://luminal-systems-f6b13.web.app)

A clean, professional marketing website with e-commerce checkout flow built with React, TypeScript, and Vite.

## Tech Stack

- **Frontend:** React 19, TypeScript, Vite, Tailwind CSS v4
- **Routing:** React Router DOM v7
- **Animations:** Framer Motion, Lottie React, Three.js / React Three Fiber
- **Icons:** Lucide React
- **Authentication:** Firebase Auth (Email/Password + Google)
- **Payments:** PayHere Sandbox (Sri Lanka)
- **Backend:** PHP with MySQL (REST APIs)

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- PHP 8+ (for backend APIs)
- MySQL (for backend)

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_firebase_measurement_id
VITE_PAYHERE_MERCHANT_ID=your_payhere_merchant_id
VITE_PAYHERE_SECRET=your_payhere_secret
VITE_API_BASE_URL=http://localhost:8000/api
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
npm run preview
```

## Pages

| Route             | Page           | Description                               |
| ----------------- | -------------- | ----------------------------------------- |
| `/`               | Home           | Hero, features, testimonials, stats       |
| `/about`          | About          | Mission, timeline, core values, team      |
| `/services`       | Services       | Service cards with pricing info           |
| `/how-it-works`   | How It Works   | Step-by-step process guide                |
| `/pricing`        | Pricing        | Tiered plans with monthly/yearly toggle   |
| `/contact`        | Contact        | Contact form with Mailtrap integration    |
| `/login`          | Auth (Login)   | Sign in with email or Google              |
| `/signup`         | Auth (Signup)  | Create account with name, email, password |
| `/checkout`       | Checkout       | Billing, review, and PayHere payment      |
| `/thank-you`      | Thank You      | Order confirmation page                   |
| `/payment-failed` | Payment Failed | Error page with retry option              |
| `/my-messages`    | My Messages    | View submitted messages and replies       |

## Backend APIs

The React app communicates with PHP backend endpoints:

| Endpoint               | Method | Description                                 |
| ---------------------- | ------ | ------------------------------------------- |
| `/api/contact.php`     | POST   | Submit contact form                         |
| `/api/my-messages.php` | POST   | Fetch user's messages (requires `user_uid`) |
| `/api/payment-notify`  | POST   | PayHere webhook                             |

## Project Structure

```
src/
├── assets/          # Lottie JSON animations
├── components/      # Reusable UI components
│   ├── hero/        # Hero section & navbar
│   ├── team/        # Team member cards
│   └── ui/          # GlassCard, BorderGlow, Accordion, etc.
├── context/         # React contexts (AuthContext)
├── data/            # Static data (team members)
├── lib/             # Firebase, animations, utilities
└── pages/           # Route page components
```

## Features

- Responsive mobile-first design (375px → 1440px)
- Glassmorphism UI with backdrop blur effects
- Animated scroll reveals and micro-interactions
- Firebase authentication (email/password + Google)
- PayHere sandbox payment integration
- Lazy-loaded routes with React Suspense
- Three.js animated hero backgrounds

## Screenshots

![Home](screen_shot/Screenshot%202026-06-15%20113020.png)
![About](screen_shot/Screenshot%202026-06-15%20113049.png)
![Services](screen_shot/Screenshot%202026-06-15%20113029.png)
![How It Works](screen_shot/Screenshot%202026-06-15%20113036.png)
![Pricing](screen_shot/Screenshot%202026-06-15%20113041.png)
![Contact](screen_shot/Screenshot%202026-06-15%20113054.png)
![Login](screen_shot/Screenshot%202026-06-15%20113105.png)
![Sign Up](screen_shot/Screenshot%202026-06-15%20113113.png)

## Deployment

The site is hosted on **Firebase Hosting** at [luminal-systems-f6b13.web.app](https://luminal-systems-f6b13.web.app). The PHP backend requires a PHP-compatible hosting platform with MySQL support.

## License

MIT
