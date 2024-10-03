async function testBackendIntegration() {
    console.log('Testing backend integration...');

    try {
        // Test player creation
        const player1 = await createPlayer('TestPlayer1');
        const player2 = await createPlayer('TestPlayer2');
        console.log('Players created successfully:', player1, player2);

        // Test game creation
        const game = await createGame(player1.id, player2.id);
        console.log('Game created successfully:', game);

        // Test game update
        await updateGameResult(player1.id);
        console.log('Game result updated successfully');

        // Test fetching game data
        const updatedGame = await fetch(`/api/games/${game.id}/`).then(res => res.json());
        console.log('Updated game data:', updatedGame);

        console.log('All tests passed successfully!');
    } catch (error) {
        console.error('Test failed:', error);
    }
}

// Run the test when the page loads
document.addEventListener('DOMContentLoaded', testBackendIntegration);
