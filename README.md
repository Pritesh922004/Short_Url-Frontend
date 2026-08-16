# 🚀 LinkVault - Modern URL Shortener & Analytics Web Application

LinkVault is a modern, fast, and feature-rich URL shortener platform with custom branded aliases, scannable QR codes, and real-time click traffic analytics.

---

## 📋 Comprehensive Architecture & UI Details

### 🛡️ Core Logic & Authentication Persistence
- **API Endpoints**: `CreateShortUrl`, `FetchUrls`, `DeleteUrl`, `SignIn`, `SignUp`, `VerifyUser`, `SignOutUser`.
- **Dual-Layer Session Management**: Axios instance uses `withCredentials: true` with strict cookie tokens alongside an automatic `Authorization: Bearer <token>` fallback header for seamless cross-domain deployments on Railway/Vercel.
- **Redux State Slices**: `AuthSlice` (`isAuthenticated`, `user`) and `UrlSlice` (`urls`).
- **Route Protections**: `ProtectedRoutes`, `NavbarRoutes`, and `NoNavbar` ensure persistent login on page refresh and automatic link fetching.

---

## 📑 Pages Architecture

| Route | Page Component | Description | Access |
| :--- | :--- | :--- | :--- |
| `/` | `Home_page.jsx` | Landing page with hero banner, URL shortener widget, 4 feature cards, and 3-step guide. | Public |
| `/features` | `Features_page.jsx` | Interactive deep dive into Custom Slugs, Analytics, QR Generation, and Redirection Speed. | Public |
| `/pricing` | `Pricing_page.jsx` | Plan comparisons (Starter, Pro, Enterprise) with monthly/annual toggle (20% discount badge). | Public |
| `/faq` | `FAQ_page.jsx` | Searchable FAQ accordions across General, Slugs, Analytics, and Security. | Public |
| `/auth` | `Auth_page.jsx` | Dual-mode authentication card (Sign In & Sign Up) with password toggle & validation. | Public |
| `/dashboard` | `Dashboard.jsx` | User dashboard with personalized greeting, quick shortener, and link management table. | **Protected** |
| `/analytics` | `Analytics_page.jsx` | Real-time click analytics, traffic breakdown bar charts, link KPI metrics, and report export. | **Protected** |
| `*` | `NotFound_page.jsx` | 404 error page with smooth return-to-home navigation. | Public |

---

## 🌐 Environment Configuration

```env
VITE_Domain = https://your-backend-service.up.railway.app/
```
