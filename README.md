# 🧠 Items Dashboard – Serverless + React CRUD Application

A modern full-stack Serverless CRUD web application built using the Serverless Framework (Node.js + AWS Lambda architecture) and a React + Tailwind frontend.  
This project demonstrates how a completely serverless system can handle item management (Create, Read, Update, Delete) using API Gateway, Lambda functions, and a mock DynamoDB layer.

---

## 🚀 Overview

The Items Dashboard allows users to:

- Add, edit, update, and delete items.
- View all existing items in a clean, responsive UI.
- Communicate seamlessly between a React frontend and a Serverless backend.
- Run fully offline using `serverless-offline`, simulating AWS Lambda and DynamoDB.

---

## 🧩 Tech Stack

Frontend: React, Vite, Tailwind CSS  
Backend: Node.js (Serverless Framework)  
Serverless Emulation: serverless-offline  
Database (mocked): In-memory array (simulates DynamoDB)  
CI/CD: GitHub Actions (multi-stage YAMLs: dev & prod)

---

## ⚙️ How It Works (End-to-End Flow)

1️⃣ Backend startup:
cd backend
npm install
npm run start

- Launches serverless-offline on http://localhost:3000
- Simulates AWS API Gateway + Lambda functions locally
- Each route (create, list, update, delete) corresponds to a Lambda handler.

2️⃣ Frontend startup:
cd frontend
npm install
npm run dev

- Runs React app on http://localhost:5173
- The api.js file calls backend endpoints like http://localhost:3000/items

3️⃣ User flow:

- Type an item → click Add → POST /items hits createItem Lambda
- Edit/Delete buttons trigger PUT/DELETE Lambdas respectively
- The backend mock DB updates instantly, and React re-renders live.

Flow Diagram:
User (browser)
↓
React Frontend (localhost:5173)
↓
API Requests (fetch)
↓
Serverless Offline (localhost:3000)
↓
Lambda Handlers (create/list/update/delete)
↓
Mock DB (in-memory)
↓
Response → Frontend → UI updates instantly

---

## 🧰 CI/CD Setup

GitHub Actions pipelines automate testing and build verification.

.deploy-dev.yml

- Deploys or prints the Serverless config for dev stage on push to master.

.deploy-prod.yml

- Deploys to prod stage when code is pushed to the release branch.

.frontend-deploy-dev.yml

- Builds and validates the React app (mock deploy).

Once IAM verification is complete, these pipelines can directly deploy to AWS Lambda and DynamoDB using:
serverless deploy --stage dev
serverless deploy --stage prod

---

## 🧭 Local Setup & Run

# 1️⃣ Clone the repository

git clone https://github.com/<your-username>/aws-serverless-crud-items-dashboard.git
cd aws-serverless-crud-items-dashboard

# 2️⃣ Start backend

cd backend
npm install
npm run start # runs serverless-offline on localhost:3000

# 3️⃣ Start frontend

cd ../frontend
npm install
npm run dev # runs React app on localhost:5173

Then open http://localhost:5173 🎨

---

## 🧠 CI/CD Branch Flow

master → triggers deploy-dev.yml (development)
release → triggers deploy-prod.yml (production)

Each YAML workflow runs automatically on push and verifies builds for backend and frontend, ensuring smooth integration between local and cloud stages.

---

## 📹 Demo Video (Loom)

🎥 Add your Loom demo link here : https://www.loom.com/share/c9b920b3cdae40cbb3cd740a183baaaa
Walkthrough includes backend startup, frontend interaction, CRUD demo, and CI/CD explanation.

---

## 🌈 Future Enhancements

- Migrate mock DB → AWS DynamoDB table
- Enable real cloud deploy via serverless deploy
- Integrate authentication using Amazon Cognito
- Add pagination and item search
- Deploy frontend live on Netlify or Vercel

---

## 💙 Credits

Developed by **Muthu Natesan Muthurajan**
🎓 M.S. in Computer Science – Kent State University  
🌐 Passionate about full-stack and serverless development  
💻 LinkedIn: https://www.linkedin.com/in/muthu-natesan-muthurajan-software-developer/
🧾 GitHub: https://github.com/mnatesan18

---

## 🏁 Summary

This project demonstrates a fully functional Serverless CRUD system with a React frontend and GitHub Actions CI/CD pipelines.  
Even running locally, it replicates how real AWS Lambda, API Gateway, and DynamoDB interact — proving scalability, automation, and design excellence.

"From a single push to a running system — the Items Dashboard flows like a true Serverless symphony." 🎶
