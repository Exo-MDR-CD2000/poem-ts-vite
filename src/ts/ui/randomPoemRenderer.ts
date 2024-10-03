import { fetchRandomPoem } from '../services/poem-api';
import { Poem } from '../types/poemTypes';



// Function to initialize the random poem generator
export const initializeRandomPoemGenerator = (): void => {
    // Wait for the DOM to be fully loaded
    document.addEventListener('DOMContentLoaded', () => {
        // Global variables
        const randomPoemButton = document.querySelector('#get-random-poem') as HTMLElement;
        const poemContainer = document.querySelector('#random-poem-results') as HTMLElement; // Define the poem container

        // Fetch and display random poem on button click
        randomPoemButton.addEventListener('click', async () => {
            try {
                const poem = await fetchRandomPoem();
                generatePoemHTML(poem);
            } catch (error) {
                poemContainer.textContent = 'Failed to fetch poem. Please try again later.';
            }
        });

        // Generate and insert HTML for the poem
        const generatePoemHTML = (poem: Poem): void => {
            // Add HTML to the page
            const poemCardRandomHTML = `
                <div class="row justify-content-center">
                    <div class="col-md-8">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">${poem.title}</h5>
                                <h6 class="card-subtitle mb-2 text-muted">${poem.author}</h6>
                                <p class="card-text">${poem.lines.join('<br>')}</p>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            poemContainer.innerHTML = poemCardRandomHTML;
        };
    });
};


// Add in delete render function to remove the random poem from the page above