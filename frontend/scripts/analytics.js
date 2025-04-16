const baseURL = "http://localhost:8000";      // Fixed port number

async function loadAnalytics() {
  try {
    const res = await fetch(`${baseURL}/analytics`);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    
    document.getElementById("itemCount").textContent = data.stats.item_count;
    document.getElementById("userCount").textContent = data.stats.user_count;
    document.getElementById("avgItemName").textContent = data.stats.avg_item_name_length.toFixed(2);
    document.getElementById("avgUserName").textContent = data.stats.avg_user_username_length.toFixed(2);
    document.getElementById("maxItemName").textContent = data.stats.max_item_name_length;
    document.getElementById("maxUserName").textContent = data.stats.max_user_username_length;
    
    // Fixed to use the correct data key (chart) and proper base64 image format
    document.getElementById("plot").src = "data:image/png;base64," + data.chart;
  } catch (error) {
    console.error("Error loading analytics:", error);
  }
}

loadAnalytics();

