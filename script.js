document.getElementById("askButton").addEventListener("click", async function() {
    const inputField = document.getElementById("userInput");
    const outputField = document.getElementById("responseOutput");
    const question = inputField.value.trim();

    if (!question) {
        outputField.innerText = "Please enter a question!";
        return;
    }

    outputField.innerText = "Thinking...";

    try {
        const response = await fetch("https://api.openai.com/v1/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer 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"
            },
            body: JSON.stringify({
                model: "text-davinci-003",
                prompt: question,
                max_tokens: 100
            })
        });

        if (!response.ok) {
            throw new Error("Failed to get a response from API.");
        }

        const data = await response.json();
        outputField.innerText = data.choices[0].text.trim();
    } catch (error) {
        outputField.innerText = `Error: ${error.message}`;
    }
});