# Interactive Calendar — Wall Calendar Component

A polished, fully interactive wall calendar built with **Next.js 15 + React 19 + Tailwind CSS v4**. Inspired by a physical wall calendar aesthetic, it features a hero image, date range selection, integrated notes, and a suite of creative extras.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| UI Library | React 19 |
| Styling | Tailwind CSS v4 |
| Language | JavaScript (JSX) — no TypeScript |
| Storage | localStorage (no backend) |
| Fonts | Inter via next/font/google |

---

## Project Structure

```
wall-calendar/
├── app/
│   ├── globals.css          # Global styles, animations, CSS classes
│   ├── layout.jsx           # Root layout with Inter font
│   └── page.jsx             # Entry point → renders StudioPlanner
├── components/
│   ├── StudioPlanner.jsx    # Main orchestrator — all state lives here
│   ├── TopBar.jsx           # Fixed navigation bar
│   ├── SideBar.jsx          # Desktop sidebar with nav views
│   ├── CalendarGrid.jsx     # Interactive calendar grid
│   ├── NotesPanel.jsx       # Notes area with ruled lines
│   ├── BentoCards.jsx       # Info cards below calendar
│   ├── MiniMonthPreview.jsx # Tiny month grid for year view
│   ├── InsightsView.jsx     # Insights tab — charts & stats
│   └── ArchiveView.jsx      # Archive tab — browse all months
└── lib/
    └── calendarData.js      # Month config, holidays, date utils
```

---

## Core Requirements — How Each Is Met

### 1. Wall Calendar Aesthetic

The UI is designed to look like a physical wall calendar hanging on a wall:

- **Spiral binding** — 22 metallic coils rendered with CSS gradients + a center hook at the top
- **Hero image** — full-width photo clipped with a wave/chevron shape (`clip-path: polygon(...)`) matching the reference image
- **Month/year overlay** — positioned bottom-right over an accent gradient, exactly like the reference
- **White card on themed background** — the calendar body is a white rounded card sitting on a soft colored page background
- **Paper shadow** — multi-layer `box-shadow` gives physical depth

### 2. Day Range Selector

Click-based two-step selection:

1. **First click** → sets start date (filled with month accent color)
2. **Second click** → sets end date (filled with accent color); if clicked before start, dates are swapped automatically
3. **Third click** → resets and starts a new selection
4. **Visual states:**
   - Start/End: solid accent background, white text
   - In-between: tinted background (`accent + 15% opacity`) + 3px accent bar at bottom
   - Today: pulsing ring outline + "Today" label
5. **Range summary bar** appears below the grid showing `📅 Apr 5 → Apr 12` with a Clear ✕ button

### 3. Integrated Notes Section

- **Left panel on desktop**, stacked above grid on mobile
- **Ruled lines** background (CSS gradient) matching the reference notepad aesthetic
- **Add notes** via text input + Enter key or + button
- **Range badge** — when a date range is selected, a badge shows the range on the notes panel
- **Search** — topbar search filters notes in real time with yellow highlight on matched text
- **Remove** — hover any note to reveal ✕ delete button
- **Download Full Report** — exports all notes as a `.txt` file via Blob URL
- **Persistence** — notes saved to `localStorage` per month (`interactive-cal-notes-YYYY-M`)

### 4. Fully Responsive Design

**Desktop (lg+):**
- Fixed topbar with brand, nav links, search, notifications, settings
- Left sidebar (256px) with nav views, navigation controls, legend
- Main area: spiral → hero image → notes (left) + grid (right) side-by-side
- FAB (floating action button) bottom-right

**Mobile (< lg):**
- Sidebar hidden
- Calendar card stacks: notes on top, grid below
- Fixed bottom nav bar: Prev / Today / Next / + (new note)
- All touch targets ≥ 44px

---

## Creative Features

### Page Flip Animation
Month transitions use a 3D CSS animation:
```css
@keyframes flipIn {
  0%   { opacity: 0; transform: perspective(1000px) rotateX(-18deg) translateY(-8px); }
  60%  { opacity: 1; transform: perspective(1000px) rotateX(2deg) translateY(1px); }
  100% { opacity: 1; transform: perspective(1000px) rotateX(0deg) translateY(0); }
}
```
Applied to the notes+grid section with `transform-origin: top center` so it flips from the spiral binding.

### Dynamic Theme Switching
Each month has its own accent color and page background:

| Month | Accent | Mood |
|---|---|---|
| January | `#0ea5e9` (sky blue) | ❄️ Icy & Bold |
| April | `#f59e0b` (amber) | ⛏️ Summit Push |
| June | `#f97316` (orange) | 🧗 Vertical Limit |
| October | `#f97316` (orange) | 🪂 Free Fall |
| December | `#3b82f6` (blue) | ⛷️ Last Runs |

The page background, accent color, sidebar mood badge, and all interactive elements update smoothly when navigating months.

### Holiday Markers
22 holidays displayed with emoji on calendar cells:
🎆 New Year's Day, ❤️ Valentine's Day, 🍀 St. Patrick's, 🌍 Earth Day, 🎇 Independence Day, 🎃 Halloween, 🦃 Thanksgiving, 🎁 Christmas, and more.

### Confetti on Today
Clicking the "Today" cell triggers a confetti particle animation using CSS keyframes. 12 colored pieces fall and rotate.

### Today Pulse Ring
An animated pulsing ring (`pulseRing` keyframe) surrounds today's date continuously.

### Year View
Toggle "📅 Year View" to see all 12 months as mini grids. Click any month to jump directly to it with the flip animation.

### Keyboard Shortcuts
| Key | Action |
|---|---|
| `←` / `→` | Navigate months |
| `T` | Jump to today |
| `N` | Open new note modal |
| `Y` | Toggle year view |
| `Esc` | Close modals |

### Insights Tab
Real data pulled from localStorage:
- Total notes across all months
- Active months count
- Notes per month — horizontal bar chart (each bar colored with that month's accent)
- Weekly activity bar chart
- Productivity ring chart (82% with Completed/Pending/Overdue breakdown)

### Archive Tab
Browse all months by year:
- Year switcher (current year / previous year)
- 12 month cards in a responsive grid
- Expand any card to see all notes for that month
- "Go to [Month] →" button jumps back to Calendar view on that month
- Empty state when no notes exist

### Dark Mode
Toggle in Settings dropdown — switches the entire app to a dark slate theme (`#0f172a` background) with adapted topbar and card colors.

### Notifications
- Unread count badge on bell icon
- Click notification to mark as read
- "Mark all read" clears all badges
- "Clear all" removes all notifications
- Shows "All caught up 🎉" when empty

### Sidebar Views
- **Month View** — default calendar
- **Team Schedule** — 4 team members with live online/away/offline status dots
- **Resources** — Studio A, Camera Kit, Edit Suite, Drone Set with Free/Booked badges
- **Project Notes** — separate add/remove notes panel independent of calendar notes

---

## Running Locally

```bash
cd wall-calendar
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Key Design Decisions

1. **No TypeScript** — plain JSX throughout for simplicity
2. **No external icon libraries** — all icons are inline SVG paths
3. **No backend** — localStorage handles all persistence
4. **State lives in StudioPlanner** — single source of truth, passed down as props
5. **CSS animations over JS** — flip, confetti, pulse, shimmer all use `@keyframes`
6. **Tailwind + inline styles** — Tailwind for layout/spacing, inline styles for dynamic accent colors
