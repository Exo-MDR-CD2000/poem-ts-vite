import { Poem } from "../types/poemTypes";

/**
 * Generates HTML for a table row for search results.
 * @param {Poem} poem - The poem object.
 * @param {number} index - The index of the poem in the array.
 * @returns {string} - The HTML string for the table row.
 */
export const generateSearchTableRowHTML = (poem: Poem, index: number): string => {
    return `
        <tr>
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
        </tr>
    `;
};

/**
 * Generates HTML for a table row for saved poems.
 * @param {Poem} poem - The poem object.
 * @param {number} index - The index of the poem in the array.
 * @returns {string} - The HTML string for the table row.
 */
export const generateSavedTableRowHTML = (poem: Poem, index: number): string => {
    return `
        <tr data-poem-index="${index}">
            <td class="poem-title">${poem.title}</td>
            <td class="poem-author">${poem.author}</td>
            <td class="poem-linecount">${poem.linecount}</td>
            <td class="poem-column">
                ${poem.lines.length > 6 ? `
                    <a class="btn btn-link" data-bs-toggle="collapse" href="#collapseSavedPoem${index}" role="button" aria-expanded="false" aria-controls="collapseSavedPoem${index}">
                        Show Poem
                    </a>
                    <div class="collapse" id="collapseSavedPoem${index}">
                        ${poem.lines.join('<br>')}
                    </div>
                ` : poem.lines.join('<br>')}
            </td>
            <td>
                <button class="btn btn-warning edit-poem" data-poem-index="${index}">
                    <i class="bi bi-pencil"></i>
                </button>
                <button class="btn btn-danger delete-poem" data-poem-index="${index}">
                    <i class="bi bi-trash"></i>
                </button>
                <button class="btn btn-success save-poem d-none" data-poem-index="${index}">
                    <i class="bi bi-check-lg"></i>
                </button>
                <button class="btn btn-secondary cancel-edit d-none" data-poem-index="${index}">
                    <i class="bi bi-x-lg"></i>
                </button>
            </td>
        </tr>
    `;
};