import { apiClient } from './client.js';
import { CONFIG } from '../config.js';

// High-speed fallback dataset for offline or static CDN serving
const LOCAL_SKILLS_INDEX = [
  { id: "m-lkg", title: "Count to 10 with objects", grade: "LKG & UKG", category: "Maths", url: "/maths" },
  { id: "m-c1", title: "Addition up to 20", grade: "Class 1", category: "Maths", url: "/maths" },
  { id: "m-c3", title: "Multiplication tables (2 to 12)", grade: "Class 3", category: "Maths", url: "/maths" },
  { id: "m-c5", title: "Fractions & Decimals basics", grade: "Class 5", category: "Maths", url: "/maths" },
  { id: "m-c8", title: "Linear Equations in One Variable", grade: "Class 8", category: "Maths", url: "/maths" },
  { id: "m-c10", title: "Quadratic Equations & Polynomials", grade: "Class 10", category: "Maths", url: "/maths" },
  { id: "m-c12", title: "Trigonometry & Calculus Intro", grade: "Class 11 & 12", category: "Maths", url: "/maths" },
  { id: "e-c4", title: "Parts of Speech & Grammar rules", grade: "Class 4", category: "English", url: "/english" },
  { id: "e-c6", title: "Reading Comprehension & Vocabulary", grade: "Class 6", category: "English", url: "/english" },
  { id: "s-c9", title: "Matter & States of Matter", grade: "Class 9", category: "Science", url: "/science" },
  { id: "s-c7", title: "Force, Motion & Energy", grade: "Class 7", category: "Science", url: "/science" }
];

export const searchApi = {
  /**
   * Search skills and topics via backend API with fallback
   */
  async searchSkills(query, signal) {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    try {
      // 1. Attempt backend API fetch
      const res = await apiClient.get('/search', { q, limit: 10 }, { signal, ttl: 30000 });
      if (res && res.data) return res.data;
      if (Array.isArray(res)) return res;
    } catch (err) {
      if (err.name === 'AbortError') throw err;
      // If backend API isn't live yet or network error, use optimized local index
      if (!CONFIG.ENABLE_LOCAL_FALLBACK) throw err;
    }

    // Local client-side index filtering
    return LOCAL_SKILLS_INDEX.filter(s => 
      s.title.toLowerCase().includes(q) || 
      s.grade.toLowerCase().includes(q) || 
      s.category.toLowerCase().includes(q)
    );
  }
};
