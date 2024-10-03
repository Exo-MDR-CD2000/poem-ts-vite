/**
 * Update the copy right year to the current year
 * @returns {void} which returns nothing
 * Set TypeScript to HTMLElement to avoid null error
 */

export function updateCopyrightYear(): void {
    // Set the current year
    const currentYearElement = document.querySelector('#current-year') as HTMLElement;
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear().toString();
    }
}
