// Make sure currentPlayers is declared in the global scope
window.currentPlayers = {};
let currentGameId;

async function createPlayer(name) {
    try {
        const response = await fetch('/api/players/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: name, username: name }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            if (errorData.username) {
                throw new Error(errorData.username);
            }
            throw new Error('Failed to create player');
        }

        const player = await response.json();
        window.currentPlayers[player.id] = player;
        return player;
    } catch (error) {
        throw error;
    }
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

    const game = await response.json();
    currentGameId = game.id;
    return game;
}
