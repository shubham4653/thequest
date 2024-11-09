// Access video, canvas, and detected text elements
const video = document.getElementById('webcam');
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const detectedTextElement = document.getElementById('detectedText');

// Initialize the Speech Synthesis API
const synth = window.speechSynthesis;
let lastSpokenText = "";  // Store last spoken text to avoid repetition
let isDetecting = false;  // Flag to manage debounce

// Request access to the webcam
async function startWebcam() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;
  } catch (error) {
    console.error('Error accessing webcam:', error);
  }
}

// Capture frame and detect text with debounce
async function detectText() {
  if (isDetecting) return; // Exit if detection is still in debounce period
  isDetecting = true;      // Set flag to prevent multiple detections

  // Draw the video frame to the canvas
  context.drawImage(video, 0, 0, canvas.width, canvas.height);
  const dataUrl = canvas.toDataURL('image/png');

  // Run OCR
  const { data: { text } } = await Tesseract.recognize(dataUrl, 'eng', {
    logger: (m) => console.log(m),
  });

  const detectedText = text.trim();
  detectedTextElement.textContent = detectedText;

  // Read the detected text if it's new
  if (detectedText && detectedText !== lastSpokenText) {
    speakText(detectedText);
    lastSpokenText = detectedText;  // Update last spoken text
  }

  // Set a timeout to wait before detecting again (debounce)
  setTimeout(() => {
    isDetecting = false; // Allow detection again after delay
  }, 5000); // 5-second delay
}

// Function to read aloud text
function speakText(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'en-US';  // Set language
  synth.speak(utterance);
}

// Start webcam on load
startWebcam();

// Begin detecting text at intervals (only one detection at a time)
setInterval(detectText, 1000); // Check every second but only detect if allowed
