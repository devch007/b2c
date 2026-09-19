const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());

// In-memory Database with 1M+ user scale simulation & persistent structures
const DATABASE = {
  curriculum: {
    "lkg": {
      name: "LKG",
      gradeKey: "lkg",
      title: "LKG Maths & Foundations",
      badge: "L",
      color: "from-sky-400 to-sky-600",
      description: "Here is a list of all of the maths and foundational skills students learn in LKG! These skills are organised into categories. Click any skill to practice with instant AI feedback!",
      categories: [
        {
          name: "Counting and Numbers",
          icon: "🔢",
          skills: [
            { id: "A.1", name: "Identify numbers - up to 3", questionsCount: 45 },
            { id: "A.2", name: "Count dots - up to 5", questionsCount: 50 },
            { id: "A.3", name: "Count shapes in a group - up to 5", questionsCount: 40 },
            { id: "A.4", name: "Represent numbers with objects", questionsCount: 55 },
            { id: "A.5", name: "Count with fingers - up to 5", questionsCount: 35 }
          ]
        },
        {
          name: "Comparing and Sizes",
          icon: "⚖️",
          skills: [
            { id: "B.1", name: "Big and small objects", questionsCount: 30 },
            { id: "B.2", name: "Tall and short comparison", questionsCount: 35 },
            { id: "B.3", name: "Heavy and light", questionsCount: 40 },
            { id: "B.4", name: "More and fewer sets", questionsCount: 50 }
          ]
        },
        {
          name: "Shapes & Colors",
          icon: "🎨",
          skills: [
            { id: "C.1", name: "Identify circles, squares, and triangles", questionsCount: 45 },
            { id: "C.2", name: "Classify objects by color", questionsCount: 60 },
            { id: "C.3", name: "Identify primary colors (Red, Blue, Yellow)", questionsCount: 50 }
          ]
        }
      ]
    },
    "ukg": {
      name: "UKG",
      gradeKey: "ukg",
      title: "UKG Maths & Early Skills",
      badge: "U",
      color: "from-amber-400 to-amber-600",
      description: "Here is a list of all of the maths skills students learn in UKG! Practice addition, shape patterns, and number lines.",
      categories: [
        {
          name: "Numbers and Counting up to 20",
          icon: "🔢",
          skills: [
            { id: "A.1", name: "Count to 10 with pictures", questionsCount: 70 },
            { id: "A.2", name: "Count on ten frames - up to 10", questionsCount: 65 },
            { id: "A.3", name: "Number lines - up to 10", questionsCount: 50 },
            { id: "A.4", name: "Count forward and backward - up to 10", questionsCount: 45 },
            { id: "A.5", name: "Count up to 20", questionsCount: 80 }
          ]
        },
        {
          name: "Introduction to Addition",
          icon: "➕",
          skills: [
            { id: "B.1", name: "Add with pictures - sums up to 5", questionsCount: 60 },
            { id: "B.2", name: "Addition sentences - sums up to 5", questionsCount: 55 },
            { id: "B.3", name: "Add with cubes - sums up to 10", questionsCount: 75 }
          ]
        },
        {
          name: "Patterns and Sorting",
          icon: "🧩",
          skills: [
            { id: "C.1", name: "Color patterns (AB, AAB)", questionsCount: 50 },
            { id: "C.2", name: "Shape patterns", questionsCount: 40 },
            { id: "C.3", name: "Sort shapes into groups", questionsCount: 60 }
          ]
        }
      ]
    },
    "class-1": {
      name: "Class 1",
      gradeKey: "class-1",
      title: "Class I Maths",
      badge: "I",
      color: "from-emerald-400 to-emerald-600",
      description: "Here is a list of all of the maths skills students learn in class I! These skills are organised into categories. Edubull will track your score and adapt difficulty dynamically as you improve!",
      categories: [
        {
          name: "Counting and number patterns",
          icon: "🔢",
          skills: [
            { id: "A.1", name: "Counting review - up to 10", questionsCount: 60 },
            { id: "A.2", name: "Count to fill a ten frame", questionsCount: 50 },
            { id: "A.3", name: "Counting review - up to 20", questionsCount: 55 },
            { id: "A.4", name: "Counting tens and ones - up to 30", questionsCount: 70 },
            { id: "A.5", name: "Count on ten frames - up to 40", questionsCount: 65 },
            { id: "A.6", name: "Counting - up to 100", questionsCount: 80 },
            { id: "A.7", name: "Counting tens and ones - up to 99", questionsCount: 75 },
            { id: "A.8", name: "Counting by twos, fives and tens with pictures", questionsCount: 50 },
            { id: "A.9", name: "Counting by twos, fives and tens", questionsCount: 65 },
            { id: "A.10", name: "Counting forwards and backwards", questionsCount: 60 }
          ]
        },
        {
          name: "Addition strategies",
          icon: "➕",
          skills: [
            { id: "F.1", name: "Add doubles", questionsCount: 50 },
            { id: "F.2", name: "Add using doubles plus one", questionsCount: 45 },
            { id: "F.3", name: "Add using doubles minus one", questionsCount: 45 },
            { id: "F.4", name: "Add three numbers - use doubles", questionsCount: 55 },
            { id: "F.5", name: "Complete the addition sentence - make ten", questionsCount: 60 },
            { id: "F.6", name: "Add three numbers - make ten", questionsCount: 50 },
            { id: "F.7", name: "Add two multiples of ten", questionsCount: 40 }
          ]
        },
        {
          name: "Understand subtraction",
          icon: "➖",
          skills: [
            { id: "G.1", name: "Subtract with pictures - numbers up to 10", questionsCount: 50 },
            { id: "G.2", name: "Subtraction sentences - numbers up to 10", questionsCount: 55 },
            { id: "G.3", name: "Subtraction sentences using number lines - numbers up to 10", questionsCount: 65 },
            { id: "G.4", name: "Subtract zero and all", questionsCount: 40 }
          ]
        }
      ]
    }
  },
  // Interactive Practice Questions Engine Mock
  questions: {
    "A.1": [
      {
        id: "q-101",
        question: "How many friendly apples are in the basket below? 🍎 🍎 🍎",
        options: ["2", "3", "4", "5"],
        correctAnswer: "3",
        explanation: "Count them one by one: 1 apple, 2 apples, 3 apples! So there are 3 apples in total.",
        hint: "Point your finger at each apple and count aloud from 1."
      },
      {
        id: "q-102",
        question: "Which number comes right after 2 when counting?",
        options: ["1", "3", "4", "0"],
        correctAnswer: "3",
        explanation: "The counting sequence is 1, 2, 3... So 3 comes directly after 2!",
        hint: "1, 2, ___ ?"
      }
    ],
    "F.1": [
      {
        id: "q-201",
        question: "What is 4 + 4?",
        options: ["6", "7", "8", "9"],
        correctAnswer: "8",
        explanation: "Adding doubles: 4 + 4 = 8.",
        hint: "Double 4 is equal to 8."
      },
      {
        id: "q-202",
        question: "What is 6 + 6?",
        options: ["10", "11", "12", "14"],
        correctAnswer: "12",
        explanation: "6 + 6 = 12.",
        hint: "Think of two hands of 6 fingers each: 6 + 6 = 12."
      }
    ],
    "default": [
      {
        id: "q-def-1",
        question: "Solve the equation: 5 + 3 = ?",
        options: ["7", "8", "9", "10"],
        correctAnswer: "8",
        explanation: "5 + 3 = 8.",
        hint: "Start at 5 on a number line and take 3 hops forward."
      },
      {
        id: "q-def-2",
        question: "Which is greater: 15 or 12?",
        options: ["15", "12", "They are equal", "Cannot be determined"],
        correctAnswer: "15",
        explanation: "15 is 3 more than 12, so 15 is greater.",
        hint: "15 comes after 12 on the number line."
      }
    ]
  },
  users: [
    { id: "u-1", name: "Demo Student", email: "student@edubull.com", score: 850, skillsMastered: 14 }
  ]
};

