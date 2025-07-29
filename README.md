# 👥 Employee Management Dashboard

A fully type-safe and modular employee management system designed for HR teams and administrators. Built with scalability and usability in mind, this system allows you to manage employee data seamlessly—from onboarding to offboarding—with powerful filtering, sorting, and analytics features.

---


## ✅ Project Summary

This project allows **Admins/HR Managers** to:

- Add, edit, view, and delete employee records
- Assign roles, departments, supervisors, and statuses
- Track key metadata like hire date, contract type, and probation status
- Filter, search, and sort employees efficiently
- Manage the platform through a strongly-typed, modular architecture

---

## 🧩 Features

### 👤 Employee Management

- Add/edit/delete employee profiles
- Assign department, role, supervisor, and employment status
- Support contract types: `Permanent`, `Contract`, `Intern`
- Store employee details:
  - Full name
  - Email & phone number
  - Hire date
  - Emergency contact

### 🔍 Filtering & Search

- Filter by:
  - Department
  - Role
  - Status (Active, On Leave, etc.)
  - Contract type
- Search employees by:
  - Name
  - ID
  - Email
- Sort employees by:
  - Name (A–Z, Z–A)
  - Hire date (Newest–Oldest, Oldest–Newest)

### 📊 Dashboard Summary

- Total number of employees
- Visual breakdown by:
  - Department
  - Employment status
- Highlight:
  - Newly hired employees
  - Employees on probation

### 🧾 Persistence & Export _(Optional)_

- Persist data using:
  - `localStorage` or `indexedDB`
  - Or connect to a mock API (e.g. [MockAPI.io](https://mockapi.io/))
- Export records to:
  - JSON
  - CSV

---

## 🧠 Bonus Challenges

- 🔐 **Authentication**
  - Admin vs Viewer role-based access control
- 🖼️ **Profile Photos**
  - Support for Base64 strings or external URLs
- 🌙 **Dark Mode**
  - Toggle between light and dark themes

---

## 🛠️ Tech Stack

- **Frontend:** React + Vite
- **Language:** TypeScript
- **Styling:** TailwindCSS
- **State Management:** useState, useMemo (can scale to Zustand/Redux)
- **Data:** MockAPI / localStorage / JSON files

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- Package Manager: `npm`, `pnpm`, or `yarn`

### Installation

```bash
git clone https://github.com/your-username/employee-management-dashboard.git
cd employee-management-dashboard
npm install
npm run dev
```

## 🔑 Login Details

To test the application, use the following credentials:

- **Live Link:** https://employee-dashboard-flax.vercel.app/
- **Email:** rebeca_mckenzie@example.net
- **Password:** h9NRvtuWqDcPd5j
