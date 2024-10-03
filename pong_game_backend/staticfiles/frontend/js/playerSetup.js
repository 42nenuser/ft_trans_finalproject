document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('create-players-form');
    const gameContainer = document.getElementById('game-container');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const player1Name = document.getElementById('player1-name').value;
        const player2Name = document.getElementById('player2-name').value;

        try {
            const player1 = await createPlayer(player1Name);
            const player2 = await createPlayer(player2Name);

            if (player1 && player2) {
                const game = await createGame(player1.id, player2.id);
                if (game) {
                    // Hide the form and show the game container
                    document.getElementById('player-form').style.display = 'none';
                    gameContainer.style.display = 'block';

                    // Start the game
                    startGame(game, player1, player2);
                }
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        }
    });

    async function createPlayer(name) {
        const response = await fetch('/api/players/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: name, username: name }),
        });

        if (!response.ok) {
            throw new Error('Failed to create player');
        }

        return response.json();
    }

    async function createGame(player1Id, player2Id) {
        const response = await fetch('/api/games/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ player1: player1Id, player2: player2Id }),
        });

        if (!response.ok) {
            throw new Error('Failed to create game');
        }

        return response.json();
    }
});

// This function will be implemented in gameLogic.js
function startGame(game, player1, player2) {
    console.log('Starting game:', game);
    console.log('Player 1:', player1);
    console.log('Player 2:', player2);
    // The actual game logic will be implemented in gameLogic.js
}
