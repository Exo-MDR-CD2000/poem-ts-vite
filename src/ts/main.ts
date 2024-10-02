import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import '../css/style.min.css';
import { updateCopyrightYear } from './copyright-update';





console.log(`Hello World! Is TypeScript working?`);























// helper function to update the year in the footer
document.addEventListener('DOMContentLoaded', () => {
    updateCopyrightYear();
});