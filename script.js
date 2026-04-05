function submitPractice() {
  const q1 = document.querySelector('input[name="q1"]:checked');
  const q2Input = document.getElementById("q2");
  const q3Input = document.getElementById("q3");

  const q1Value = q1 ? q1.value : "";
  const q2Value = q2Input ? q2Input.value.trim() : "";
  const q3Value = q3Input ? q3Input.value.trim() : "";

  let score = 0;
  let feedback = [];

  if (q1Value === "は") {
    score++;
    feedback.push("Q1 Correct: 'は' marks the topic of the sentence.");
  } else {
    feedback.push("Q1 Incorrect: the correct answer is 'は'.");
  }

  if (
    q2Value === "わたしは 毎日 学校 へ 行きます" ||
    q2Value === "わたしは毎日学校へ行きます"
  ) {
    score++;
    feedback.push("Q2 Correct: the sentence order is natural and grammatically correct.");
  } else {
    feedback.push("Q2 Suggested answer: わたしは 毎日 学校 へ 行きます");
  }

  if (
    q3Value === "勉強して" ||
    q3Value === "べんきょうして"
  ) {
    score++;
    feedback.push("Q3 Correct: '勉強しています' means 'am studying'.");
  } else {
    feedback.push("Q3 Suggested answer: 勉強して");
  }

  const result = {
    score: score,
    total: 3,
    feedback: feedback
  };

  localStorage.setItem("demoResult", JSON.stringify(result));
  window.location.href = "feedback.html";
}

function showFeedback() {
  const box = document.getElementById("result-box");
  const data = JSON.parse(localStorage.getItem("demoResult"));

  if (!box) {
    return;
  }

  if (!data) {
    box.innerHTML = "<p>No result found. Please complete the practice first.</p>";
    return;
  }

  let html = "";
  html += "<p><strong>Score:</strong> " + data.score + " / " + data.total + "</p>";
  html += "<ul>";

  for (let i = 0; i < data.feedback.length; i++) {
    html += "<li>" + data.feedback[i] + "</li>";
  }

  html += "</ul>";
  html += "<p><strong>AI-style feedback:</strong> This learner may need more practice in distinguishing topic marking and basic sentence structure.</p>";

  box.innerHTML = html;
}

function showProgress() {
  const completed = document.getElementById("completed");
  const accuracy = document.getElementById("accuracy");
  const data = JSON.parse(localStorage.getItem("demoResult"));

  if (!completed || !accuracy) {
    return;
  }

  if (!data) {
    completed.textContent = "0";
    accuracy.textContent = "0%";
    return;
  }

  completed.textContent = String(data.total);
  accuracy.textContent = Math.round((data.score / data.total) * 100) + "%";
}