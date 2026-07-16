// script.js
// Get references to the DOM elements
const chatbotMessages = document.querySelector(".chatbot-messages");
const options = document.querySelector(".options");
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input button");
const chatContainer = document.querySelector(".chat-container");
const openChatBtn = document.getElementById("open-chat-btn");

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

// Function to score a laptop based on the user's selected options
function getPurposeScore(laptop, purposeAnswer) {
    if (purposeAnswer === "Everyday Use") {
        return laptop.purpose.includes("School") || laptop.purpose.includes("Programming") ? 2 : 0;
    }

    return laptop.purpose.includes(purposeAnswer) ? 4 : 0;
}

// Function to score a laptop based on user answers
function scoreLaptop(laptop, answers) {
    let score = 0;
    // Score based on budget, budget has the highest weight of 4 points
    if (answers.budget === laptop.budget) {
        score += 4;
    }

    score += getPurposeScore(laptop, answers.purpose);
    // Score based on OS, weight of 3 points
    if (answers.os === "No Preference" || answers.os === laptop.os) {
        score += 3;
    }
    // Score based on portability, weight of 2 points
    if (answers.portability === "Yes" && laptop.features.some(feature => /lightweight|portable/i.test(feature))) {
        score += 2;
    // Score based on portability, weight of 1 point for non-portable laptops with gaming/performance features
    } else if (answers.portability === "No" && laptop.features.some(feature => /gaming|performance|powerful/i.test(feature))) {
        score += 1;
    }
    return score;
}

// Function to get the best laptop recommendation based on user answers
function getRecommendation(answers) {
    if (!Array.isArray(laptops) || laptops.length === 0) {
        return null;
    }
    // Score each laptop and sort by score in descending order
    const scoredLaptops = laptops
        .map(laptop => ({
            laptop,
            score: scoreLaptop(laptop, answers)
        }))
        .sort((a, b) => b.score - a.score || a.laptop.name.localeCompare(b.laptop.name));

    return scoredLaptops[0];
}

// Function to show the recommended laptop based on user answers
function showRecommendation() {
    const answers = {
        budget: getAnswer("budget"),
        purpose: getAnswer("purpose"),
        os: getAnswer("os"),
        portability: getAnswer("portability")
    };

    const recommendation = getRecommendation(answers);

    if (!recommendation) {
        addMessage("I couldn’t find a matching laptop in the current list.");
        return;
    }

    const { laptop } = recommendation;
    addMessage(`Recommended laptop: ${laptop.name}`);
    addMessage(`Why this one: ${laptop.reason}`);
    addMessage(`Price: ${laptop.price}`);
}


// Function to get the expected format for user input based on the question
function getExpectedFormat(questionId) {
    if (questionId === "budget") {
        return "a budget like 450, 800, or 'under 500'";
    }

    if (questionId === "purpose") {
        return "school, programming, gaming, video editing, or everyday";
    }

    if (questionId === "os") {
        return "windows, macos, linux, or no preference";
    }

    if (questionId === "portability") {
        return "yes or no";
    }

    return "yes or no";
}
// Function to normalize user input for comparison
// Accepted formats are case-insensitive and can include variations like "under 500", "less than 500", "over 1000", etc.
function normalizeAnswer(questionId, rawValue) {
    const value = rawValue.trim().toLowerCase();

    if (questionId === "budget") {
        if (value.includes("under") || value.includes("less than") || value.includes("<")) {
            return "Under $500";
        }

        if (value.includes("over") || value.includes("above") || value.includes(">")) {
            return "Over $1000";
        }

        if (value.includes("500-1000") || value.includes("500 to 1000") || value.includes("500-1000")) {
            return "$500-$1000";
        }

        const numericValue = Number(value.replace(/[^0-9.]/g, ""));
        if (!Number.isNaN(numericValue)) {
            if (numericValue < 500) {
                return "Under $500";
            }

            if (numericValue <= 1000) {
                return "$500-$1000";
            }

            return "Over $1000";
        }
    }

    if (questionId === "purpose") {
        if (value.includes("school")) return "School";
        if (value.includes("program")) return "Programming";
        if (value.includes("game")) return "Gaming";
        if (value.includes("video")) return "Video editing";
        if (value.includes("everyday") || value.includes("daily")) return "Everyday Use";
    }

    if (questionId === "os") {
        if (value.includes("windows")) return "Windows";
        if (value.includes("mac")) return "macOS";
        if (value.includes("linux")) return "Linux";
        if (value.includes("no preference") || value.includes("preference")) return "No Preference";
    }

    if (questionId === "portability") {
        if (value.includes("yes") || value.includes("important")) return "Yes";
        if (value.includes("no")) return "No";
    }

    if (questionId === "help") {
        if (value.includes("yes")) return "Yes";
        if (value.includes("no")) return "No";
    }

    return null;
}

