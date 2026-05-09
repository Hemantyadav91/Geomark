# GeoMark — Geo-Fencing Attendance System

GeoMark is a modern geo-fencing based attendance management system built for colleges and universities.  
It validates a student’s physical classroom presence using live GPS location before allowing attendance submission.

The project focuses on:
- clean architecture
- modern UI/UX
- real-world attendance workflow
- lightweight and scalable frontend engineering

---

## ✨ Features

### 🔐 Authentication & Role-Based Access
- Firebase Authentication
- Google Sign-In
- Email/Password Authentication
- Role-based dashboards
  - Student
  - Teacher/Admin

---

### 📍 Geo-Fencing Attendance Validation
- Live GPS location access
- Geo-fence radius validation
- Distance calculation using `geolib`
- Attendance allowed only inside the permitted zone
- GPS accuracy validation

---

### 👨‍🏫 Teacher Features
- Create attendance sessions
- Configure attendance radius
- Manage active sessions
- View attendance records

---

### 👨‍🎓 Student Features
- View active attendance sessions
- Real-time attendance eligibility status
- Mark attendance
- View attendance history

---

### 🎨 Modern UI/UX
- Minimal SaaS-inspired interface
- Mobile-first responsive design
- Clean typography and spacing
- Smooth animations with Framer Motion
- Built using `shadcn/ui`

---

## 🛠 Tech Stack

### Frontend
- React
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion

### Backend & Database
- Firebase Authentication
- Cloud Firestore

### Geo Location
- HTML5 Geolocation API
- geolib

### UI & Utilities
- shadcn/ui
- lucide-react

---

## 📂 Project Structure

```bash
src/
│
├── components/
├── pages/
├── layouts/
├── hooks/
├── services/
├── context/
├── routes/
├── firebase/
├── utils/
└── types/
```

---

## 🚀 Getting Started

### 1. Clone Repository

```bash
git clone <your-repository-url>
cd geomark
```

---

### 2. Install Dependencies

```bash
npm install
```

---

### 3. Setup Environment Variables

Create a `.env` file in the project root.

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

You can find these values in:

Firebase Console → Project Settings → Web App

---

### 4. Setup Firebase

Create a Firebase project and enable:

#### Authentication
Enable:
- Google Sign-In
- Email/Password

#### Firestore Database
Create Firestore Database in:
- Test mode (development)
- Production rules before deployment

---

### 5. Run Development Server

```bash
npm run dev
```

Application runs on:

```bash
http://localhost:5173
```

---

## 🔥 Firestore Collections

### users

```json
{
  "uid": "",
  "name": "",
  "email": "",
  "role": "student"
}
```

---

### sessions

```json
{
  "subject": "",
  "teacherId": "",
  "teacherName": "",
  "radius": 100,
  "latitude": 0,
  "longitude": 0,
  "startTime": "",
  "endTime": "",
  "isActive": true
}
```

---

### attendance

```json
{
  "studentId": "",
  "studentName": "",
  "sessionId": "",
  "subject": "",
  "timestamp": "",
  "status": "present"
}
```

---

## 📍 Geo-Fencing Workflow

```text
Teacher creates attendance session
↓
Session stores classroom GPS coordinates
↓
Student opens dashboard
↓
App fetches live GPS location
↓
Distance is calculated using geolib
↓
Attendance allowed only inside radius
```

---

## 🔒 Security Notes

### Firebase API Keys
Firebase frontend configuration keys are public by design and safe to expose in frontend applications.

Security is enforced using:
- Firebase Authentication
- Firestore Security Rules

---

### GPS Restrictions
The Geolocation API requires:
- HTTPS in production
- Browser location permission

Vercel deployments automatically support HTTPS.

---

## 🌐 Deployment

This project is optimized for deployment on:

[Vercel](https://vercel.com?utm_source=chatgpt.com)

### Deployment Steps

1. Push code to GitHub
2. Import repository into Vercel
3. Add environment variables
4. Deploy

---

## ⚡ Future Improvements

Possible future enhancements:
- Attendance analytics
- QR fallback attendance
- Session auto-expiry
- Push notifications
- Offline attendance sync

---

## 👨‍💻 Author

Built by Hemant Kumar Yadav

---

## 📄 License

This project is built for educational purposes.