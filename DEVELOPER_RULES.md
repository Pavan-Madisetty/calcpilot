# CalcPilot / ZeroEMI Development Guidelines

This file defines the strict architectural and UI/UX styling rules for zeroemi.in. 
All code edits, new features, and redesigns MUST comply with these rules.

---

## 1. Global Multi-Platform Scope Rule
- **Dual-Platform Alignment**: Every calculator must exist on both the **Web Client** (Next.js) and the **Mobile App** (React Native). 
- **Sidebar & Selector Sync**: When adding a new calculator:
  - Add it to the sidebar category layout on web inside `web/src/components/CalculatorsLayout.tsx`.
  - Add it to the category grouping array `calculatorsList` inside `mobile/App.tsx`.
  - Make sure the URLs, names, and category names are aligned.

---

## 2. Web UI/UX Design System
- **Results Card Styling**: All calculator output/results sections must use the premium deep blue gradient style:
  ```html
  <div className="bg-gradient-to-tr from-indigo-900 to-slate-900 text-white p-6 rounded-2xl shadow-sm border border-slate-800 space-y-5">
  ```
- **Text Contrast on Results**:
  - Use `text-indigo-300` for labels.
  - Use `text-white` for values.
  - Use `text-emerald-400` for savings/positive yields.
  - Use `text-rose-400` for costs/charges/tax liabilities.
- **Inputs**: Form groups should use standard light slate backgrounds with dark slate borders (`border-slate-200`) and indigo focus states.

---

## 3. Mobile UI/UX Design System
- **Results Container Styling**: Results containers must use the dark indigo theme to match the web app:
  ```typescript
  resultsContainer: {
    marginTop: 12,
    backgroundColor: '#1e1b4b',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#312e81',
  }
  ```
- **Text & Highlighting Color Codes**:
  - Labels (`resultLabel`): `#a5b4fc` (light indigo)
  - General values (`resultValue`): `#ffffff` (white)
  - Main Highlights (`resultValueHighlight`): `#38bdf8` (sky blue)
  - Green/Savings highlights: `#34d399` (emerald-400)
  - Red/Costs/Tax highlights: `#fb7185` (rose-400)

---

## 4. How to Invoke Rules in Prompts
When prompting me or another assistant in the future, you can write:
> "Add a new XYZ calculator. Keep it consistent with [DEVELOPER_RULES.md](file:///Users/Pavan.Madisetty/Pavan/Projects/calcpilot/DEVELOPER_RULES.md) (please view this as a skill file first) and implement it on both Web and Mobile."
