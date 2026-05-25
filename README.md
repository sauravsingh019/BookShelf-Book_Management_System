# 📚 BookShelf — Book Management System

A React-based book management application designed to manage personal book collections with full CRUD operations, API integration, search, filtering, sorting, and responsive UI components.

🔗 **Live Demo:** [Add Deployment Link]  
📁 **Repository:** [Add GitHub Link]

---

# 📖 Table of Contents

- Features
- Tech Stack
- Project Structure
- Installation
- Environment Variables
- Available Scripts
- API Integration
- Deployment
- Assignment Requirement Mapping

---

# ✨ Features

### Book Management
- View all books
- Add new books
- Update existing books
- Delete books

### Search & Filtering
- Search by title or author
- Filter books by genre
- Sort books by:
  - Newest
  - Oldest
  - Title (A–Z)
  - Author (A–Z)

### User Experience
- Loading skeletons
- Toast notifications
- Empty states
- Form validation
- Confirmation dialogs
- Responsive design

---

# 🛠 Tech Stack

| Technology | Purpose |
|------------|----------|
| React 18 | Frontend framework |
| Axios | API requests |
| MockAPI | Backend service |
| CSS3 | Styling |
| React Hooks | State management |

---

# 📂 Project Structure

```bash
book-management/
│
├── public/
│   └── index.html
│
├── src/
│   ├── components/
│   │   ├── BookCard.jsx
│   │   ├── BookForm.jsx
│   │   ├── SearchFilter.jsx
│   │   ├── Toast.jsx
│   │   ├── Skeleton.jsx
│   │   ├── EmptyState.jsx
│   │   └── ConfirmDialog.jsx
│   │
│   ├── hooks/
│   │   └── useBooks.js
│   │
│   ├── utils/
│   │   └── api.js
│   │
│   ├── App.jsx
│   ├── index.js
│   └── index.css
│
├── .env
├── package.json
└── README.md
```

---

# ⚙️ Installation

Clone repository:

```bash
git clone <repository-link>
cd book-management
```

Install dependencies:

```bash
npm install
```

Run project:

```bash
npm start
```

Application runs at:

```bash
http://localhost:3000
```

---

# 🔐 Environment Variables

Create a `.env` file:

```env
REACT_APP_API_BASE_URL=your_api_url
```

Example:

```env
REACT_APP_API_BASE_URL=https://mockapi.io/api/books
```

---

# 📡 API Integration

Application performs:

- GET → Fetch books
- POST → Add book
- PUT → Update book
- DELETE → Remove book

API requests are handled using Axios with centralized configuration.

---

# 📜 Available Scripts

Start development server:

```bash
npm start
```

Build production version:

```bash
npm run build
```

Run tests:

```bash
npm test
```

---

# 🚀 Deployment

Supported deployment platforms:

- Vercel
- Netlify

Build command:

```bash
npm run build
```

Publish directory:

```bash
build
```

---

# ✅ Assignment Requirement Mapping

| Requirement | Status |
|-------------|---------|
| CRUD Operations | ✅ Implemented |
| API Integration | ✅ Implemented |
| Search Functionality | ✅ Implemented |
| Genre Filtering | ✅ Implemented |
| Loading States | ✅ Implemented |
| Error Handling | ✅ Implemented |
| Responsive Design | ✅ Implemented |
| Clean Code Structure | ✅ Implemented |

---

# 📌 Notes

- Uses React functional components and hooks
- API data is cloud-persisted through MockAPI
- Responsive layout supported across devices
- Focused on maintainable component structure and reusable logic
