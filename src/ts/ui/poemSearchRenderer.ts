import { fetchAllAuthors, fetchAllTitles, fetchPoems } from '../services/poem-api';
import { savePoem } from '../services/local-poem-db';
import { Poem } from '../types/poemTypes';
import { generateSearchTableRowHTML } from '../utils/table-layout';
import { renderSavedPoems } from '../ui/savedPoemsRenderer';

/**
 * Sets up the Poems application by loading authors and titles,
 * and initializing event listeners for search and clear buttons.
 */
export const setupPoemsApp = async () => {
    try {
        // Fetch all authors and titles from the API
        const authors = await fetchAllAuthors();
        const titles = await fetchAllTitles();

        // Populate the author select element with options
        const authorSelect = document.getElementById('author') as HTMLSelectElement;
        authorSelect.innerHTML = '<option value="">Select an author</option>';
        authors.forEach(author => {
            const option = document.createElement('option');
            option.value = author;
            option.textContent = author;
            authorSelect.appendChild(option);
        });

        // Populate the title select element with options
        const titleSelect = document.getElementById('title') as HTMLSelectElement;
        titleSelect.innerHTML = '<option value="">Select a poem title</option>';
        titles.forEach(title => {
            const option = document.createElement('option');
            option.value = title;
            option.textContent = title;
            titleSelect.appendChild(option);
        });

        /**
         * Handles the search button click event by fetching poems based on the selected author and title,
         * and rendering the search results in the table.
         */
        const handleSearchButtonClick = async () => {
            const selectedAuthor = authorSelect.value;
            const selectedTitle = titleSelect.value;
            const searchAlert = document.getElementById('no-search-alert') as HTMLDivElement;

            // Log the selected author and title
            console.log(`User selected - ${selectedAuthor ? `Author: ${selectedAuthor}` : ''}${selectedAuthor && selectedTitle ? ', ' : ''}${selectedTitle ? `Title: ${selectedTitle}` : ''}`);
            if (!selectedAuthor && !selectedTitle) {
                searchAlert.classList.remove('d-none');
                return;
            }

            searchAlert.classList.add('d-none'); // Hide the alert after a search is made

            try {
                const poems: Poem[] = await fetchPoems(selectedAuthor, selectedTitle);
                
                // Log the search results
                console.log(`Search results based on ${selectedAuthor ? `Author Choice = ${selectedAuthor}` : `Title Choice = ${selectedTitle}`}:`, poems);
                
                renderPoemsInTable(poems);
            } catch (error) {
                console.error('Error during search:', error);
            }
        };

        /**
         * Renders the fetched poems in the search results table.
         * 
         * This function clears any existing rows in the search results table and then
         * iterates over the provided array of poems. For each poem, it generates an HTML
         * table row using the `generateSearchTableRowHTML` function and appends it to the table body.
         * Additionally, it adds an event listener to the save button in each row, allowing the user
         * to save the poem to the local database.
         * 
         * @param {Poem[]} poems - The array of poems to render. Each poem object should conform to the Poem type.
         */
        const renderPoemsInTable = (poems: Poem[]) => {
            const tbody = document.getElementById('searchResults') as HTMLTableSectionElement;
            
            // Clear existing rows in the table body
            while (tbody.firstChild) {
                tbody.removeChild(tbody.firstChild);
            }

            // Iterate over each poem and create a table row
            poems.forEach((poem, index) => {
                const rowHTML = generateSearchTableRowHTML(poem, index);
                const row = document.createElement('tr');
                row.innerHTML = rowHTML;
                tbody.appendChild(row);

                // Add event listener for the save button in the row
                row.querySelector('.save-poem')?.addEventListener('click', async () => {
                    try {
                        // Save the poem to the local database
                        await savePoem(poem);
                        // Re-render the saved poems table after adding a new poem from the search results
                        await renderSavedPoems();
                    } catch (error) {
                        console.error('Error saving poem:', error);
                    }
                });
            });
        };

        // Add event listener to the poem search form to handle form submission
        document.getElementById('poemSearchForm')?.addEventListener('submit', (event) => {
            event.preventDefault(); // Prevent the default form submission
            handleSearchButtonClick(); // Call the search function
        });

        /**
         * Clears the search results table and resets the author and title select elements.
         */
        const clearSearchResults = () => {
            const tbody = document.getElementById('searchResults') as HTMLTableSectionElement;
            if (tbody) {
                // Use a while loop to remove each child node individually
                // hopefully prevents memory leaks
                while (tbody.firstChild) {
                    tbody.removeChild(tbody.firstChild);
                }
            }
            authorSelect.value = '';
            titleSelect.value = '';
        };

        // Add event listener to the clear results button to handle clearing search results
        document.getElementById('clearResults')?.addEventListener('click', () => {
            clearSearchResults(); // Call the clear function
        });

        // Initial render of saved poems
        await renderSavedPoems();

    } catch (error) {
        console.error('Error loading authors and titles:', error);
    }
};