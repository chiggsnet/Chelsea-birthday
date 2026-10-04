const openButton = document.getElementById("openButton");
const openingScreen = document.getElementById("openingScreen");
const mainContent = document.getElementById("mainContent");

const continueButton = document.getElementById("continueButton");
const memoriesSection = document.getElementById("memoriesSection");


// OPEN BIRTHDAY WEBSITE
openButton.addEventListener("click", function () {

    openingScreen.style.display = "none";
    mainContent.classList.remove("hidden");

});


// GO TO MEMORIES
continueButton.addEventListener("click", function () {

    memoriesSection.scrollIntoView({
        behavior: "smooth"
    });

});
// =============================
// CHELSEA QUIZ
// =============================

const quizQuestions = [
    {
        question: "What is Chelsea's middle name? 👀",
        answers: [
            "Amarachi",
            "Akunnaya ❤️",
            "Chiamaka",
            "Favour"
        ],
        correct: 1
    },

    {
        question: "What is Chelsea's favorite hobby? 🎤",
        answers: [
            "Dancing 💃",
            "Gaming 🎮",
            "Singing 🎤❤️",
            "Drawing 🎨"
        ],
        correct: 2
    },

    {
        question: "What is Chelsea's favorite color? 💜",
        answers: [
            "Pink 💗",
            "Blue 💙",
            "Purple 💜❤️",
            "Black 🖤"
        ],
        correct: 2
    },

    {
        question: "What is Chelsea's favorite food? 😋",
        answers: [
            "Jollof Rice 🍚",
            "Fried Rice 🍚❤️",
            "Pizza 🍕",
            "Spaghetti 🍝"
        ],
        correct: 1
    },

    {
        question: "What type of music does Chelsea love? 🎶",
        answers: [
            "Afrobeats 🔥",
            "Rock 🎸",
            "Pop Music 🎤❤️",
            "Classical 🎻"
        ],
        correct: 2
    }
];
let currentQuestion = 0;
let score = 0;
let questionAnswered = false;

const questionNumber = document.getElementById("questionNumber");
const quizQuestion = document.getElementById("quizQuestion");
const answersContainer = document.getElementById("answersContainer");
const quizFeedback = document.getElementById("quizFeedback");
const nextQuestionButton = document.getElementById("nextQuestionButton");
const quizResult = document.getElementById("quizResult");
const finalScore = document.getElementById("finalScore");
const restartQuizButton = document.getElementById("restartQuizButton");


function loadQuestion() {

    const question = quizQuestions[currentQuestion];

    questionNumber.textContent =
        `Question ${currentQuestion + 1} of ${quizQuestions.length}`;

    quizQuestion.textContent = question.question;

    answersContainer.innerHTML = "";

    quizFeedback.textContent = "";

    questionAnswered = false;

    question.answers.forEach((answer, index) => {

        const button = document.createElement("button");

        button.classList.add("quiz-answer");

        button.textContent = answer;

        button.addEventListener("click", function () {

            if (questionAnswered) return;

            questionAnswered = true;

            if (index === question.correct) {

                button.classList.add("correct");

                quizFeedback.textContent =
                    "Correct! 🎉 You actually know Chelsea! ❤️";

                score++;

            } else {

                button.classList.add("wrong");

                quizFeedback.textContent =
                    "Oops! 😂 That's not it!";

                answersContainer.children[question.correct]
                    .classList.add("correct");
            }

        });

        answersContainer.appendChild(button);

    });

}


nextQuestionButton.addEventListener("click", function () {

    if (!questionAnswered) {

        quizFeedback.textContent =
            "Choose an answer first 👀";

        return;
    }

    currentQuestion++;

    if (currentQuestion < quizQuestions.length) {

        loadQuestion();

    } else {

        document.querySelector(".quiz-card").style.display = "none";

        quizResult.style.display = "block";

        finalScore.textContent =
            `You scored ${score} out of ${quizQuestions.length}! 🎉❤️`;

    }

});


restartQuizButton.addEventListener("click", function () {

    currentQuestion = 0;

    score = 0;

    quizResult.style.display = "none";

    document.querySelector(".quiz-card").style.display = "block";

    loadQuestion();

});


loadQuestion();
// =============================
// BIRTHDAY MESSAGES
// =============================

const sendMessageButton = document.getElementById("sendMessageButton");
const visitorName = document.getElementById("visitorName");
const visitorMessage = document.getElementById("visitorMessage");
const messagesList = document.getElementById("messagesList");
const messageStatus = document.getElementById("messageStatus");

const db = window.firebaseDB;
const { collection, addDoc, getDocs, query, orderBy, serverTimestamp } = window.firebaseFunctions;


