# CalcPilot – Financial & Construction Calculator Suite

CalcPilot is a unified, premium financial and utility calculation platform tailored for Indian consumers. It provides high-fidelity calculators, instant visual insights, interactive graphs, and cross-calculators navigation, alongside a robust ad scheduling engine, user profile configs, and cloud deployment pipelines.

---

## 🧭 Project Architecture

```text
calcpilot/
├── web/                  # Next.js 14+ (App Router, TailwindCSS, Recharts, Lucide Icons)
│   ├── src/app/          # Main interactive pages, top navbar, & Admin Login gate
│   ├── src/components/   # EMI, SIP, Tax, CC Rewards, Tiles, Construction UI modules
│   └── src/lib/          # Core math engines & client local store
├── backend/              # NestJS Web API (REST controllers, CORS, validation)
│   └── src/              # Auth, Calculator logs, Ad slot, and Telemetry API controllers
├── mobile/               # React Native Expo app tab navigation
├── database/             # PostgreSQL database schemas and migration scripts
└── .github/workflows/    # Continuous Deployment pipeline from GitHub to Azure
```

---

## 🛠️ Feature Matrix & Redesign

* **End Customer Access**: End users do not need to log in to access the calculator suite.
* **Layout Redesign**: The side menu has been replaced with a premium, responsive **Top Navigation Bar** on the main screens.
* **Theme Styling**: Restricted to a clean, bright, and vibrant **Light Theme** (featuring Sky Blue and Indigo accents, clean white cards, and distinct borders). Dark mode has been removed for a professional finance appearance.
* **Admin Portal Authentication Gateway**: Access to the Admin Portal tab is password protected.
  * **Default Username**: `Pavan.madisetty`
  * **Default Password**: `Kony@1234`
  * **Forgot & Reset Password**: Fully supported via Classic Classic/NPS styled recovery screens.

### 1. Financial Calculators
* **EMI Loan Calculator**: Adjust principal amount, interest rate, tenure, and processing fee. View monthly outgoings, total interest, and an interactive Pie Chart alongside a collapsible yearly amortization breakdown table.
* **SIP Calculator**: Project future returns on mutual fund investments. Render stacked Area Charts representing cumulative investments and accrued wealth gains.
* **Loan Eligibility Calculator**: Estimate maximum borrowing capacity based on monthly income, existing loan EMIs, interest rate, and target tenure. Computes DTI (Debt-to-Income) ratios and provides loan risk ratings.
* **Salary Tax Calculator**: Side-by-side comparison of the Old and New Indian Income Tax regimes (FY 2025-26 rules). Analyzes deductions (Section 80C, 80D, 24b) and offers optimization guidelines.
* **Credit Card Rewards**: Calculate points, airline miles, and hotel partners across popular premium Indian cards (HDFC Infinia, Diners Black, Axis Atlas, Axis Magnus, SBI Elite, ICICI Emeralde, or Custom).

### 2. Construction Calculators
* **Construction Cost Calculator**: Estimate overall construction budgets based on plot size, built-up area, floor counts, and grade quality (Standard, Premium, Luxury) with detailed material and labor cost splits.
* **Tile Calculator**: Estimate floor/wall tiles required for room sizes, incorporating custom wastage percentages (default 10%) and pricing parameters.

---

## 💻 Local Quickstart

### 1. Run Responsive Web App
```bash
cd web
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

### 2. Run NestJS API Server
```bash
cd backend
npm install
npm run start:dev
```
Open [http://localhost:8080/api/v1/health](http://localhost:8080/api/v1/health) to verify REST services.

### 3. Setup PostgreSQL Database
Execute the creation scripts inside [**`database/schema.sql`**](file:///Users/Pavan.Madisetty/Pavan/Projects/database/schema.sql) on your PostgreSQL client.

---

## 🚀 CI/CD: Azure Deployments

Continuous Deployment from GitHub to Azure is automated using GitHub Actions workflows.

### Step 1: Provision Azure Resources
Run the provided CLI bash script to stand up the App Plans, Web Apps (Next.js & NestJS), and PostgreSQL Flexible Server in your Azure account:
```bash
chmod +x ./azure/provision.sh
./azure/provision.sh
```

### Step 2: Configure GitHub Secrets
Go to your GitHub Repository Settings > **Secrets and variables > Actions** and add two publish secrets:
1. `AZURE_WEBAPP_FRONTEND_PUBLISH_PROFILE`
2. `AZURE_WEBAPP_BACKEND_PUBLISH_PROFILE`
