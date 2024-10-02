import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import '../css/style.min.css';

import { updateCopyrightYear } from './copyright-update';

// Call the helper function
document.addEventListener('DOMContentLoaded', () => {
    updateCopyrightYear();
});



console.log(`Hello World! Is TypeScript working?`);