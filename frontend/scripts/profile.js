const baseURL = "http://localhost:8000";

// Add this connectivity check at startup
async function checkBackendConnection() {
  try {
    const response = await fetch(`${baseURL}/healthcheck`);
    if (!response.ok) throw new Error('Backend unreachable');
    console.log('Connected to backend');
  } catch (error) {
    console.error('Backend connection failed:', error);
    alert('Cannot connect to server. Make sure backend is running on port 8000');
  }
}

// Update your form submit handler
document.getElementById("userForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = document.getElementById("username").value.trim();
  const bio = document.getElementById("bio").value.trim();

  try {
    const response = await fetch(`${baseURL}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, bio })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || `HTTP error! status: ${response.status}`);
    }

    loadUsers();
    e.target.reset();
  } catch (error) {
    console.error('Full error details:', error);
    alert(`Operation failed: ${error.message}\nCheck console for details`);
  }
});

// Initialize connection check when page loads
checkBackendConnection();
loadUsers();