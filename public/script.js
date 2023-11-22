// Fetch available voices and populate the dropdown
function populateVoiceList() {
    var voices = window.speechSynthesis.getVoices();
    var voiceSelect = document.getElementById("voiceSelect");

    voices.forEach(function(voice) {
        var option = document.createElement("option");
        option.value = voice.name;
        option.textContent = voice.name;
        voiceSelect.appendChild(option);
    });
}

// script.js

let currentChunkIndex = 0;
const chunkSize = 10; // Adjust this value based on your preference

function highlightCurrentlySpokenChunk() {
    const inputText = document.getElementById("inputText");
    const chunks = inputText.value.match(/[\s\S]{1,10}/g) || [];

    // Reset previous highlights
    for (let i = 0; i < chunks.length; i++) {
        chunks[i] = `<span>${chunks[i]}</span>`;
    }

    // Highlight the currently spoken chunk
    if (currentChunkIndex < chunks.length) {
        chunks[currentChunkIndex] = `<span class="highlight">${chunks[currentChunkIndex]}</span>`;
    }

    inputText.innerHTML = chunks.join("");
}

// Convert text to speech
function convertText() {
    const inputText = document.getElementById("inputText").value;
    const selectedVoice = document.getElementById("voiceSelect").value;

    const chunks = inputText.match(/[\s\S]{1,10}/g) || [];

    // Reset the currentChunkIndex
    currentChunkIndex = 0;

    const utterance = new SpeechSynthesisUtterance(inputText);
    utterance.voice = window.speechSynthesis.getVoices().find(function (voice) {
        return voice.name === selectedVoice;
    });

    utterance.addEventListener("start", function () {
        // Highlight the first chunk when speech starts
        highlightCurrentlySpokenChunk();
    });

    utterance.addEventListener("end", function () {
        // Reset styling when speech ends
        const inputTextElement = document.getElementById("inputText");
        inputTextElement.innerHTML = inputTextElement.value;
    });

    utterance.addEventListener("boundary", function (event) {
        // Update currentChunkIndex on each boundary
        currentChunkIndex = Math.floor(event.charIndex / chunkSize);
        highlightCurrentlySpokenChunk();
    });

    window.speechSynthesis.speak(utterance);
}

// Wait for voices to be loaded before populating the dropdown
window.speechSynthesis.onvoiceschanged = function () {
    populateVoiceList();
};

// // Convert text to speech
// function convertText() {
//     var inputText = document.getElementById("inputText").value;
//     var selectedVoice = document.getElementById("voiceSelect").value;

//     var utterance = new SpeechSynthesisUtterance(inputText);
//     utterance.voice = window.speechSynthesis.getVoices().find(function(voice) {
//         return voice.name === selectedVoice;
//     });

//     window.speechSynthesis.speak(utterance);
// }

// // Wait for voices to be loaded before populating the dropdown
// window.speechSynthesis.onvoiceschanged = function() {
//     populateVoiceList();
// };
