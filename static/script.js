// Get the box element
const box = document.getElementById("box");
const button = document.getElementById("toggleButton")
let isOn = false // default button condition

// Function to change the color of the box to a random soft color
function changeColor() {
    const randomBgColorForBox = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
    box.style.backgroundColor = randomBgColorForBox;
}

// Speech recognition setup
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = 'en-US'; // American English
recognition.interimResults = false;
recognition.maxAlternatives = 1;
recognition.continuous = true; // Enable continuous listening

// change text inside button when its clicked
button.addEventListener("click",()=>{
    if(isOn){
        recognition.start();
        button.textContent = "Off";
        button.classList.add("off-state")
    } else {
        recognition.stop();
        button.textContent = "On";
        button.classList.remove("off-state")
    }
    isOn = !isOn;
})


// Handle recognition results
recognition.onresult = (event) => {
    const command = event.results[0][0].transcript.toLowerCase();
    console.log('Heard:', command);

    // Turn on recognition if "on" is heard
    if (command.includes("on")) {
        if (recognition.state === 'inactive') {
            recognition.start(); // Restart the recognition if it's inactive
            console.log('Speech recognition started');
        }
    }

    // Change box color on "test"
    if (command.includes("tik")) {
        changeColor();
    }
    if (command.includes("tok")){
        changeColor();
    }

    // Stop listening if "off" command is heard
    if (command.includes("off")) {
        if (recognition.state === 'active') {
            recognition.stop(); // Stop recognition when "off" is heard
            console.log('Speech recognition stopped');
        }
    }
};

// Handle recognition errors
recognition.onerror = (event) => {
    console.error('Error with speech recognition:', event.error);
};

// Listen for events when recognition is started or stopped
recognition.onstart = () => {
    console.log('Recognition started');
};

recognition.onend = () => {
    console.log('Recognition stopped');
};
