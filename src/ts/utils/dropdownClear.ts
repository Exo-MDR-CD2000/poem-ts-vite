export function setupDropdowns() {
    const titleSelect = document.getElementById('title') as HTMLSelectElement;
    const authorSelect = document.getElementById('author') as HTMLSelectElement;

    // Utility function to disable options
    const disableOptions = (selectElement: HTMLSelectElement, valueToDisable: string) => {
        Array.from(selectElement.options).forEach(option => {
            option.disabled = option.value === valueToDisable;
        });
    };

    // Utility function to enable all options
    const enableAllOptions = (selectElement: HTMLSelectElement) => {
        Array.from(selectElement.options).forEach(option => {
            option.disabled = false;
        });
    };

    // Handle changes in the "Poem Title" dropdown
    titleSelect.addEventListener('change', () => {
        const selectedTitle = titleSelect.value;

        // Enable all options before applying any new disabling
        enableAllOptions(authorSelect);

        // Logic: If a specific title is selected, disable certain author options
        if (selectedTitle !== '') {
            disableOptions(authorSelect, selectedTitle); // Example: You can map specific titles to authors
        }
    });

    // Handle changes in the "Author" dropdown
    authorSelect.addEventListener('change', () => {
        const selectedAuthor = authorSelect.value;

        // Enable all options before applying any new disabling
        enableAllOptions(titleSelect);

        // Logic: If a specific author is selected, disable certain title options
        if (selectedAuthor !== '') {
            disableOptions(titleSelect, selectedAuthor); // Example: You can map specific authors to titles
        }
    });

    // Clear dropdown selections on 'Clear Results' button click
    const clearButton = document.getElementById('clearResults');
    if (clearButton) {
        clearButton.addEventListener('click', () => {
            titleSelect.value = '';
            authorSelect.value = '';
            enableAllOptions(titleSelect);
            enableAllOptions(authorSelect);
        });
    }
}