// LOAD EXISTING MESSAGES
async function loadMessages() {
    try {
        const messagesQuery = query(
            collection(db, "birthdayMessages"),
            orderBy("createdAt", "desc")
        );

        const snapshot = await getDocs(messagesQuery);

        snapshot.forEach((doc) => {
            const data = doc.data();
            displayMessage(data.name, data.message);
        });

    } catch (error) {
        console.error("Error loading messages:", error);
        messageStatus.textContent = "Couldn't load messages. Please try again.";
    }
}


// DISPLAY A MESSAGE
function displayMessage(name, message) {
    const newMessage = document.createElement("div");
    newMessage.classList.add("birthday-message");

    const nameHeading = document.createElement("h3");
    nameHeading.textContent = name + " 💕";

    const messageText = document.createElement("p");
    messageText.textContent = message;

    newMessage.appendChild(nameHeading);
    newMessage.appendChild(messageText);

    messagesList.appendChild(newMessage);
}


// SEND MESSAGE
sendMessageButton.addEventListener("click", async function () {

    const name = visitorName.value.trim();
    const message = visitorMessage.value.trim();

    if (name === "" || message === "") {
        messageStatus.textContent =
            "Please enter your name and a message ❤️";
        return;
    }

    sendMessageButton.disabled = true;
    sendMessageButton.textContent = "Sending... 💌";

    try {

        await addDoc(collection(db, "birthdayMessages"), {
            name: name,
            message: message,
            createdAt: serverTimestamp()
        });

        displayMessage(name, message);

        visitorName.value = "";
        visitorMessage.value = "";

        messageStatus.textContent =
            "Your birthday message has been added! 🎉❤️";

    } catch (error) {

        console.error("Error adding message:", error);

        messageStatus.textContent =
            "Something went wrong. Please try again.";

    }

    sendMessageButton.disabled = false;
    sendMessageButton.textContent = "Send Birthday Love 💌";
});


// LOAD MESSAGES WHEN WEBSITE OPENS
loadMessages();
// =============================
// FINAL SURPRISE
// =============================

const revealSurpriseButton =
    document.getElementById("revealSurpriseButton");

const surpriseContent =
    document.getElementById("surpriseContent");


revealSurpriseButton.addEventListener("click", function () {

    surpriseContent.style.display = "block";

    revealSurpriseButton.style.display = "none";

    surpriseContent.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

});
// =============================
// BALLOON GAME
// =============================

const balloons = document.querySelectorAll(".balloon");
const balloonMessage = document.getElementById("balloonMessage");

let poppedBalloons = 0;

balloons.forEach(function (balloon) {

    balloon.addEventListener("click", function () {

        if (balloon.classList.contains("popped")) {
            return;
        }

        balloon.classList.add("popped");

        poppedBalloons++;

        if (poppedBalloons === balloons.length) {

            setTimeout(function () {

                balloonMessage.style.display = "block";

                balloonMessage.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });

            }, 400);

        }

    });

});
// =============================
// BIRTHDAY CELEBRATION
// =============================

const birthdayCelebrationButton =
    document.getElementById("birthdayCelebrationButton");

const celebrationOverlay =
    document.getElementById("celebrationOverlay");

const closeCelebration =
    document.getElementById("closeCelebration");


birthdayCelebrationButton.addEventListener("click", function () {

    celebrationOverlay.style.display = "flex";

    createConfetti();

});

closeCelebration.addEventListener("click", function () {

    celebrationOverlay.style.display = "none";

});
// =============================
// CONFETTI EFFECT
// =============================

function createConfetti() {

    const confettiCount = 100;

    for (let i = 0; i < confettiCount; i++) {

        const confetti = document.createElement("div");

        confetti.classList.add("confetti-piece");

        confetti.style.left =
            Math.random() * 100 + "vw";

        confetti.style.animationDuration =
            (Math.random() * 3 + 2) + "s";

        confetti.style.animationDelay =
            Math.random() * 1.5 + "s";

        confetti.style.transform =
            `rotate(${Math.random() * 360}deg)`;

        document.body.appendChild(confetti);

        setTimeout(function () {
            confetti.remove();
        }, 6000);

    }

}
// =============================
// PHOTO VIEWER
// =============================

const galleryPhotos =
    document.querySelectorAll(".memory-image img");

const photoViewer =
    document.getElementById("photoViewer");

const expandedPhoto =
    document.getElementById("expandedPhoto");

const closePhotoViewer =
    document.getElementById("closePhotoViewer");


galleryPhotos.forEach(function (photo) {

    photo.addEventListener("click", function () {

        expandedPhoto.src = photo.src;

        photoViewer.style.display = "flex";

    });

});


closePhotoViewer.addEventListener("click", function (event) {

    event.stopPropagation();

    photoViewer.style.display = "none";

});


photoViewer.addEventListener("click", function (event) {

    if (event.target === photoViewer) {

        photoViewer.style.display = "none";

    }

});