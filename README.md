# 🎯 HireHunt

Will be live at: <https://hirehunt.tech>

A modern, full-stack SaaS application for tracking job applications, interviews, and follow-ups. Built to solve the pain of managing hundreds of job applications during the job search process.

![Next.js](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Prisma](https://img.shields.io/badge/Prisma-Latest-2D3748)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38B2AC)

---

## To-do List

**Now Working On:**
Follow-Up Email Reminders

1. Individial Application Page 🛑
2. Quick Status Update 
3. Improve UI
   1. Improve Data Table
4. Reminders 📍
   1. Add Reminder From Application Page ✅
   2. Email Utility ✅
   3. Cron Job Endpoint ✅
   4. Schedule Email Send on Vercel ✅
5. Applications Timeline
6. Export to Sankey Diagram

## Tech Stack

**Frontend**

* Next.js 15 (App Router)
* TypeScript
* Tailwind CSS
* shadcn/ui

**Backend**

* Next.js Route Handlers / Server Actions
* Prisma ORM
* PostgreSQL (Neon)

**Authentication**

* Clerk

**Deployment**

* Vercel (frontend + backend)
* Neon (database)

---

## Core Features

### Authentication

* Secure sign up and sign in using Clerk
* User-specific data isolation (each user only sees their own applications)
* Automatic user provisioning on first login

---

### Application Tracking

Users can manage all job applications in one place, including:

* Company name
* Position title
* Date applied
* Application status (Applied, Interview, Offer, Rejected, Ghosted)
* Optional follow-up date

Applications can be:

* Created
* Viewed
* Updated
* Deleted

---

### Dashboard

A centralized dashboard displaying:

* A list or table of all applications
* Status indicators for quick visual scanning
* Filtering by application status
* Sorting by date applied or company

---

### Analytics

Insights into the user’s job search, including:

* Applications submitted over time
* Response rate (applications that progressed beyond “Applied”)
* Interview conversion rate
* Status distribution breakdown

---

### Follow-Up Reminders

* Users can set follow-up dates on applications
* Email or SMS reminders are sent when a follow-up date is reached
* Helps users stay consistent with outreach and networking

---

### Import / Export

* Import applications from CSV or Excel files
* Export existing application data to CSV or Excel
* Enables easy migration from spreadsheets or backups

---

## Status

This project is under active development.
