const baseURL = "http://localhost:8000"; // Base URL for the backend API

// Function to load a welcome message dynamically
async function loadHomeContent() {
  const container = document.querySelector(".container");
  container.innerHTML = `
    <h1>🏠 Welcome to the Multi-Page FastAPI App!</h1>
    <p>This app demonstrates the integration of FastAPI, MongoDB, and a frontend built with HTML, CSS, and JavaScript.</p>
    <p>Explore the app using the navigation bar above to manage items, view analytics, read news, and take a quiz!</p>
  `;
}

// Initialize the home page
document.addEventListener("DOMContentLoaded", () => {
  loadHomeContent();
});