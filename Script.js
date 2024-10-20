const dino = document.getElementById("dino");
const cactus = document.getElementById("cactus");
const scoreElement = document.getElementById("score");
const bestScoreElement = document.getElementById("best-score");
const coinElement = document.getElementById("coin");

let jumpCount = 0;
let coinCount = 0;
let bestScore = localStorage.getItem("bestScore") ? parseInt(localStorage.getItem("bestScore")) : 0;
bestScoreElement.innerText = "Лучший результат: " + bestScore;

document.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        jump();
    }
});

document.addEventListener("touchend", function () {
    jump();
});

function jump() {
    if (!dino.classList.contains("jump")) {
        dino.classList.add("jump");
        jumpCount++;
        scoreElement.innerText = "Счет: " + jumpCount;

        if (jumpCount % 10 === 0) {
            coinCount++;
            coinElement.innerText = "Монеты: " + coinCount;
        }

        setTimeout(function () {
            dino.classList.remove("jump");
        }, 300); // Убедитесь, что это значение (300) соответствует длительности анимации jump
    }
}

let isAlive = setInterval(function () {
    let dinoTop = parseInt(window.getComputedStyle(dino).getPropertyValue("top"));
    let cactusLeft = parseInt(window.getComputedStyle(cactus).getPropertyValue("left"));

    if (cactusLeft < 50 && cactusLeft > 0 && dinoTop >= 140) {
        alert("ИГРА ОКОНЧЕНА");

        if (jumpCount > bestScore) {
            bestScore = jumpCount;
            localStorage.setItem("bestScore", bestScore);
            bestScoreElement.innerText = "Лучший результат: " + bestScore;
        }

        jumpCount = 0;
        coinCount = 0;
        scoreElement.innerText = "Счет: " + jumpCount;
        coinElement.innerText = "Монеты: " + coinCount;
    }
}, 10);