// Generate Classes 2 through 12 dynamically in database
const ROMAN_NUMERALS = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];
const GRADE_COLORS = [
  "from-sky-400 to-sky-600", "from-amber-400 to-amber-600", "from-emerald-400 to-emerald-600",
  "from-rose-400 to-rose-600", "from-indigo-400 to-indigo-600", "from-purple-400 to-purple-600",
  "from-teal-400 to-teal-600", "from-orange-400 to-orange-600", "from-pink-400 to-pink-600",
  "from-lime-400 to-lime-600", "from-cyan-400 to-cyan-600", "from-fuchsia-400 to-fuchsia-600",
  "from-red-400 to-red-600", "from-blue-400 to-blue-600"
];

for (let i = 2; i <= 12; i++) {
  const roman = ROMAN_NUMERALS[i];
  const key = `class-${i}`;
  DATABASE.curriculum[key] = {
    name: `Class ${roman}`,
    gradeKey: key,
    title: `Class ${roman} Maths & Advanced Practice`,
    badge: roman,
    color: GRADE_COLORS[i] || "from-sky-400 to-sky-600",
    description: `Comprehensive AI-enabled curriculum and interactive skill drills for Class ${roman}. Master foundation, algebra, geometry, and real-world applied mathematics!`,
    categories: [
      {
        name: `Core Mathematical Foundations (Class ${roman})`,
        icon: "🧠",
        skills: [
          { id: "A.1", name: `Understanding Class ${roman} Number Systems & Operations`, questionsCount: 50 },
          { id: "A.2", name: `Multi-digit calculations and mental arithmetic drills`, questionsCount: 45 },
          { id: "A.3", name: `Advanced problem solving & word applications`, questionsCount: 60 }
        ]
      },
      {
        name: `Algebraic Thinking & Logic`,
        icon: "📐",
        skills: [
          { id: "B.1", name: `Variables, expressions & equation solving`, questionsCount: 55 },
          { id: "B.2", name: `Linear relations and coordinate geometry`, questionsCount: 40 },
          { id: "B.3", name: `Patterns, sequences and functional rules`, questionsCount: 50 }
        ]
      },
      {
        name: `Geometry, Shapes & Measurements`,
        icon: "📏",
        skills: [
          { id: "C.1", name: `Perimeter, area and volume calculations`, questionsCount: 65 },
          { id: "C.2", name: `Angles, symmetry and geometric theorems`, questionsCount: 45 }
        ]
      },
      {
        name: `Data, Probability & Statistics`,
        icon: "📊",
        skills: [
          { id: "D.1", name: `Data representation (Bar graphs, pie charts)`, questionsCount: 40 },
          { id: "D.2", name: `Mean, median, mode and probability basics`, questionsCount: 50 }
        ]
      }
    ]
  };
}

