import { fetchAllAuthors, fetchAllTitles } from '../services/poem-api'; // Adjust the path as necessary

// Function to populate authors dropdown
export const populateAuthorsDropdown = (authors: string[]) => {
    const authorSelect = document.getElementById('author') as HTMLSelectElement;

    // Clear existing options
    authorSelect.innerHTML = '<option value="">Select an author</option>';

    // Populate dropdown with authors
    authors.forEach(author => {
        const option = document.createElement('option');
        option.value = author;
        option.textContent = author;
        authorSelect.appendChild(option);
    });
};

// Function to populate titles dropdown
export const populateTitlesDropdown = (titles: string[]) => {
    const titleSelect = document.getElementById('title') as HTMLSelectElement;

    // Clear existing options
    titleSelect.innerHTML = '<option value="">Select a poem title</option>';

    // Populate dropdown with titles
    titles.forEach(title => {
        const option = document.createElement('option');
        option.value = title;
        option.textContent = title;
        titleSelect.appendChild(option);
    });
};

// Function to load authors and titles
export const loadAuthorsAndTitles = async () => {
    try {
        const authors = await fetchAllAuthors(); // Fetch authors
        const titles = await fetchAllTitles(); // Fetch titles
        
        // Populate dropdowns
        populateAuthorsDropdown(authors);
        populateTitlesDropdown(titles);
    } catch (error) {
        console.error('Error loading authors and titles:', error);
    }
};
