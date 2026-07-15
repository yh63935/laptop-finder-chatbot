// script.js
// Get references to the DOM elements
const chatbotMessages = document.querySelector(".chatbot-messages");
const options = document.querySelector(".options");
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input button");
// Function to ask a question about desired laptop features and display options
function askQuestion(question, optionsArray) {
    // Clear prior options
    options.innerHTML = "";

    // Set question text
    chatbotMessages.innerHTML = "<p>" + question + "</p>";

    // Create buttons for options
    optionsArray.forEach(option => {
        const button = document.createElement("button");
        button.textContent = option;
        button.addEventListener("click", () => {
            // Handle option click event
        });
        options.appendChild(button);
    });
}

// Need function to recommend products based on user input

// Function to initialize the chatbot
function start() {
    // Set initial message and clear prior options/history
    chatbotMessages.innerHTML = "<p>Hi! I'm LaptopFinder Bot. Do you need help finding the right laptop?</p>";
    options.innerHTML = "";
    chatInput.value = "";
}
    

// Function to close the chatbot
function closeChatbot() {
    const chatbotContainer = document.querySelector(".chatbot-container");
    chatbotContainer.style.display = "none";
}