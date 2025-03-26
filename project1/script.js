//Function to animate "Get Started" button click
document.addEventListener("DOMContentLoaded", function() {
    const startButton = document.querySelector(".btn");
    if (startButton) {
        startButton.addEventListener("click", function() {
            startButton.style.transform = "scale(0.9)";
            setTimeout(() => {
                startButton.style.transform = "scale(1)";
            }, 200);
        });
    }
});
function navigateTo(page) {
    window.location.href = page;
}

