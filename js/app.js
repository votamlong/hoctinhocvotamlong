// Thay URL Web App của thầy vào đây
const GAS_API_URL = "https://script.google.com/macros/s/AKfycb.../exec";

// Cầu nối thực hiện lệnh tương đương google.script.run
const serverBridge = {
  // Gọi hàm GET
  get: async function(action, params = {}) {
    let url = new URL(GAS_API_URL);
    url.searchParams.append("action", action);
    for (let key in params) {
      url.searchParams.append(key, params[key]);
    }
    const res = await fetch(url.toString());
    return await res.json();
  },

  // Gọi hàm POST
  post: async function(action, data = {}) {
    const res = await fetch(GAS_API_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ action: action, data: data })
    });
    return await res.json();
  }
};
