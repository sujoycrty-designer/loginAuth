const API_URL = "https://loginauth-viih.onrender.com/api/login";

const form = document.getElementById("login-form");
const messageEl = document.getElementById("message");
const submitBtn = form.querySelector("button[type='submit']");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;

  setMessage("", "");
  submitBtn.disabled = true;

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok && data.success) {
      setMessage(data.message, "success");
    } else {
      setMessage(data.message || "Login failed.", "error");
    }
  } catch (err) {
    setMessage("Unable to reach the server. Is the backend running?", "error");
  } finally {
    submitBtn.disabled = false;
  }
});

function setMessage(text, type) {
  messageEl.textContent = text;
  messageEl.className = "message" + (type ? ` ${type}` : "");
}
