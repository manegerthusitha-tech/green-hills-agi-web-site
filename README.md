# 🌿 Green Hills Agriculture Web Portal

[![Next.js](https://img.shields.io/badge/Next.js-16.2.9-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.4-blue?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://www.typescriptlang.org/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-orange?logo=mysql)](https://www.mysql.com/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-Proprietary-green)](#)

Official web portal and administrative management system for **Green Hills Agriculture**, leading producers and exporters of premium *Centella Asiatica* (Gotu Kola) products located in Chilaw, Sri Lanka.

---

## 📑 Table of Contents

- [Overview](#-overview)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Getting Started](#-getting-started)
- [Database & Admin Authentication Setup](#-database--admin-authentication-setup)
  - [Why There Is No Public Sign-Up](#why-there-is-no-public-sign-up)
  - [How Admin Credentials & Encryption Work](#how-admin-credentials--encryption-work)
  - [Step-by-Step Initial Database Setup](#step-by-step-initial-database-setup)
  - [Resetting or Changing Admin Password](#resetting-or-changing-admin-password)
- [Gallery & Google Drive Integration](#-gallery--google-drive-integration)
  - [Architecture & Storage Flow](#architecture--storage-flow)
  - [Google Cloud Console Configuration](#1-google-cloud-console-configuration)
  - [Generating OAuth 2.0 Refresh Token](#2-generating-oauth-20-refresh-token)
  - [Category Folders Configuration](#3-category-folders-configuration)
- [Contact Form & SMTP Configuration](#-contact-form--smtp-configuration)
- [Environment Variables Reference](#-environment-variables-reference)
- [Available Scripts](#-available-scripts)
- [Project Directory Structure](#-project-directory-structure)
- [Security Considerations](#-security-considerations)

---

## 🌟 Overview

The web platform features:
- **Public Website**: Showcase of organic farm operations, premium dehydrated/powder Gotu Kola products, global export services, international certifications, news, and inquiries.
- **Dynamic Media Gallery**: Live photo gallery categorized into `farm`, `production`, `products`, and `visitors`, powered directly by Google Drive API.
- **Admin Management Portal** (`/admin`): Secure portal protected by session cookies, allowing authorized admins to upload and delete gallery media.
- **Automated Contact System**: Direct SMTP delivery of buyer inquiries with instant customer confirmation emails.

---

## 🛠 Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router & Turbopack)
- **Frontend Library**: [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Database**: [MySQL](https://www.mysql.com/) via [`mysql2/promise`](https://github.com/sidorares/node-mysql2)
- **Security & Encryption**: [`bcryptjs`](https://www.npmjs.com/package/bcryptjs) (Salted 10-round password hashing) + Web Crypto HMAC SHA-256 JWT sessions
- **Storage / Cloud Media**: [Google Drive API v3](https://developers.google.com/drive) (OAuth 2.0 Refresh Token Flow)
- **Mailing**: [Nodemailer](https://nodemailer.com/) (SSL SMTP)
- **Icons & Animation**: [Lucide React](https://lucide.dev/) & [Framer Motion](https://www.framer.com/motion/)

---

## 📋 Prerequisites

Before running the project, ensure you have installed:
- **Node.js**: `v18.18.0` or later (Node 20+ recommended)
- **npm** or **pnpm** / **yarn**
- **MySQL Server**: Running on port `3306` (e.g. MySQL Server 8.0, XAMPP, Laragon, or Docker)

---

## 🚀 Getting Started

### 1. Clone & Install Dependencies

```bash
git clone https://github.com/SachinthaNimesh370/Green-Hills-Agi-Web-Site.git
cd Green-Hills-Agi-Web-Site
npm install
```

### 2. Configure Environment Variables

Copy the provided example environment template:

```bash
cp .env.example .env
```

Open `.env` in your editor and configure your MySQL credentials and secrets:

```env
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=123123
DB_NAME=green_hills_db

ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
JWT_SECRET=your_super_secret_jwt_key
```

### 3. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔐 Database & Admin Authentication Setup

### Why There Is No Public Sign-Up

To prevent unauthorized access and protect company data and media uploads, **a public registration page is intentionally not available**. Only pre-authorized administrators can access the admin dashboard.

### How Admin Credentials & Encryption Work

- Passwords are **never stored in plain text**.
- All passwords are encrypted using **`bcrypt` with 10 salt rounds** before insertion into MySQL.
- Upon login at `/admin`, the user's plain-text input is verified against the stored hash using `bcrypt.compare()`.
- Upon successful authentication, a secure HTTP-only cookie (`admin_session`) is signed using HMAC SHA-256.

### Step-by-Step Initial Database Setup

You can set up the database and create the initial admin user using **either** of the following methods:

#### Method A: Automated CLI Setup (Recommended)

Run the included database initialization script:

```bash
npm run db:setup
```

What this script does automatically:
1. Connects to MySQL on port `3306` using `DB_USER` and `DB_PASSWORD`.
2. Creates the database `green_hills_db` with `utf8mb4` encoding if it doesn't already exist.
3. Creates the `admin_users` table:
   ```sql
   CREATE TABLE IF NOT EXISTS `admin_users` (
     `id` INT AUTO_INCREMENT PRIMARY KEY,
     `username` VARCHAR(100) NOT NULL UNIQUE,
     `password` VARCHAR(255) NOT NULL,
     `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
   ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
   ```
4. Reads `ADMIN_USERNAME` and `ADMIN_PASSWORD` from `.env`.
5. Encrypts the password with `bcrypt` (10 rounds) and inserts the admin record into MySQL.

#### Method B: Automatic On-Demand Initialization

The application runtime in [`src/lib/db.ts`](file:///c:/Users/sachi/Desktop/Thusitha/Green-Hills-Agi-Web-Site/src/lib/db.ts) includes self-healing database initialization. When the server receives its first admin login request, it will automatically ensure the database, table, and default admin user exist.

#### Default Admin Credentials:
- **Admin Login URL**: [http://localhost:3000/admin](http://localhost:3000/admin)
- **Username**: `admin`
- **Password**: `admin123`

---

### Resetting or Changing Admin Password

#### 1. Change via Web API (When Logged In)
Authenticated administrators can call the password change endpoint:
- **Endpoint**: `POST /api/admin/change-password`
- **Body**:
  ```json
  {
    "currentPassword": "admin123",
    "newPassword": "yourNewSecurePassword!"
  }
  ```

#### 2. Reset via CLI Script
To reset the admin password from the command line:
1. Update `ADMIN_PASSWORD` in your `.env` file to your new password.
2. Run:
   ```bash
   npm run db:setup
   ```
   The script will generate a new bcrypt hash and update the database record.

---

## 📸 Gallery & Google Drive Integration

### Architecture & Storage Flow

The gallery displays media categorized into:
- 🌾 **Farm** (`farm`): Cultivation and harvesting operations
- 🏭 **Production** (`production`): Dehydration, grinding, and packing facilities
- 🌿 **Products** (`products`): Packaged Gotu Kola flakes and tea bags
- 👥 **Visitors** (`visitors`): Delegations and client visits

Instead of using Service Accounts (which have a strict 0 GB storage quota on personal Google Drive accounts), the site uses **Google OAuth 2.0 Refresh Token Flow**. This allows media uploaded via the admin dashboard to store directly inside a designated Google Drive account and stream seamlessly to visitors.

```
[Admin Dashboard] ──> [Next.js API Route (/api/gallery/upload)]
                             │
                      Google Drive API v3
                    (OAuth 2.0 Refresh Token)
                             │
                             ▼
              [Google Drive Target Folder]
```

### 1. Google Cloud Console Configuration

1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Create a new project (e.g. `Green Hills Web`).
3. Enable the **Google Drive API**:
   - Navigate to **APIs & Services** → **Library**.
   - Search for **Google Drive API** and click **Enable**.
4. Configure the **OAuth Consent Screen**:
   - Choose **External** user type.
   - Fill in the App Name and developer email.
   - Add the scope: `https://www.googleapis.com/auth/drive`.
   - Add your Google account under **Test Users**.
5. Create **OAuth 2.0 Credentials**:
   - Navigate to **APIs & Services** → **Credentials**.
   - Click **Create Credentials** → **OAuth client ID**.
   - Select Application type: **Web application**.
   - Under **Authorized redirect URIs**, add:
     ```
     http://localhost:3333/callback
     ```
   - Click **Create** and copy your **Client ID** and **Client Secret**.

---

### 2. Generating OAuth 2.0 Refresh Token

A helper script is provided in [`scripts/get-refresh-token.js`](file:///c:/Users/sachi/Desktop/Thusitha/Green-Hills-Agi-Web-Site/scripts/get-refresh-token.js).

1. Run the script with your Google credentials:
   ```bash
   node scripts/get-refresh-token.js YOUR_GOOGLE_CLIENT_ID YOUR_GOOGLE_CLIENT_SECRET
   ```
2. The terminal will output an authorization URL. Open it in your web browser.
3. Sign in with the Google Account that will host the gallery images and grant drive permissions.
4. The local listener on port `3333` will catch the code and print your **Refresh Token** in the console:
   ```
   ✅ REFRESH TOKEN: 1//04xxxx...
   ```
5. Copy the generated values to your `.env` file:
   ```env
   GOOGLE_CLIENT_ID=your_client_id.apps.googleusercontent.com
   GOOGLE_CLIENT_SECRET=your_client_secret
   GOOGLE_REFRESH_TOKEN=1//04xxxx...
   ```

---

### 3. Category Folders Configuration

1. In your Google Drive, create 4 folders:
   - `Farm`
   - `Production`
   - `Products`
   - `Visitors`
2. Open each folder in your browser. The Folder ID is the last segment of the URL:
   `https://drive.google.com/drive/folders/`**`15iE2TP4gV_1iICvgojVJs-eBPB9079p2`**
3. Add the IDs to your `.env` file (or keep the defaults):
   ```env
   FARM_FOLDER_ID=your_farm_folder_id
   PRODUCTION_FOLDER_ID=your_production_folder_id
   PRODUCTS_FOLDER_ID=your_products_folder_id
   VISITORS_FOLDER_ID=your_visitors_folder_id
   ```

---

## ✉️ Contact Form & SMTP Configuration

When prospective clients submit inquiries on `/contact`, the application sends an HTML notification email to your team inbox and an automatic confirmation reply to the sender.

Configure your SMTP credentials in `.env`:

```env
SMTP_HOST=mail.yourdomain.com
SMTP_PORT=465
SMTP_USER=info@greenhillsagri.com
SMTP_PASS=your_email_password
SMTP_TO=info@greenhillsagri.com
```

---

## ⚙️ Environment Variables Reference

| Variable | Description | Default / Example | Required |
| :--- | :--- | :--- | :--- |
| `DB_HOST` | MySQL Server Hostname | `127.0.0.1` | **Yes** |
| `DB_PORT` | MySQL Server Port | `3306` | **Yes** |
| `DB_USER` | MySQL Username | `root` | **Yes** |
| `DB_PASSWORD` | MySQL Password | `123123` | **Yes** |
| `DB_NAME` | Database Name | `green_hills_db` | **Yes** |
| `ADMIN_USERNAME` | Default Administrator Username | `admin` | **Yes** |
| `ADMIN_PASSWORD` | Default Administrator Password | `admin123` | **Yes** |
| `JWT_SECRET` | Secret key for signing admin session cookies | *random secure string* | **Yes** |
| `GOOGLE_CLIENT_ID` | Google OAuth Client ID | `*.apps.googleusercontent.com` | For Gallery |
| `GOOGLE_CLIENT_SECRET` | Google OAuth Client Secret | `GOCSPX-...` | For Gallery |
| `GOOGLE_REFRESH_TOKEN` | Google OAuth 2.0 Refresh Token | `1//04...` | For Gallery |
| `FARM_FOLDER_ID` | Google Drive Folder ID for farm media | *Folder ID* | Optional |
| `PRODUCTION_FOLDER_ID` | Google Drive Folder ID for production media | *Folder ID* | Optional |
| `PRODUCTS_FOLDER_ID` | Google Drive Folder ID for products media | *Folder ID* | Optional |
| `VISITORS_FOLDER_ID` | Google Drive Folder ID for visitors media | *Folder ID* | Optional |
| `SMTP_HOST` | Outgoing SMTP mail server | `mail.example.com` | For Inquiries |
| `SMTP_PORT` | SMTP port (`465` for SSL, `587` for TLS) | `465` | For Inquiries |
| `SMTP_USER` | SMTP username/email address | `info@greenhillsagri.com` | For Inquiries |
| `SMTP_PASS` | SMTP account password | *password* | For Inquiries |
| `SMTP_TO` | Destination inbox for visitor inquiries | `info@greenhillsagri.com` | For Inquiries |

---

## 📜 Available Scripts

In the project root, you can run:

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the Next.js development server at `http://localhost:3000` |
| `npm run build` | Compiles and builds the production bundle |
| `npm run start` | Runs the production server |
| `npm run lint` | Runs ESLint to check for code formatting and quality issues |
| `npm run db:setup` | Initializes MySQL database & seeds encrypted admin user credentials |

---

## 📁 Project Directory Structure

```text
Green-Hills-Agi-Web-Site/
├── public/                     # Static media assets, logos, and icons
├── scripts/
│   ├── get-refresh-token.js    # CLI helper to retrieve Google OAuth refresh token
│   └── setup-db.js             # MySQL setup & bcrypt admin seeding script
├── src/
│   ├── app/
│   │   ├── admin/
│   │   │   ├── page.tsx        # Admin login page (/admin)
│   │   │   └── dashboard/      # Admin dashboard for gallery uploads & management
│   │   ├── api/
│   │   │   ├── admin/
│   │   │   │   ├── login/      # MySQL bcrypt login authentication endpoint
│   │   │   │   ├── logout/     # Session cookie invalidation
│   │   │   │   ├── session/    # Active session verification
│   │   │   │   └── change-password/ # Admin password update endpoint
│   │   │   ├── contact/        # SMTP inquiry submission & auto-reply handler
│   │   │   └── gallery/        # Google Drive media list, upload, & delete APIs
│   │   ├── gallery/            # Public gallery page with category filtering
│   │   ├── products/           # Product catalogue page
│   │   ├── about/              # Company history and farm background
│   │   ├── contact/            # Interactive contact and inquiry form
│   │   └── page.tsx            # Main homepage
│   ├── components/             # Reusable UI components & layouts
│   ├── lib/
│   │   ├── auth.ts             # JWT session encoding & cookie management
│   │   ├── db.ts               # MySQL connection pool & bcrypt verification
│   │   └── googleDrive.ts      # Google Drive API v3 client & streaming proxy
│   └── middleware.ts           # Route guard protecting /admin/dashboard
├── .env.example                # Example environment variable template
├── package.json                # Project dependencies and script declarations
├── tsconfig.json               # TypeScript configuration
└── README.md                   # Project documentation
```

---

## 🔒 Security Considerations

- **Password Hashing**: Passwords stored in MySQL use `bcryptjs` with a cost factor of 10. Passwords are never logged or stored unhashed.
- **Session Protection**: Administrative sessions are stored in an `httpOnly`, `sameSite=lax` cookie with cryptographically signed tokens to prevent XSS credential theft.
- **Protected Routes**: Next.js route middleware strictly checks valid sessions before allowing access to `/admin/dashboard/*`.
- **SQL Injection Prevention**: All queries to the MySQL database use parameterized prepared statements (`?` placeholders via `mysql2`).

---

## 👥 Support & Inquiries

For technical support or inquiries regarding Green Hills Agriculture:
- **Email**: info@greenhillsagri.com
- **Phone**: +94 77 465 2552
- **Location**: Manuwangama/E, Chilaw, Sri Lanka
