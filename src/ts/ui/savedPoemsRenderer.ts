// savedPoemsRenderer.ts
import { fetchSavedPoems, deletePoem } from '../services/local-poem-db';
import { generateSavedTableRowHTML } from '../utils/table-layout';
import { Poem } from '../types/poemTypes';

export const renderSavedPoems = async () => {
    try {
        const poems: Poem[] = await fetchSavedPoems();
        const tbody = document.getElementById('savedPoems') as HTMLTableSectionElement;
        tbody.innerHTML = ''; // Clear existing rows

        poems.forEach((poem, index) => {
            const rowHTML = generateSavedTableRowHTML(poem, index);
            const row = document.createElement('tr');
            row.innerHTML = rowHTML;
            tbody.appendChild(row);
        });

        // Use event delegation for handling delete button clicks
        tbody.addEventListener('click', async (event) => {
            const target = event.target as HTMLElement;
            const deleteButton = target.closest('.delete-poem');
            if (deleteButton) {
                console.log('Delete button clicked'); // Log button click
                const index = deleteButton.getAttribute('data-poem-index');
                console.log('Poem index:', index); // Log poem index
                if (index !== null) {
                    const poem = poems[parseInt(index)];
                    console.log('Poem ID:', poem.id); // Log poem ID
                    await deletePoem(poem.id!);
                    console.log(`Poem with ID ${poem.id} deleted`); // Log deletion
                    renderSavedPoems(); // Re-render the table
                }
            }
        });
    } catch (error) {
        console.error('Error rendering saved poems:', error);
    }
};

// this is a brute force method of deleting a poem since it sends multiple requests to the database.
// running low on time but it works for now.

// perhaps a memory leak or maybe due to manipulating the dom directly?
// the delete requests stack up after the first delete request is sent.

// the function is being called in the poemSearchRenderer but only when saving a poem from the search results. Can't be the issue there.
// I could alter the table card utility but i might get the same issue.
// Issue as to be here in the savedPoemsRenderer.