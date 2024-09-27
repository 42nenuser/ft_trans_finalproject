#!/bin/bash

# Root directory
mkdir -p ft_transcendence

# Frontend directories and files
mkdir -p ft_transcendence/frontend/css
mkdir -p ft_transcendence/frontend/js
touch ft_transcendence/frontend/index.html

# Backend directories
mkdir -p ft_transcendence/backend/user_service
mkdir -p ft_transcendence/backend/game_service
mkdir -p ft_transcendence/backend/tournament_service
mkdir -p ft_transcendence/backend/api_gateway

# Nginx directory and file
mkdir -p ft_transcendence/nginx
touch ft_transcendence/nginx/nginx.conf

# Docker directory and docker-compose file
mkdir -p ft_transcendence/docker
touch ft_transcendence/docker/docker-compose.yml

# Scripts directory and setup.sh file
mkdir -p ft_transcendence/scripts
touch ft_transcendence/scripts/setup.sh

# Print success message
echo "Project structure created successfully!"

