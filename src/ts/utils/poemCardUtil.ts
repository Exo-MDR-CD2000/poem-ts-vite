// poemCardHelpers.ts
import { Poem } from '../types/poemTypes';  // Adjust the import path as necessary

// Helper function to generate a small poem card
export const createSmallPoemCard = (poem: Poem): HTMLElement => {
    const cardSmall = document.createElement('div');
    cardSmall.className = 'col-md-6 col-lg-4 mb-4';
    cardSmall.innerHTML = `
        <div class="card">
            <div class="card-body p-2">
                <h5 class="card-title">${poem.title}</h5>
                <h6 class="card-subtitle mb-2 text-muted">${poem.author}</h6>
                <p class="card-text">Line Count: ${poem.linecount}</p>
                <p class="card-text">${poem.lines.join('<br>')}</p>
                <button class="btn btn-danger btn-sm position-absolute top-0 end-0 m-2 delete-poem" data-id="${poem.id}">
                    <i class="bi bi-trash"></i>
                </button>
            </div>
        </div>
    `;
    return cardSmall;
};

// Helper function to generate a large poem card
export const createLargePoemCard = (poem: Poem): HTMLElement => {
    const cardLarge = document.createElement('div');
    cardLarge.className = 'col-md-8 mb-4';
    cardLarge.innerHTML = `
        <div class="card">
            <div class="card-body p-4">
                <h5 class="card-title">${poem.title}</h5>
                <h6 class="card-subtitle mb-2 text-muted">${poem.author}</h6>
                <p class="card-text">Line Count: ${poem.linecount}</p>
                <p class="card-text">${poem.lines.join('<br>')}</p>
                <button class="btn btn-danger btn-lg-1 position-absolute top-0 end-0 m-2 delete-poem" data-id="${poem.id}">
                    <i class="bi bi-trash"></i>
                </button>
            </div>
        </div>
    `;
    return cardLarge;
};
