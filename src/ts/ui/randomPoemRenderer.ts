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
            // Clear existing content safely
            while (poemContainer.firstChild) {
                poemContainer.removeChild(poemContainer.firstChild);
            }

            // Create a temporary container to build the new HTML
            const tempContainer = document.createElement('div');
            tempContainer.innerHTML = `
                <div class="row justify-content-center">
                    <div class="col-md-8">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">${poem.title}</h5>
                                <h6 class="card-subtitle mb-2 text-muted">${poem.author}</h6>
                                <p class="card-text">Line Count: ${poem.linecount}</p>
                                <p class="card-text">${poem.lines.join('<br>')}</p>
                                <button id="random-btn-clear" class="btn btn-danger btn-lg-1 position-absolute top-0 end-0 m-2 delete-poem">
                                    <i class="bi bi-trash"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            // Append the new content to the poem container
            while (tempContainer.firstChild) {
                poemContainer.appendChild(tempContainer.firstChild);
            }

            // Add event listener to the delete button
            const deleteButton = poemContainer.querySelector('#random-btn-clear') as HTMLElement;
            deleteButton.addEventListener('click', () => {
                // Clear the poem from the page
                while (poemContainer.firstChild) {
                    poemContainer.removeChild(poemContainer.firstChild);
                }
            });
        };
    });
};



// Add in delete render function to remove the random poem from the page above
// Also, add in linecount to the poem card innerHTML