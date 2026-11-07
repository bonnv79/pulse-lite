# Pulse Lite — free SaaS analytics dashboard

A free, MIT-licensed dashboard starter built with **Next.js 16**, **React 19**, **TypeScript**, **Tailwind CSS 4** and **Recharts**.

Pulse Lite is the free version of [Pulse](https://www.bontemplates.com/product). Use it in any project, personal or commercial.

## What's inside

- Overview page: 4 KPI cards, MRR growth area chart, traffic sources donut, visitors vs sign-ups chart, recent activity, top customers
- Sidebar and top bar layout with a mobile navigation drawer
- Dark mode with no flash on load
- Rebrand by changing one CSS variable (`--brand` in `src/app/globals.css`)
- Small UI kit: Button, Card, Badge, Input, Select

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Customizing

- **Colors:** edit the CSS variables in `src/app/globals.css` (light mode in `:root`, dark mode in `.dark`).
- **Data:** all demo numbers come from `src/lib/data.ts`. Replace those functions with your API calls.
- **Navigation:** `src/lib/nav.ts`. The sidebar shows the Pro pages as upgrade links; delete `proNav` and `PRO_URL` to remove them.

## Lite vs Pro

| | Lite (free) | [Pro](https://www.bontemplates.com/product) |
| --- | --- | --- |
| Overview with charts and KPIs | ✓ | ✓ |
| Dark mode, responsive layout | ✓ | ✓ |
| Customers table: search, filters, sorting, selection, CSV export | | ✓ |
| Revenue page: MRR movement, revenue by plan, invoices | | ✓ |
| Settings page, Sign in, Create account | | ✓ |
| Email support | | ✓ |

## License

MIT, see [LICENSE](LICENSE). Third-party packages keep their own licenses (Next.js, React, Tailwind CSS, Recharts: MIT; Lucide: ISC; Geist font: OFL 1.1).

Demo data is fictional.

## More templates

- [Pulse](https://www.bontemplates.com/product): the full SaaS analytics dashboard (customers, revenue, settings, auth).
- [Tandem](https://crm.bontemplates.com/product): a CRM dashboard with a drag-and-drop pipeline, contacts and tasks, in the same design system.

## Changelog

### 1.0.1
- Select menus use a custom chevron with even spacing in every browser.
- Checkboxes follow the theme colors in light and dark mode.
- Number fields no longer show browser spin buttons.

### 1.0.0
- First release.
