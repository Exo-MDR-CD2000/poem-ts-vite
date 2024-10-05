// Imports for bootstrap and popper.js
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';

// Imports for fontawesome and bootstrap-icons
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-icons/font/bootstrap-icons.min.css';

// Custom CSS
import '../css/style.min.css';

// Bootstrap breakpoint css
// import '../css/bootstrap-breakpoint.css';

// copright-update import should be last
import { updateCopyrightYear } from './utils/copyright-update';


import { fetchRandomPoem, fetchAllAuthors, fetchAllTitles } from '../ts/services/poem-api';
import { initializeRandomPoemGenerator } from './ui/randomPoemRenderer';

// import { setupDropdowns } from './utils/dropdownClear';

import { setupPoemsApp } from './ui/poemSearchRenderer';

import { handleAddPoemForm } from './ui/makePoemRenderer';

// Function to test fetching one random poem
const testFetchRandomPoem = async (): Promise<void> => {
    try {
        const poem = await fetchRandomPoem();
        console.log('Random Poem:', poem);
    } catch (error) {
        console.error('Error fetching random poem:', error);
    }
};


//Function to load titles and log them to the console
const loadTitles = async () => {
    try {
        const titles = await fetchAllTitles(); // Await the titles array
        console.log('Titles fetched in main.ts:', titles); // Log the titles array
    } catch (error) {
        console.error('Error in main.ts:', error); // Handle any errors
    }
};

// Function to load authors and log them to the console
const loadAuthors = async () => {
    try {
        const authors = await fetchAllAuthors(); // Await the authors array
        console.log('Authors fetched in main.ts:', authors); // Log the authors array
    } catch (error) {
        console.error('Error in main.ts:', error); // Handle any errors
    }
};

// Ensure the function is called after the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    testFetchRandomPoem();
    loadAuthors(); // Call the loadAuthors function
    loadTitles(); // Call the loadTitles function
});

document.addEventListener('DOMContentLoaded', () => {

    // Initialize the random poem generator
    initializeRandomPoemGenerator();

    // Initialize search render
    setupPoemsApp(); 

    handleAddPoemForm();
});

























// helper function to update the year in the footer
document.addEventListener('DOMContentLoaded', () => {
    updateCopyrightYear();
});