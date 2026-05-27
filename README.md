# RoutineOS 🚀

> "Run your productive life."

RoutineOS is a modern, high-intensity, distraction-free productivity operating system built for developers, students, researchers, content creators, and founders. It seamlessly sequences high-concentration timers (Pomodoro Pomodoros), daily mind habits, signature routine chronological timelines, markdown second-brain notes, platform post ideation checkers (YouTube, LinkedIn), and real-time AI cognitive coaching recommendation metrics.

Fully open-source, private, homelab-ready, and MIT licensed.

---

## 🎨 Design Philosophy
RoutineOS is styled under the **Sophisticated Dark** visual theme:
- **Base Canvas**: Immersive deep `#09090b` zinc-black background with subtle high-contrast borders (`border-zinc-800`).
- **Accent Elements**: Vibrant electric cyan/blue (`#2563eb`) triggers paired with sleek status indicators.
- **Micro-Animations**: Staggered transition arrays, pulsating live clocks, and elegant container layouts inspired by Linear, Raycast, and Notion.

---

## 🛠 Features Matrix
1. **Interactive Timeline Routine Builder**: Sequences morning code routines, physical training runs, or study blocks into step-by-step timed stages with live checkoff advancement.
2. **Ambient Focus Engine**: Customizable Pomodoro with synthesized live ambient background channels (Forest Rain, Oceanic Tide, Autumn Breeze, Synth Wave) looping directly inside the browser.
3. **Kanban Studio**: Manage and drag active software engineering sprints with custom checklist sub-trackers and tags filters.
4. **Creator Planners**: Workspaces structured specifically for drafting YouTube B-roll hook timelines and preparing LinkedIn posts structure.
5. **AI Cognitive Guide**: Uses secure express proxy loops to talk to parent Gemini models to outline personalized schedules, prioritize sprint goals, and recommend hourly adjustments.
6. **Gamification Leveling**: Earn XP multipliers for every habit cleared, milestone unlocked, or routine finished.

---

## 🐳 Self-Hosting & Docker Setup

We provide a production-ready container structure. Deploy to your private servers or homelab nodes in 10 seconds:

### 1. File Structure `docker-compose.yml`
Create a standard docker configuration in your root:
```yaml
version: '3.8'

services:
  routineos:
    image: node:20-alpine
    container_name: routineos_app
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - GEMINI_API_KEY=${GEMINI_API_KEY}
      - APP_URL=${APP_URL}
      - DATABASE_URL=postgresql://postgres:postgres@db:5432/routineos?schema=public
    volumes:
      - .:/app
    working_dir: /app
    command: sh -c "npm install && npm run build && npm start"
    restart: unless-stopped
    depends_on:
      - db

  db:
    image: postgres:15-alpine
    container_name: routineos_db
    ports:
      - "5432:5432"
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=postgres
      - POSTGRES_DB=routineos
    volumes:
      - postgres_data:/var/lib/postgresql/data
    restart: unless-stopped

volumes:
  postgres_data:
```

### 2. Manual Installation
Alternatively, execute local server loops:
```bash
# Clone the workspace repository
git clone https://github.com/your-username/routineos.git
cd routineos

# Setup environment models
cp .env.example .env

# Install node dependencies
npm install

# Active Prisma database sync (Optional schema migrations)
npx prisma db push

# Start the Node Express Proxy Dev Loop
npm run dev
```

---

## Dev tooling & CI (added)

I added recommended developer tooling and GitHub workflows to make CI/CD and local development consistent:

- ESLint + Prettier for linting & formatting
- Vitest for lightweight tests
- Husky + lint-staged for pre-commit checks
- GitHub Actions CI (lint, format-check, tests, build)
- CodeQL security scanning and Dependabot weekly updates

How to run locally:

```bash
# install deps (use npm install to regenerate lockfile if needed)
npm install

# run dev server
npm run dev

# run lint
npm run lint

# run format
npm run format

# run tests
npm run test
```

CI behavior (what the workflow runs):

- Uses Node 18 & 20 matrix
- Installs dependencies (tries `npm ci`, falls back to `npm install`)
- Runs lint (ESLint + TypeScript check)
- Runs Prettier check
- Runs tests with coverage
- Builds the app with Vite


---

## 🗄 Prisma PostgreSQL Schema Model

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id                   String            @id @default(uuid())
  email                String            @unique
  role                 String            @default("Developer")
  level                Int               @default(1)
  xp                   Int               @default(120)
  totalFocusedMinutes  Int               @default(45)
  streakDays           Int               @default(12)
  tasks                Task[]
  habits               Habit[]
  routines             Routine[]
  notes                Note[]
  creatorProjects      CreatorProject[]
  unlockedAchievements String[]
  createdAt            DateTime          @default(now())
}

model Task {
  id          String   @id @default(uuid())
  userId      String
  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  title       String
  priority    String   @default("medium") // low, medium, high
  isCompleted Boolean  @default(false)
  column      String   @default("todo") // todo, in_progress, review, done
  tags        String[]
  createdAt   DateTime @default(now())
}

model Habit {
  id              String   @id @default(uuid())
  userId          String
  user            User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  title           String
  category        String
  streak          Int      @default(0)
  history         String[] // Array of YYYY-MM-DD strings
  targetFrequency Int      @default(5)
}

model Routine {
  id           String        @id @default(uuid())
  userId       String
  user         User          @relation(fields: [userId], references: [id], onDelete: Cascade)
  title        String
  tagline      String
  color        String        @default("blue")
  steps        RoutineStep[]
  historyCount Int           @default(0)
}

model RoutineStep {
  id              String  @id @default(uuid())
  routineId       String
  routine         Routine @relation(fields: [routineId], references: [id], onDelete: Cascade)
  title           String
  durationMinutes Int     @default(10)
  isCompleted     Boolean @default(false)
  notes           String?
}

model Note {
  id        String   @id @default(uuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  title     String
  content   String
  isPinned  Boolean  @default(false)
  tags      String[]
  updatedAt DateTime @updatedAt
}

model CreatorProject {
  id        String   @id @default(uuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  platform  String   // youtube, linkedin, writing
  title     String
  status    String   @default("idea") // idea, scripting, draft, scheduled, published
  notes     String
  checklist Json     // Array of { title: string, checked: boolean }
}
```

---

## 📜 Contribution & MIT Guidelines
1. Fork the workspace repository.
2. Build custom visual timeline widgets in `/src/components`.
3. Adhere to **TypeScript named imports** rules.
4. Open a pull request targeting standard master branch coordinates.

Licensed under the MIT Open Source Workspace. Run your productive life!
