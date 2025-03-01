document.addEventListener("DOMContentLoaded", function () {
    // Ready Dialog
    const readyDialog = document.getElementById("readyDialog");
    const closeDialog = document.getElementById("closeDialog");

    // Name Input Dialog
    const nameModal = document.getElementById("nameDialog");
    const namePrompt = document.getElementById("namePrompt");
    const kidNameInput = document.getElementById("kidNameInput");
    const submitName = document.getElementById("submitName");

    const player1NameDisplay = document.getElementById("player1Name");
    const player2NameDisplay = document.getElementById("player2Name");

    let player1Name = "";
    let player2Name = "";
    let askingPlayer1 = true; // Track if asking for player 1 or 2

    // Hide nameModal initially
    nameModal.style.display = "none";

    // Function to capitalize the first letter of a name
    function capitalizeName(name) {
        return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    }

    // Show nameModal only after readyDialog is closed
    closeDialog.addEventListener("click", function () {
        readyDialog.style.display = "none";
        
        // After closing ready dialog, show the name input dialog
        setTimeout(() => {
            nameModal.style.display = "flex";
        }, 300); // Small delay for smoother transition
    });

    // Handle name submission
    submitName.addEventListener("click", function () {
        let name = kidNameInput.value.trim();

        if (name.length < 2) {
            alert("Name must be at least 2 characters long!");
            return;
        }

        // Capitalize name before saving
        name = capitalizeName(name);

        if (askingPlayer1) {
            player1Name = name;
            player1NameDisplay.textContent = `${player1Name}'s Score`; // Update UI
            namePrompt.textContent = "Enter 2nd Kid's Name:";
            kidNameInput.value = ""; // Clear input for next player
            askingPlayer1 = false;
        } else {
            player2Name = name;
            player2NameDisplay.textContent = `${player2Name}'s Score`; // Update UI
            nameModal.style.display = "none"; // Close the modal after both names are entered
        }
    });
});
