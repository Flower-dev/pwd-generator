// Number of password segments to generate
let selectedSegments = 3;

/**
 * Generates a password consisting of multiple segments of characters.
 * Each segment follows a specific pattern: consonant-vowel-consonant-consonant-vowel-consonant.
 * Some segments may include a number or an uppercase letter at random positions.
 *
 * @param {number} segments - Number of segments in the password.
 * @returns {string} - The generated password.
 */
function generatePassword(segments) {
  // Character sets for password generation
  const chars = {
    consonants: "bcdfghjklmnpqrstvwxyz",
    vowels: "aeiou",
    numbers: "0123456789",
  };

  // Function to get a random character from the specified type
  const getRandomChar = (type) =>
    chars[type][Math.floor(Math.random() * chars[type].length)];

  // Random positions for a number and an uppercase letter in the password
  const numberPos = Math.floor(Math.random() * segments);
  const uppercasePos = Math.floor(Math.random() * segments);

  

  // Function to create a single segment of the password
  const createSegment = (index) => {
    let segment = [
      getRandomChar("consonants"),
      getRandomChar("vowels"),
      getRandomChar("consonants"),
      getRandomChar("consonants"),
      getRandomChar("vowels"),
      getRandomChar("consonants"),
    ].join("");

    // Pick a random position
    const randomIndex = Math.floor(Math.random() * segment.length);
    
    if (index === numberPos) {
      segment =
        segment.slice(0, randomIndex) + // Characters before the random index
        getRandomChar("numbers") + // Insert random number
        segment.slice(randomIndex + 1); // Characters after the replaced character
    }

    if (index === uppercasePos)
      
      segment =
        segment.slice(0, randomIndex) +
        segment[randomIndex].toUpperCase() +
        segment.slice(randomIndex + 1);

    return segment;
  };

  // Generate the required number of segments and join them with a "-" (hyphen)
  return Array.from({ length: segments }, (_, i) => createSegment(i)).join("-");
}

/**
 * Resets the copy icon to its default state.
 */
function resetIcon() {
  document.querySelector("#copy-icon").setAttribute("data-lucide", "copy");
  lucide.createIcons();
}

/**
 * Updates the displayed password with a newly generated one.
 */
const updatePassword = () => {
  document.querySelector("#password").textContent =
    generatePassword(selectedSegments);
  resetIcon();
};

/**
 * Handles tab button clicks to change the number of password segments.
 * Updates the UI and regenerates the password.
 *
 * @param {Event} event - The click event from the tab button.
 */
const handleTabClick = (event) => {
  document
    .querySelectorAll(".tab")
    .forEach((btn) => btn.classList.remove("active"));

  event.currentTarget.classList.add("active");
  selectedSegments = parseInt(event.currentTarget.dataset.value);
  updatePassword();
};

/**
 * Handles clicks on the password container to copy the password to the clipboard.
 * Changes the icon to indicate success and resets it after a delay.
 */
const handlePasswordContainerClick = () => {
  const passwordText = document.querySelector("#password").textContent;

  navigator.clipboard.writeText(passwordText).then(() => {
    resetIcon("check"); // Change the icon to a checkmark
    setTimeout(resetIcon, 5000); // Reset the icon after 5 seconds
  });
};

// Attach event listeners to tab buttons
document
  .querySelectorAll(".tab")
  .forEach((btn) => btn.addEventListener("click", handleTabClick));

// Attach event listener to the generate button
document.querySelector("#generate").addEventListener("click", updatePassword);

// Attach event listener to the password container for copying functionality
document
  .querySelector("#password-container")
  .addEventListener("click", handlePasswordContainerClick);

// Generate a default password when the page loads
window.onload = updatePassword;
