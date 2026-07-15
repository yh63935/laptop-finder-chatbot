// script.js
// Get references to the DOM elements
const chatbotMessages = document.querySelector(".chatbot-messages");
const options = document.querySelector(".options");
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input button");
const questions = [
    {
        question: "Do you need help finding the right laptop?",
        options: ["Yes", "No"]
    },
    {
        question: "What's your budget?",
        options: ["Under $500", "$500-$1000", "Over $1000"]
    },
    {
        question: "What will you primarily use your laptop for?",
        options: ["School", "Programming", "Gaming", "Video editing", "Everyday Use"]
    },
    {
        question: "What is your preferred OS?",
        options: ["Windows", "macOS", "Linux", "No Preference"]
    },
    {
        question: "Is portability important to you?",
        options: ["Yes", "No"]
    }
];

let currentQuestionIndex = 0;
const userAnswers = [];

// Function to ask a question about desired laptop features and display options
function askQuestion(step) {
    // Clear prior options
    options.innerHTML = "";

    // Show the current question
    chatbotMessages.innerHTML += "<p>" + step.question + "</p>";

    // Create buttons for options
    step.options.forEach(option => {
        const button = document.createElement("button");
        button.textContent = option;
        button.addEventListener("click", () => {
            chatbotMessages.innerHTML += "<p>You selected: " + option + "</p>";

            userAnswers.push({
                question: step.question,
                answer: option
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