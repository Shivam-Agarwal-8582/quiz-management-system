# QuizMaster 🎓 — Online Quiz Management System

A **full-stack web application** where students can take subject-wise quizzes online.

Think of it like an online exam app:
- The **backend** is the "brain" — it stores all the questions in a database and gives them out through APIs.
- The **frontend** is the "face" — the website you open in your browser to pick a subject, answer questions, and see your score.

| | |
|---|---|
| 🧠 Backend | Java 17 · Spring Boot 3.5 · MySQL |
| ⚛️ Frontend | React 19 · Vite 8 · Plain CSS |
| 🔗 They talk using | REST APIs + JSON |

---

## ✨ Features (What can this app do?)

### 👨‍🎓 For Students

1. **Subject-wise quiz sections** — The home page shows 5 separate subjects. Each opens its own quiz:
   - 🧠 Aptitude
   - 🗄️ DBMS
   - 🖥️ OS
   - 🌐 CN (Computer Networks)
   - 🧩 OOPS
2. **60 ready-made questions** — 12 questions per subject are loaded automatically from `data.sql` on first run.
3. **One question at a time** — No long scary form; just one clean question with 4 options (A, B, C, D).
4. **⏱ Timer per question** — Every question has a **45-second countdown**. If time runs out, the question is marked skipped and the correct answer is shown.
   - The timer turns **red and pulses** when less than 10 seconds remain.
5. **Instant feedback** — After clicking *Check Answer*, the correct option turns **green**, your wrong pick turns **red**, and ✓ / ✗ icons appear.
6. **Live progress tracking** — A progress bar fills as you move ahead, and your running score is always visible on top.
7. **Random question order** — Questions are shuffled every attempt, so no two attempts feel the same.
8. **Total marks at the end** 🏆 — A results screen shows:
   - An animated circular score ring with your percentage
   - Total marks: e.g., `9 out of 12`
   - Correct / Incorrect / Accuracy stat boxes
9. **Review wrong answers** 📝 — Below the score, every mistake is listed: the question, what you answered (❌), and the correct answer (✅). Great for learning!
10. **Play again** — Retry the same subject instantly, or go back and choose another subject.

### 🛠️ For Admins

11. **Admin panel built into the UI** — Click *"⚙️ Admin Panel"* on the home page:
    - ➕ **Add questions**: type a question, its 4 options, tick which option is correct, and set the category.
    - 🗑️ **Delete questions**: browse or filter all questions by subject and delete any of them with one click.
12. **Form validation** — You cannot add an incomplete question; empty fields are rejected with an error message.

### ⚙️ Behind the Scenes (Technical Features)

13. **Persistent MySQL database** — Questions you add via admin **do not disappear** when you restart the server.
14. **Smart seeding** — On every startup, `data.sql` re-inserts the 60 default questions **only if missing** (`INSERT IGNORE`) → never duplicates.
15. **Auto-create database** — The JDBC URL contains `createDatabaseIfNotExist=true`, so even the database is created automatically on first run.
16. **Input validation on server too** — The backend rejects bad data (missing text/options/answer) with HTTP `400`.
17. **Modern responsive UI** — Dark glassmorphism theme, per-subject accent colors, smooth animations, works on mobile screens too.
18. **Configurable via env vars** — DB username/password can be changed without touching code (`DB_USERNAME`, `DB_PASSWORD`).

---

## 🕹️ How the App Works (Step by Step)

1. Open the site → **Home screen**: cards for each subject with question counts.
2. Click a card (e.g., **DBMS**) → frontend asks backend: *"give me all DBMS questions"*.
3. **Quiz screen**: one question at a time → select an option → *Check Answer* → see green/red → *Next Question*.
4. Timer hits 0 without an answer? → auto-revealed as skipped, correct answer highlighted.
5. After the last question → **Result screen**: total marks, percentage ring, accuracy, and the full list of wrong answers to review.
6. Anytime, admins can open the **Admin Panel** to add/delete questions — changes go straight into MySQL.

```
Browser (React) ──HTTP requests──▶ Spring Boot API ──SQL──▶ MySQL database
        ▲                                    │
        └──────────── JSON response ─────────┘
```

---

## 📡 API Endpoints (Backend)

Base URL: `http://localhost:8080`

| Method | Endpoint | What it does |
| ------ | -------- | ------------ |
| GET | `/api/questions` | Get **all** questions |
| GET | `/api/questions/categories` | Get each subject + how many questions it has |
| GET | `/api/questions/category/{name}` | Get questions of one subject, e.g. `/category/DBMS` |
| POST | `/api/questions` | Add a new question (JSON body) |
| DELETE | `/api/questions/{id}` | Delete one question by id |

