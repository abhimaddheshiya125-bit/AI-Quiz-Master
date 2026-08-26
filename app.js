/* ----------------------------------------------------
   QuizMaster AI - Core Application Script
   Single Page Application Controller & Data Layer
   ---------------------------------------------------- */

// --- GLOBAL STATE & DATABASE SERVICE ---
class DBService {
  static init() {
    if (!localStorage.getItem("qm_users")) {
      localStorage.setItem("qm_users", JSON.stringify([]));
    }
    if (!localStorage.getItem("qm_current_user")) {
      localStorage.setItem("qm_current_user", null);
    }
    if (!localStorage.getItem("qm_history")) {
      localStorage.setItem("qm_history", JSON.stringify([]));
    }
    if (!localStorage.getItem("qm_settings")) {
      localStorage.setItem("qm_settings", JSON.stringify({ geminiKey: "" }));
    }

    // Seeding initial default quizzes if they do not exist
    if (!localStorage.getItem("qm_quizzes")) {
      const seedQuizzes = [
        {
          id: "webdev_basic",
          title: "Modern Web Development",
          description:
            "Test your skills in HTML5 structures, CSS3 layout engines, and advanced JavaScript concepts.",
          category: "WebDev",
          difficulty: "Intermediate",
          timeLimit: 120,
          questions: [
            {
              question:
                "Which of the following is NOT a JavaScript primitive type?",
              options: ["Null", "String", "Symbol", "Array"],
              correctAnswerIndex: 3,
              explanation:
                "JavaScript primitive types include Undefined, Null, Boolean, Number, BigInt, String, and Symbol. Array is a structural object type.",
            },
            {
              question: "What does CSS grid-template-areas allow you to do?",
              options: [
                "Define layout areas by referencing grid area names",
                "Set outer grid margin spacings",
                "Create flexible item widths automatically",
                "Align items vertically on cross axis",
              ],
              correctAnswerIndex: 0,
              explanation:
                "grid-template-areas allows you to name areas in a grid layout to position grid items explicitly.",
            },
            {
              question:
                "What is the main purpose of the HTML5 <picture> element?",
              options: [
                "Render canvas animations",
                "Provide alternative image sources for responsive layout",
                "Wrap SVG vector assets",
                "Play inline video sequences",
              ],
              correctAnswerIndex: 1,
              explanation:
                "The <picture> element contains one or more <source> elements and one <img> element to offer different image options based on media queries.",
            },
            {
              question:
                'What is the scope of a variable declared with "let" in JavaScript?',
              options: [
                "Global scope only",
                "Function scope",
                "Block scope",
                "Lexical file scope",
              ],
              correctAnswerIndex: 2,
              explanation:
                'Variables declared with "let" or "const" are block-scoped, meaning they only exist within the curly braces {} in which they are defined.',
            },
            {
              question:
                'What is the correct HTTP status code for "Created" after a successful POST request?',
              options: [
                "200 OK",
                "201 Created",
                "202 Accepted",
                "204 No Content",
              ],
              correctAnswerIndex: 1,
              explanation:
                "201 Created is the standard response code for a successful request that resulted in a resource being created.",
            },
          ],
        },
        {
          id: "space_exploration",
          title: "Space Exploration & Astronomy",
          description:
            "Journey through the stars. Test your knowledge on rockets, planets, and cosmic milestones.",
          category: "Space",
          difficulty: "Hard",
          timeLimit: 150,
          questions: [
            {
              question:
                "Which planet has the most planetary moons discovered in our solar system?",
              options: ["Jupiter", "Saturn", "Uranus", "Neptune"],
              correctAnswerIndex: 1,
              explanation:
                "Saturn holds the record for the most moons in the solar system, surpassing Jupiter with a total of 146 confirmed moons as of current astronomical logs.",
            },
            {
              question:
                "What is the name of the first human-made satellite launched into orbit?",
              options: ["Explorer 1", "Sputnik 1", "Vostok 1", "Apollo 11"],
              correctAnswerIndex: 1,
              explanation:
                "Sputnik 1 was launched by the Soviet Union on October 4, 1957, marking the beginning of the Space Age.",
            },
            {
              question:
                "What boundary defines the outer edge of a black hole from which nothing can escape?",
              options: [
                "Event Horizon",
                "Singularity",
                "Roche Limit",
                "Schwarzschild Limit",
              ],
              correctAnswerIndex: 0,
              explanation:
                "The event horizon is the threshold around a black hole where the escape velocity exceeds the speed of light.",
            },
            {
              question:
                "Which NASA mission successfully landed the first humans on the moon in 1969?",
              options: ["Gemini 4", "Apollo 8", "Apollo 11", "Apollo 13"],
              correctAnswerIndex: 2,
              explanation:
                "Neil Armstrong and Buzz Aldrin landed the Apollo 11 Lunar Module on the Moon on July 20, 1969.",
            },
            {
              question: "What type of celestial object is a pulsar?",
              options: [
                "An active young star",
                "A spinning neutron star",
                "A dying white dwarf",
                "A giant gas nebula",
              ],
              correctAnswerIndex: 1,
              explanation:
                "Pulsars are highly magnetized, rapidly rotating neutron stars that emit beams of electromagnetic radiation out of their magnetic poles.",
            },
          ],
        },
        {
          id: "world_history",
          title: "World History & Landmarks",
          description:
            "Travel through history and continents to explore ancient cultures and civilizations.",
          category: "History",
          difficulty: "Easy",
          timeLimit: 120,
          questions: [
            {
              question:
                "In which modern-day country was the ancient city-state of Carthage located?",
              options: ["Egypt", "Greece", "Italy", "Tunisia"],
              correctAnswerIndex: 3,
              explanation:
                "Carthage was situated on the Gulf of Tunis in modern-day Tunisia, serving as the center of the Carthaginian Empire.",
            },
            {
              question: "Who was the first Emperor of the Roman Empire?",
              options: [
                "Julius Caesar",
                "Augustus Caesar",
                "Nero",
                "Marcus Aurelius",
              ],
              correctAnswerIndex: 1,
              explanation:
                "Augustus Caesar (originally Octavian) became the first official Roman Emperor in 27 BC after the fall of the Roman Republic.",
            },
            {
              question:
                "What historical monument was built by Emperor Shah Jahan as a mausoleum for his wife?",
              options: ["Taj Mahal", "Red Fort", "Qutub Minar", "Hawa Mahal"],
              correctAnswerIndex: 0,
              explanation:
                "The Taj Mahal in Agra, India, was commissioned by Mughal Emperor Shah Jahan in 1632 in memory of his favorite wife Mumtaz Mahal.",
            },
            {
              question:
                "What major canal connecting the Mediterranean Sea to the Red Sea opened in 1869?",
              options: [
                "Panama Canal",
                "Suez Canal",
                "Kiel Canal",
                "Erie Canal",
              ],
              correctAnswerIndex: 1,
              explanation:
                "The Suez Canal allows water transportation between Europe and Asia without navigating around the African continent.",
            },
            {
              question:
                "Which explorer led the first expedition to circumnavigate the globe?",
              options: [
                "Christopher Columbus",
                "Vasco da Gama",
                "Ferdinand Magellan",
                "Marco Polo",
              ],
              correctAnswerIndex: 2,
              explanation:
                "Ferdinand Magellan's Spanish expedition of 1519-1522 completed the first recorded navigation around the earth, although Magellan himself died in the Philippines.",
            },
          ],
        },
        {
          id: "general_science",
          title: "Fundamentals of Science",
          description:
            "Test your grasp on basic physics, chemistry, and biological principles.",
          category: "Science",
          difficulty: "Easy",
          timeLimit: 120,
          questions: [

   
            {

              question: "What is the chemical formula for ordinary table salt?",
              options: ["H2O", "CO2", "NaCl", "KCl"],
              correctAnswerIndex: 2,
              explanation:
                "Table salt is Sodium Chloride, chemical formula NaCl.",
            },
            {
              question:
                "Who formulated the three laws of motion that govern classical mechanics?",
              options: [
                "Albert Einstein",
                "Galileo Galilei",
                "Isaac Newton",
                "Nikola Tesla",
              ],
              correctAnswerIndex: 2,
              explanation:
                "Sir Isaac Newton published these laws in his famous work Principia Mathematica in 1687.",
            },
            {
              question:
                "What gas is released as a byproduct of plant photosynthesis?",
              options: ["Carbon Dioxide", "Nitrogen", "Oxygen", "Hydrogen"],
              correctAnswerIndex: 2,
              explanation:
                "In photosynthesis, plants take in carbon dioxide and water and use solar energy to produce glucose, releasing oxygen as a byproduct.",
            },
            {
              question: "What is the approximate speed of light in a vacuum?",
              options: [
                "30,000 km/s",
                "300,000 km/s",
                "3,000,000 km/s",
                "300 km/s",
              ],
              correctAnswerIndex: 1,
              explanation:
                "The speed of light is approximately 299,792 kilometers per second, generally rounded to 300,000 km/s.",
            },
            {
              question:
                "What organelle is known as the powerhouse of the cell?",
              options: [
                "Nucleus",
                "Ribosome",
                "Mitochondria",
                "Golgi Apparatus",
              ],
              correctAnswerIndex: 2,
              explanation:
                "Mitochondria are responsible for chemical respiration and ATP generation inside eukaryotic cells, hence the name powerhouse.",
            },
          ],
        },
      ];
      localStorage.setItem("qm_quizzes", JSON.stringify(seedQuizzes));
    }
  }

