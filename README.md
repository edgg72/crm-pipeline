# CRM Pipeline — Technical Challenge

This project implements a simplified CRM pipeline where leads can be validated and converted into prospects through a series of asynchronous checks. The goal is to demonstrate clear async handling, UI state management, and modular React architecture.

When a user validates a lead, two external checks (National Registry and Judicial Record) run in parallel, followed by an internal qualification step. Leads that meet the criteria are automatically moved to the Prospects section. The app uses mock asynchronous services to simulate realistic API behavior.

The project emphasizes deterministic behavior for reliable testing, clean styling through CSS variables and accessible layout. Improvements such as persistent storage, new lead creation, and real API integration could be added to extend functionality.

## Deployed version in Vercel
[Deployed project](https://crm-pipeline-o8gs.vercel.app/)

## How to run
1. npm install
2. Run dev server: npm run dev, open http://localhost:5173

## Tests
This project includes basic unit/integration tests using Vitest + Testing Library.
Run: npm run test



