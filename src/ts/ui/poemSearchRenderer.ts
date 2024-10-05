import { fetchAllAuthors, fetchAllTitles, fetchPoems } from '../services/poem-api'; // Adjust the path as necessary
import { Poem } from '../types/poemTypes'; // Ensure you import the Poem interface
import { generateSearchTableRowHTML } from '../utils/table-layout';

// Function to populate authors and titles dropdown, and render poems in a table
export const setupPoemsApp = async () => {
    try {
        // Fetch authors and titles
        const authors = await fetchAllAuthors();
        const titles = await fetchAllTitles();

        // Populate authors dropdown
        const authorSelect = document.getElementById('author') as HTMLSelectElement;
        authorSelect.innerHTML = '<option value="">Select an author</option>';
        authors.forEach(author => {
            const option = document.createElement('option');
            option.value = author;
            option.textContent = author;
            authorSelect.appendChild(option);
        });

        // Populate titles dropdown
        const titleSelect = document.getElementById('title') as HTMLSelectElement;
        titleSelect.innerHTML = '<option value="">Select a poem title</option>';
        titles.forEach(title => {
            const option = document.createElement('option');
            option.value = title;
            option.textContent = title;
            titleSelect.appendChild(option);
        });

        // Handle search button click
        const handleSearchButtonClick = async () => {
            const selectedAuthor = authorSelect.value;
            const selectedTitle = titleSelect.value;
            const searchAlert = document.getElementById('no-search-alert') as HTMLDivElement;

            // Log the user's search criteria
            console.log(`User selected - ${selectedAuthor ? `Author: ${selectedAuthor}` : ''}${selectedAuthor && selectedTitle ? ', ' : ''}${selectedTitle ? `Title: ${selectedTitle}` : ''}`);
            if (!selectedAuthor && !selectedTitle) {
                searchAlert.classList.remove('d-none'); // Show the alert
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
        
        // Render poems in the table
        const renderPoemsInTable = (poems: Poem[]) => {
            const tbody = document.getElementById('searchResults') as HTMLTableSectionElement;
            // Clear existing rows using a while loop to prevent memory leaks
            while (tbody.firstChild) {
                tbody.removeChild(tbody.firstChild);
            }
        
            poems.forEach((poem, index) => {
                const rowHTML = generateSearchTableRowHTML(poem, index);
                const row = document.createElement('tr');
                row.innerHTML = rowHTML;
                tbody.appendChild(row);
            });
        };

        // Add event listener for the search button
        document.getElementById('poemSearchForm')?.addEventListener('submit', (event) => {
            event.preventDefault(); // Prevent the default form submission
            handleSearchButtonClick(); // Call the search function
        });

                // Clear search results
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

        // Add event listener for the clear results button
        document.getElementById('clearResults')?.addEventListener('click', () => {
            clearSearchResults(); // Call the clear function
        });

    } catch (error) {
        console.error('Error loading authors and titles:', error);
    }
};