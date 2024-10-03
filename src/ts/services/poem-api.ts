import { Poem } from '../types/poemTypes';

// API URLs
const RANDOM_POEM_API_URL = 'https://poetrydb.org/random/1';
const ALL_POEMS_BY_AUTHOR_API_URL = 'https://poetrydb.org/author';
const ALL_POEMS_BY_TITLE_API_URL = 'https://poetrydb.org/title';
// const ALL_POEMS_API_URL = 'https://poetrydb.org/author,title';

// Fetch one random poem
export const fetchRandomPoem = async (): Promise<Poem> => {
    try {
        const response = await fetch(RANDOM_POEM_API_URL);

        if (!response.ok) {
            throw new Error('Failed to fetch random poem');
        }

        const data: Poem[] = await response.json();
        return data[0];

    } catch (error) {
        console.error('Error fetching random poem:', error);
        throw error;
    }
};

// Fetch all poems by author
export const fetchAllPoemsByAuthor = async (author: string): Promise<Poem[]> => {
    try {
        const response = await fetch(`${ALL_POEMS_BY_AUTHOR_API_URL}/${encodeURIComponent(author)}`);

        if (!response.ok) {
            throw new Error(`Failed to fetch poems by author: ${author}`);
        }

        const data: Poem[] = await response.json();
        return data;

    } catch (error) {
        console.error(`Error fetching poems by author: ${author}`, error);
        throw error;
    }
};

// Fetch all poems by title
export const fetchAllPoemsByTitle = async (title: string): Promise<Poem[]> => {
    try {
        const response = await fetch(`${ALL_POEMS_BY_TITLE_API_URL}/${encodeURIComponent(title)}`);

        if (!response.ok) {
            throw new Error(`Failed to fetch poems by title: ${title}`);
        }

        const data: Poem[] = await response.json();
        return data;

    } catch (error) {
        console.error(`Error fetching poems by title: ${title}`, error);
        throw error;
    }
};

// // Fetch all poems
// export const fetchAllPoems = async (): Promise<Poem[]> => {
//     try {
//         const response = await fetch(ALL_POEMS_API_URL);

//         if (!response.ok) {
//             throw new Error('Failed to fetch all poems');
//         }

//         const data: Poem[] = await response.json();
//         return data;

//     } catch (error) {
//         console.error('Error fetching all poems:', error);
//         throw error;
//     }
// };