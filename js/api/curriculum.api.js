import { apiClient } from './client.js';
import { CONFIG } from '../config.js';

/**
 * Curriculum & Class Skills Data Service
 * Modular architecture prepared for direct PostgreSQL/MongoDB API connection.
 */

// Demo database mock structure
const DEMO_CURRICULUM_DB = {
  "lkg": {
    name: "LKG",
    title: "LKG Maths & Foundations",
    description: "Here is a list of all of the maths and foundational skills students learn in LKG! These skills are organised into categories. Move your mouse over any skill name to preview or practice!",
    categories: [
      {
        name: "Counting and Numbers",
        skills: [
          { id: "A.1", name: "Identify numbers - up to 3", questions: "50+ questions" },
          { id: "A.2", name: "Count dots - up to 5", questions: "60+ questions" },
          { id: "A.3", name: "Count shapes in a group - up to 5", questions: "40+ questions" },
          { id: "A.4", name: "Represent numbers - up to 5", questions: "55+ questions" },
          { id: "A.5", name: "Count with fingers - up to 5", questions: "45+ questions" }
        ]
      },
      {
        name: "Comparing and Sizes",
        skills: [
          { id: "B.1", name: "Big and small", questions: "30+ questions" },
          { id: "B.2", name: "Tall and short", questions: "35+ questions" },
          { id: "B.3", name: "Heavy and light", questions: "40+ questions" },
          { id: "B.4", name: "More and fewer", questions: "50+ questions" }
        ]
      },
      {
        name: "Shapes & Colors",
        skills: [
          { id: "C.1", name: "Identify circles, squares, and triangles", questions: "45+ questions" },
          { id: "C.2", name: "Classify objects by color", questions: "60+ questions" },
          { id: "C.3", name: "Identify primary colors (Red, Blue, Yellow)", questions: "50+ questions" }
        ]
      }
    ]
  },
  "ukg": {
    name: "UKG",
    title: "UKG Maths & Early Skills",
    description: "Here is a list of all of the maths skills students learn in UKG! Move your mouse over any skill name to preview or practice.",
    categories: [
      {
        name: "Numbers and Counting up to 20",
        skills: [
          { id: "A.1", name: "Count to 10 with pictures", questions: "70+ questions" },
          { id: "A.2", name: "Count on ten frames - up to 10", questions: "65+ questions" },
          { id: "A.3", name: "Number lines - up to 10", questions: "50+ questions" },
          { id: "A.4", name: "Count forward and backward - up to 10", questions: "45+ questions" },
          { id: "A.5", name: "Count up to 20", questions: "80+ questions" }
        ]
      },
      {
        name: "Introduction to Addition",
        skills: [
          { id: "B.1", name: "Add with pictures - sums up to 5", questions: "60+ questions" },
          { id: "B.2", name: "Addition sentences - sums up to 5", questions: "55+ questions" },
          { id: "B.3", name: "Add with cubes - sums up to 10", questions: "75+ questions" }
        ]
      },
      {
        name: "Patterns and Sorting",
        skills: [
          { id: "C.1", name: "Color patterns (AB, AAB)", questions: "50+ questions" },
          { id: "C.2", name: "Shape patterns", questions: "40+ questions" },
          { id: "C.3", name: "Sort shapes into groups", questions: "60+ questions" }
        ]
      }
    ]
  },
  "class-1": {
    name: "Class 1",
    title: "Class I Maths",
    description: "Here is a list of all of the maths skills students learn in class I! These skills are organised into categories, and you can move your mouse over any skill name to preview the skill. To start practising, just click on any link. Edubull will track your score, and the questions will automatically increase in difficulty as you improve!",
    categories: [
      {
        name: "Counting and number patterns",
        skills: [
          { id: "A.1", name: "Counting review - up to 10" },
          { id: "A.2", name: "Count to fill a ten frame" },
          { id: "A.3", name: "Counting review - up to 20" },
          { id: "A.4", name: "Counting tens and ones - up to 30" },
          { id: "A.5", name: "Count on ten frames - up to 40" },
          { id: "A.6", name: "Counting - up to 100" },
          { id: "A.7", name: "Counting tens and ones - up to 99" },
          { id: "A.8", name: "Counting by twos, fives and tens with pictures" },
          { id: "A.9", name: "Counting by twos, fives and tens" },
          { id: "A.10", name: "Counting forwards and backwards" },
          { id: "A.11", name: "Number lines - up to 100" },
          { id: "A.12", name: "Hundred chart" },
          { id: "A.13", name: "Even or odd" },
          { id: "A.14", name: "Identify numbers as even or odd" },
          { id: "A.15", name: "Even or odd numbers on number lines" },
          { id: "A.16", name: "Which even or odd number comes before or after?" },
          { id: "A.17", name: "Skip-counting patterns - with tables" },
          { id: "A.18", name: "Sequences - count up and down by 1, 2, 3, 5 and 10" },
          { id: "A.19", name: "Sequences - count up and down by 100" },
          { id: "A.20", name: "Ordinal numbers" },
          { id: "A.21", name: "Writing numbers in words" }
        ]
      },
      {
        name: "Addition strategies",
        skills: [
          { id: "F.1", name: "Add doubles" },
          { id: "F.2", name: "Add using doubles plus one" },
          { id: "F.3", name: "Add using doubles minus one" },
          { id: "F.4", name: "Add three numbers - use doubles" },
          { id: "F.5", name: "Complete the addition sentence - make ten" },
          { id: "F.6", name: "Add three numbers - make ten" },
          { id: "F.7", name: "Add two multiples of ten" },
          { id: "F.8", name: "Add a multiple of ten" },
          { id: "F.9", name: "Add three numbers" },
          { id: "F.10", name: "Add three numbers - word problems" }
        ]
      },
      {
        name: "Understand subtraction",
        skills: [
          { id: "G.1", name: "Subtract with pictures - numbers up to 10" },
          { id: "G.2", name: "Subtraction sentences - numbers up to 10" },
          { id: "G.3", name: "Subtraction sentences using number lines - numbers up to 10" },
          { id: "G.4", name: "Subtract zero and all" }
        ]
      },
      {
        name: "Three-dimensional shapes",
        skills: [
          { id: "N.1", name: "Two-dimensional and three-dimensional shapes" },
          { id: "N.2", name: "Name the three-dimensional shape" },
          { id: "N.3", name: "Cubes and rectangular prisms" },
          { id: "N.4", name: "Select three-dimensional shapes" },
          { id: "N.5", name: "Count vertices, edges and faces" },
          { id: "N.6", name: "Compare vertices, edges and faces" },
          { id: "N.7", name: "Identify shapes traced from solids" },
          { id: "N.8", name: "Identify faces of three-dimensional shapes" },
          { id: "N.9", name: "Shapes of everyday objects I" },
          { id: "N.10", name: "Shapes of everyday objects II" }
        ]
      },
      {
        name: "Spatial sense",
        skills: [
          { id: "O.1", name: "Above and below" },
          { id: "O.2", name: "Beside and next to" },
          { id: "O.3", name: "Left, middle and right" },
          { id: "O.4", name: "Top, middle and bottom" },
          { id: "O.5", name: "Location in a grid" }
        ]
      },
      {
        name: "Data and graphs",
        skills: [
          { id: "P.1", name: "Which pictograph is correct?" },
          { id: "P.2", name: "Interpret pictographs" },
          { id: "P.3", name: "Which tally chart is correct?" },
          { id: "P.4", name: "Interpret tally charts" },
          { id: "P.5", name: "Record data in tables" }
        ]
      }
    ]
  }
};

