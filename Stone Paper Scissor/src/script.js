let userScore = 0;
let compScore = 0;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");
const darkMode = document.querySelector("#dark");

// Reset function to reset scores and choices
const reset = () => {
    userScore = 0;
    compScore = 0;
    updateScore();
    document.querySelector("#userChoice").innerText = "";
    document.querySelector("#compChoice").innerText = "";
    msg.innerText = "Let's Play!";
    msg.style.backgroundColor = "#081b31";
}

// Fixing the reset button click event
document.querySelector("#reset-btn").addEventListener("click", reset);

// Dark Mode Toggle
darkMode.addEventListener("change", () => {
    document.body.classList.toggle("dark-mode");
})

// Generate computer's choice randomly
const genCompChoice = () => {
    const options = ["rock", "paper", "scissors"];
    const index = Math.floor(Math.random() * 3);
    return options[index];
}

// Update score on the webpage
const updateScore = () => {
    document.querySelector("#user-score").innerText = userScore;
    document.querySelector("#comp-score").innerText = compScore;
}


// Function to play sound for outcome (win, lose, or draw)
const playOutcomeSound = (outcome) => {
    let sound = new Audio();
    const buttons = document.querySelectorAll('.choice, #reset-btn, #share-btn');
    buttons.forEach(button => button.disabled = true);

    const choices = document.querySelectorAll('.choice'); // Select all the choice images
    choices.forEach(choice => choice.style.pointerEvents = 'none');  // Disable pointer events for images

    // Set the source based on the outcome
    switch (outcome) {
        case 'draw':
            sound.src = 'public/sounds/draw-sword1-44724.mp3';
            break;
        case 'win':
            sound.src = 'public/sounds/marimba-win-f-2-209688.mp3';  // Lose sound
            break;
        case 'lose':
            sound.src = 'public/sounds/trumpet-fail-242645.mp3';  // Draw sound
            break;
        default:
            return;  // Do nothing if outcome is not recognized
    }

    sound.play(); // Play the sound
    sound.onended = () => {
        buttons.forEach(button => button.disabled = false);  // Re-enable buttons
        choices.forEach(choice => choice.style.pointerEvents = 'auto');  // Re-enable images
        msg.innerText = "Play next turn";
    msg.style.backgroundColor = "#081b31";
    };
    
}

// Function to handle the draw game outcome
const drawGame = (Compchoice) => {
    msg.innerText = "IT'S A DRAW";
    msg.style.backgroundColor = "#081b31";
    document.querySelector("#userChoice").innerText = Compchoice;
    document.querySelector("#compChoice").innerText = Compchoice;
    playOutcomeSound('draw'); // Play draw sound
    updateScore();
}

// Show the result of the game (win or loss)
const showWinner = (userWin, Userchoice, Compchoice) => {
    if (userWin) {
        msg.innerText = "YOU WIN";
        msg.style.backgroundColor = "green";
        userScore++;
        playOutcomeSound('win'); // Play win sound
    } else {
        msg.innerText = "YOU LOSE";
        msg.style.backgroundColor = "red";
        compScore++;
        playOutcomeSound('lose'); // Play lose sound
    }

    document.querySelector("#userChoice").innerText = Userchoice;
    document.querySelector("#compChoice").innerText = Compchoice;
    updateScore();
}

// Main game logic
const playGame = (Userchoice) => {
    console.log("User: ", Userchoice);
    const Compchoice = genCompChoice();
    console.log("Computer: ", Compchoice);

    if (Compchoice === Userchoice) {
        drawGame(Compchoice);
    } else {
        let userWin = true;
        if (Userchoice === "rock") {
            userWin = Compchoice === "paper" ? false : true;
        } else if (Userchoice === "scissors") {
            userWin = Compchoice === "rock" ? false : true;
        } else {
            userWin = Compchoice === "scissors" ? false : true;
        }
        showWinner(userWin, Userchoice, Compchoice);
    }
};

// Event listeners for user choices
choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        const Userchoice = choice.getAttribute("id");
        playGame(Userchoice);
    })
});

const shareButton = document.getElementById('share-btn');

shareButton.addEventListener('click', () => {
    if (navigator.share) {
        // Use the Web Share API for supported browsers
        navigator.share({
            title: 'Rock Paper Scissors Game',  // Title of the shared content
            text: 'Hey, check out this awesome game!',  // Text content to share
            url: window.location
        })
        .then(() => {
            console.log('Share was successful');
        })
        .catch((error) => {
            console.log('Error sharing:', error);
        });
    } else {
        // Fallback in case the Web Share API is not supported (e.g., for desktop browsers)
        alert('Sharing is not supported on your device or browser.');
    }
});
