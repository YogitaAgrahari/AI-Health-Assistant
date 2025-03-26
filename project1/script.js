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

// import Tesseract from 'tesseract.js';

// function extractTextFromImage(imageFile) {
//     Tesseract.recognize(
//         imageFile,
//         'eng', // Language: English
//         {
//             logger: m => console.log(m) // Logs progress
//         }
//     ).then(({ data: { text } }) => {
//         console.log("Extracted Text:", text);
//         document.getElementById('output').innerText = text;
//     }).catch(err => console.error("OCR Error:", err));
// }



// document.addEventListener("DOMContentLoaded", function() {
//     const startButton = document.querySelector(".btn");
//     if (startButton) {
//         startButton.addEventListener("click", function() {
//             startButton.style.transform = "scale(0.9)";
//             setTimeout(() => {
//                 startButton.style.transform = "scale(1)";
//             }, 200);
//         });
//     }

//     // Open and Close Chatbot
//     const chatButton = document.querySelector(".chat-button");
//     const chatWindow = document.querySelector(".chat-window");
//     const closeButton = document.querySelector(".chat-window .close");

//     if (chatButton && chatWindow && closeButton) {
//         chatButton.addEventListener("click", function() {
//             chatWindow.classList.add("open");
//         });

//         closeButton.addEventListener("click", function() {
//             chatWindow.classList.remove("open");
//         });
//     }

//     // Event listener for the send button
//     const sendButton = document.querySelector(".chat-window .input-area button");
//     if (sendButton) {
//         sendButton.addEventListener("click", () => sendMessage());
//     }
// });

// // --- AI Chatbot Code ---
// import { GoogleGenerativeAI } from "@google/generative-ai";

// // Emergency Instructions for AI
// const emergencyInstructions = `
// You are an AI chatbot providing first aid assistance. 
// Your role is to give **clear, step-by-step emergency responses** for the following conditions:

// 1️⃣ **Heart Attack**:
//    - Call emergency services immediately.
//    - Keep the person calm and seated.
//    - If conscious, give aspirin (unless allergic).
//    - Perform CPR if unconscious and not breathing.

// 2️⃣ **Stroke**:
//    - Check for FAST symptoms: Face drooping, Arm weakness, Speech difficulty.
//    - Call emergency services immediately.
//    - Keep the person comfortable and monitor breathing.

// 3️⃣ **Choking**:
//    - Ask, "Are you choking?" If they can't speak, perform the **Heimlich maneuver**.
//    - For infants, use **back blows and chest thrusts**.
//    - Call for help if needed.

// 4️⃣ **Severe Bleeding**:
//    - Apply **direct pressure** with a clean cloth.
//    - Elevate the injured area.
//    - Do not remove deeply embedded objects.
//    - Call emergency services if bleeding doesn’t stop.

// 5️⃣ **Seizures**:
//    - Keep the person **safe from injury**.
//    - Do not restrain movements.
//    - Place them **on their side**.
//    - Call emergency services if the seizure lasts more than **5 minutes**.

// Use simple language, and provide **step-by-step guidance**.
// `;

// // Initialize AI
// const API_KEY = "AIzaSyAJpgaG-xhF6C6yVk_YWmj5Mnnlv5EkYSA"; // Securely store API key
// const genAI = new GoogleGenerativeAI(API_KEY);
// const model = genAI.getGenerativeModel({ 
//     model: "gemini-2.0-flash", // Correct model name
//     systemInstruction: emergencyInstructions
// });

// let messages = { history: [] };

// // Function to Handle Chat Messages
// async function sendMessage() {
//     const inputField = document.querySelector(".chat-window input");
//     const chatContainer = document.querySelector(".chat-window .chat");

//     const userMessage = inputField.value.trim();
//     if (userMessage.length) {
//         inputField.value = "";

//         // Add user message to chat
//         chatContainer.insertAdjacentHTML("beforeend", `
//             <div class="user">
//                 <p>${userMessage}</p>
//             </div>
//         `);

//         // Show loading indicator
//         chatContainer.insertAdjacentHTML("beforeend", `
//             <div class="loader"></div>
//         `);

//         try {
//             const chat = model.startChat(messages);
//             let result = await chat.sendMessageStream(userMessage);

//             // Remove loader
//             document.querySelector(".chat-window .chat .loader").remove();

//             // Add AI response
//             chatContainer.insertAdjacentHTML("beforeend", `
//                 <div class="model">
//                     <p></p>
//                 </div>
//             `);

//             let modelMessages = "";
//             for await (const chunk of await result.stream) {
//                 const chunkText = chunk.text();
//                 modelMessages = document.querySelectorAll(".chat-window .chat div.model");
//                 modelMessages[modelMessages.length - 1].querySelector("p").insertAdjacentHTML("beforeend", chunkText);
//             }

//             // Store conversation history
//             messages.history.push({ role: "user", parts: [{ text: userMessage }] });
//             messages.history.push({ role: "model", parts: [{ text: modelMessages[modelMessages.length - 1].querySelector("p").innerHTML }] });

//         } catch (error) {
//             console.error("Chatbot Error:", error);
//             chatContainer.insertAdjacentHTML("beforeend", `
//                 <div class="error">
//                     <p>Could not process request. Please try again.</p>
//                 </div>
//             `);
//         }
//     }
// }