  // Settings (API Keys)
  static getSettings() {
    return JSON.parse(localStorage.getItem("qm_settings"));
  }

  static saveSettings(settings) {
    localStorage.setItem("qm_settings", JSON.stringify(settings));
  }

  // User Operations
  static getUsers() {
    return JSON.parse(localStorage.getItem("qm_users"));
  }

  static getCurrentUser() {
    return JSON.parse(localStorage.getItem("qm_current_user"));
  }

  static setCurrentUser(user) {
    localStorage.setItem("qm_current_user", JSON.stringify(user));
  }

  static registerUser(username, email, password) {
    const users = this.getUsers();
    if (
      users.find(
        (u) =>
          u.username.toLowerCase() === username.toLowerCase() ||
          u.email.toLowerCase() === email.toLowerCase(),
      )
    ) {
      return { success: false, message: "Username or email already exists." };
    }

    const newUser = {
      username,
      email,
      passwordHash: btoa(password), // Simple encoding for local simulation
      createdAt: new Date().toISOString(),
      avatar: "🧠",
      points: 0,
    };
    users.push(newUser);
    localStorage.setItem("qm_users", JSON.stringify(users));
    return { success: true, user: newUser };
  }

  static loginUser(usernameOrEmail, password) {
    const users = this.getUsers();
    const foundUser = users.find(
      (u) =>
        (u.username.toLowerCase() === usernameOrEmail.toLowerCase() ||
          u.email.toLowerCase() === usernameOrEmail.toLowerCase()) &&
        u.passwordHash === btoa(password),
    );

    if (!foundUser) {
      return { success: false, message: "Invalid credentials." };
    }

    this.setCurrentUser(foundUser);
    return { success: true, user: foundUser };
  }

  static updateUserProfile(username, avatar) {
    const currentUser = this.getCurrentUser();
    if (!currentUser) return false;

    const users = this.getUsers();
    const userIndex = users.findIndex(
      (u) => u.username === currentUser.username,
    );

    if (userIndex !== -1) {
      users[userIndex].avatar = avatar;
      localStorage.setItem("qm_users", JSON.stringify(users));
      currentUser.avatar = avatar;
      this.setCurrentUser(currentUser);
      return true;
    }
    return false;
  }

  static updateUserPoints(username, pointsToAdd) {
    const users = this.getUsers();
    const userIndex = users.findIndex((u) => u.username === username);
    if (userIndex !== -1) {
      users[userIndex].points = (users[userIndex].points || 0) + pointsToAdd;
      localStorage.setItem("qm_users", JSON.stringify(users));

      // Sync with current user
      const curUser = this.getCurrentUser();
      if (curUser && curUser.username === username) {
        curUser.points = users[userIndex].points;
        this.setCurrentUser(curUser);
      }
    }
  }

  // Quizzes Operations
  static getQuizzes() {
    return JSON.parse(localStorage.getItem("qm_quizzes"));
  }

  static getQuizById(id) {
    const quizzes = this.getQuizzes();
    return quizzes.find((q) => q.id === id);
  }

  static saveQuiz(quiz) {
    const quizzes = this.getQuizzes();
    // Avoid duplicates
    const index = quizzes.findIndex((q) => q.id === quiz.id);
    if (index !== -1) {
      quizzes[index] = quiz;
    } else {
      quizzes.push(quiz);
    }
    localStorage.setItem("qm_quizzes", JSON.stringify(quizzes));
  }

  // Attempts and History Operations
  static getHistory() {
    return JSON.parse(localStorage.getItem("qm_history"));
  }

  static saveAttempt(attempt) {
    const history = this.getHistory();
    history.push(attempt);
    localStorage.setItem("qm_history", JSON.stringify(history));

    // Increment user points based on score (e.g. 10 points per correct answer)
    const pointsEarned = attempt.correctCount * 10;
    this.updateUserPoints(attempt.username, pointsEarned);
  }

  static deleteAttempt(id) {
    let history = this.getHistory();
    history = history.filter((h) => h.id !== id);
    localStorage.setItem("qm_history", JSON.stringify(history));
  }
}

// Initialize database
DBService.init();

// --- TOASTER NOTIFICATIONS UTILITY ---
class Toaster {
  static show(message, type = "info") {
    const container = document.getElementById("toastContainer");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = `toast ${type}`;

    let iconName = "info";
    if (type === "success") iconName = "check-circle";
    if (type === "error") iconName = "alert-triangle";

    toast.innerHTML = `
            <i data-lucide="${iconName}"></i>
            <span>${message}</span>
        `;

    container.appendChild(toast);
    lucide.createIcons();

    // Animate out and remove
    setTimeout(() => {
      toast.style.animation =
        "slideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) reverse forwards";
      setTimeout(() => {
        toast.remove();
      }, 300);
    }, 3000);
  }
}

// --- GEMINI AI & LOCAL FALLBACK GENERATOR SERVICE ---
class QuizGenerator {
  static async generate(
    notesText,
    options = { difficulty: "Intermediate", size: 5 },
  ) {
    const settings = DBService.getSettings();
    if (settings && settings.geminiKey && settings.geminiKey.trim() !== "") {
      try {
        return await this.generateWithGemini(
          notesText,
          settings.geminiKey,
          options,
        );
      } catch (err) {
        console.error(
          "Gemini API call failed, falling back to local generator",
          err,
        );
        Toaster.show(
          "AI generation failed, launching local smart generator...",
          "error",
        );
        return this.generateLocally(notesText, options);
      }
    } else {
      Toaster.show(
        "No API key configured. Using local rule-based generator.",
        "info",
      );
      return this.generateLocally(notesText, options);
    }
  }

  static async generateWithGemini(notesText, apiKey, options) {
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
    const prompt = `
        You are QuizMaster AI, an educational assistant.
        Analyze the text notes provided below and generate a high-quality educational quiz based on the key facts, terms, and definitions.
        
        Requirements:
        - Quiz Title: Catchy title based on the notes content.
        - Quiz Description: Quick summary of the notes covered.
        - Number of Questions: Exactly ${options.size}.
        - Question options: Must have exactly 4 choices.
        - Target Difficulty level: ${options.difficulty}.
        - Format: Output must be JSON ONLY. Use the exact structural schema listed below. Do NOT write markdown backticks (\`\`\`json) or any additional explanation. Just the raw valid JSON payload.
        
        Strict JSON Schema:
        {
          "title": "A Concise Title",
          "description": "A summary describing the concepts covered in this quiz.",
          "category": "Custom",
          "difficulty": "${options.difficulty}",
          "timeLimit": ${options.size * 30},
          "questions": [
            {
              "question": "A clear multiple-choice question testing a specific fact or relationship from the text.",
              "options": ["Option A", "Option B", "Option C", "Option D"],
              "correctAnswerIndex": 0,
              "explanation": "Provide a detailed explanation referencing the text on why Option A is correct."
            }
          ]
        }

        Input notes text:
        "${notesText}"
        `;

    const requestBody = {
      contents: [
        {
          parts: [{ text: prompt }],
        },
      ],
      generationConfig: {
        responseMimeType: "application/json",
      },
    };

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorMsg = await response.text();
      throw new Error(`API error: ${response.status} - ${errorMsg}`);
    }

    const data = await response.json();

    if (!data.candidates || data.candidates.length === 0) {
      throw new Error("No candidate returned by Gemini API.");
    }

    const textResponse = data.candidates[0].content.parts[0].text;
    const parsedQuiz = JSON.parse(textResponse.trim());

    // Final sanity check & validation
    if (
      !parsedQuiz.title ||
      !parsedQuiz.questions ||
      !Array.isArray(parsedQuiz.questions)
    ) {
      throw new Error("Invalid output structure returned by AI model.");
    }

