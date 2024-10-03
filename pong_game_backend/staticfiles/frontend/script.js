document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM fully loaded");
    const form = document.getElementById('create-players-form');
    console.log("Form element:", form);
    const gameContainer = document.getElementById('game-container');
    console.log("Game container:", gameContainer);

    let canvas, ctx, player1, player2, ball, gameInterval;

    if (form) {
        form.addEventListener('submit', async (e) => {
            console.log("Form submitted");
            e.preventDefault();

            const player1Name = document.getElementById('player1-name').value;
            const player2Name = document.getElementById('player2-name').value;
            console.log("Player names:", player1Name, player2Name);

            try {
                player1 = await createPlayer(player1Name);
                player2 = await createPlayer(player2Name);
                console.log("Players created:", player1, player2);

                if (player1 && player2) {
                    const game = await createGame(player1.id, player2.id);
                    console.log("Game created:", game);
                    if (game) {
                        // Hide the form and show the game container
                        document.getElementById('player-form').style.display = 'none';
                        gameContainer.style.display = 'block';

                        // Start the game
                        startGame(game);
                    }
                }
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred. Please try again.');
            }
        });
    } else {
        console.error("Form element not found");
    }

    async function createPlayer(name) {
        console.log("Creating player:", name);
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
        console.log("Creating game for players:", player1Id, player2Id);
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

    function startGame(game) {
        console.log('Starting game:', game);
        canvas = document.getElementById('pong-canvas');
        ctx = canvas.getContext('2d');

        // Initialize game objects
        player1 = { y: canvas.height/2 - 50, height: 100, score: 0 };
        player2 = { y: canvas.height/2 - 50, height: 100, score: 0 };
        ball = { x: canvas.width/2, y: canvas.height/2, radius: 10, dx: 5, dy: 5 };

        // Start game loop
        gameInterval = setInterval(updateGame, 1000/60); // 60 FPS

        // Add keyboard event listeners
        document.addEventListener('keydown', handleKeyDown);
    }

    function updateGame() {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Move ball
        ball.x += ball.dx;
        ball.y += ball.dy;

        // Ball collision with top and bottom walls
        if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) {
            ball.dy = -ball.dy;
        }

        // Ball collision with paddles
        if (ball.x - ball.radius < 10 && ball.y > player1.y && ball.y < player1.y + player1.height ||
            ball.x + ball.radius > canvas.width - 10 && ball.y > player2.y && ball.y < player2.y + player2.height) {
            ball.dx = -ball.dx;
        }

        // Ball out of bounds
        if (ball.x < 0) {
            player2.score++;
            resetBall();
        } else if (ball.x > canvas.width) {
            player1.score++;
            resetBall();
        }

        // Draw paddles
        ctx.fillStyle = 'white';
        ctx.fillRect(0, player1.y, 10, player1.height);
        ctx.fillRect(canvas.width - 10, player2.y, 10, player2.height);

        // Draw ball
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI*2);
        ctx.fillStyle = 'white';
        ctx.fill();
        ctx.closePath();

        // Draw scores
        ctx.font = '24px Arial';
        ctx.fillText(player1.score, canvas.width/4, 30);
        ctx.fillText(player2.score, 3*canvas.width/4, 30);
    }

    function resetBall() {
        ball.x = canvas.width/2;
        ball.y = canvas.height/2;
        ball.dx = -ball.dx;
        ball.dy = Math.random() > 0.5 ? 5 : -5;
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
});
