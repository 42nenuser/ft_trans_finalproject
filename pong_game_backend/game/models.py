from django.db import models
from django.contrib.auth.models import User

class Player(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    total_games_played = models.IntegerField(default=0)
    total_games_won = models.IntegerField(default=0)

    def __str__(self):
        return self.name

class Game(models.Model):
    player1 = models.ForeignKey(Player, related_name='games_as_player1', on_delete=models.CASCADE)
    player2 = models.ForeignKey(Player, related_name='games_as_player2', on_delete=models.CASCADE)
    player1_score = models.IntegerField(default=0)
    player2_score = models.IntegerField(default=0)
    start_time = models.DateTimeField(auto_now_add=True)
    end_time = models.DateTimeField(null=True, blank=True)
    status = models.CharField(max_length=20, choices=[('ongoing', 'Ongoing'), ('completed', 'Completed')], default='ongoing')

    def __str__(self):
        return f"Game {self.id}: {self.player1} vs {self.player2}"
