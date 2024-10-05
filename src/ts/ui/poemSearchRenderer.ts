import { fetchAllAuthors, fetchAllTitles, fetchPoems } from '../services/poem-api'; // Adjust the path as necessary
import { Poem } from '../types/poemTypes'; // Ensure you import the Poem interface

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

            if (!selectedAuthor && !selectedTitle) {
                alert('Please select an author or title to search.');
                return;
            }

            try {
                const poems: Poem[] = await fetchPoems(selectedAuthor, selectedTitle);
                renderPoemsInTable(poems);
            } catch (error) {
                console.error('Error during search:', error);
            }
        };
        
        // Render poems in the table
        const renderPoemsInTable = (poems: Poem[]) => {
            const tbody = document.querySelector('.table tbody') as HTMLTableSectionElement;
            // Clear existing rows using a while loop to prevent memory leaks
            while (tbody.firstChild) {
                tbody.removeChild(tbody.firstChild);
            }

            poems.forEach((poem, index) => {
                const row = document.createElement('tr');

                row.innerHTML = `
                    <td>${poem.title}</td>
                    <td>${poem.author}</td>
                    <td>${poem.linecount}</td>
                    <td class="poem-column">
                        ${poem.lines.length > 6 ? `
                            <a class="btn btn-link" data-bs-toggle="collapse" href="#collapsePoem${index}" role="button" aria-expanded="false" aria-controls="collapsePoem${index}">
                                Show Poem
                            </a>
                            <div class="collapse" id="collapsePoem${index}">
                                ${poem.lines.join('<br>')}
                            </div>
                        ` : poem.lines.join('<br>')}
                    </td>
                    <td>
                        <button class="btn btn-success save-poem" data-poem-index="${index}">
                            <i class="bi bi-plus-lg"></i>
                        </button>
                    </td>
                `;

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
            const tbody = document.querySelector('.table tbody') as HTMLTableSectionElement;
            if (tbody) {
                tbody.innerHTML = ''; // Clear existing rows
            }
            authorSelect.value = '';
            titleSelect.value = '';
        };

        // Add event listener for the search button
        document.getElementById('poemSearchForm')?.addEventListener('submit', (event) => {
            event.preventDefault(); // Prevent the default form submission
            handleSearchButtonClick(); // Call the search function
        });

        // Add event listener for the clear results button
        document.getElementById('clearResults')?.addEventListener('click', () => {
            clearSearchResults(); // Call the clear function
        });

    } catch (error) {
        console.error('Error loading authors and titles:', error);
    }
};