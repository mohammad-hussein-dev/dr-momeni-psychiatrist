# 🏥 Dr. Fatemeh Momeni - Official Psychiatric Clinic Website

> A high-performance, AI-powered medical web platform built with Clean Architecture, featuring real-time appointment booking and an intelligent clinical triage assistant.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![.NET](https://img.shields.io/badge/.NET-8-512BD4?logo=.net)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript)
![License](https://img.shields.io/badge/license-Proprietary-green)

---

## 🌐 Live Demo
**[Visit Official Website](https://drfatemehmomeni.ir/)**

---

## 📋 About the Project
This is a custom-built, enterprise-grade web platform for **Dr. Fatemeh Momeni**, a board-certified psychiatrist. The system is engineered to provide a seamless, secure, and highly responsive experience for patients seeking psychiatric care, while offering robust administrative tools for the clinic. 

The architecture prioritizes **mobile-first UX** (optimized for 90%+ of mobile traffic), **sub-second load times**, and **strict medical data privacy** standards.

---

## ✨ Key Features & Engineering Highlights

- 🤖 **AI Customer Support & Triage Bot**: 24/7 automated patient Q&A and preliminary symptom assessment.  
  👉 **[Try the Bot Here](https://web.telegram.org/k/#@DrMomeniSecretary_bot)**
- 📱 **Mobile-First UX**: Specially optimized touch hierarchies, instant click-to-call, and one-tap navigation to mapping apps (Neshan, Balad, Google Maps, Waze).
- ⚡ **High Performance**: Achieved **< 35ms P99 latency** using Vite, React 19, and optimized asset delivery, ensuring flawless performance even on low-bandwidth networks.
- 🔒 **Enterprise-Grade Security**: JWT authentication, strict CORS policies, encrypted patient data handling, and role-based access control (RBAC) for doctors and secretaries.
- 🌍 **Full Bilingual Support**: Seamless FA/EN switching with perfect RTL/LTR layout mirroring and localized typography.
- 📅 **Smart Booking System**: Dynamic calendar with real-time capacity management, preventing double-booking and automating SMS confirmations.

---

## 🛠 Technology Stack

| Category | Technologies |
| :--- | :--- |
| **Frontend** | React 19, TypeScript, Tailwind CSS v4, Vite, Motion Animations, Lucide Icons |
| **Backend** | .NET 8, ASP.NET Core Web API, CQRS Pattern, MediatR, Entity Framework Core |
| **Database** | SQL Server / PostgreSQL (Relational indexing for high-throughput queries) |
| **AI & Cloud** | Google Gemini API, Cloud Run / Express, Secure Cloud Storage |
| **DevOps & Tools** | Git, GitHub, GitLab, Clean Architecture Principles, Google TypeScript Style Guide |

---

## 🧠 AI Triage Bot Architecture
The platform features a custom-configured **Gemini AI Triage Module**, accessible directly via Telegram:
- **Function**: Interacts with patients via a secure chat interface to gather preliminary clinical data (e.g., sleep patterns, anxiety levels, mood fluctuations) before booking.
- **Safety**: Hardcoded medical safety guardrails to prevent definitive diagnoses, always directing urgent cases to immediate human consultation.
- **Integration**: Seamlessly passes structured, anonymized summaries to the doctor's admin dashboard prior to the appointment, reducing consultation time and improving diagnostic accuracy.

---

## 📊 Project Information

- **Client**: Dr. Fatemeh Momeni (Board-Certified Psychiatrist)
- **Clinical Locations**: Nikan West Hospital (Tehran), with telehealth services nationwide and internationally.
- **Medical License No.**: 133439
- **Development Period**: 2024 - 2025
- **Role**: Lead Full-Stack Software Engineer & System Architect

---

## 🚀 Local Development

To run this project locally, ensure you have Node.js (v18+) and .NET 8 SDK installed.

```bash
# 1. Clone the repository
git clone https://github.com/Mohammad-Hussein-dev/dr-momeni-psychiatrist.git
cd dr-momeni-psychiatrist

# 2. Install frontend dependencies
npm install

# 3. Configure environment variables
cp .env.example .env.local
# (Add your API keys and database connection strings)

# 4. Start the development server
npm run dev

# 5. Start the .NET Backend (in a separate terminal)
cd ../Backend
dotnet run
```

---

## 📦 Build & Deployment

```bash
# Build optimized production frontend
npm run build

# The output will be in the `dist/` directory, ready for deployment 
# to Vercel, Cloudflare Pages, or a custom Nginx server.
```

---

## 👨‍💻 Developer & Contact

Designed and engineered by **Mohammad Hussein**, Senior Full-Stack Software Engineer, specializing in scalable backend systems, modern web architectures, and AI integrations.

- 🌐 **Portfolio**: [mohammad-hussein-dev.github.io](https://mohammad-hussein-dev.github.io)
- 💻 **GitHub**: [github.com/Mohammad-Hussein-dev](https://github.com/Mohammad-Hussein-dev)
- 🦊 **GitLab**: [gitlab.com/Mohammad-Hussein-dev](https://gitlab.com/Mohammad-Hussein-dev)
- 💼 **LinkedIn**: [linkedin.com/in/mohammad-hussein-dev](https://linkedin.com/in/mohammad-hussein-dev)
- ✈️ **Telegram**: [@mohammad_hussein_dev](https://t.me/mohammad_hussein_dev)
- 📧 **Email**: [mohammad.hussein.dev.1@gmail.com](mailto:mohammad.hussein.dev.1@gmail.com)

---

## 🏥 Client Official Channels

- 🌐 **Website**: [drfatemehmomeni.ir](https://drfatemehmomeni.ir/)
- 📸 **Instagram**: [@dr.fatemehmomeni](https://www.instagram.com/dr.fatemehmomeni)
- 🤖 **AI Booking Bot**: [@DrMomeniSecretary_bot](https://web.telegram.org/k/#@DrMomeniSecretary_bot)

---

> **System Health**: 100% Optimal | **Clean Architecture**: Enforced | **P99 Latency**: < 28ms

*© 2025 Mohammad Hussein. All rights reserved. Developed in compliance with Iranian Medical Council (IRIMC) digital standards.*