// Function to handle the user's answer selection
function handleAnswerSelection(answer) {
    const currentStep = questions[currentQuestionIndex];

    addMessage(`You selected: ${answer}`);

    userAnswers.push({
        questionId: currentStep.id,
        answer
    });

    if (currentStep.id === "help" && answer === "No") {
        options.innerHTML = "";
        addMessage("No worries! If you'd like to explore laptop recommendations, I'm here to help. Have a great day!");
        return;
    }

    currentQuestionIndex += 1;

    if (currentQuestionIndex < questions.length) {
        askQuestion(questions[currentQuestionIndex]);
    } else {
        options.innerHTML = "";
        addMessage("Thanks! I’ve gathered your preferences and I’m recommending a laptop.");
        showRecommendation();
        addMessage("Would you like another product recommendation?");

        const followUpOptions = ["Yes", "No"];
        followUpOptions.forEach(option => {
            const button = document.createElement("button");
            button.textContent = option;
            button.addEventListener("click", () => {
                if (option === "Yes") {
                    start();
                } else {
                    options.innerHTML = "";
                    addMessage("Thanks for using the chatbot. I hope I helped you find a laptop that suits your needs. If you want another recommendation, feel free to start a new search. Have a great day!");
                }
            });
            options.appendChild(button);
        });
    }
}

function askQuestion(step) {
    options.innerHTML = "";
    addMessage(step.question);
    addMessage("You can either click an option or type a short answer.");

    step.options.forEach(option => {
        const button = document.createElement("button");
        button.textContent = option;
        button.addEventListener("click", () => {
            handleAnswerSelection(option);
        });

        options.appendChild(button);
    });
}

function send() {
    const rawInput = chatInput.value.trim();

    if (!rawInput) {
        addMessage("Please type a response or use one of the buttons.");
        chatInput.value = "";
        return;
    }

    const command = rawInput.toLowerCase();

    if (["start over", "restart", "reset"].includes(command)) {
        start();
        return;
    }

    if (["help", "what can i type"].includes(command)) {
        addMessage("You can use the buttons, or type short answers like 'school', 'windows', 'yes', 'no', or a budget such as '450' or '1200'.");
        chatInput.value = "";
        return;
    }

    const currentStep = questions[currentQuestionIndex];

    if (!currentStep) {
        addMessage("The conversation is already complete. Type 'start over' to begin again.");
        chatInput.value = "";
        return;
    }

    const normalizedAnswer = normalizeAnswer(currentStep.id, rawInput);

    if (!normalizedAnswer) {
        addMessage(`I didn’t understand that. Please try ${getExpectedFormat(currentStep.id)}.`);
        chatInput.value = "";
        return;
    }

    addMessage(`You typed: ${rawInput}`);
    handleAnswerSelection(normalizedAnswer);
    chatInput.value = "";
}

function start() {
    chatbotMessages.innerHTML = "";
    options.innerHTML = "";
    chatInput.value = "";
    currentQuestionIndex = 0;
    userAnswers.length = 0;
    addMessage("Hi! I’m LaptopFinder Bot. Do you need help finding the right laptop?");
    askQuestion(questions[0]);
}

function openChatbot() {
    chatContainer.style.display = "block";
    openChatBtn.style.display = "none";
    start();
}

function closeChatbot() {
    chatContainer.style.display = "none";
    openChatBtn.style.display = "inline-block";
}

sendChatBtn.addEventListener("click", send);
chatInput.addEventListener("keydown", event => {
    if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        send();
    }
});

start();