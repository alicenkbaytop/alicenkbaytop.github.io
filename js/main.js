
/**
 * Main JavaScript for Ali Cenk Baytop Portfolio
 */

// Move featured projects to the top
function sortFeaturedProjects() {
  const grid = document.getElementById("projects-grid");
  if (!grid) return;

  const projects = Array.from(grid.querySelectorAll(".project-box"));

  const featured = projects.filter(
    card => card.dataset.featured === "true"
  );

  const regular = projects.filter(
    card => card.dataset.featured !== "true"
  );

  [...featured, ...regular].forEach(card => {
    grid.appendChild(card);
  });
}

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  sortFeaturedProjects();

  // Update copyright year
  const yearSpan = document.getElementById("current-year");

  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});
