#!/bin/bash

echo "🚀 Starting Banwee Application..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker first."
    exit 1
fi

# Build and start services
echo "📦 Building and starting services..."
docker-compose up --build -d

# Wait for services to be ready
echo "⏳ Waiting for services to start..."
sleep 10

# Check service health
echo "🔍 Checking service health..."
docker-compose ps

# Show logs
echo "📋 Service logs:"
echo "Backend logs:"
docker-compose logs backend --tail=20
echo ""
echo "Frontend logs:"
docker-compose logs frontend --tail=20

echo "✅ Application started successfully!"
echo "🌐 Frontend: http://localhost:5173"
echo "🔧 Backend API: http://localhost:8000"
echo "📚 API Docs: http://localhost:8000/docs"

# Follow logs
echo "📋 Following logs (Ctrl+C to stop)..."
docker-compose logs -f