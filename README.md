# Moving Company (MERN Capstone)

A full-stack **MERN** project for a moving/removals business:

- Customers can **check service areas**, **request a quote (inquiry)**, and **book instantly**
- Admin can **manage service areas**, **view/manage inquiries**, and **view bookings**

> Frontend is built first using **Vite + React + Tailwind CSS** with a **mock API** (so UI is finished fast).  
> Later, swap the mock API for the real **Express + MongoDB** backend.

## cd

## ✨ Features

### Customer

- Home landing page (conversion-focused)
- Service Areas list + search/filter
- Quote / Inquiry form
- Instant Booking form
- Success confirmation screens

### Admin

- Admin login (JWT)
- Dashboard summary
- Manage Service Areas (CRUD + Active/Inactive)
- Manage Inquiries (status updates, add quote)
- View Bookings

---

## 🧰 Tech Stack

### Frontend

- React (Vite)
- Tailwind CSS
- React Router
- Axios (when backend connected)
- (Optional) react-hook-form + zod for validation

### Backend

- Node.js + Express
- MongoDB + Mongoose
- JWT Auth + bcrypt
- Validation (zod/joi)
- dotenv, cors

---

## 📁 Project Structure (Monorepo)