    // Add a random generated ID
    parsedQuiz.id = "ai_" + Date.now();
    return parsedQuiz;
  }

  // Local rules-based sentence extractor
  static generateLocally(notesText, options) {
    // Clean paragraphs and sentences
    const cleanText = notesText.replace(/[\r\n]+/g, " ").trim();
    const sentences = cleanText
      .split(/[.!?]+/)
      .map((s) => s.trim())
      .filter((s) => s.length > 20);

    if (sentences.length < 3) {
      return this.createPlaceholderQuiz(
        "Unable to parse text",
        "Notes are too short to generate a quiz locally. Provide longer study material.",
        options,
      );
    }

    const quizQuestions = [];
    const maxQuestions = Math.min(options.size, sentences.length);

    // Basic keywords search to extract key terms
    // Pattern matches: "X is Y", "X refers to Y", "X was developed by Y", "X was created in Y"
    const copulaRegex =
      /\b([\w\s'-]{3,25})\s+(is|are|was|refers\s+to|defines|was\s+developed\s+by|was\s+created\s+by)\s+([\w\s',-]{10,90})/i;

    // Track used terms to prevent duplicate questions
    const usedSentences = new Set();

    for (
      let i = 0;
      i < sentences.length && quizQuestions.length < maxQuestions;
      i++
    ) {
      const sentence = sentences[i];
      if (usedSentences.has(sentence)) continue;

      const match = sentence.match(copulaRegex);
      if (match) {
        const term = match[1].trim();
        const copula = match[2].trim();
        const definition = match[3].trim();

        // Construct a fill-in-the-blank question
        const questionText = `According to your notes, complete the following: "${sentence.replace(term, "__________")}"`;

        // Create fake options
        const otherTerms = this.getRandomDistractors(term, sentences, 3);
        const optionsList = [term, ...otherTerms].sort(
          () => Math.random() - 0.5,
        );
        const correctIdx = optionsList.indexOf(term);

        quizQuestions.push({
          question: questionText,
          options: optionsList,
          correctAnswerIndex: correctIdx,
          explanation: `From note sentence: "${sentence}". The concept matches '${term}'.`,
        });

        usedSentences.add(sentence);
      }
    }

    // Fallback if regex parsing fails to produce enough questions
    while (quizQuestions.length < maxQuestions) {
      const unusedSent = sentences.find((s) => !usedSentences.has(s));
      if (!unusedSent) break;

      // Generate a simple reading comprehension question
      const words = unusedSent.split(" ");
      if (words.length > 8) {
        // Find a noun/verb in the middle to blank out
        const blankIndex = Math.floor(words.length / 2);
        const targetWord = words[blankIndex].replace(/[^\w]/g, "");

        if (targetWord.length > 3) {
          const questionText = `Identify the missing word from this study note: "${unusedSent.replace(targetWord, "__________")}"`;
          const distractors = this.getRandomDistractors(
            targetWord,
            sentences,
            3,
          );
          const optionsList = [targetWord, ...distractors].sort(
            () => Math.random() - 0.5,
          );
          const correctIdx = optionsList.indexOf(targetWord);

          quizQuestions.push({
            question: questionText,
            options: optionsList,
            correctAnswerIndex: correctIdx,
            explanation: `Based on your note: "${unusedSent}".`,
          });
        }
      }
      usedSentences.add(unusedSent);
    }

    if (quizQuestions.length === 0) {
      return this.createPlaceholderQuiz(
        "Local Generator Output",
        "Generated from generic notes parser",
        options,
      );
    }

    // Build final local quiz object
    return {
      id: "local_" + Date.now(),
      title: `Quiz: ${notesText.split(/[.!?\n]/)[0].substring(0, 30)}...`,
      description: `Generated locally from your notes (${quizQuestions.length} questions).`,
      category: "Custom",
      difficulty: options.difficulty,
      timeLimit: quizQuestions.length * 30,
      questions: quizQuestions,
    };
  }

  static getRandomDistractors(correctWord, sentences, count) {
    const distractors = [];
    // Pool of nouns/words from other sentences
    const wordPool = new Set();
    sentences.forEach((s) => {
      s.split(/\s+/).forEach((w) => {
        const cleaned = w.replace(/[^\w]/g, "").trim();
        if (
          cleaned.length > 3 &&
          cleaned.toLowerCase() !== correctWord.toLowerCase()
        ) {
          wordPool.add(cleaned);
        }
      });
    });

    const poolArray = Array.from(wordPool);
    while (distractors.length < count) {
      if (poolArray.length === 0) {
        // Fallbacks if pool is empty
        distractors.push(`Distractor ${distractors.length + 1}`);
      } else {
        const randIdx = Math.floor(Math.random() * poolArray.length);
        distractors.push(poolArray.splice(randIdx, 1)[0]);
      }
    }
    return distractors;
  }

  static createPlaceholderQuiz(title, desc, options) {
    return {
      id: "placeholder_" + Date.now(),
      title: title,
      description: desc,
      category: "Custom",
      difficulty: options.difficulty,
      timeLimit: options.size * 30,
      questions: [
        {
          question:
            "This placeholder question was generated because the note parsing engine couldn't extract enough semantic sentences. Which options would you select?",
          options: [
            "Correct Option",
            "Alternative Option A",
            "Alternative Option B",
            "Alternative Option C",
          ],
          correctAnswerIndex: 0,
          explanation: "This is a fallback placeholder question.",
        },
      ],
    };
  }
}

// --- ACTIVE QUIZ ENGINE STATE ---
const QuizEngine = {
  quiz: null,
  currentQuestionIndex: 0,
  answers: [],
  timerId: null,
  timeLeft: 0,
  timeSpent: 0,

  start(quiz) {
    this.quiz = quiz;
    this.currentQuestionIndex = 0;
    this.answers = new Array(quiz.questions.length).fill(null);
    this.timeLeft = quiz.timeLimit;
    this.timeSpent = 0;

    if (this.timerId) clearInterval(this.timerId);

    this.timerId = setInterval(() => {
      this.timeLeft--;
      this.timeSpent++;

      this.updateTimerDisplay();

      if (this.timeLeft <= 0) {
        clearInterval(this.timerId);
        this.autoSubmit();
      }
    }, 1000);
  },

  updateTimerDisplay() {
    const timerVal = document.getElementById("timerVal");
    const timerBox = document.getElementById("timerBox");
    if (timerVal) {
      const minutes = Math.floor(this.timeLeft / 60);
      const seconds = this.timeLeft % 60;
      timerVal.textContent = `${minutes}:${seconds.toString().padStart(2, "0")}`;

      if (this.timeLeft <= 30) {
        timerBox.classList.add("timer-warning");
      } else {
        timerBox.classList.remove("timer-warning");
      }
    }
  },

  selectAnswer(optionIndex) {
    this.answers[this.currentQuestionIndex] = optionIndex;
  },

  nextQuestion() {
    if (this.currentQuestionIndex < this.quiz.questions.length - 1) {
      this.currentQuestionIndex++;
      return true;
    }
    return false;
  },

  prevQuestion() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
      return true;
    }
    return false;
  },

  isCompleted() {
    return this.answers.every((a) => a !== null);
  },

  get unansweredCount() {
    return this.answers.filter((a) => a === null).length;
  },

  stopTimer() {
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  },

  autoSubmit() {
    Toaster.show("Time's up! Submitting your quiz automatically...", "warning");
    this.submit();
  },

  submit() {
    this.stopTimer();
    const user = DBService.getCurrentUser();
    if (!user) return null;

    // Calculate scores
    let correctCount = 0;
    const review = this.quiz.questions.map((q, idx) => {
      const userChoice = this.answers[idx];
      const isCorrect = userChoice === q.correctAnswerIndex;
      if (isCorrect) correctCount++;
      return {
        questionText: q.question,
        options: q.options,
        userAnswer: userChoice,
        correctAnswer: q.correctAnswerIndex,
        explanation: q.explanation,
        isCorrect: isCorrect,
      };
    });

    const percentage = Math.round(
      (correctCount / this.quiz.questions.length) * 100,
    );
    const attemptId = "att_" + Date.now();

    const attempt = {
      id: attemptId,
      username: user.username,
      quizId: this.quiz.id,
      quizTitle: this.quiz.title,
      correctCount: correctCount,
      totalQuestions: this.quiz.questions.length,
      percentage: percentage,
      timeSpent: this.timeSpent,
      date: new Date().toLocaleDateString(),
      review: review,
    };

    DBService.saveAttempt(attempt);
    return attemptId;
  },
};

// --- SPA ROUTER & ROUTE GUARDS ---
const routes = {
  home: { render: renderHome, auth: false },
  login: { render: renderLogin, auth: false },
  register: { render: renderRegister, auth: false },
  dashboard: { render: renderDashboard, auth: true },
  quiz: { render: renderQuiz, auth: true },
  result: { render: renderResult, auth: true },
  upload: { render: renderUpload, auth: true },
  history: { render: renderHistory, auth: true },
  leaderboard: { render: renderLeaderboard, auth: true },
  profile: { render: renderProfile, auth: true },
  contact: { render: renderContact, auth: false },
};

function navigateTo(hashPath) {
  window.location.hash = hashPath;
}

function handleRoute() {
  const hash = window.location.hash || "#/home";
  const parts = hash.split("/");
  const routeName = parts[1] || "home";
  const routeParam = parts[2] || null;

  const route = routes[routeName] || routes["home"];
  const currentUser = DBService.getCurrentUser();

  // Route guards
  if (route.auth && !currentUser) {
    Toaster.show("Access denied. Please log in first.", "error");
    navigateTo("#/login");
    return;
  }

  // If logged in, block access to login/register routes
  if ((routeName === "login" || routeName === "register") && currentUser) {
    navigateTo("#/dashboard");
    return;
  }

  // Toggle active navigation link classes
  const navItems = document.querySelectorAll(".nav-item");
  navItems.forEach((item) => {
    if (item.getAttribute("data-route") === routeName) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });

  // Update Header Auth Buttons display
  const authGroup = document.getElementById("navAuthGroup");
  if (authGroup) {
    if (currentUser) {
      authGroup.innerHTML = `
                <div class="user-pill">
                    <span class="user-pill-avatar">${currentUser.avatar || "🧠"}</span>
                    <span class="user-pill-name">${currentUser.username}</span>
                </div>
                <button onclick="handleLogout()" class="btn btn-outline btn-sm">Logout</button>
            `;
    } else {
      authGroup.innerHTML = `
                <a href="#/login" class="btn btn-outline btn-sm">Login</a>
                <a href="#/register" class="btn btn-primary btn-sm">Sign Up</a>
            `;
    }
  }

  // Render corresponding view
  route.render(routeParam);

  // Smooth scroll page to top
  window.scrollTo({ top: 0, behavior: "smooth" });
}

window.addEventListener("hashchange", handleRoute);
window.addEventListener("load", handleRoute);

// Toggle Mobile Navigation
document.getElementById("menuToggle")?.addEventListener("click", () => {
  const nav = document.getElementById("appNav");
  nav.classList.toggle("active");
});

// Sync Logout
function handleLogout() {
  DBService.setCurrentUser(null);
  QuizEngine.stopTimer();
  Toaster.show("Successfully logged out.", "success");
  navigateTo("#/home");
}

// --- VIEW RENDERERS ---

