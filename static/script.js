document.addEventListener("DOMContentLoaded", function () {
    // Get modal and button elements
    const modal = document.getElementById("readyDialog");
    const closeDialog = document.getElementById("closeDialog");

    // Show the modal when the page loads
    modal.style.display = "flex";

    // Close modal when "Yes" is clicked
    closeDialog.addEventListener("click", function () {
        modal.style.display = "none";
    });
});


// Function to change the color of the box to a random soft color
// function changeColor() {
//     const randomBgColorForBox = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
//     box.style.backgroundColor = randomBgColorForBox;
// }
