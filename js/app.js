import { SearchBarComponent } from './components/search-bar.js';

/**
 * Main application bootstrap for Edubull B2C
 */
document.addEventListener('DOMContentLoaded', () => {
  // 1. Text Replacer Observer for branded continuity
  function replaceText(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      if (node.nodeValue.includes("IXL")) {
        node.nodeValue = node.nodeValue.replace(/IXL/g, "Edubull");
      }
    } else if (node.nodeType === Node.ELEMENT_NODE && node.tagName !== "SCRIPT" && node.tagName !== "STYLE") {
      Array.from(node.childNodes).forEach(replaceText);
      if (node.hasAttribute("title") && node.getAttribute("title").includes("IXL")) {
        node.setAttribute("title", node.getAttribute("title").replace(/IXL/g, "Edubull"));
      }
      if (node.hasAttribute("aria-label") && node.getAttribute("aria-label").includes("IXL")) {
        node.setAttribute("aria-label", node.getAttribute("aria-label").replace(/IXL/g, "Edubull"));
      }
      if (node.hasAttribute("alt") && node.getAttribute("alt").includes("IXL")) {
        node.setAttribute("alt", node.getAttribute("alt").replace(/IXL/g, "Edubull"));
      }
    }
  }

  replaceText(document.body);
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((m) => {
      m.addedNodes.forEach(replaceText);
    });
  });
  observer.observe(document.body, { childList: true, subtree: true });

  // 2. Initialize Core Scalable Components
  new SearchBarComponent();

  // 3. Dynamic routing for class and subject links to class.html
  function routeGradeLink(elem) {
    const href = elem.getAttribute('href') || '';
    if (href.startsWith('/class.html') || href.startsWith('http')) return;

    // Matches /maths/lkg, /english/ukg, /maths/class-1, /standards/maths, etc.
    const match = href.match(/\/(?:maths|english|science|hindi|standards)\/([a-zA-Z0-9\-]+)/);
    if (match && match[1]) {
      const rawGrade = match[1].toLowerCase();
      // Normalize grade slug
      let gradeSlug = rawGrade;
      if (rawGrade === 'class-i' || rawGrade === 'class-1' || rawGrade === '1') gradeSlug = 'class-1';
      else if (rawGrade === 'class-ii' || rawGrade === 'class-2' || rawGrade === '2') gradeSlug = 'class-2';
      else if (rawGrade === 'class-iii' || rawGrade === 'class-3' || rawGrade === '3') gradeSlug = 'class-3';
      else if (rawGrade === 'class-iv' || rawGrade === 'class-4' || rawGrade === '4') gradeSlug = 'class-4';
      else if (rawGrade === 'class-v' || rawGrade === 'class-5' || rawGrade === '5') gradeSlug = 'class-5';
      else if (rawGrade === 'class-vi' || rawGrade === 'class-6' || rawGrade === '6') gradeSlug = 'class-6';
      else if (rawGrade === 'class-vii' || rawGrade === 'class-7' || rawGrade === '7') gradeSlug = 'class-7';
      else if (rawGrade === 'class-viii' || rawGrade === 'class-8' || rawGrade === '8') gradeSlug = 'class-8';
      else if (rawGrade === 'class-ix' || rawGrade === 'class-9' || rawGrade === '9') gradeSlug = 'class-9';
      else if (rawGrade === 'class-x' || rawGrade === 'class-10' || rawGrade === '10') gradeSlug = 'class-10';
      else if (rawGrade === 'class-xi' || rawGrade === 'class-11' || rawGrade === '11') gradeSlug = 'class-11';
      else if (rawGrade === 'class-xii' || rawGrade === 'class-12' || rawGrade === '12') gradeSlug = 'class-12';
      else if (rawGrade === 'lkg') gradeSlug = 'lkg';
      else if (rawGrade === 'ukg') gradeSlug = 'ukg';

      elem.setAttribute('href', `/class.html?grade=${gradeSlug}`);
    } else if (href === '/maths' || href === '/english' || href === '/standards') {
      elem.setAttribute('href', `/class.html?grade=class-1`);
    } else if (href === '/signin' || href === '/login') {
      elem.setAttribute('href', '/login.html');
    } else if (href === '/membership' || href === '/join' || href === '/signup') {
      elem.setAttribute('href', '/signup.html');
    }
  }

  document.querySelectorAll('a').forEach(routeGradeLink);
  
  // Also attach click interception for dynamically modified nodes
  document.addEventListener('click', (e) => {
    const anchor = e.target.closest('a');
    if (anchor) {
      const href = anchor.getAttribute('href') || '';
      const match = href.match(/\/(?:maths|english|science|hindi|standards)\/([a-zA-Z0-9\-]+)/);
      if (match && match[1]) {
        e.preventDefault();
        window.location.href = `/class.html?grade=${match[1]}`;
      } else if (href === '/maths' || href === '/english') {
        e.preventDefault();
        window.location.href = `/class.html?grade=class-1`;
      }
    }
  });

  console.log('[Edubull App] Scalable client modules and dynamic grade routers initialized.');
});

