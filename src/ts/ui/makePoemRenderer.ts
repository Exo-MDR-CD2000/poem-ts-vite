import { savePoem, fetchSavedPoems } from '../services/local-poem-db';
import { renderSavedPoems } from './savedPoemsRenderer';
import { Poem } from '../types/poemTypes';

// Function to handle form submission and add a new poem
export const handleAddPoemForm = () => {
    const form = document.getElementById('addPoemForm') as HTMLFormElement;
    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent default form submission

        // Extract input values
        const title = (document.getElementById('newTitle') as HTMLInputElement).value;
        const author = (document.getElementById('newAuthor') as HTMLInputElement).value;
        const lines = (document.getElementById('newLines') as HTMLTextAreaElement).value.split('\n');

        // Fetch existing poems to determine the next ID
        const existingPoems: Poem[] = await fetchSavedPoems();
        const highestId = existingPoems.reduce((maxId, poem) => Math.max(maxId, poem.id || 0), 0);
        const newId = highestId + 1;

        // Generate a unique ID for the new poem
        const newPoem: Poem = {
            id: newId, // Use incremented ID
            title,
            author,
            lines,
            linecount: lines.length.toString()
        };

        // Add the new poem to the local database
        await savePoem(newPoem);

        // Re-render the saved poems table
        await renderSavedPoems();

        // Clear the form inputs
        form.reset();
    });
};