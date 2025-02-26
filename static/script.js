// Get the box element and button elements
const box = document.getElementById("box");
const toggleButton = document.getElementById("toggleButton");
const setCommandButton = document.getElementById("setCommandButton");
const customCommandInput = document.getElementById("customCommandInput");

let isOn = false; // Default button condition
let customCommand = ""; // Default custom command

// Function to change the color of the box to a random soft color
function changeColor() {
    const randomBgColorForBox = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
    box.style.backgroundColor = randomBgColorForBox;
}

// Speech recognition setup
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;
recognition.continuous = true; // Enable continuous listening

// Change text inside button when clicked and disable input
toggleButton.addEventListener("click", () => {
    if (isOn) {
        recognition.stop();
        toggleButton.textContent = "On";
        toggleButton.classList.remove("off-state");
        customCommandInput.disabled = false; // Enable input when "off"
        setCommandButton.disabled = false;
        setCommandButton.style.backgroundColor = "#008CBA"; // 'set command' btn color to blue when active
        setCommandButton.style.cursor = "pointer";
    } else {
        recognition.start();
        toggleButton.textContent = "Off";
        toggleButton.classList.add("off-state");
        customCommandInput.disabled = true;  // Disable input when "on"
        setCommandButton.disabled = true;
        setCommandButton.style.backgroundColor = "#979897"; // 'set command' btn color to blue when off
        setCommandButton.style.cursor = "default";
    }
    isOn = !isOn;
});

// Handle custom command submission
setCommandButton.addEventListener("click", () => {
    customCommand = customCommandInput.value.toLowerCase();
    if (customCommand) {
        setCommandButton.textContent = "Update Command"; // Update button name after a command is set
        console.log("Custom command set to:", customCommand);
    }
});

// Handle recognition results
recognition.onresult = (event) => {
    const command = event.results[0][0].transcript.toLowerCase();
    console.log('Heard:', command);

    // Change box color on default command or custom command
    if (command.includes(customCommand) || command.includes("tik") || command.includes("tok")) {
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
