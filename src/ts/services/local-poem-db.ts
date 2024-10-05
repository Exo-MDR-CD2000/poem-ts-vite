import { Poem } from '../types/poemTypes';

const API_URL = 'http://localhost:3000/savedPoems';

// --- CREATE ---

/**
 * Saves a new poem to the local database.
 * @param {Poem} poem - The poem object to save.
 * @returns {Promise<Poem>} - A promise that resolves to the saved poem.
 */
export const savePoem = async (poem: Poem): Promise<Poem> => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(poem)
    });
    if (!response.ok) {
        throw new Error(`Failed to save poem Status code: ${response.status}`);
    }
    return response.json();
};

// --- READ ---

/**
 * Fetches all saved poems from the local database.
 * @returns {Promise<Poem[]>} - A promise that resolves to an array of poems.
 */
export const fetchSavedPoems = async (): Promise<Poem[]> => {
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error(`Failed to fetch saved poems Status code: ${response.status}`);
    }
    return response.json();
};

// --- UPDATE ---

/**
 * Updates an existing poem in the local database.
 * @param {number} id - The ID of the poem to update.
 * @param {Poem} poem - The updated poem object.
 * @returns {Promise<Poem>} - A promise that resolves to the updated poem.
 */
export const updatePoem = async (id: number, poem: Poem): Promise<Poem> => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(poem)
    });
    if (!response.ok) {
        throw new Error(`Failed to update poem. Status code: ${response.status}`);
    }
    return response.json();
};

// --- DELETE ---

/**
 * Deletes a poem from the local database.
 * @param {number} id - The ID of the poem to delete.
 * @returns {Promise<void>} - A promise that resolves when the poem is deleted.
 */
export const deletePoem = async (id: number): Promise<void> => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
    });
    if (!response.ok) {
        throw new Error(`Failed to delete poem. Status code: ${response.status}`);
    }
};