// router.js

function initRouter() {
    const routes = {
        home: 'Welcome to Pong Game',
        game: 'Game will be loaded here',
        profile: 'User profile will be displayed here'
    };

    function navigate(route) {
        loadContent(routes[route]);
    }

    document.getElementById('homeLink').addEventListener('click', (e) => {
        e.preventDefault();
        navigate('home');
    });

    document.getElementById('gameLink').addEventListener('click', (e) => {
        e.preventDefault();
        navigate('game');
    });

    document.getElementById('profileLink').addEventListener('click', (e) => {
        e.preventDefault();
        navigate('profile');
    });

    // Initial route
    navigate('home');
}