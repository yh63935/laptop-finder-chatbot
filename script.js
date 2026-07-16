// script.js
// Get references to the DOM elements
const chatbotMessages = document.querySelector(".chatbot-messages");
const options = document.querySelector(".options");
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input button");

const questions = [
    {
        id: "help",
        question: "Do you need help finding the right laptop?",
        options: ["Yes", "No"]
    },
    {
        id: "budget",
        question: "What's your budget?",
        options: ["Under $500", "$500-$1000", "Over $1000"]
    },
    {
        id: "purpose",
        question: "What will you primarily use your laptop for?",
        options: ["School", "Programming", "Gaming", "Video editing", "Everyday Use"]
    },
    {
        id: "os",
        question: "What is your preferred OS?",
        options: ["Windows", "macOS", "Linux", "No Preference"]
    },
    {
        id: "portability",
        question: "Is portability important to you?",
        options: ["Yes", "No"]
    }
];

let currentQuestionIndex = 0;
const userAnswers = [];

// Function to add a message to the chat
function addMessage(text) {
    const message = document.createElement("p");
    message.textContent = text;
    chatbotMessages.appendChild(message);
}

// Function to get the user's answer for a specific question
function getAnswer(questionId) {
    const answerEntry = userAnswers.find(entry => entry.questionId === questionId);
    return answerEntry ? answerEntry.answer : null;
}
function handleAnswerSelection(answer) {
    const currentStep = questions[currentQuestionIndex];

    addMessage(`You selected: ${answer}`);

            userAnswers.push({
        questionId: currentStep.id,
        answer
            });

            currentQuestionIndex += 1;

            if (currentQuestionIndex < questions.length) {
                askQuestion(questions[currentQuestionIndex]);
            } else {
                options.innerHTML = "";
                chatbotMessages.innerHTML += "<p>Thanks! I can now recommend a laptop based on your choices.</p>";
                console.log("User answers:", userAnswers);
            }
        });
        options.appendChild(button);
    });
}

// Function to initialize the chatbot
function start() {
    // Set initial message and clear prior options/history
    chatbotMessages.innerHTML = "<p>Hi! I'm LaptopFinder Bot. Do you need help finding the right laptop?</p>";
    options.innerHTML = "";
    chatInput.value = "";
    currentQuestionIndex = 0;
    askQuestion(questions[0]);
}

// Function to close the chatbot
function closeChatbot() {
    const chatbotContainer = document.querySelector(".chatbot-container");
    chatbotContainer.style.display = "none";
}

start();