// Generic generator for higher classes 2-12 for demonstration
for (let i = 2; i <= 12; i++) {
  const roman = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"][i];
  const key = `class-${i}`;
  DEMO_CURRICULUM_DB[key] = {
    name: `Class ${roman}`,
    title: `Class ${roman} Maths`,
    description: `Here is a comprehensive list of all of the maths skills students learn in Class ${roman}! These skills are organized into curated categories with AI-adaptive difficulty.`,
    categories: [
      {
        name: `Core Mathematical Concepts (Class ${roman})`,
        skills: [
          { id: "A.1", name: `Understanding Class ${roman} Foundations & Place Values` },
          { id: "A.2", name: `Multi-digit operations & problem solving` },
          { id: "A.3", name: `Mental arithmetic & speed drills` },
          { id: "A.4", name: `Real-world word problem applications` }
        ]
      },
      {
        name: `Algebra & Algebraic Reasoning`,
        skills: [
          { id: "B.1", name: `Expressions, variables, and equations` },
          { id: "B.2", name: `Linear functions and graphs` },
          { id: "B.3", name: `Simplifying complex algebraic terms` }
        ]
      },
      {
        name: `Geometry, Shapes & Measurements`,
        skills: [
          { id: "C.1", name: `Perimeter, Area, and Volume calculations` },
          { id: "C.2", name: `Angles, Triangles & Quadrilateral theorems` },
          { id: "C.3", name: `Coordinate geometry basics` }
        ]
      },
      {
        name: `Data Analysis & Statistics`,
        skills: [
          { id: "D.1", name: `Bar charts, pie charts & histograms` },
          { id: "D.2", name: `Mean, Median, Mode & Probability basics` }
        ]
      }
    ]
  };
}

export const curriculumApi = {
  /**
   * Fetch curriculum skills for a class level
   */
  async getClassSkills(classKey) {
    const key = (classKey || 'class-1').toLowerCase().replace('class-i', 'class-1');
    try {
      const res = await apiClient.get(`/curriculum/${key}`, {}, { ttl: 60000 });
      if (res && res.data) return res.data;
    } catch (err) {
      if (!CONFIG.ENABLE_LOCAL_FALLBACK) throw err;
    }
    return DEMO_CURRICULUM_DB[key] || DEMO_CURRICULUM_DB["class-1"];
  }
};