function getAppElement() {
  return document.getElementById("app");
}

// 1. Home / Landing View
function renderHome() {
  const app = getAppElement();
  const currentUser = DBService.getCurrentUser();

  app.innerHTML = `
        <section class="hero-section">
            <div class="hero-content">
                <h1>Master Any Subject with <span class="text-accent">AI-Powered</span> Quizzes</h1>
                <p>Upload your study notes, textbooks, or research papers and instantly generate custom, interactive multiple-choice tests to evaluate your knowledge and retention.</p>
                <div class="hero-actions">
                    ${
                      currentUser
                        ? `<a href="#/dashboard" class="btn btn-primary btn-lg">Go to Dashboard</a>`
                        : `<a href="#/register" class="btn btn-primary btn-lg">Get Started Free</a>`
                    }
                    <a href="#/contact" class="btn btn-outline btn-lg">Learn More</a>
                </div>
            </div>
            <div class="hero-visual">
                <div class="hero-card-glow"></div>
                <!-- Premium SVG Graphic -->
                <svg class="hero-illustration" viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="250" cy="250" r="180" stroke="rgba(124, 58, 237, 0.3)" stroke-width="1" stroke-dasharray="10 10"/>
                    <circle cx="250" cy="250" r="140" stroke="rgba(6, 182, 212, 0.2)" stroke-width="2"/>
                    
                    <!-- Core brain glow -->
                    <circle cx="250" cy="250" r="80" fill="url(#brainGlow)" opacity="0.8"/>
                    
                    <!-- Nodes connection -->
                    <g stroke="rgba(255, 255, 255, 0.15)" stroke-width="1.5">
                        <line x1="250" y1="130" x2="350" y2="200" />
                        <line x1="350" y1="200" x2="330" y2="330" />
                        <line x1="330" y1="330" x2="250" y2="370" />
                        <line x1="250" y1="370" x2="170" y2="330" />
                        <line x1="170" y1="330" x2="150" y2="200" />
                        <line x1="150" y1="200" x2="250" y2="130" />
                        
                        <!-- Internal cross connections -->
                        <line x1="250" y1="130" x2="250" y2="250" />
                        <line x1="350" y1="200" x2="250" y2="250" />
                        <line x1="330" y1="330" x2="250" y2="250" />
                        <line x1="250" y1="370" x2="250" y2="250" />
                        <line x1="170" y1="330" x2="250" y2="250" />
                        <line x1="150" y1="200" x2="250" y2="250" />
                    </g>
                    
                    <!-- Interactive pulse nodes -->
                    <circle cx="250" cy="130" r="7" fill="#7c3aed" />
                    <circle cx="350" cy="200" r="7" fill="#06b6d4" />
                    <circle cx="330" cy="330" r="7" fill="#ec4899" />
                    <circle cx="250" cy="370" r="7" fill="#7c3aed" />
                    <circle cx="170" cy="330" r="7" fill="#06b6d4" />
                    <circle cx="150" cy="200" r="7" fill="#ec4899" />
                    <circle cx="250" cy="250" r="10" fill="#f8fafc" />

                    <!-- Floating decorative circles -->
                    <circle cx="100" cy="120" r="15" fill="rgba(124, 58, 237, 0.1)" />
                    <circle cx="410" cy="160" r="25" fill="rgba(6, 182, 212, 0.15)" />
                    <circle cx="390" cy="400" r="12" fill="rgba(236, 72, 153, 0.1)" />

                    <defs>
                        <radialGradient id="brainGlow" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(250 250) rotate(90) scale(80)">
                            <stop offset="0%" stop-color="#7c3aed" stop-opacity="0.6"/>
                            <stop offset="100%" stop-color="#090c15" stop-opacity="0"/>
                        </radialGradient>
                    </defs>
                </svg>
            </div>
        </section>

        <div class="stats-bar">
            <div class="stat-item">
                <div class="stat-number">10,000+</div>
                <div class="stat-label">Quizzes Generated</div>
            </div>
            <div class="stat-item">
                <div class="stat-number">98.4%</div>
                <div class="stat-label">Satisfaction Rating</div>
            </div>
            <div class="stat-item">
                <div class="stat-number">24/7</div>
                <div class="stat-label">AI Availability</div>
            </div>
        </div>
    `;
  lucide.createIcons();
}

// 2. Login View
function renderLogin() {
  const app = getAppElement();
  app.innerHTML = `
        <div class="auth-wrapper">
            <div class="glass-panel">
                <h2 class="auth-title">Welcome Back</h2>
                <p class="auth-subtitle">Sign in to resume your learning sessions</p>
                
                <form id="loginForm">
                    <div class="form-group">
                        <label class="form-label">Username or Email</label>
                        <input type="text" id="loginUser" class="form-control" placeholder="Enter username or email" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Password</label>
                        <input type="password" id="loginPass" class="form-control" placeholder="Enter password" required>
                    </div>
                    <button type="submit" class="btn btn-primary btn-block">Sign In</button>
                </form>
                
                <p class="auth-footer-text">
                    Don't have an account? <a href="#/register">Create one here</a>
                </p>
            </div>
        </div>
    `;

  document.getElementById("loginForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const userVal = document.getElementById("loginUser").value.trim();
    const passVal = document.getElementById("loginPass").value;

    const result = DBService.loginUser(userVal, passVal);
    if (result.success) {
      Toaster.show(`Welcome, ${result.user.username}!`, "success");
      navigateTo("#/dashboard");
    } else {
      Toaster.show(result.message, "error");
    }
  });

  lucide.createIcons();
}

// 3. Register View
function renderRegister() {
  const app = getAppElement();
  app.innerHTML = `
        <div class="auth-wrapper">
            <div class="glass-panel">
                <h2 class="auth-title">Create Account</h2>
                <p class="auth-subtitle">Start generating smart assessment quizzes</p>
                
                <form id="registerForm">
                    <div class="form-group">
                        <label class="form-label">Username</label>
                        <input type="text" id="regUser" class="form-control" placeholder="Choose a username" required minlength="3">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Email Address</label>
                        <input type="email" id="regEmail" class="form-control" placeholder="you@example.com" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Password</label>
                        <input type="password" id="regPass" class="form-control" placeholder="Create secure password" required minlength="6">
                    </div>
                    <button type="submit" class="btn btn-primary btn-block">Create Account</button>
                </form>
                
                <p class="auth-footer-text">
                    Already have an account? <a href="#/login">Login here</a>
                </p>
            </div>
        </div>
    `;

  document.getElementById("registerForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const userVal = document.getElementById("regUser").value.trim();
    const emailVal = document.getElementById("regEmail").value.trim();
    const passVal = document.getElementById("regPass").value;

    const result = DBService.registerUser(userVal, emailVal, passVal);
    if (result.success) {
      Toaster.show(
        "Account created successfully! Auto-logging in...",
        "success",
      );
      DBService.setCurrentUser(result.user);
      navigateTo("#/dashboard");
    } else {
      Toaster.show(result.message, "error");
    }
  });

  lucide.createIcons();
}

