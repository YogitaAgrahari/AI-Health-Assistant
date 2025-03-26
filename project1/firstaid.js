document.addEventListener("DOMContentLoaded", function () {
    const sendButton = document.querySelector(".chat-input button");
    const inputField = document.querySelector("#user-input");
    const chatContainer = document.querySelector("#chat-box");

    sendButton.addEventListener("click", () => sendMessage());
    inputField.addEventListener("keypress", (event) => {
        if (event.key === "Enter") sendMessage();
    });
});

//  Predefined Emergency Instructions
const emergencyData = {
    "heart attack": [
        "Call emergency services immediately.",
        "Keep the person calm and seated.",
        "If conscious, give aspirin (unless allergic).",
        "Perform CPR if unconscious and not breathing."
    ],
    "stroke": [
        "Check for FAST symptoms: Face drooping, Arm weakness, Speech difficulty.",
        "Call emergency services immediately.",
        "Keep the person comfortable and monitor breathing."
    ],
    "choking": [
        "Ask, 'Are you choking?' If they can't speak, perform the Heimlich maneuver.",
        "For infants, use back blows and chest thrusts.",
        "Call for help if needed."
    ],
    "severe bleeding": [
        "Apply direct pressure with a clean cloth.",
        "Elevate the injured area.",
        "Do not remove deeply embedded objects.",
        "Call emergency services if bleeding doesn’t stop."
    ],
    "seizures": [
        "Keep the person safe from injury.",
        "Do not restrain movements.",
        "Place them on their side.",
        "Call emergency services if the seizure lasts more than 5 minutes."
    ]
};

//API Key insert here


//  Send Message Function
async function sendMessage() {
    const inputField = document.querySelector("#user-input");
    const chatContainer = document.querySelector("#chat-box");

    const userMessage = inputField.value.trim().toLowerCase();
    if (!userMessage) return;

    // Display User Message
    chatContainer.insertAdjacentHTML("beforeend", `
        <div class="user-message">
            <p>${userMessage}</p>
        </div>
    `);
    inputField.value = "";

    // Show Loading Indicator
    chatContainer.insertAdjacentHTML("beforeend", `<div class="loader">Typing...</div>`);

    if (emergencyData[userMessage]) {
        // If input matches predefined conditions, return saved instructions
        document.querySelector(".loader").remove();
        chatContainer.insertAdjacentHTML("beforeend", `
            <div class="bot-message">
                <p><strong>Guidance:</strong></p>
                <ul>${emergencyData[userMessage].map(step => `<li>${step}</li>`).join("")}</ul>
            </div>
        `);
    } else {
        // If not in predefined list, call Hugging Face API
        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${API_KEY}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ inputs: `Provide step-by-step first aid instructions for ${userMessage}.` })
            });

            const result = await response.json();
            document.querySelector(".loader").remove();

            if (result && result[0] && result[0].summary_text) {
                chatContainer.insertAdjacentHTML("beforeend", `
                    <div class="bot-message">
                        <p><strong>AI Guidance:</strong> ${result[0].summary_text}</p>
                    </div>
                `);
            } else {
                throw new Error("Invalid response from AI.");
            }
        } catch (error) {
            document.querySelector(".loader").remove();
            console.error("First Aid API Error:", error);
            chatContainer.insertAdjacentHTML("beforeend", `
                <div class="error">
                    <p>Could not fetch instructions. Try again.</p>
                </div>
            `);
        }
    }
}


function processFile() {
    const fileInput = document.getElementById("fileInput");
    const file = fileInput.files[0];
    const summaryOutput = document.getElementById("summaryOutput");

    if (!file) {
        alert("Please upload a file.");
        return;
    }

    summaryOutput.innerHTML = `<p>Extracting text...</p>`;

    if (file.type.includes("image")) {
        Tesseract.recognize(file, "eng")
            .then(({ data: { text } }) => summarizeText(text))
            .catch(() => summaryOutput.innerHTML = `<p style="color:red;">Error extracting text from image.</p>`);
    } else {
        const reader = new FileReader();
        reader.onload = (e) => summarizeText(e.target.result);
        reader.readAsText(file);
    }
}

// AI Summarization for Medical Reports
async function summarizeText(text) {
    //API Key inserted here
 

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ inputs: text })
        });

        const result = await response.json();

        if (Array.isArray(result) && result.length > 0 && result[0].summary_text) {
            document.getElementById("summaryOutput").innerHTML = `<h3>AI Summary:</h3><p>${result[0].summary_text}</p>`;
        } else {
            throw new Error("Invalid response from AI.");
        }
    } catch (error) {
        console.error("Summarization Error:", error);
        document.getElementById("summaryOutput").innerHTML = `<p style="color:red;">Error summarizing report. Try again.</p>`;
    }
}

