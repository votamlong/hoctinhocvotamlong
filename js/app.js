// Thay URL Web App của thầy vào đây
const GAS_API_URL = "https://script.google.com/macros/s/AKfycbx6A-0ALP0K4gyz86sIFf_v-fu9p1QpGzqWw1Do8K9yEcut8LVNbCslEbrxsw21DZYHjg/exec";

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
async function processLogin() {
  const btn = document.getElementById('btnLogin');
  const email = document.getElementById('email').value;
  const pass = document.getElementById('pass').value;
  if (!email || !pass) return alert("Vui lòng nhập đủ thông tin!");

  btn.innerText = "Đang kiểm tra...";
  btn.disabled = true;

  try {
    const res = await serverBridge.post("loginUser", { email: email, password: pass });
    if (res.success) {
      localStorage.setItem('eduUser', JSON.stringify(res));
      loginSuccess(res);
    } else {
      alert(res.message);
    }
  } catch (err) {
    alert("Lỗi kết nối Server: " + err.message);
  } finally {
    btn.innerText = "XÁC NHẬN ĐĂNG NHẬP";
    btn.disabled = false;
  }
}
