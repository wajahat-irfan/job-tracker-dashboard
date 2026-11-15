# Job Tracker Dashboard — Wajahat Irfan

A local job application tracker web app. No backend, no account — applications are stored in the browser's localStorage.

## What it does

- Add a job application: company, role, date applied, and status (Applied / Interview / Rejected / Offer).
- List all saved applications in a table.
- Filter the list by status.
- Delete entries.
- Show simple counts: total applications, applied, interviews, offers, rejected.

## How to run

No build step and no backend. Either:

1. Open `index.html` directly in a browser, or
2. Serve it locally:

```bash
cd job-tracker-dashboard
python3 -m http.server 8000
```

Then visit http://localhost:8000 in a browser.

Note: data is saved per browser (localStorage). Opening the page in a different browser or clearing site data will show an empty list.

## Skills shown

- HTML forms and tables
- CSS layout (grid stats cards, responsive table)
- JavaScript (DOM rendering, form handling, event delegation)
- localStorage for persistence
- Basic input sanitising (escaping user text before inserting it into the page)

## Author

Wajahat Irfan — BS Computer Science student (7th semester), GPGC No. 1 Abbottabad.
