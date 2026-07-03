console.log("🔥THIS IS THE ACTIVE APP.JS FILE MOFO 🔥");

import dotenv from "dotenv";
dotenv.config();

import express from "express";
import session from "express-session";
import db from "./db/database.js";

const app = express();
const port = 3000;

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "world-capital-quiz-secret",
    resave: false,
    saveUninitialized: true,
  })
);

// HOME / QUIZ ROUTE
app.get("/", async (req, res) => {
  try {
    // Initialize score for a new session
    if (req.session.score === undefined) {
      req.session.score = 0;
    }

    const result = await db.query(
      "SELECT * FROM countries ORDER BY RANDOM() LIMIT 1"
    );

    const question = result.rows[0];

    res.render("index", {
      question,
      totalScore: req.session.score,
      wasCorrect: null,
      gameOver: false,
    });

  } catch (err) {
    console.error(err);
    res.status(500).send("Database error");
  }
});

// API ROUTE
app.get("/countries", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM countries");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Database error");
  }
});

// SUBMIT ROUTE
app.post("/submit", async (req, res) => {
  const userAnswer = req.body.answer.trim();
  const country = req.body.country;

  try {
    // Get the correct capital
    const result = await db.query(
      "SELECT capital FROM countries WHERE country = $1",
      [country]
    );

    const correctAnswer = result.rows[0].capital;

    const isCorrect =
      userAnswer.toLowerCase() === correctAnswer.toLowerCase();

    // Correct answer
    if (isCorrect) {
      req.session.score++;

      const next = await db.query(
        "SELECT * FROM countries ORDER BY RANDOM() LIMIT 1"
      );

      return res.render("index", {
        question: next.rows[0],
        totalScore: req.session.score,
        wasCorrect: true,
        gameOver: false,
      });
    }

    // Wrong answer
    const finalScore = req.session.score;

    // Reset score for next game
    req.session.score = 0;

    return res.render("index", {
      question: null,
      totalScore: finalScore,
      wasCorrect: false,
      gameOver: true,
    });

  } catch (err) {
    console.error(err);
    res.status(500).send("Submit error");
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});