
let onLoad = false;
let container;

let classifier;
let video;
let stream;

const synth1 = window.speechSynthesis;

/// on page load do the next things:

$.ajax({
  url: "/GetGridSize",
  context: document.body
}).done(function(data) {

});

//on page load finish do the next things:

window.onload = function() {
  onLoad = true;
  console.log('hello from script');
};


// Get the 'speak' button
let button = document.getElementById('speak');

// Get the text input element.
let speechMsgInput = document.getElementById('speech-msg');

// Get the voice select element.
let voiceSelect = document.getElementById('voice');

// Get the attribute controls.
let volumeInput = document.getElementById('volume');
let rateInput = document.getElementById('rate');
let pitchInput = document.getElementById('pitch');


// Fetch the list of voices and populate the voice options.
function loadVoices() {
  // Fetch the available voices.
  let voices = speechSynthesis.getVoices();

  // Loop through each of the voices.
  voices.forEach(function(voice, i) {
    // Create a new option element.
    // console.log(voice.name);
    let option = document.createElement('option');

    // Set the options value and text.
    option.value = voice.name;
    option.innerHTML = voice.name;

    // Add the option to the voice selector.
    voiceSelect.appendChild(option);
  });
}


// Execute loadVoices.
loadVoices();

// Chrome loads voices asynchronously.
window.speechSynthesis.onvoiceschanged = function(e) {
  loadVoices();
};

// Create a new utterance for the specified text and add it to
// the queue.

function speak(text) {
  // Create a new instance of SpeechSynthesisUtterance.
  let utterThis = new SpeechSynthesisUtterance();

  // Set the text.
  utterThis.text = text;

  // // Set the attributes.
  // utterThis.volume = parseFloat(volumeInput.value);
  // utterThis.rate = parseFloat(rateInput.value);
  // utterThis.pitch = parseFloat(pitchInput.value);

  // If a voice has been selected, find the voice and set the
  // utterance instance's voice attribute.

  // if (voiceSelect.value) {
  // 	// utterThis.voice = speechSynthesis.getVoices().filter(function(voice) { return voice.name == voiceSelect.value; })[0];

  utterThis.voice = speechSynthesis.getVoices().filter(function(voice) { return voice.name == voiceSelect.value; })[0];

  // Queue this utterance.
  window.speechSynthesis.speak(utterThis);
}

// Set up an event listener for when the 'speak' button is clicked.
button.addEventListener('click', function(e) {

  if (speechMsgInput.value.length > 0) {
  speak(speechMsgInput.value);
  console.log("working");
  }
});
