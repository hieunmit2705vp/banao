import { toast as originalToast } from 'react-toastify';

// Fallback toast if react-toastify is not available
const customToast = {
    success: (msg) => {
        console.log("SUCCESS:", msg);
        alert("SUCCESS: " + msg);
    },
    error: (msg) => {
        console.error("ERROR:", msg);
        alert("ERROR: " + msg);
    }
};

export const toast = customToast;
