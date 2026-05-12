# AI Route Advisor
### Intelligent Payment Rail Recommendation for Cross-Border Transfers

**Live Prototype:** 
https://avikcincy-sanju.github.io/AI_SBC_Route_Advisor/

## Overview

The AI Route Advisor is a publicly accessible interactive prototype demonstrating 
intelligent payment routing across multi-rail financial infrastructure. It implements 
the AI Payment Orchestration Framework introduced in peer-reviewed research on 
intelligent and autonomous payment systems.

Given a payment request, the system evaluates available financial rails in real time 
and generates an optimized routing recommendation — including estimated cost, 
settlement time, risk score, and a plain-language explanation of the routing decision.
## What It Does

**Inputs accepted:**
- Amount (USD)
- Destination Country
- Urgency (Low / Medium / High)
- Compliance Sensitivity (Low / Medium / High)
- Preferred Outcome

**Payment rails evaluated:**
- Traditional Banking Rail (ACH / Wire / SWIFT)
- Card Network Rail
- Real-Time Payment Systems
- Blockchain / Stablecoin Settlement Rail

**Output for each transaction:**
- Recommended rail with routing justification
- Estimated cost
- Estimated settlement time
- Compliance rating
- Risk score
- Plain-language explanation of routing decision

**Quick scenario presets include:**
- Global Remittance
- Urgent Supplier Payment
- Marketplace Contractor Payout
- Retail International Purchase
- Corporate Treasury Transfer
- High Compliance Jurisdiction
- Sanctions-Sensitive Destination
- Cross-Border Freelance Payment

## Research Foundation

This prototype implements the conceptual framework introduced in:

**Nandi, A. (2026a).** The Emergence of Intelligent Payment Systems:
An AI-Driven Framework for Multi-Rail Payment Orchestration.
*SSRN Working Paper. April 2026.*
https://papers.ssrn.com/sol3/papers.cfm?abstract_id=6613638

### Full Research Series

This prototype is part of a three-paper research series on the evolution 
of intelligent and autonomous payment systems:

| # | Title | SSRN ID | Date |
|---|---|---|---|
| Paper 1 | The Emergence of Intelligent Payment Systems: An AI-Driven Framework for Multi-Rail Payment Orchestration | [6613638](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=6613638) | April 2026 |
| Paper 2 | AI-Native Intelligent Payment Systems: Autonomous Financial Execution in Multi-Rail Infrastructure | [6708820](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=6708820) | May 2026 |
| Paper 3 | The Sovereign Payment Agent: Governance, Accountability, and Trust Frameworks for Autonomous Financial Execution | [6752899](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=6752899) | May 2026 |

---

## Framework Architecture

The prototype demonstrates the four-layer AI Payment Orchestration Framework:
Intent Layer      →  Defines desired outcome (speed, cost, compliance priority)
Decision Layer    →  AI engine evaluates optimal routing path
Execution Layer   →  Routes transaction across selected rail
Feedback Layer    →  Continuously learns and refines decisions

---

## Technology Stack

- **React** — UI framework
- **TypeScript** — type-safe implementation
- **Tailwind CSS** — styling
- **Vite** — build tooling
- **GitHub Pages** — free permanent hosting

---

## How to Run Locally

```bash
git clone https://github.com/avikcincy-sanju/AI_SBC_Route_Advisor.git
cd AI_SBC_Route_Advisor
npm install
npm run dev
```

Open http://localhost:5173 in your browser.

---

## Citation

If referencing this prototype in research or industry work:
Nandi, A. (2026). AI Route Advisor: Interactive prototype for intelligent
multi-rail payment routing. GitHub.
https://avikcincy-sanju.github.io/AI_SBC_Route_Advisor/
Companion to SSRN Working Paper 6613638.

---

## Author

**Avik Nandi**
Product Manager – Payments & AI Strategy
Wipro Limited, United States

- SSRN Author Page: https://papers.ssrn.com/Sol3/Cf_Dev/AbsByAuth.cfm?per_id=11040868
- Medium: https://medium.com/@avikcincy
- LinkedIn: https://www.linkedin.com/in/avikz/ 
