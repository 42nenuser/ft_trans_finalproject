// app.js

document.addEventListener('DOMContentLoaded', () => {
    console.log('App initialized');
    // Initialize the router
    initRouter();
});

function loadContent(content) {
    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = content;
}


// Add this to app.js
document.addEventListener('DOMContentLoaded', async () => {
    console.log('App initialized');
    initRouter();
    
    // Test API connection
    const helloMessage = await callApi('hello/');
    console.log('API response:', helloMessage);
});