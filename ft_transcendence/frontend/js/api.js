// api.js

async function callApi(endpoint) {
    try {
        const response = await fetch(`http://localhost:8000/api/${endpoint}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('API call failed:', error);
    }
}