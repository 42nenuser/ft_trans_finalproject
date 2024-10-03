from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Player, Game
from django.db import IntegrityError

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username']

class PlayerSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    username = serializers.CharField(write_only=True)

    class Meta:
        model = Player
        fields = ['id', 'user', 'username', 'name', 'total_games_played', 'total_games_won']

    def create(self, validated_data):
        username = validated_data.pop('username')
        try:
            user = User.objects.create_user(username=username)
        except IntegrityError:
            raise serializers.ValidationError({"username": "Username already exists"})
        return Player.objects.create(user=user, **validated_data)

class GameSerializer(serializers.ModelSerializer):
    player1_name = serializers.CharField(source='player1.name', read_only=True)
    player2_name = serializers.CharField(source='player2.name', read_only=True)

    class Meta:
        model = Game
        fields = ['id', 'player1', 'player2', 'player1_name', 'player2_name', 'player1_score', 'player2_score', 'start_time', 'end_time', 'status']
