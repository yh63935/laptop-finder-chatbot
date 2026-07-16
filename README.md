# Laptop Finder Chatbot

A simple web-based chatbot that helps users find a laptop based on their budget, purpose, operating system preference, and portability needs.

## Features
- Guided questions through a simple chat flow
- Button-based and typed input support
- Laptop recommendations with a short reason for each suggestion
- Restart and follow-up options for another recommendation

## Setup / Installation
1. Clone the repository:
   ```bash
   git clone <your-repository-url>
   ```
2. Open the project folder in your editor.
3. Start a local server so the files load correctly in the browser.

   Example with Python:
   ```bash
   python -m http.server 8000
   ```
4. Open your browser and go to:
   ```text
   http://localhost:8000
   ```

## Approach
This project uses a lightweight front-end approach:
- HTML provides the chat layout
- CSS gives the chatbot a clean blue-themed interface
- JavaScript handles the conversation flow, stores answers, and recommends a laptop from a simple dataset in laptops.js

The recommendation logic is based on a simple scoring system that compares the user’s answers to laptop attributes such as budget, purpose, OS, and portability.

The interface is intentionally simple and accessible, with a clear chat layout, easy-to-read buttons, and a basic option to close and reopen the chatbot when needed.

## Example Flow
1. The chatbot asks whether the user wants help finding a laptop.
2. It asks about budget.
3. It asks about the intended use of the laptop.
4. It asks about preferred operating system and portability.
5. It recommends a laptop and explains why it fits.
6. It asks if the user wants another product recommendation, starting the flow over.

## Screenshots / Examples
Example of the chatbot opening:

Example of preferences asked: 

Example of a recommendation:

