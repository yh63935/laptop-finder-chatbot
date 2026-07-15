// script.js
// Get references to the DOM elements
const chatbotMessages = document.querySelector(".chatbot-messages");
const options = document.querySelector(".options");
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input button");

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