// 4. Dashboard View
function renderDashboard() {
  const app = getAppElement();
  const user = DBService.getCurrentUser();
  const quizzes = DBService.getQuizzes();
  const attempts = DBService.getHistory().filter(
    (h) => h.username === user.username,
  );

  // Calculate aggregate statistics
  const totalTaken = attempts.length;
  const avgScore =
    totalTaken > 0
      ? Math.round(
          attempts.reduce((sum, current) => sum + current.percentage, 0) /
            totalTaken,
        )
      : 0;

  // Sort and get highest score
  const bestScore =
    totalTaken > 0 ? Math.max(...attempts.map((a) => a.percentage)) : 0;

  app.innerHTML = `
        <div class="dashboard-grid">
            <div class="dashboard-main">
                <div class="glass-panel user-welcome-panel">
                    <div class="user-welcome-content">
                        <h2>Welcome back, ${user.username}! ${user.avatar || "🧠"}</h2>
                        <p class="view-subtitle" style="margin-bottom:0;">Ready to sharpen your mind? Select a seeded topic or upload your own revision material to start.</p>
                    </div>
                </div>

                <div class="dashboard-stats-grid">
                    <div class="dashboard-stat-card">
                        <div class="stat-card-icon"><i data-lucide="play-circle"></i></div>
                        <div class="stat-card-info">
                            <h4>Quizzes Taken</h4>
                            <p>${totalTaken}</p>
                        </div>
                    </div>
                    <div class="dashboard-stat-card">
                        <div class="stat-card-icon" style="color: var(--secondary); background: rgba(6, 182, 212, 0.1);"><i data-lucide="award"></i></div>
                        <div class="stat-card-info">
                            <h4>Average Score</h4>
                            <p>${avgScore}%</p>
                        </div>
                    </div>
                    <div class="dashboard-stat-card">
                        <div class="stat-card-icon" style="color: #ec4899; background: rgba(236, 72, 153, 0.1);"><i data-lucide="zap"></i></div>
                        <div class="stat-card-info">
                            <h4>Total Points</h4>
                            <p>${user.points || 0}</p>
                        </div>
                    </div>
                </div>

                <div>
                    <div class="quiz-section-header">
                        <h3>Available Practice Quizzes</h3>
                    </div>
                    
                    <div class="search-filters">
                        <div class="search-input-wrapper">
                            <i data-lucide="search"></i>
                            <input type="text" id="quizSearchInput" class="form-control" placeholder="Search quizzes by title or category...">
                        </div>
                        <select id="difficultyFilter" class="form-control" style="width: auto;">
                            <option value="">All Difficulties</option>
                            <option value="Easy">Easy</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Hard">Hard</option>
                        </select>
                    </div>

                    <div class="quizzes-grid" id="quizzesGrid">
                        <!-- Loaded Dynamically -->
                    </div>
                </div>
            </div>

            <div class="dashboard-sidebar">
                <div class="glass-panel quick-generator-panel">
                    <div class="icon-box-header">
                        <div class="icon-box"><i data-lucide="sparkles"></i></div>
                        <h3>AI Generator</h3>
                    </div>
                    <p>Have customized notes or textbook excerpts? Generate tailored multiple-choice assessments instantly.</p>
                    <a href="#/upload" class="btn btn-secondary btn-block">
                        <i data-lucide="file-text"></i> Generate from Notes
                    </a>
                </div>

                <div class="glass-panel recent-activity-panel">
                    <h3>Recent Attempts</h3>
                    <div class="activity-list" id="recentActivityList">
                        <!-- Rendered Dynamically -->
                    </div>
                </div>
            </div>
        </div>
    `;

  // Render Quizzes
  renderQuizzesList(quizzes);

  // Search and Filter Listeners
  const searchInput = document.getElementById("quizSearchInput");
  const difficultyFilter = document.getElementById("difficultyFilter");

  const applyFilters = () => {
    const query = searchInput.value.toLowerCase();
    const diff = difficultyFilter.value;

    const filtered = quizzes.filter((q) => {
      const matchesQuery =
        q.title.toLowerCase().includes(query) ||
        q.category.toLowerCase().includes(query);
      const matchesDiff = diff === "" || q.difficulty === diff;
      return matchesQuery && matchesDiff;
    });
    renderQuizzesList(filtered);
  };

  searchInput?.addEventListener("input", applyFilters);
  difficultyFilter?.addEventListener("change", applyFilters);

  // Render recent activity list
  const activityContainer = document.getElementById("recentActivityList");
  if (activityContainer) {
    if (attempts.length === 0) {
      activityContainer.innerHTML = `<p class="view-subtitle" style="font-size:0.9rem; margin-bottom:0; text-align:center;">No quiz attempts logged yet.</p>`;
    } else {
      const recent = attempts.slice().reverse().slice(0, 4); // Top 4 recent
      activityContainer.innerHTML = recent
        .map((att) => {
          let scoreClass = "score-low";
          if (att.percentage >= 80) scoreClass = "score-high";
          else if (att.percentage >= 50) scoreClass = "score-medium";

          return `
                    <div class="activity-item">
                        <div class="activity-info">
                            <h4>${att.quizTitle}</h4>
                            <p>${att.date} &bull; ${Math.floor(att.timeSpent / 60)}m ${att.timeSpent % 60}s</p>
                        </div>
                        <div class="activity-score ${scoreClass}">${att.percentage}%</div>
                    </div>
                `;
        })
        .join("");
    }
  }

  lucide.createIcons();
}

function renderQuizzesList(quizzesArray) {
  const grid = document.getElementById("quizzesGrid");
  if (!grid) return;

  if (quizzesArray.length === 0) {
    grid.innerHTML = `<p class="view-subtitle" style="grid-column: 1/-1; text-align: center; padding: 2rem;">No matching quizzes found.</p>`;
    return;
  }

  grid.innerHTML = quizzesArray
    .map((quiz) => {
      let badgeClass = "badge-custom";
      const cat = quiz.category.toLowerCase();
      if (cat.includes("web")) badgeClass = "badge-webdev";
      else if (cat.includes("science")) badgeClass = "badge-science";
      else if (cat.includes("history")) badgeClass = "badge-history";
      else if (cat.includes("space")) badgeClass = "badge-space";

      return `
            <div class="glass-panel interactive quiz-card">
                <div class="quiz-card-header">
                    <span class="quiz-badge ${badgeClass}">${quiz.category}</span>
                    <span class="quiz-badge" style="background: rgba(255, 255, 255, 0.05); color: var(--text-muted);">${quiz.difficulty}</span>
                </div>
                <h3>${quiz.title}</h3>
                <p>${quiz.description}</p>
                <div class="quiz-meta">
                    <div class="quiz-meta-item">
                        <i data-lucide="help-circle"></i>
                        <span>${quiz.questions.length} Qs</span>
                    </div>
                    <div class="quiz-meta-item">
                        <i data-lucide="clock"></i>
                        <span>${Math.floor(quiz.timeLimit / 60)} mins</span>
                    </div>
                </div>
                <a href="#/quiz/${quiz.id}" class="btn btn-primary btn-block">
                    <i data-lucide="play"></i> Start Quiz
                </a>
            </div>
        `;
    })
    .join("");
  lucide.createIcons();
}

// 5. Quiz Player View
function renderQuiz(quizId) {
  const app = getAppElement();
  const quiz = DBService.getQuizById(quizId);

  if (!quiz) {
    app.innerHTML = `
            <div class="glass-panel text-center">
                <h2>Quiz Not Found</h2>
                <p class="view-subtitle">The requested quiz could not be loaded.</p>
                <a href="#/dashboard" class="btn btn-primary">Return to Dashboard</a>
            </div>
        `;
    lucide.createIcons();
    return;
  }

  // Initialize Quiz Engine
  QuizEngine.start(quiz);

  renderActiveQuestionCard();
}

function renderActiveQuestionCard() {
  const app = getAppElement();
  const quiz = QuizEngine.quiz;
  const currentQIdx = QuizEngine.currentQuestionIndex;
  const currentQuestion = quiz.questions[currentQIdx];
  const totalQs = quiz.questions.length;
  const progressPercent = Math.round((currentQIdx / totalQs) * 100);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  app.innerHTML = `
        <div class="quiz-header-bar">
            <div>
                <h2 style="font-size: 1.8rem;">${quiz.title}</h2>
                <span class="quiz-badge" style="background: rgba(255, 255, 255, 0.05); color: var(--text-muted);">${quiz.category} &bull; ${quiz.difficulty}</span>
            </div>
            <div class="quiz-timer-box" id="timerBox">
                <i data-lucide="clock"></i>
                <span id="timerVal">${formatTime(QuizEngine.timeLeft)}</span>
            </div>
        </div>

        <div class="quiz-progress-wrapper">
            <div class="progress-info">
                <span>Question ${currentQIdx + 1} of ${totalQs}</span>
                <span>${QuizEngine.unansweredCount} unanswered remaining</span>
            </div>
            <div class="progress-bar-bg">
                <div class="progress-bar-fill" style="width: ${progressPercent}%;"></div>
            </div>
        </div>

        <div class="glass-panel question-card">
            <h2>${currentQuestion.question}</h2>
            
            <div class="options-list">
                ${currentQuestion.options
                  .map((opt, idx) => {
                    const isSelected = QuizEngine.answers[currentQIdx] === idx;
                    const letter = String.fromCharCode(65 + idx); // A, B, C, D
                    return `
                        <button class="option-btn ${isSelected ? "selected" : ""}" onclick="selectQuizOption(${idx})">
                            <span class="option-letter">${letter}</span>
                            <span>${opt}</span>
                        </button>
                    `;
                  })
                  .join("")}
            </div>

            <div class="quiz-actions">
                <button class="btn btn-outline" onclick="prevQuizQuestion()" ${currentQIdx === 0 ? "disabled" : ""}>
                    <i data-lucide="chevron-left"></i> Previous
                </button>
                
                ${
                  currentQIdx === totalQs - 1
                    ? `<button class="btn btn-secondary" onclick="confirmQuizSubmit()"><i data-lucide="check-square"></i> Submit Quiz</button>`
                    : `<button class="btn btn-outline" onclick="nextQuizQuestion()">Next <i data-lucide="chevron-right"></i></button>`
                }
            </div>
        </div>

        <!-- Overlay confirmation dialog -->
        <div class="modal-overlay" id="confirmModal">
            <div class="modal-content">
                <div class="modal-icon"><i data-lucide="alert-triangle"></i></div>
                <h3>Submit Quiz?</h3>
                <p id="confirmModalText">Are you sure you want to submit? You have answered all questions.</p>
                <div class="modal-buttons">
                    <button class="btn btn-outline" onclick="closeConfirmModal()">Go Back</button>
                    <button class="btn btn-primary" onclick="submitQuizData()">Submit Now</button>
                </div>
            </div>
        </div>
    `;

  lucide.createIcons();
  QuizEngine.updateTimerDisplay(); // Force visual match immediately
}

// Bind to window to allow simple inline onclick triggers
window.selectQuizOption = function (idx) {
  QuizEngine.selectAnswer(idx);

  // Instantly rerender choices with selected highlight without reloading the entire page content
  const btns = document.querySelectorAll(".option-btn");
  btns.forEach((btn, bIdx) => {
    if (bIdx === idx) {
      btn.classList.add("selected");
    } else {
      btn.classList.remove("selected");
    }
  });

  // Also update unanswered counts dynamically in the header display
  const label = document.querySelector(".progress-info span:last-child");
  if (label) {
    label.textContent = `${QuizEngine.unansweredCount} unanswered remaining`;
  }
};

window.nextQuizQuestion = function () {
  if (QuizEngine.nextQuestion()) {
    renderActiveQuestionCard();
  }
};

window.prevQuizQuestion = function () {
  if (QuizEngine.prevQuestion()) {
    renderActiveQuestionCard();
  }
};