Example — adding a question:

```bash
curl -X POST http://localhost:8080/api/questions \
  -H "Content-Type: application/json" \
  -d '{"text":"What is JVM?","optionA":"Java Virtual Machine","optionB":"Java Verified Module","optionC":"Just Very Modern","optionD":"None","correctAnswer":"Java Virtual Machine","category":"OOPS"}'
```

---

## 🗄️ Database

- One table: `question`
- Columns: `id`, `text`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `category`
- `text` has a **unique constraint** → the same question can never be stored twice.
- Default seed data lives in `quiz-backend/src/main/resources/data.sql`.

---

## 🚀 How to Run This Project

### Step 1 — Make sure MySQL is running locally (port 3306)

### Step 2 — Start the backend

```bash
cd quiz-backend
./mvnw spring-boot:run
```

✅ Backend starts at `http://localhost:8080`. Database + 60 questions are created automatically.

> If your MySQL password is not `Shivam@2003`, either edit `application.properties` or run:
> `export DB_PASSWORD=yourpassword` before starting.

### Step 3 — Start the frontend (new terminal)

```bash
cd quiz-frontend
npm install     # only needed the first time
npm run dev
```

✅ Open the URL Vite prints (usually `http://localhost:5173`). Pick a subject and play!

> Backend running elsewhere? Copy `.env.example` → `.env` and set `VITE_API_URL`.

---

## 📁 Project Structure (What each file does)

### Backend — `quiz-backend`

```
src/main/java/com/example/demo/
├── DemoApplication.java          # main() — starts the Spring Boot server
├── controller/QuestionController # receives HTTP requests (GET/POST/DELETE), returns JSON
├── service/QuestionService.java  # business logic (fetch, add, delete, group by category)
├── repository/QuestionRepository # talks to MySQL using Spring Data JPA (no SQL needed)
├── model/Question.java           # the Question entity = 1 row of the table
└── dto/CategorySummary.java      # small helper object: {category, count}

src/main/resources/
├── application.properties        # DB connection & settings
└── data.sql                      # 60 starter questions (auto-seeded)
```

**Flow:** Controller (receives request) → Service (logic) → Repository (database) → back as JSON.

### Frontend — `quiz-frontend/src`

```
├── main.jsx                  # entry point — mounts React into index.html
├── index.css                 # global theme: colors, fonts, background
├── App.jsx                   # decides which screen to show (home/quiz/result/admin)
├── api.js                    # all fetch() calls to the backend live here
├── subjectMeta.js            # icon + color for each subject
├── components/
│   ├── Home.jsx              # hero + subject cards grid
│   ├── Quiz.jsx              # timer, options, check answer, next
│   ├── Result.jsx            # score ring, stats, wrong-answer review
│   └── Admin.jsx             # add-question form + delete list
└── App.css                   # styling for all screens
```

---

## 🧰 Tech Stack (in simple words)

| Tool | Why we use it |
| ---- | ------------- |
| **Spring Boot** | Java framework that creates the REST API server quickly |
| **Spring Data JPA (Hibernate)** | Saves/fetches Java objects from database without writing SQL manually |
| **MySQL** | Stores all questions permanently on disk |
| **Bean Validation** | Automatically checks POSTed data is not empty/bad |
| **Lombok** | Removes boilerplate code (getters/setters) using annotations like `@Data` |
| **Maven (mvnw)** | Builds the project and downloads dependencies |
| **React** | JavaScript library for building the interactive UI |
| **Vite** | Super-fast dev server + production bundler |
| **Vanilla CSS** | Hand-written styling — glassmorphism, gradients, animations |

---

## 🔧 Troubleshooting

| Problem | Fix |
| ------- | --- |
| Frontend says *"Could not reach the server"* | Backend is not running → start it (Step 2 above) |
| `Access denied for user 'root'` | Wrong MySQL password → set `DB_PASSWORD` env var |
| Port 8080 already in use | Another app uses it → stop it, or change port in `application.properties`: `server.port=9090` |
| Old table errors after upgrading | Drop once: `mysql -u root -p -e "DROP TABLE IF EXISTS quizdb.question;"` then restart |

---

## 🔮 Future Improvements

- 👤 Login/signup for students with saved quiz history
- 🏆 Leaderboard per subject
- 🖼️ Image-based questions
- 🎯 Difficulty levels (easy/medium/hard) per question
- 📊 Admin dashboard with charts (attempts, average scores)

---

Made with ☕ + ⚛️ — *Happy Quizzing!*
