#!/bin/bash

# 🚀 Server Docker Management Script
# This script provides easy commands for managing the Docker server

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if .env file exists
check_env_file() {
    if [ ! -f ".env" ]; then
        print_warning ".env file not found. Creating from .env.example..."
        if [ -f ".env.example" ]; then
            cp .env.example .env
            print_warning "Please edit .env with your actual Supabase credentials"
        else
            print_error ".env.example not found. Please create .env manually"
            exit 1
        fi
    fi
}

# Show help
show_help() {
    echo "🚀 Server Docker Management"
    echo ""
    echo "Usage: ./docker.sh [command]"
    echo ""
    echo "Commands:"
    echo "  dev          Start development server with hot reload"
    echo "  prod         Start production server"
    echo "  build        Build production image"
    echo "  build-dev    Build development image"
    echo "  stop         Stop all services"
    echo "  logs         Show server logs"
    echo "  logs-f       Follow server logs"
    echo "  test         Run tests in container"
    echo "  test-cov     Run tests with coverage"
    echo "  shell        Access container shell"
    echo "  clean        Remove containers and images"
    echo "  status       Show container status"
    echo "  help         Show this help message"
    echo ""
}

# Start development server
start_dev() {
    print_status "Starting development server with hot reload..."
    check_env_file
    docker-compose --profile dev up --build server-dev
}

# Start production server
start_prod() {
    print_status "Starting production server..."
    check_env_file
    docker-compose up --build -d server
    print_success "Production server started!"
    print_status "Access Swagger UI at: http://localhost:3000/api-docs"
}

# Build images
build_prod() {
    print_status "Building production image..."
    docker build -t expo-server:latest --target production .
    print_success "Production image built successfully!"
}

build_dev() {
    print_status "Building development image..."
    docker build -t expo-server:dev --target dev .
    print_success "Development image built successfully!"
}

# Stop services
stop_services() {
    print_status "Stopping all services..."
    docker-compose down
    print_success "All services stopped!"
}

# Show logs
show_logs() {
    docker-compose logs server
}

follow_logs() {
    docker-compose logs -f server
}

# Run tests
run_tests() {
    print_status "Running tests in container..."
    docker run --rm --env-file .env expo-server:dev npm test
}

run_tests_coverage() {
    print_status "Running tests with coverage..."
    docker run --rm --env-file .env expo-server:dev npm run test:coverage
}

# Access shell
access_shell() {
    print_status "Accessing container shell..."
    if docker ps | grep -q "expo-server"; then
        docker exec -it expo-server sh
    else
        print_warning "No running container found. Starting temporary container..."
        docker run -it --rm --env-file .env expo-server:dev sh
    fi
}

# Clean up
clean_up() {
    print_warning "This will remove all containers and images. Are you sure? (y/N)"
    read -r response
    if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
        print_status "Cleaning up containers and images..."
        docker-compose down --volumes --remove-orphans
        docker rmi expo-server:latest expo-server:dev 2>/dev/null || true
        print_success "Cleanup completed!"
    else
        print_status "Cleanup cancelled."
    fi
}

# Show status
show_status() {
    print_status "Container Status:"
    docker-compose ps
    echo ""
    print_status "Docker Images:"
    docker images | grep expo-server || echo "No expo-server images found"
}

# Main script logic
case "$1" in
    "dev")
        start_dev
        ;;
    "prod")
        start_prod
        ;;
    "build")
        build_prod
        ;;
    "build-dev")
        build_dev
        ;;
    "stop")
        stop_services
        ;;
    "logs")
        show_logs
        ;;
    "logs-f")
        follow_logs
        ;;
    "test")
        run_tests
        ;;
    "test-cov")
        run_tests_coverage
        ;;
    "shell")
        access_shell
        ;;
    "clean")
        clean_up
        ;;
    "status")
        show_status
        ;;
    "help"|"--help"|"-h")
        show_help
        ;;
    *)
        print_error "Unknown command: $1"
        echo ""
        show_help
        exit 1
        ;;
esac
