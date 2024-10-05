// Import the helper functions from poemCardHelpers.ts
import { createSmallPoemCard, createLargePoemCard } from '../utils/poemCardUtil';
import { fetchRandomPoem } from '../services/poem-api';
import { Poem } from '../types/poemTypes';

export const initializeRandomPoemGenerator = (): void => {
    const randomPoemButton = document.querySelector('#get-random-poem') as HTMLElement;
    const poemContainerSmall = document.querySelector('#random-poem-results-small') as HTMLElement;
    const poemContainerLarge = document.querySelector('#random-poem-results-large') as HTMLElement;

    randomPoemButton.addEventListener('click', async () => {
        try {
            const poem = await fetchRandomPoem();
            generatePoemHTML(poem);
        } catch (error) {
            poemContainerSmall.textContent = 'Failed to fetch poem. Please try again later.';
            poemContainerLarge.textContent = 'Failed to fetch poem. Please try again later.';
        }
    });

    const generatePoemHTML = (poem: Poem): void => {
        // Clear any existing content
        while (poemContainerSmall.firstChild) {
            poemContainerSmall.removeChild(poemContainerSmall.firstChild);
        }
        while (poemContainerLarge.firstChild) {
            poemContainerLarge.removeChild(poemContainerLarge.firstChild);
        }

        // Use the helper functions to create the poem cards
        const smallPoemCard = createSmallPoemCard(poem);
        const largePoemCard = createLargePoemCard(poem);

        // Append the new content to the poem containers
        poemContainerSmall.appendChild(smallPoemCard);
        poemContainerLarge.appendChild(largePoemCard);

        // Add event listeners to the delete buttons
        const deleteButtons = document.querySelectorAll('.delete-poem');
        deleteButtons.forEach(button => {
            button.addEventListener('click', () => {
                while (poemContainerSmall.firstChild) {
                    poemContainerSmall.removeChild(poemContainerSmall.firstChild);
                }
                while (poemContainerLarge.firstChild) {
                    poemContainerLarge.removeChild(poemContainerLarge.firstChild);
                }
            });
        });
    };
};



// Add in delete render function to remove the random poem from the page above
// Also, add in linecount to the poem card innerHTML