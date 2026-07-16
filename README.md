# Laptop Finder Chatbot

A simple web-based chatbot that helps users find a laptop based on their budget, purpose, operating system preference, and portability needs.

<img width="672" height="633" alt="image" src="https://github.com/user-attachments/assets/c32ad4ce-4dc9-43c5-b807-c9a755c3db99" />


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

The interface is intentionally simple and accessible, with a clear chat layout, easy-to-read buttons, and a basic option to close and reopen the chatbot when needed. Unexpected user inputs are handled by giving the user and error message specifying the expected format.

## Example Flow
1. The chatbot asks whether the user wants help finding a laptop.
2. It asks about budget.
3. It asks about the intended use of the laptop.
4. It asks about preferred operating system and portability.
5. It recommends a laptop and explains why it fits.
6. It asks if the user wants another product recommendation, starting the flow over.

## Screenshots / Examples
Example of the chatbot opening:

<img width="672" height="633" alt="image" src="https://github.com/user-attachments/assets/c32ad4ce-4dc9-43c5-b807-c9a755c3db99" />


Example of preferences asked: 

<img width="628" height="370" alt="image" src="https://github.com/user-attachments/assets/2fc34361-ab74-428a-a53e-62edb313df81" />


Example of unexpected user input:

<img width="662" height="412" alt="image" src="https://github.com/user-attachments/assets/67b3bc8b-4269-4254-881b-ad53fd41b024" />

<img width="630" height="555" alt="image" src="https://github.com/user-attachments/assets/baa0058d-c676-4b9c-a125-f30cf4f6c066" />


Example of a recommendation:

<img width="601" height="912" alt="image" src="https://github.com/user-attachments/assets/46d9371e-2725-4ae8-a89b-b90c7fdabfa0" />


Example of asking if user wants another recommendation (and starting flow over)

<img width="622" height="280" alt="image" src="https://github.com/user-attachments/assets/d635143e-abb9-40e0-8003-9145f45fff4a" />


