// Get the box element
const box = document.getElementById('box');

// Set initial position of the box in the center
let position = { x: window.innerWidth / 2 - 50, y: window.innerHeight / 2 - 50 };

// Function to move the box based on the direction command
function moveBox(direction) {
    switch (direction) {
        case 'left':
            position.x -= 100;
            break;
        case 'right':
            position.x += 100;
            break;
        case 'up':
            position.y -= 100;
            break;
        case 'down':
            position.y += 100;
            break;
        case 'reset':
            position.x = window.innerWidth / 2 - 50;
            position.y = window.innerHeight / 2 - 50;
            break;
    }

    // Update the position of the box
    box.style.left = `${position.x}px`;
    box.style.top = `${position.y}px`;

    // Change the color of the box smoothly
    changeColor();
}

// Function to change the color of the box to a random soft color
function changeColor() {
    const randomColor = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
    box.style.backgroundColor = randomColor;
}

// Speech recognition setup
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = 'en-US'; // American English
recognition.interimResults = false;
recognition.maxAlternatives = 1;
//recognition.continuous = true; // Keep listening continuously

// Start listening when the page is ready
recognition.start();

recognition.onresult = (event) => {
    const command = event.results[0][0].transcript.toLowerCase();
    console.log('Heard:', command);

    // Perform actions based on the command
    if (command.includes("left")) {
        moveBox('left');
    } else if (command.includes("right")) {
        moveBox('right');
    } else if (command.includes("up")) {
        moveBox('up');
    } else if (command.includes("down")) {
        moveBox('down');
    } else if (command.includes("reset")) {
        moveBox('reset');
    }

    // Stop listening if "stop" command is heard
    if (command.includes("stop")) {
        recognition.stop();
        console.log('Listening stopped');
    }

    // Start listening again if "start" command is heard
    if (command.includes("start")) {
        recognition.start();
        console.log('Listening started');
    }
};

recognition.onerror = (event) => {
    console.error('Error with speech recognition:', event.error);
};
