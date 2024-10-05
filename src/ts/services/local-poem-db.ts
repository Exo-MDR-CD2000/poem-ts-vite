import { Poem } from '../types/poemTypes';

const API_URL = 'http://localhost:3000/savedPoems';

export const fetchSavedPoems = async (): Promise<Poem[]> => {
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error('Failed to fetch saved poems');
    }
    return response.json();
};

export const savePoem = async (poem: Poem): Promise<Poem> => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(poem)
    });
    if (!response.ok) {
        throw new Error('Failed to save poem');
    }
    return response.json();
};

export const deletePoem = async (id: number): Promise<void> => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
    });
    if (!response.ok) {
        throw new Error('Failed to delete poem');
    }
};