window.confirmQuizSubmit = function () {
  const modal = document.getElementById("confirmModal");
  const modalText = document.getElementById("confirmModalText");
  const unanswered = QuizEngine.unansweredCount;

  if (modal && modalText) {
    if (unanswered > 0) {
      modalText.textContent = `You have left ${unanswered} question(s) unanswered. Are you sure you want to finish and submit now?`;
    } else {
      modalText.textContent = `All questions answered. Ready to view your final breakdown?`;
    }
    modal.classList.add("active");
  }
};

window.closeConfirmModal = function () {
  const modal = document.getElementById("confirmModal");
  modal?.classList.remove("active");
};

window.submitQuizData = function () {
  window.closeConfirmModal();
  const attemptId = QuizEngine.submit();
  if (attemptId) {
    Toaster.show("Quiz submitted! Analyzing results...", "success");
    navigateTo(`#/result/${attemptId}`);
  } else {
    Toaster.show(
      "Error saving attempt. User session may have expired.",
      "error",
    );
    navigateTo("#/dashboard");
  }
};

// 6. Results Breakdown View
function renderResult(attemptId) {
  const app = getAppElement();
  const history = DBService.getHistory();
  const attempt = history.find((h) => h.id === attemptId);

  if (!attempt) {
    app.innerHTML = `
            <div class="glass-panel text-center">
                <h2>Attempt Log Not Found</h2>
                <p class="view-subtitle">Unable to recover results details for request ID.</p>
                <a href="#/dashboard" class="btn btn-primary">Return to Dashboard</a>
            </div>
        `;
    lucide.createIcons();
    return;
  }

  const isPassed = attempt.percentage >= 60;

  // Math to compute SVG circular path offset (dasharray 502 corresponds to r=80, circumf = 2 * PI * r = 502.6)
  const circum = 502;
  const offset = circum - (attempt.percentage / 100) * circum;

  app.innerHTML = `
        <h2 class="view-title">Assessment Report</h2>
        <p class="view-subtitle">Review score metrics, performance breakdowns, and detailed solutions.</p>

        <div class="glass-panel" style="margin-bottom: 3rem;">
            <div class="result-grid">
                <div class="result-card">
                    <div class="radial-progress-wrapper">
                        <svg class="radial-svg">
                            <defs>
                                <linearGradient id="resultGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stop-color="#7c3aed" />
                                    <stop offset="100%" stop-color="#06b6d4" />
                                </linearGradient>
                            </defs>
                            <circle class="radial-bg" cx="90" cy="90" r="80" />
                            <circle class="radial-fill" cx="90" cy="90" r="80" style="stroke-dashoffset: ${offset};" />
                        </svg>
                        <div class="radial-text">
                            <div class="score-percent">${attempt.percentage}%</div>
                            <div class="score-fraction">${attempt.correctCount} / ${attempt.totalQuestions} Correct</div>
                        </div>
                    </div>

                    <div class="result-verdict ${isPassed ? "pass" : "fail"}">
                        ${isPassed ? "Passed" : "Needs Practice"}
                    </div>
                    <p class="result-summary-text">
                        ${
                          isPassed
                            ? "Excellent performance! You have displayed a solid grasp of the concepts in this test."
                            : "We recommend studying your note documents again and retaking the quiz."
                        }
                    </p>
                </div>

                <div>
                    <div class="result-stats-table">
                        <div class="result-stat-row">
                            <span><i data-lucide="clock"></i> Time Spent</span>
                            <span>${Math.floor(attempt.timeSpent / 60)}m ${attempt.timeSpent % 60}s</span>
                        </div>
                        <div class="result-stat-row">
                            <span><i data-lucide="calendar"></i> Completion Date</span>
                            <span>${attempt.date}</span>
                        </div>
                        <div class="result-stat-row">
                            <span><i data-lucide="award"></i> Points Earned</span>
                            <span style="color: var(--success); font-weight:700;">+${attempt.correctCount * 10} Pts</span>
                        </div>
                    </div>
                    
                    <div class="result-actions">
                        <a href="#/dashboard" class="btn btn-outline">Dashboard</a>
                        <a href="#/quiz/${attempt.quizId}" class="btn btn-primary">Retake Quiz</a>
                    </div>
                </div>
            </div>
        </div>

        <section class="answers-review-section">
            <h3>Detailed Solution Review</h3>
            <div class="review-list">
                ${attempt.review
                  .map((item, idx) => {
                    const statusClass = item.isCorrect
                      ? "correct"
                      : "incorrect";
                    const letterUser =
                      item.userAnswer !== null
                        ? String.fromCharCode(65 + item.userAnswer)
                        : "None";
                    const letterCorrect = String.fromCharCode(
                      65 + item.correctAnswer,
                    );

                    return `
                        <div class="review-card ${statusClass}">
                            <div class="review-header">
                                <span class="review-q-num">Question ${idx + 1}</span>
                                <span class="review-status-badge ${statusClass}">
                                    <i data-lucide="${item.isCorrect ? "check" : "x"}"></i>
                                    ${item.isCorrect ? "Correct" : "Incorrect"}
                                </span>
                            </div>
                            <div class="review-question">${item.questionText}</div>
                            
                            <div class="review-options">
                                ${item.options
                                  .map((opt, oIdx) => {
                                    let choiceClass = "";
                                    let icon = "";

                                    if (oIdx === item.correctAnswer) {
                                      choiceClass = "correct-choice";
                                      icon = `<i data-lucide="check" style="width:14px; height:14px; color: var(--success);"></i>`;
                                    } else if (
                                      oIdx === item.userAnswer &&
                                      !item.isCorrect
                                    ) {
                                      choiceClass = "user-choice-incorrect";
                                      icon = `<i data-lucide="x" style="width:14px; height:14px; color: var(--danger);"></i>`;
                                    }

                                    return `
                                        <div class="review-option ${choiceClass}">
                                            ${icon}
                                            <span><strong>${String.fromCharCode(65 + oIdx)}.</strong> ${opt}</span>
                                        </div>
                                    `;
                                  })
                                  .join("")}
                            </div>

                            <div class="review-explanation">
                                <strong>Explanation:</strong> ${item.explanation}
                            </div>
                        </div>
                    `;
                  })
                  .join("")}
            </div>
        </section>
    `;

  lucide.createIcons();
}

