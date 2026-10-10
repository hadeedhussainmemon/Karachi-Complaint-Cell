# KMC Connect 🏙️

**A Modern Civic Complaint & Management Portal for Karachi Metropolitan Corporation (KMC)**

KMC Connect is a state-of-the-art, mobile-first web application designed to bridge the gap between the citizens of Karachi and their local municipal authorities. It provides a transparent, trackable, and highly automated system for reporting, routing, and resolving everyday civic issues across the megacity.

---

## 🌟 Why is this useful for Karachi?

Karachi is a megacity with a population of over 20 million. Managing civic issues here is incredibly complex due to the sheer size of the city and the fragmentation of utility providers (KMC, Town Municipalities, K-Electric, KW&SB, etc.). 

**KMC Connect solves these problems by:**
1. **Centralizing Complaints:** Citizens don't need to figure out which department to go to. They simply drop a pin, select their issue, and the system auto-routes it to the correct department.
2. **Ensuring Accountability (48-Hour SLAs):** Issues cannot be ignored. If a complaint is not resolved within 48 hours, it is automatically escalated and flagged red for higher authorities (like the Mayor).
3. **Monsoon / Emergency Preparedness:** Karachi faces severe urban flooding during the monsoon. The app includes a dedicated "Rain Emergency Mode" to instantly filter out noise and prioritize life-threatening issues (like electrocution risks and overflowing gutters).
4. **Data-Driven Decision Making:** Admin maps turn escalated complaints into glowing heatmaps, allowing the city to see exactly which towns or streets need immediate operational deployment.

---

## 🚀 Core Features

### For Citizens 👥
* **Smart Issue Reporting:** Submit detailed complaints with photo evidence and precise GPS coordinates.
* **Know Your Representative:** Simply by selecting their KMC District and Town, citizens are instantly shown the Name, Contact, and Photo of their specific Area Representative (Town Chairman).
* **Bilingual UI (Urdu & English):** Native Urdu translation toggle to ensure the app is accessible to every citizen.
* **App-Like Mobile Experience:** Designed as a mobile-first Progressive Web App (PWA) with a bottom navigation bar and large touch targets for easy use on smartphones.
* **Live Tracking:** Track the progress of a complaint via a unique Tracking ID.

### For KMC Administrators & Mayors 🏢
* **Intelligent Auto-Routing:** The backend automatically routes Water issues to KW&SB, Electricity issues to K-Electric, and street issues to Town Operations.
* **SLA Auto-Escalation:** An automated timer flags any complaint unresolved after 48 hours as `ESCALATED`.
* **Issue Heatmaps:** An interactive Leaflet map that displays normal complaints as pins, and escalated complaints as glowing red heat zones.
* **Monsoon Emergency Mode:** A one-click dashboard toggle that filters the entire control room to strictly display drainage, rain, and power-hazard emergencies.

---

## 💻 Tech Stack

* **Frontend:** Next.js 15 (App Router), React, Tailwind CSS, Lucide Icons.
* **Backend:** Next.js Server Actions & API Routes.
* **Database:** MongoDB (via Mongoose) with a robust memory fallback mechanism.
* **Mapping:** React-Leaflet (OpenStreetMap).
* **Authentication:** NextAuth.js.

---

## 🛠️ Getting Started (Local Development)

### 1. Prerequisites
Ensure you have Node.js (v18+) and npm installed.

### 2. Installation
Clone the repository and install dependencies:
```bash
git clone https://github.com/hadeedhussainmemon/Karachi-Complaint-Cell.git
cd Karachi-Complaint-Cell
npm install
```

### 3. Environment Variables
Create a `.env.local` file in the root directory:
```env
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=your_super_secret_key
NEXTAUTH_URL=http://localhost:3000
```

### 4. Run the Application
Start the development server:
```bash
npm run dev
```

### 5. Seed Test Data
To instantly test the Heatmaps, SLA Escaltions, and Monsoon modes, you can seed dummy KMC data by visiting:
👉 `http://localhost:3000/api/seed` in your browser while the server is running.

### 6. Test Credentials
* **Admin / Control Room:** `admin@kmc.gos.pk` / `admin123`
* **Citizen Account:** `citizen@gmail.com` / `citizen123`

---

*Developed for the betterment of Karachi.* 💚
