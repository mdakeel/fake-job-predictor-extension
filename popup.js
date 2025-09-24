document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("predictBtn");
  const input = document.getElementById("jobInput");
  const result = document.getElementById("result");

  btn.addEventListener("click", () => {
    const jobText = input.value.trim();

    if (!jobText) {
      result.innerText = "❌ Please paste job description.";
      return;
    }

    result.innerText = "⏳ Checking job...";

    fetch("http://127.0.0.1:5000/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: jobText })
    })
    .then(res => res.json())
    .then(data => {
      result.innerText = data.prediction;
    })
    .catch(err => {
      console.error("❌ Fetch error:", err);
      result.innerText = "Flask not reachable.";
    });
  });
});