// -------------------------------------------------------------
// REST API ENDPOINTS (/api/v1/...)
// -------------------------------------------------------------

// 1. Health check & API status
app.get('/api/v1/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    service: 'Edubull Learning Engine API'
  });
});

// 2. Fetch Curriculum by Grade Key
app.get('/api/v1/curriculum/:grade', (req, res) => {
  const gradeKey = (req.params.grade || 'class-1').toLowerCase().replace('class-i', 'class-1');
  const data = DATABASE.curriculum[gradeKey] || DATABASE.curriculum['class-1'];
  res.json({
    success: true,
    data: data
  });
});

// 3. Global Full-Text Search
app.get('/api/v1/search', (req, res) => {
  const query = (req.query.q || '').trim().toLowerCase();
  if (!query) {
    return res.json({ success: true, data: [] });
  }

  const results = [];
  Object.keys(DATABASE.curriculum).forEach(gradeKey => {
    const grade = DATABASE.curriculum[gradeKey];
    (grade.categories || []).forEach(cat => {
      (cat.skills || []).forEach(skill => {
        if (
          skill.name.toLowerCase().includes(query) ||
          skill.id.toLowerCase().includes(query) ||
          grade.name.toLowerCase().includes(query) ||
          cat.name.toLowerCase().includes(query)
        ) {
          results.push({
            id: skill.id,
            title: skill.name,
            grade: grade.name,
            category: cat.name,
            url: `/class.html?grade=${gradeKey}&skill=${skill.id}`
          });
        }
      });
    });
  });

  res.json({
    success: true,
    count: results.length,
    data: results.slice(0, 15)
  });
});

// 4. Interactive Practice Question Engine
app.get('/api/v1/practice/:skillId', (req, res) => {
  const skillId = req.params.skillId;
  const questions = DATABASE.questions[skillId] || DATABASE.questions['default'];
  
  res.json({
    success: true,
    skillId: skillId,
    totalQuestions: questions.length,
    questions: questions
  });
});

// 5. Submit Question Answer & Scoring
app.post('/api/v1/practice/submit', (req, res) => {
  const { skillId, questionId, selectedAnswer } = req.body;
  const skillQuestions = DATABASE.questions[skillId] || DATABASE.questions['default'];
  const question = skillQuestions.find(q => q.id === questionId) || skillQuestions[0];

  const isCorrect = question.correctAnswer.trim().toLowerCase() === String(selectedAnswer).trim().toLowerCase();

  res.json({
    success: true,
    isCorrect: isCorrect,
    correctAnswer: question.correctAnswer,
    explanation: question.explanation,
    pointsEarned: isCorrect ? 10 : 0,
    smartScoreIncrement: isCorrect ? 5 : -2
  });
});

// 6. User Stats & Analytics
app.get('/api/v1/analytics/stats', (req, res) => {
  res.json({
    success: true,
    stats: {
      totalQuestionsAnswered: "217,815,124,073",
      activeLearners: "18.4 Million+",
      skillsMastered: 4520,
      smartScoreAverage: 88.4
    }
  });
});

// Serve Static Frontend files
app.use(express.static(path.join(__dirname)));

// Fallback to index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start Server
app.listen(PORT, () => {
  console.log(`[Edubull WebApp & Backend API] Running on http://localhost:${PORT}`);
});
