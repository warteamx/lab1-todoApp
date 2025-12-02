#!/bin/bash

# ==============================================
# n8n Docker Deployment Script
# ==============================================

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
ENV_FILE="$PROJECT_DIR/.env"

# Functions
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

check_requirements() {
    log_info "Checking requirements..."
    
    if ! command -v docker &> /dev/null; then
        log_error "Docker is not installed or not in PATH"
        exit 1
    fi
    
    if ! command -v docker-compose &> /dev/null && ! docker compose version &> /dev/null; then
        log_error "Docker Compose is not installed or not in PATH"
        exit 1
    fi
    
    log_success "Requirements check passed"
}

setup_environment() {
    log_info "Setting up environment..."
    
    if [ ! -f "$ENV_FILE" ]; then
        if [ -f "$PROJECT_DIR/.env.example" ]; then
            log_info "Creating .env file from .env.example..."
            cp "$PROJECT_DIR/.env.example" "$ENV_FILE"
            
            # Generate secure passwords
            DB_PASSWORD=$(openssl rand -hex 32)
            ADMIN_PASSWORD=$(openssl rand -hex 16)
            
            # Replace placeholders with generated passwords
            if [[ "$OSTYPE" == "darwin"* ]]; then
                # macOS
                sed -i '' "s/your_secure_password_here/$DB_PASSWORD/" "$ENV_FILE"
                sed -i '' "s/your_admin_password_here/$ADMIN_PASSWORD/" "$ENV_FILE"
            else
                # Linux
                sed -i "s/your_secure_password_here/$DB_PASSWORD/" "$ENV_FILE"
                sed -i "s/your_admin_password_here/$ADMIN_PASSWORD/" "$ENV_FILE"
            fi
            
            log_success "Environment file created with generated passwords"
            log_warning "Please review and update $ENV_FILE with your specific configuration"
            log_warning "Admin credentials - User: admin, Password: $ADMIN_PASSWORD"
        else
            log_error ".env.example file not found"
            exit 1
        fi
    else
        log_info "Environment file already exists"
    fi
}

create_directories() {
    log_info "Creating necessary directories..."
    
    mkdir -p "$PROJECT_DIR/workflows"
    mkdir -p "$PROJECT_DIR/credentials"
    mkdir -p "$PROJECT_DIR/ssl"
    
    # Set proper permissions
    chmod 755 "$PROJECT_DIR/workflows"
    chmod 700 "$PROJECT_DIR/credentials"
    chmod 700 "$PROJECT_DIR/ssl"
    
    log_success "Directories created with proper permissions"
}

deploy_development() {
    log_info "Deploying n8n for development..."
    
    cd "$PROJECT_DIR"
    
    # Pull latest images
    docker-compose pull
    
    # Start services
    docker-compose up -d postgres redis
    
    # Wait for database to be ready
    log_info "Waiting for database to be ready..."
    sleep 10
    
    # Start n8n
    docker-compose up -d n8n
    
    # Wait for n8n to start
    log_info "Waiting for n8n to start..."
    sleep 15
    
    # Check if services are running
    if docker-compose ps | grep -q "Up"; then
        log_success "n8n deployed successfully for development"
        log_info "Access n8n at: http://localhost:5678"
        log_info "Database is accessible at: localhost:5432"
    else
        log_error "Deployment failed. Check logs with: docker-compose logs"
        exit 1
    fi
}

