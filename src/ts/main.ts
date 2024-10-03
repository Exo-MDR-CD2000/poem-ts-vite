// Imports for bootstrap and popper.js
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';

// Imports for fontawesome and bootstrap-icons
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-icons/font/bootstrap-icons.min.css';

// Custom CSS
import '../css/style.min.css';

// Bootstrap breakpoint css
import '../css/bootstrap-breakpoint.css';

// copright-update import should be last
import { updateCopyrightYear } from './utils/copyright-update';


import { fetchRandomPoem, fetchAllPoemsByAuthor, fetchAllPoemsByTitle, } from '../ts/services/poem-api';
import { initializeRandomPoemGenerator } from './ui/randomPoemRenderer';

// Function to test fetching one random poem
const testFetchRandomPoem = async (): Promise<void> => {
    try {
        const poem = await fetchRandomPoem();
        console.log('Random Poem:', poem);
    } catch (error) {
        console.error('Error fetching random poem:', error);
    }
};

// Function to test fetching all poems by author
const testFetchAllPoemsByAuthor = async (author: string): Promise<void> => {
    try {
        const poems = await fetchAllPoemsByAuthor(author);
        console.log(`Poems by ${author}:`, poems);
    } catch (error) {
        console.error(`Error fetching poems by author ${author}:`, error);
    }
};

// Function to test fetching all poems by title
const testFetchAllPoemsByTitle = async (title: string): Promise<void> => {
    try {
        const poems = await fetchAllPoemsByTitle(title);
        console.log(`Poems with title ${title}:`, poems);
    } catch (error) {
        console.error(`Error fetching poems with title ${title}:`, error);
    }
};



// Call the test functions
document.addEventListener('DOMContentLoaded', () => {
    testFetchRandomPoem();
    testFetchAllPoemsByAuthor('Emily Dickinson');
    testFetchAllPoemsByTitle('The Raven');
});


// Initialize the random poem generator
initializeRandomPoemGenerator();
































// helper function to update the year in the footer
document.addEventListener('DOMContentLoaded', () => {
    updateCopyrightYear();
});