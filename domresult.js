window.onload = function() {
    // Retrieve values from localStorage
    const answered = localStorage.getItem("ans");
    const correct = localStorage.getItem("cor");
    const wrong = localStorage.getItem("wro");
    const score = localStorage.getItem("sco");

    // Display values
    document.getElementById("answered").textContent = answered;
    document.getElementById("correct").textContent = correct;
    document.getElementById("wrong").textContent = wrong;
    document.getElementById("score").textContent = score;

    // Determine result heading
    if (correct == 12) {
        document.getElementById("result-heading").textContent = "Congratulations! You've won!";
    } else {
        document.getElementById("result-heading").textContent = "Oops! You lost. Better luck next time!";
    }
}
