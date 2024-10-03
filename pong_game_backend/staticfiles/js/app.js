document.addEventListener('DOMContentLoaded', () => {
    const playerForm = document.getElementById('player-form');
    const gameContainer = document.getElementById('game-container');
    const modal = document.getElementById('modal');
    const closeModal = document.getElementsByClassName('close')[0];
    const playAgainButton = document.getElementById('play-again');

    playerForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const player1Name = document.getElementById('player1-name').value;
        const player2Name = document.getElementById('player2-name').value;

        try {
            const player1 = await createPlayer(player1Name);
            const player2 = await createPlayer(player2Name);

            if (player1 && player2) {
                const game = await createGame(player1.id, player2.id);
                if (game) {
                    playerForm.style.display = 'none';
                    gameContainer.style.display = 'block';
                    startGame(game, window.currentPlayers[player1.id], window.currentPlayers[player2.id]);
                }
            }
        } catch (error) {
            console.error('Error:', error);
            alert(error.message || 'An error occurred. Please try again.');
        }
    });


    closeModal.onclick = function() {
        modal.style.display = 'none';
    }

    playAgainButton.onclick = function() {
        modal.style.display = 'none';
        resetGame();
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }

    function resetGame() {
        clearInterval(gameInterval);
        player1.score = 0;
        player2.score = 0;
        resetBall();
        gameInterval = setInterval(updateGame, 1000 / 60);
        document.addEventListener('keydown', handleKeyDown);
        document.getElementById('player1-score').textContent = '0';
        document.getElementById('player2-score').textContent = '0';
    }
});