deploy_production() {
    log_info "Deploying n8n for production with reverse proxy..."
    
    cd "$PROJECT_DIR"
    
    # Check if SSL certificates exist
    if [ ! -f "$PROJECT_DIR/ssl/fullchain.pem" ] || [ ! -f "$PROJECT_DIR/ssl/privkey.pem" ]; then
        log_warning "SSL certificates not found in ssl/ directory"
        log_warning "You'll need to obtain SSL certificates before enabling HTTPS"
        log_warning "Consider using Let's Encrypt with certbot"
    fi
    
    # Pull latest images
    docker-compose pull
    
    # Start all services including nginx
    docker-compose --profile with-proxy up -d
    
    # Wait for services to start
    log_info "Waiting for services to start..."
    sleep 20
    
    # Check if services are running
    if docker-compose ps | grep -q "Up"; then
        log_success "n8n deployed successfully for production"
        log_info "Access n8n at: http://localhost (or your domain)"
        log_info "HTTPS access: https://localhost (if SSL certificates are configured)"
    else
        log_error "Deployment failed. Check logs with: docker-compose logs"
        exit 1
    fi
}

stop_services() {
    log_info "Stopping n8n services..."
    
    cd "$PROJECT_DIR"
    docker-compose --profile with-proxy down
    
    log_success "Services stopped"
}

restart_services() {
    log_info "Restarting n8n services..."
    stop_services
    sleep 5
    
    if [ "$1" == "production" ]; then
        deploy_production
    else
        deploy_development
    fi
}

backup_data() {
    log_info "Creating backup of n8n data..."
    
    BACKUP_DIR="$PROJECT_DIR/backups/$(date +%Y%m%d_%H%M%S)"
    mkdir -p "$BACKUP_DIR"
    
    cd "$PROJECT_DIR"
    
    # Backup database
    docker-compose exec -T postgres pg_dump -U "${DB_POSTGRESDB_USER:-n8n_user}" -d "${DB_POSTGRESDB_DATABASE:-n8n}" > "$BACKUP_DIR/database.sql"
    
    # Backup workflows and credentials
    cp -r workflows "$BACKUP_DIR/" 2>/dev/null || true
    cp -r credentials "$BACKUP_DIR/" 2>/dev/null || true
    
    # Backup environment file
    cp .env "$BACKUP_DIR/" 2>/dev/null || true
    
    log_success "Backup created at: $BACKUP_DIR"
}

show_logs() {
    cd "$PROJECT_DIR"
    
    if [ -n "$1" ]; then
        docker-compose logs -f "$1"
    else
        docker-compose logs -f
    fi
}

show_status() {
    cd "$PROJECT_DIR"
    
    echo "=== Docker Compose Services ==="
    docker-compose ps
    
    echo -e "\n=== Service Health ==="
    docker-compose exec n8n wget -qO- http://localhost:5678/healthz 2>/dev/null || echo "n8n health check failed"
    
    echo -e "\n=== Volume Usage ==="
    docker system df -v | grep n8n || echo "No n8n volumes found"
}

show_help() {
    echo "n8n Docker Deployment Script"
    echo
    echo "Usage: $0 [COMMAND]"
    echo
    echo "Commands:"
    echo "  setup       Setup environment and create directories"
    echo "  dev         Deploy for development (HTTP only)"
    echo "  prod        Deploy for production (with reverse proxy)"
    echo "  stop        Stop all services"
    echo "  restart     Restart services (dev|prod)"
    echo "  backup      Create backup of data"
    echo "  logs [service] Show logs (optionally for specific service)"
    echo "  status      Show service status and health"
    echo "  help        Show this help message"
    echo
    echo "Examples:"
    echo "  $0 setup && $0 dev    # Setup and deploy for development"
    echo "  $0 prod               # Deploy for production"
    echo "  $0 logs n8n           # Show n8n service logs"
    echo "  $0 restart prod       # Restart in production mode"
}

# Main script logic
case "${1:-help}" in
    setup)
        check_requirements
        setup_environment
        create_directories
        ;;
    dev|development)
        check_requirements
        setup_environment
        create_directories
        deploy_development
        ;;
    prod|production)
        check_requirements
        setup_environment
        create_directories
        deploy_production
        ;;
    stop)
        stop_services
        ;;
    restart)
        restart_services "$2"
        ;;
    backup)
        backup_data
        ;;
    logs)
        show_logs "$2"
        ;;
    status)
        show_status
        ;;
    help|*)
        show_help
        ;;
esac
