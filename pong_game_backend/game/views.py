from django.shortcuts import render
from rest_framework import viewsets
from .models import Player, Game
from .serializers import PlayerSerializer, GameSerializer

def index(request):
    return render(request, 'game/index.html')

class PlayerViewSet(viewsets.ModelViewSet):
    queryset = Player.objects.all()
    serializer_class = PlayerSerializer

class GameViewSet(viewsets.ModelViewSet):
    queryset = Game.objects.all()
    serializer_class = GameSerializer
