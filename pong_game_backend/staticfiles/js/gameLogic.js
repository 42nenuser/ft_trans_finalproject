let canvas, ctx, player1, player2, ball, gameInterval;

function startGame(game, player1Data, player2Data) {
    canvas = document.getElementById('pong-canvas');
    ctx = canvas.getContext('2d');

    player1 = {
        y: canvas.height / 2 - 50,
        height: 100,
        score: 0,
        name: player1Data.name,
        id: player1Data.id
    };
    player2 = {
        y: canvas.height / 2 - 50,
        height: 100,
        score: 0,
        name: player2Data.name,
        id: player2Data.id
    };
    resetBall();

    gameInterval = setInterval(updateGame, 1000 / 60);
    document.addEventListener('keydown', handleKeyDown);
}

function updateGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ball.x += ball.dx;
    ball.y += ball.dy;

    if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) {
        ball.dy = -ball.dy;
    }

    if (
        (ball.x - ball.radius < 10 && ball.y > player1.y && ball.y < player1.y + player1.height) ||
        (ball.x + ball.radius > canvas.width - 10 && ball.y > player2.y && ball.y < player2.y + player2.height)
    ) {
        ball.dx = -ball.dx;
    }

    if (ball.x < 0) {
        player2.score++;
        resetBall();
    } else if (ball.x > canvas.width) {
        player1.score++;
        resetBall();
    }

    ctx.fillStyle = 'white';
    ctx.fillRect(0, player1.y, 10, player1.height);
    ctx.fillRect(canvas.width - 10, player2.y, 10, player2.height);

    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.closePath();

    ctx.font = '24px Arial';
    ctx.fillText(player1.score, canvas.width / 4, 30);
    ctx.fillText(player2.score, 3 * canvas.width / 4, 30);

    document.getElementById('player1-score').textContent = player1.score;
    document.getElementById('player2-score').textContent = player2.score;

    if (player1.score >= 3 || player2.score >= 3) {
        endGame();
    }
}

function resetBall() {
    ball = {
        x: canvas.width / 2,
        y: canvas.height / 2,
        radius: 10,
        dx: 5 * (Math.random() > 0.5 ? 1 : -1),
        dy: 5 * (Math.random() > 0.5 ? 1 : -1)
    };
}

function handleKeyDown(e) {
    const speed = 10;
    if (e.key === 'w' && player1.y > 0) {
        player1.y -= speed;
    } else if (e.key === 's' && player1.y + player1.height < canvas.height) {
        player1.y += speed;
    } else if (e.key === 'ArrowUp' && player2.y > 0) {
        player2.y -= speed;
    } else if (e.key === 'ArrowDown' && player2.y + player2.height < canvas.height) {
        player2.y += speed;
    }
}

async function endGame() {
    clearInterval(gameInterval);
    document.removeEventListener('keydown', handleKeyDown);
    const winner = player1.score >= 3 ? player1 : player2;

    await updateGameResult(winner.id);
    displayWinner(winner.name);
    displayGameStats();
}

function displayWinner(winnerName) {
    const winnerMessage = `${winnerName} wins!`;
    document.getElementById('modal-message').innerHTML = `<h2>${winnerMessage}</h2>`;
    document.getElementById('modal').style.display = 'block';
}

async function updateGameResult(winnerId) {
    try {
        const response = await fetch(`/api/games/${currentGameId}/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                status: 'completed',
                player1_score: player1.score,
                player2_score: player2.score,
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to update game result');
        }

        console.log('Game result updated successfully');
    } catch (error) {
        console.error('Error updating game result:', error);
    }
}

async function displayGameStats() {
    try {
        const response = await fetch(`/api/games/${currentGameId}/`);
        if (!response.ok) {
            throw new Error('Failed to fetch game data');
        }
        const gameData = await response.json();

        const statsHtml = `
            <h2>Game Statistics</h2>
            <p>${gameData.player1_name}: ${gameData.player1_score} points</p>
            <p>${gameData.player2_name}: ${gameData.player2_score} points</p>
            <p>Game duration: ${calculateDuration(gameData.start_time, gameData.end_time)}</p>
        `;

        document.getElementById('modal-message').innerHTML += statsHtml;
    } catch (error) {
        console.error('Error fetching game stats:', error);
    }
}

function calculateDuration(start, end) {
    const startTime = new Date(start);
    const endTime = new Date(end);
    const durationMs = endTime - startTime;
    const seconds = Math.floor(durationMs / 1000);
    const minutes = Math.floor(seconds / 60);
    return `${minutes}m ${seconds % 60}s`;
}