// 7. AI Generator View (Upload Panel)
function renderUpload() {
  const app = getAppElement();
  app.innerHTML = `
        <h2 class="view-title">AI Quiz Generator</h2>
        <p class="view-subtitle">Paste notes or upload standard text files to generate customized interactive multiple-choice tests.</p>

        <div class="upload-grid">
            <div>
                <div class="glass-panel">
                    <form id="quizGenForm">
                        <div class="form-group">
                            <label class="form-label">Study Notes / Text Document Context</label>
                            <textarea id="notesArea" class="form-control" placeholder="Paste your articles, text excerpts, definitions, or study notes here (minimum 100 characters)..." required minlength="100"></textarea>
                        </div>
                        
                        <div class="separator">OR</div>

                        <div class="upload-zone" id="dropZone">
                            <div class="upload-icon"><i data-lucide="upload-cloud"></i></div>
                            <h3>Drag & Drop Text File Here</h3>
                            <p class="form-label" style="margin-bottom:0;">Supports standard text documents (.txt) up to 2MB</p>
                            <input type="file" id="fileInput" accept=".txt" style="display: none;">
                        </div>
                        
                        <div class="file-list" id="uploadedFiles"></div>

                        <div style="display:grid; grid-template-columns: 1fr 1fr; gap:1.5rem; margin-top:2rem;">
                            <div class="form-group">
                                <label class="form-label">Target Difficulty</label>
                                <select id="genDifficulty" class="form-control">
                                    <option value="Easy">Easy</option>
                                    <option value="Intermediate" selected>Intermediate</option>
                                    <option value="Hard">Hard</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Quiz Length</label>
                                <select id="genSize" class="form-control">
                                    <option value="3">3 Questions</option>
                                    <option value="5" selected>5 Questions</option>
                                    <option value="10">10 Questions</option>
                                </select>
                            </div>
                        </div>

                        <button type="submit" class="btn btn-secondary btn-block" style="margin-top:1rem;">
                            <i data-lucide="sparkles"></i> Generate Practice Quiz
                        </button>
                    </form>
                </div>
            </div>

            <div>
                <div class="glass-panel" style="height:100%;">
                    <h3>How it Works</h3>
                    <div style="display:flex; flex-direction:column; gap:1.5rem; margin-top:1.5rem;">
                        <div style="display:flex; gap:1rem; align-items:flex-start;">
                            <div style="width:32px; height:32px; border-radius:50%; background:rgba(6, 182, 212, 0.1); color:var(--secondary); display:flex; align-items:center; justify-content:center; font-weight:700; flex-shrink:0;">1</div>
                            <div>
                                <h4 style="font-size:0.95rem; margin-bottom:0.25rem;">Input Context</h4>
                                <p style="font-size:0.85rem; color:var(--text-muted);">Paste raw textual information or drop a revision text file into the generator.</p>
                            </div>
                        </div>
                        <div style="display:flex; gap:1rem; align-items:flex-start;">
                            <div style="width:32px; height:32px; border-radius:50%; background:rgba(6, 182, 212, 0.1); color:var(--secondary); display:flex; align-items:center; justify-content:center; font-weight:700; flex-shrink:0;">2</div>
                            <div>
                                <h4 style="font-size:0.95rem; margin-bottom:0.25rem;">AI Extraction</h4>
                                <p style="font-size:0.85rem; color:var(--text-muted);">The generator evaluates core concepts. If a Gemini API Key is stored, it builds semantic multiple-choice tests; otherwise, it triggers a local regex sentence parser.</p>
                            </div>
                        </div>
                        <div style="display:flex; gap:1rem; align-items:flex-start;">
                            <div style="width:32px; height:32px; border-radius:50%; background:rgba(6, 182, 212, 0.1); color:var(--secondary); display:flex; align-items:center; justify-content:center; font-weight:700; flex-shrink:0;">3</div>
                            <div>
                                <h4 style="font-size:0.95rem; margin-bottom:0.25rem;">Test and Track</h4>
                                <p style="font-size:0.85rem; color:var(--text-muted);">Start testing immediately. Score points, review explanations, and climb the public scoreboard ranks.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

  // Dropzone logic
  const dropZone = document.getElementById("dropZone");
  const fileInput = document.getElementById("fileInput");
  const notesArea = document.getElementById("notesArea");
  const filesListContainer = document.getElementById("uploadedFiles");

  dropZone?.addEventListener("click", () => fileInput.click());

  dropZone?.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropZone.classList.add("dragover");
  });

  dropZone?.addEventListener("dragleave", () => {
    dropZone.classList.remove("dragover");
  });

  dropZone?.addEventListener("drop", (e) => {
    e.preventDefault();
    dropZone.classList.remove("dragover");
    if (e.dataTransfer.files.length > 0) {
      handleTextFile(e.dataTransfer.files[0]);
    }
  });

  fileInput?.addEventListener("change", (e) => {
    if (e.target.files.length > 0) {
      handleTextFile(e.target.files[0]);
    }
  });

  function handleTextFile(file) {
    if (file.type !== "text/plain" && !file.name.endsWith(".txt")) {
      Toaster.show("Only plain text (.txt) files are supported.", "error");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      notesArea.value = event.target.result;
      filesListContainer.innerHTML = `
                <div class="file-item">
                    <span><i data-lucide="file-text" style="width:14px; height:14px; vertical-align:middle;"></i> ${file.name} (${Math.round(file.size / 1024)} KB)</span>
                    <button type="button" onclick="clearUploadedFile()"><i data-lucide="trash"></i></button>
                </div>
            `;
      lucide.createIcons();
      Toaster.show(`Successfully loaded ${file.name}`, "success");
    };
    reader.readAsText(file);
  }

  window.clearUploadedFile = function () {
    notesArea.value = "";
    filesListContainer.innerHTML = "";
    fileInput.value = "";
  };

  // Form submission triggers generation
  document
    .getElementById("quizGenForm")
    ?.addEventListener("submit", async (e) => {
      e.preventDefault();
      const textVal = notesArea.value.trim();
      const difficulty = document.getElementById("genDifficulty").value;
      const size = parseInt(document.getElementById("genSize").value);

      if (textVal.length < 100) {
        Toaster.show("Please input at least 100 characters of notes.", "error");
        return;
      }

      // Render Loading
      app.innerHTML = `
            <div class="generation-loader">
                <div class="spinner"></div>
                <h2>Analyzing Notes & Generating Questions...</h2>
                <p class="view-subtitle">Using generative intelligence to construct options, correct indexes, and review statements.</p>
            </div>
        `;
      lucide.createIcons();

      try {
        const quiz = await QuizGenerator.generate(textVal, {
          difficulty,
          size,
        });
        DBService.saveQuiz(quiz);
        Toaster.show("Quiz generated successfully!", "success");
        navigateTo(`#/quiz/${quiz.id}`);
      } catch (err) {
        console.error(err);
        Toaster.show(
          "Error generating quiz. Please verify notes layout or Gemini API Key.",
          "error",
        );
        renderUpload(); // Return to upload form on error
      }
    });

  lucide.createIcons();
}

// 8. History Log View
function renderHistory() {
  const app = getAppElement();
  const user = DBService.getCurrentUser();
  const attempts = DBService.getHistory().filter(
    (h) => h.username === user.username,
  );

  app.innerHTML = `
        <div class="history-header">
            <div>
                <h2 class="view-title">Quiz History Log</h2>
                <p class="view-subtitle">Track your learning curve, historical records, and scores.</p>
            </div>
        </div>

        <div class="glass-panel">
            ${
              attempts.length === 0
                ? `
                    <div style="text-align:center; padding: 3rem 0;">
                        <i data-lucide="history" style="width:48px; height:48px; color:var(--text-muted); margin-bottom:1rem;"></i>
                        <h3>No History Recorded</h3>
                        <p class="view-subtitle" style="margin-bottom:1.5rem;">Take a seeded quiz or generate a new custom quiz to log your stats.</p>
                        <a href="#/dashboard" class="btn btn-primary">Take a Quiz</a>
                    </div>
                `
                : `
                    <div class="table-wrapper">
                        <table class="history-table">
                            <thead>
                                <tr>
                                    <th>Quiz Details</th>
                                    <th>Percentage</th>
                                    <th>Correct Qs</th>
                                    <th>Time Taken</th>
                                    <th>Date</th>
                                    <th style="text-align: right;">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${attempts
                                  .slice()
                                  .reverse()
                                  .map((att) => {
                                    let badge = "low";
                                    if (att.percentage >= 85) badge = "high";
                                    else if (att.percentage >= 60)
                                      badge = "medium";

                                    return `
                                        <tr id="row_${att.id}">
                                            <td>
                                                <div class="history-quiz-info">
                                                    <h4>${att.quizTitle}</h4>
                                                    <span>Quiz ID: ${att.quizId}</span>
                                                </div>
                                            </td>
                                            <td><span class="history-score-badge ${badge}">${att.percentage}%</span></td>
                                            <td><strong>${att.correctCount}</strong> / ${att.totalQuestions}</td>
                                            <td>${Math.floor(att.timeSpent / 60)}m ${att.timeSpent % 60}s</td>
                                            <td>${att.date}</td>
                                            <td style="text-align: right; display:flex; justify-content:flex-end; gap:0.5rem;">
                                                <a href="#/result/${att.id}" class="btn btn-outline btn-sm">Review</a>
                                                <button onclick="deleteAttemptLog('${att.id}')" class="btn btn-danger btn-sm" style="padding: 0.5rem;"><i data-lucide="trash" style="width:14px; height:14px;"></i></button>
                                            </td>
                                        </tr>
                                    `;
                                  })
                                  .join("")}
                            </tbody>
                        </table>
                    </div>
                `
            }
        </div>
    `;

  window.deleteAttemptLog = function (id) {
    if (
      confirm(
        "Are you sure you want to permanently delete this attempt from your history?",
      )
    ) {
      DBService.deleteAttempt(id);
      Toaster.show("Attempt deleted.", "success");
      // Rerender history
      renderHistory();
    }
  };

  lucide.createIcons();
}

// 9. Leaderboard View
function renderLeaderboard() {
  const app = getAppElement();
  const users = DBService.getUsers();

  // Sort users by points descending
  const rankedUsers = users
    .slice()
    .sort((a, b) => (b.points || 0) - (a.points || 0));

  // Get Top 3 for Podium
  const top1 = rankedUsers[0] || { username: "Empty", points: 0, avatar: "👤" };
  const top2 = rankedUsers[1] || { username: "Empty", points: 0, avatar: "👤" };
  const top3 = rankedUsers[2] || { username: "Empty", points: 0, avatar: "👤" };

  const otherRankings = rankedUsers.slice(3);

  app.innerHTML = `
        <h2 class="view-title">Leaderboard Rankings</h2>
        <p class="view-subtitle">Compare points with other students and claim your spot on the top podium.</p>

        <div class="glass-panel" style="margin-bottom: 2rem;">
            <!-- Podium Visuals -->
            <div class="podium-container">
                <!-- 1st Place -->
                <div class="podium-item podium-first">
                    <div class="podium-avatar">
                        <span>${top1.avatar || "🧠"}</span>
                        <div class="podium-badge">1</div>
                    </div>
                    <div class="podium-name">${top1.username}</div>
                    <div class="podium-score">${top1.points || 0} Pts</div>
                    <div class="podium-column">1st</div>
                </div>

                <!-- 2nd Place -->
                <div class="podium-item podium-second">
                    <div class="podium-avatar">
                        <span>${top2.avatar || "🧠"}</span>
                        <div class="podium-badge">2</div>
                    </div>
                    <div class="podium-name">${top2.username}</div>
                    <div class="podium-score">${top2.points || 0} Pts</div>
                    <div class="podium-column">2nd</div>
                </div>

                <!-- 3rd Place -->
                <div class="podium-item podium-third">
                    <div class="podium-avatar">
                        <span>${top3.avatar || "🧠"}</span>
                        <div class="podium-badge">3</div>
                    </div>
                    <div class="podium-name">${top3.username}</div>
                    <div class="podium-score">${top3.points || 0} Pts</div>
                    <div class="podium-column">3rd</div>
                </div>
            </div>

            <!-- Rankings table for ranks 4 and down -->
            <h3 style="margin-top: 3rem; margin-bottom: 1rem;">All Ranks</h3>
            <div class="table-wrapper">
                <table class="history-table">
                    <thead>
                        <tr>
                            <th style="width: 80px;">Rank</th>
                            <th>User Name</th>
                            <th style="text-align: right;">Points Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${
                          rankedUsers.length <= 3
                            ? `<tr><td colspan="3" style="text-align:center; padding: 2rem; color:var(--text-muted);">No other users registered. Invite friends to play!</td></tr>`
                            : otherRankings
                                .map(
                                  (u, index) => `
                                <tr>
                                    <td><strong>#${index + 4}</strong></td>
                                    <td>
                                        <div style="display:flex; align-items:center; gap: 0.75rem;">
                                            <span style="font-size:1.3rem;">${u.avatar || "👤"}</span>
                                            <span>${u.username}</span>
                                        </div>
                                    </td>
                                    <td style="text-align: right; font-weight:700; color: var(--secondary);">${u.points || 0} Pts</td>
                                </tr>
                            `,
                                )
                                .join("")
                        }
                    </tbody>
                </table>
            </div>
        </div>
    `;

  lucide.createIcons();
}

