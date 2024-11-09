// Load Tesseract.js library
const script = document.createElement('script');
script.src = 'https://cdn.jsdelivr.net/npm/tesseract.js@4.0.2/dist/tesseract.min.js';
document.head.appendChild(script);

script.onload = function() {
    document.getElementById("processButton").addEventListener("click", function () {
        const fileInput = document.getElementById("imageInput");
        const file = fileInput.files[0];
        const canvas = document.getElementById("canvas");
        const context = canvas.getContext("2d");

        if (file) {
            const reader = new FileReader();
            reader.onload = function (event) {
                const img = new Image();
                img.onload = function () {
                    canvas.width = img.width;
                    canvas.height = img.height;
                    context.drawImage(img, 0, 0);

                    // Recognize text using Tesseract.js
                    Tesseract.recognize(canvas, 'eng').then(({ data: { text } }) => {
                        // Speak the recognized text
                        const utterance = new SpeechSynthesisUtterance(text);
                        speechSynthesis.speak(utterance);
                        console.log("Recognized text:", text);
                    });
                };
                img.src = event.target.result;
            };
            reader.readAsDataURL(file);
        } else {
            alert("Please select an image file.");
        }
    });
};