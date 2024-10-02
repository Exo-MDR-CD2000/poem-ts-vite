// Imports for bootstrap and popper.js
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';

// Imports for fontawesome and bootstrap-icons
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

// Custom CSS
import '../css/style.min.css';

// Bootstrap breakpoint css
import '../css/bootstrap-breakpoint.css';

// copright-update import should be last
import { updateCopyrightYear } from './copyright-update';





console.log(`Hello World! Is TypeScript working?`);























// helper function to update the year in the footer
document.addEventListener('DOMContentLoaded', () => {
    updateCopyrightYear();
});