// 10. Profile View (Profile & Settings)
function renderProfile() {
  const app = getAppElement();
  const user = DBService.getCurrentUser();
  const settings = DBService.getSettings();
  const attempts = DBService.getHistory().filter(
    (h) => h.username === user.username,
  );

  // Emojis list for customized avatar choice
  const avatarChoices = [
    "🧠",
    "🚀",
    "💻",
    "🔬",
    "🌍",
    "🎨",
    "🏆",
    "🦁",
    "🦉",
    "🎓",
    "👾",
    "🔥",
  ];

  app.innerHTML = `
        <h2 class="view-title">Profile Settings</h2>
        <p class="view-subtitle">Update user information, customize avatars, review statistics, and configure API integrations.</p>

        <div class="profile-grid">
            <div>
                <div class="glass-panel profile-card" style="margin-bottom: 2rem;">
                    <div class="profile-avatar-select" id="avatarDisplayBtn">
                        <div class="profile-avatar-display" id="profileAvatarDisplay">${user.avatar || "🧠"}</div>
                        <div class="profile-avatar-edit"><i data-lucide="edit-3"></i></div>
                    </div>
                    
                    <h3 style="font-size:1.5rem; margin-bottom:0.25rem;">${user.username}</h3>
                    <p class="view-subtitle" style="margin-bottom:1.5rem;">${user.email}</p>
                    
                    <div class="avatar-grid" id="avatarPickerGrid" style="display: none;">
                        ${avatarChoices
                          .map(
                            (emoji) => `
                            <div class="avatar-option ${user.avatar === emoji ? "selected" : ""}" onclick="selectProfileAvatar('${emoji}')">
                                ${emoji}
                            </div>
                        `,
                          )
                          .join("")}
                    </div>
                </div>

                <div class="glass-panel">
                    <h3>Integration Settings</h3>
                    <p class="view-subtitle" style="font-size:0.85rem; margin-bottom:1.5rem;">Add a Gemini API key to activate smart quiz generation. Keys are stored safely in local browser storage.</p>
                    
                    <form id="settingsForm">
                        <div class="form-group">
                            <label class="form-label">Gemini API Key</label>
                            <input type="password" id="geminiApiKey" class="form-control" value="${settings.geminiKey || ""}" placeholder="Enter AI API Key...">
                        </div>
                        <button type="submit" class="btn btn-primary btn-block">Save API Key</button>
                    </form>
                </div>
            </div>

            <div>
                <div class="glass-panel" style="height:100%;">
                    <h3>Score Statistics</h3>
                    <p class="view-subtitle" style="margin-bottom: 1.5rem;">Visual breakdown of correct vs incorrect answers across all logs.</p>
                    
                    <div class="stats-chart-wrapper">
                        <canvas id="statisticsCanvas" style="width:100%; height:100%;"></canvas>
                    </div>
                </div>
            </div>
        </div>
    `;

  // Dropdown Avatar Selector Toggle
  document.getElementById("avatarDisplayBtn")?.addEventListener("click", () => {
    const grid = document.getElementById("avatarPickerGrid");
    if (grid) {
      grid.style.display = grid.style.display === "none" ? "grid" : "none";
    }
  });

  window.selectProfileAvatar = function (emoji) {
    if (DBService.updateUserProfile(user.username, emoji)) {
      const display = document.getElementById("profileAvatarDisplay");
      if (display) display.textContent = emoji;

      // Mark correct picker grid selection
      document.querySelectorAll(".avatar-option").forEach((el) => {
        if (el.textContent.trim() === emoji) el.classList.add("selected");
        else el.classList.remove("selected");
      });

      // Auto hide picker
      const grid = document.getElementById("avatarPickerGrid");
      if (grid) grid.style.display = "none";

      Toaster.show("Avatar updated successfully!", "success");

      // Trigger routing handle to refresh user pill details in header instantly
      const currentRouteHash = window.location.hash;
      handleRoute();
    }
  };

  // Save Gemini Settings
  document.getElementById("settingsForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const key = document.getElementById("geminiApiKey").value.trim();
    DBService.saveSettings({ geminiKey: key });
    Toaster.show("API configuration settings saved successfully.", "success");
  });

  // Render Canvas Statistics Chart
  renderStatisticsChart(attempts);

  lucide.createIcons();
}

function renderStatisticsChart(attemptsList) {
  const canvas = document.getElementById("statisticsCanvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");

  // Set explicit canvas resolution to avoid blur
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * window.devicePixelRatio;
  canvas.height = rect.height * window.devicePixelRatio;
  ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

  const width = rect.width;
  const height = rect.height;

  // Filter attempts or show empty state illustration on canvas if no quizzes taken
  if (attemptsList.length === 0) {
    ctx.fillStyle = "#94a3b8";
    ctx.font = "14px Inter, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(
      "No attempts logged yet. Take a quiz to populate data.",
      width / 2,
      height / 2,
    );
    return;
  }

  // Accumulate total questions correct vs incorrect
  let totalCorrect = 0;
  let totalIncorrect = 0;
  attemptsList.forEach((a) => {
    totalCorrect += a.correctCount;
    totalIncorrect += a.totalQuestions - a.correctCount;
  });

  const totalQuestionsSolved = totalCorrect + totalIncorrect;

  // Render a modern, glowing donut chart
  const centerX = width / 2;
  const centerY = height / 2 - 15;
  const radius = 65;

  const correctAngle = (totalCorrect / totalQuestionsSolved) * 2 * Math.PI;
  const incorrectAngle = (totalIncorrect / totalQuestionsSolved) * 2 * Math.PI;

  // Draw incorrect segment
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, incorrectAngle);
  ctx.lineWidth = 14;
  ctx.strokeStyle = "#ef4444";
  ctx.stroke();

  // Draw correct segment
  ctx.beginPath();
  ctx.arc(
    centerX,
    centerY,
    radius,
    incorrectAngle,
    incorrectAngle + correctAngle,
  );
  ctx.lineWidth = 14;
  ctx.strokeStyle = "#10b981";
  ctx.stroke();

  // Inner hollow circle for donut effect
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius - 15, 0, 2 * Math.PI);
  ctx.fillStyle = "#0f172a";
  ctx.fill();

  // Draw center stat info text
  ctx.fillStyle = "#f8fafc";
  ctx.font = "bold 18px Outfit, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(`${totalQuestionsSolved}`, centerX, centerY - 6);

  ctx.fillStyle = "#94a3b8";
  ctx.font = "9px Inter, sans-serif";
  ctx.fillText("SOLVED Qs", centerX, centerY + 10);

  // Render chart legend labels
  const legendY = height - 25;

  // Correct legend
  ctx.beginPath();
  ctx.rect(centerX - 95, legendY - 6, 12, 12);
  ctx.fillStyle = "#10b981";
  ctx.fill();

  ctx.fillStyle = "#f8fafc";
  ctx.font = "11px Inter, sans-serif";
  ctx.textAlign = "left";
  ctx.fillText(
    `Correct: ${totalCorrect} (${Math.round((totalCorrect / totalQuestionsSolved) * 100)}%)`,
    centerX - 75,
    legendY + 2,
  );

  // Incorrect legend
  ctx.beginPath();
  ctx.rect(centerX + 15, legendY - 6, 12, 12);
  ctx.fillStyle = "#ef4444";
  ctx.fill();

  ctx.fillStyle = "#f8fafc";
  ctx.textAlign = "left";
  ctx.fillText(
    `Incorrect: ${totalIncorrect} (${Math.round((totalIncorrect / totalQuestionsSolved) * 100)}%)`,
    centerX + 35,
    legendY + 2,
  );
}

// 11. Support / Contact Form View
function renderContact() {
  const app = getAppElement();
  app.innerHTML = `
        <div class="contact-container glass-panel">
            <h2 class="auth-title">Support & Feedback</h2>
            <p class="auth-subtitle">Have feature suggestions or ran into bugs? Shoot us a message.</p>

            <form id="contactForm">
                <div class="form-group">
                    <label class="form-label">Full Name</label>
                    <input type="text" id="contactName" class="form-control" placeholder="Your name..." required>
                </div>
                <div class="form-group">
                    <label class="form-label">Email Address</label>
                    <input type="email" id="contactEmail" class="form-control" placeholder="your@email.com" required>
                </div>
                <div class="form-group">
                    <label class="form-label">Message Details</label>
                    <textarea id="contactMessage" class="form-control" placeholder="Describe feedback, issues, or suggestions..." required></textarea>
                </div>
                <button type="submit" class="btn btn-secondary btn-block">Send Feedback</button>
            </form>
        </div>
    `;

  document.getElementById("contactForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    Toaster.show(
      "Feedback sent successfully! Thank you for helping us improve.",
      "success",
    );
    // Clear form
    document.getElementById("contactName").value = "";
    document.getElementById("contactEmail").value = "";
    document.getElementById("contactMessage").value = "";
    navigateTo("#/home");
  });

  lucide.createIcons();
}
