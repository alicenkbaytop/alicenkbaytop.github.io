/**
 * Main JavaScript for Ali Cenk Baytop Portfolio
 * Clean, lightweight, zero-dependency client logic
 */

/**
 * Feature: Auto-order Featured Projects to Top
 * Dynamically ensures any project marked with data-featured="true" is placed
 * at the top of the projects section before all others.
 */
function sortFeaturedProjects() {
  const grid = document.getElementById("projects-grid");
  if (!grid) return;

  const projects = Array.from(grid.querySelectorAll(".project-box"));
  const featured = [];
  const regular = [];

  projects.forEach((card) => {
    if (card.getAttribute("data-featured") === "true") {
      featured.push(card);
    } else {
      regular.push(card);
    }
  });

  // Prepend featured items before all regular items in the grid
  [...featured, ...regular].forEach((card) => {
    grid.appendChild(card);
  });
}

// Function to load external HTML partials (navbar & footer)
function loadComponent(containerId, relativePath) {
  const container = document.getElementById(containerId);
  if (!container) return;

  fetch(relativePath)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to load ${relativePath}: ${response.statusText}`);
      }
      return response.text();
    })
    .then((html) => {
      container.innerHTML = html;
      // If we just loaded the footer, update the dynamic year
      if (containerId === "footer") {
        const yearSpan = document.getElementById("current-year");
        if (yearSpan) {
          yearSpan.textContent = new Date().getFullYear();
        }
      }
    })
    .catch((err) => {
      console.warn("Component fetch notice:", err);
    });
}

// Initialize on DOM Ready
document.addEventListener("DOMContentLoaded", () => {
  // Sort featured projects to the top
  sortFeaturedProjects();

  // Load navbar and footer from root
  loadComponent("navbar", "./navbar.html");
  loadComponent("footer", "./footer.html");
});
