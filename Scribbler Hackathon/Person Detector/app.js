const video = document.getElementById('video');
const responseText = document.getElementById('response-text');
const thinkingAnimation = document.getElementById('thinking-animation');
let model;

// Initialize webcam stream
navigator.mediaDevices.getUserMedia({ video: true })
  .then(stream => {
    video.srcObject = stream;
    console.log("Webcam access granted");
  })
  .catch(err => {
    console.error('Error accessing video: ', err);
    alert('Could not access the webcam. Please check your permissions.');
  });

// Load the COCO-SSD model
cocoSsd.load().then(loadedModel => {
  model = loadedModel;
  console.log('COCO-SSD model loaded');
  detectObjects(); // Start object detection when model is loaded
}).catch(error => {
  console.error('Error loading model: ', error);
  alert('Error loading model. Please try again later.');
});

// Function to detect objects
function detectObjects() {
  if (model && video.srcObject) {
    thinkingAnimation.style.display = 'block'; // Show thinking animation while detecting

    model.detect(video).then(predictions => {
      thinkingAnimation.style.display = 'none'; // Hide thinking animation when detection is done

      if (predictions.length > 0) {
        // Filter out duplicate detections
        let detectedObjects = predictions.map(prediction => prediction.class).join(", ");
        
        // Update the UI with detected objects
        responseText.textContent = `I see: ${detectedObjects}`;

        // Speak the detected objects
        speakDetectedObjects(detectedObjects);
      } else {
        responseText.textContent = "I don't see anything right now.";
        speakDetectedObjects("I don't see anything right now.");
      }

      // Continue detecting
      requestAnimationFrame(detectObjects);
    }).catch(error => {
      console.error('Error detecting objects: ', error);
      responseText.textContent = "Error in detection. Please try again.";
    });
  }
}

// Function to speak detected objects
function speakDetectedObjects(objects) {
  // Only speak if the objects string is different
  if (objects !== responseText.textContent) {
    const utterance = new SpeechSynthesisUtterance(objects);
    utterance.lang = 'en-US';

    // Speak the detected objects using the browser's speech synthesis
    window.speechSynthesis.speak(utterance);
  }
}
