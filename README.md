# AI-Powered Urban Water Quality Monitoring System

A comprehensive full-stack solution for real-time monitoring and predictive analysis of urban water quality.

## 🚀 Overview

This system provides a modern, responsive dashboard to monitor critical water quality parameters such as pH, TDS (Total Dissolved Solids), Turbidity, and Temperature. It leverages AI models for identifying contaminants and predicting future risks.

## 🛠️ Tech Stack

- **Frontend**: React, Vite, Tailwind CSS, React Router, Lucide Icons.
- **Backend**: Node.js, Express, Mongoose.
- **Database**: MongoDB (via MongoDB Compass).

## 📂 Project Structure

```text
├── server/                 # Backend Node.js/Express application
│   ├── models/            # Mongoose schemas (User, SensorData)
│   ├── .env               # Backend environment variables
│   └── index.js           # Server entry point & API routes
├── src/                    # Frontend React application
│   ├── components/        # Shared UI components (Navbar, Footer)
│   ├── pages/             # Main application pages
│   ├── App.jsx            # Routing and main logic
│   └── index.css          # Global styles & Tailwind directives
├── index.html              # Frontend entry point
├── tailwind.config.js      # Tailwind CSS configuration
└── package.json            # Frontend dependencies and scripts
```

## ⚙️ Setup & Installation

### Prerequisities
- Node.js (v18+)
- MongoDB Compass installed and running on `localhost:27017`

### Backend Setup
1. Navigate to the server directory:
   ```bash
   cd server
   ```
2. Start the backend server:
   ```bash
   node index.js
   ```
   *The server will run on `http://localhost:5000`.*

### Frontend Setup
1. From the root directory, install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
   *The frontend will run on `http://localhost:5173`.*

## 🧪 Initial Data Seeding

If your MongoDB is empty, you can seed initial sensor data by running the following command in a separate terminal:

**Windows (PowerShell):**
```powershell
Invoke-RestMethod -Method Post -Uri "http://localhost:5000/api/seed"
```

**Linux/macOS (cURL):**
```bash
curl -X POST http://localhost:5000/api/seed
```

## 🌟 Key Features

- **Real-time Monitoring**: Polling backend every 5 seconds for the latest sensor data.
- **AI Prediction Alert**: Highlighted alerts based on potential future contamination patterns.
- **Modern Dashboard**: Professional administrative UI with trend analytics.
- **Full Auth Flow**: User registration and login persisted in MongoDB.

## 🛡️ License

This project is open-source and available under the MIT License.
