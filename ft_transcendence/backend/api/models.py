from django.db import models
from django.contrib.auth.models import User



from django.db import models
from django.contrib.auth.models import User

class Player(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    games_played = models.IntegerField(default=0)
    games_won = models.IntegerField(default=0)

    def __str__(self):
        return self.user.username

class Game(models.Model):
    player1 = models.ForeignKey(Player, related_name='games_as_player1', on_delete=models.CASCADE)
    player2 = models.ForeignKey(Player, related_name='games_as_player2', on_delete=models.CASCADE)
    score_player1 = models.IntegerField(default=0)
    score_player2 = models.IntegerField(default=0)
    start_time = models.DateTimeField(auto_now_add=True)
    end_time = models.DateTimeField(null=True, blank=True)
    is_finished = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.player1} vs {self.player2} - {self.start_time}"
    
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    player = models.OneToOneField(Player, on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return self.user.username