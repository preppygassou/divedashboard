#!/bin/bash

# Function to display usage instructions
usage()
{
  echo "========================================================================================================"
  echo "Usage:"
  echo ""
  echo "  --dev     Deploy to the development environment"
  echo "  --hmg     Deploy to the staging environment"
  echo "  --prod    Deploy to the production environment"
  echo ""
  echo "  -h | --help  Display this help message"
  echo "========================================================================================================"
}

# Validate arguments
if [[ $# -ne 1 ]]; then
  usage
  exit 1
fi

# Check for Docker Compose availability
if ! command -v docker-compose &> /dev/null; then
  echo "Error: Docker Compose is not installed or not in PATH."
  exit 1
fi

# Define environment-specific variables
COMPOSE_FILE=""
ENV_NAME=""

case $1 in
  --dev)
    COMPOSE_FILE="docker-compose.yml"
    ENV_NAME="development"
    ;;
  --hmg)
    COMPOSE_FILE="docker-compose-hmg.yml"
    ENV_NAME="staging"
    ;;
  --prod)
    COMPOSE_FILE="docker-compose-prod.yml"
    ENV_NAME="production"
    ;;
  -h | --help)
    usage
    exit
    ;;
  *)
    echo "Error: Invalid argument"
    usage
    exit 1
    ;;
esac

# Execute deployment
echo "Deploying to $ENV_NAME environment..."
echo "Using Compose file: $COMPOSE_FILE"

echo "Stopping and removing existing containers..."
docker-compose -f $COMPOSE_FILE down || { echo "Error: Failed to stop containers."; exit 1; }

echo "Building and starting containers..."
docker-compose -f $COMPOSE_FILE up -d --build || { echo "Error: Failed to start containers."; exit 1; }

echo "Deployment to $ENV_NAME environment completed successfully."