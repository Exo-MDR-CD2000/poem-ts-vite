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

        // Add event listeners for delete buttons
        document.querySelectorAll('.delete-poem').forEach(button => {
            button.addEventListener('click', async (event) => {
                const index = (event.target as HTMLElement).getAttribute('data-poem-index');
                if (index !== null) {
                    const poem = poems[parseInt(index)];
                    await deletePoem(poem.id!);
                    renderSavedPoems(); // Re-render the table
                }
            });
        });
    } catch (error) {
        console.error('Error rendering saved poems:', error);
    }
};