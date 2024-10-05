import { Poem } from '../types/poemTypes';

// API URLs
const RANDOM_POEM_API_URL = 'https://poetrydb.org/random/1';
const ALL_POEMS_BY_AUTHOR_API_URL = 'https://poetrydb.org/author';
const ALL_POEMS_BY_TITLE_API_URL = 'https://poetrydb.org/title';
const BASE_URL = 'https://poetrydb.org';

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

// Fetch poems by author or title
export const fetchPoems = async (author?: string, title?: string): Promise<Poem[]> => {
    try {
        let url = '';

        if (author) {
            url = `https://poetrydb.org/author/${encodeURIComponent(author)}`;
        } else if (title) {
            url = `https://poetrydb.org/title/${encodeURIComponent(title)}`;
        } else {
            throw new Error('Either author or title must be provided');
        }

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Failed to fetch poems');
        }

        // Parse the response JSON
        const data = await response.json();

        // Ensure you are accessing the expected structure
        if (!Array.isArray(data)) {
            throw new Error('Invalid response structure: expected an array of poems');
        }

        return data; // Return the array of poems

    } catch (error) {
        console.error('Error fetching poems:', error);
        throw error;
    }
};


// // Fetch all poems by title but you must pass the title name
// export const fetchAllPoemsByTitle = async (title: string): Promise<Poem[]> => {
//     try {
//         const response = await fetch(`${ALL_POEMS_BY_TITLE_API_URL}/${encodeURIComponent(title)}`);

//         if (!response.ok) {
//             throw new Error(`Failed to fetch poems by title: ${title}`);
//         }

//         const data: Poem[] = await response.json();
//         return data;

//     } catch (error) {
//         console.error(`Error fetching poems by title: ${title}`, error);
//         throw error;
//     }
// };

// Fetch all titles
export const fetchAllTitles = async (): Promise<string[]> => {
    try {
        const response = await fetch(ALL_POEMS_BY_TITLE_API_URL);
        
        if (!response.ok) {
            throw new Error('Failed to fetch titles');
        }

        // Parse the response JSON
        const data = await response.json();
        // console.log(data); // Log the entire data for debugging

        // Ensure you are accessing the 'titles' array within the response
        if (!data.titles) {
            throw new Error('Invalid response structure: no titles array');
        }

        // console.log(data.titles); // Log the titles array for debugging
        return data.titles; // Return the titles array

    } catch (error) {
        console.error('Error fetching titles:', error);
        throw error;
    }
};


// Fetch all authors
export const fetchAllAuthors = async (): Promise<string[]> => {
    try {
        const response = await fetch(ALL_POEMS_BY_AUTHOR_API_URL);
        
        if (!response.ok) {
            throw new Error('Failed to fetch authors');
        }

        // Parse the response JSON
        const data = await response.json();
        // console.log(data);

        // Ensure you are accessing the 'authors' array within the response
        if (!data.authors) {
            throw new Error('Invalid response structure: no authors array');
        }

        // console.log(data.authors);
        return data.authors; // Return the authors array

    } catch (error) {
        console.error('Error fetching authors:', error);
        throw error;
    }
};




// use this api url for all titles with their author, lines, and linecount
// https://poetrydb.org/title/lines

// https://poetrydb.org/author/Andrew%20Marvell
// https://poetrydb.org/title/%22Faith%22%20is%20a%20fine%20invention







// -----------------------------------------UNUSED CODE-----------------------------------------


// // Fetch all poems by author but you must pass the author name
// export const fetchAllPoemsByAuthor = async (author: string): Promise<Poem[]> => {
//     try {
//         const response = await fetch(`${ALL_POEMS_BY_AUTHOR_API_URL}/${encodeURIComponent(author)}`);

//         if (!response.ok) {
//             throw new Error(`Failed to fetch poems by author: ${author}`);
//         }

//         const data: Poem[] = await response.json();
//         return data;

//     } catch (error) {
//         console.error(`Error fetching poems by author: ${author}`, error);
//         throw error;
//     }
// };

// // Fetch all poem titles
// export const fetchAllPoemTitles = async (): Promise<string[]> => {
//     try {
//         const response = await fetch(ALL_POEMS_BY_TITLE_API_URL);

//         if (!response.ok) {
//             throw new Error('Failed to fetch poem titles');
//         }

//         const data = await response.json();
//         return data.map((poem: Poem) => poem.title);

//     } catch (error) {
//         console.error('Error fetching poem titles:', error);
//         throw error;
//     }
// };
