# Online Quiz Platform 🚀

I have successfully created both the Spring Boot backend and the React frontend for your **Online Quiz Platform**. They are fully configured and running right now. 

Here are the details of the implementation:

## 1. Backend (Spring Boot + H2 Database) ☕

- **Directory**: `quiz-backend`
- **Port:** The backend server runs on `http://localhost:8080`
- **Database:** It uses an in-memory H2 database (data doesn't persist across restarts). 
  - **H2 Console:** You can inspect the database at `http://localhost:8080/h2-console` using JDBC URL `jdbc:h2:mem:quizdb` and username `sa`.
- **API Endpoints:**
  - `GET /api/questions` - Retrieve all quiz questions
  - `POST /api/questions` - Add a new quiz question
  - `DELETE /api/questions/{id}` - Delete a single question
- **Tech Stack:** Spring Boot 3.5.0, Spring Data JPA, H2 Database, Maven.
- **Initial Data:** Initialized 4 test general knowledge questions located in `src/main/resources/data.sql`.

## 2. Frontend (React + Vite) ⚛️

- **Directory**: `quiz-frontend`
- **Port:** The frontend server currently runs on `http://localhost:5174` (or `http://localhost:5173`)
- **App:** Accessible through your web browser exactly there. 
- **Tech Stack:** React, Vite, Vanilla CSS.
- **Design & UI:** Built with modern design principles (glassmorphism effect), smooth gradients, custom fonts (Outfit), real-time progress, and interactive micro-animations. It presents one question at a time and displays your final score dynamically!

### How to use the app
Simply open **http://localhost:5174** in your browser to play the initial quiz populated by the Spring Boot backend. 

### Future Improvements
To expand the platform further, consider adding:
1. **Admin Dashboard:** A UI to add and delete questions directly to the database.
2. **Timer Feature:** Impose a time limit per question for an extra challenge.
3. **Categories:** Allow segregation of questions to different topics.




use the mysql database for this project and in the data.sql in backend insert the  question atleast 20 and also add the function like person can also complete the quiz according to the subject wise like aptitte , DBMS, OS, CN, OOPS all open in differnt sections and and in the last the student get the total marks after solving all the question if a person give me the wrong answer it can see the wrong answers questions
