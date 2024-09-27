# users/models.py

   from django.db import models
   from django.contrib.auth.models import User

   class UserProfile(models.Model):
       user = models.OneToOneField(User, on_delete=models.CASCADE)
       bio = models.TextField(max_length=500, blank=True)
       games_played = models.IntegerField(default=0)
       wins = models.IntegerField(default=0)

       def __str__(self):
           return self.user.username
