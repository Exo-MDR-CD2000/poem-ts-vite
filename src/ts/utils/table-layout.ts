import { Poem } from "../types/poemTypes";




// Pure function to generate HTML for a table row
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