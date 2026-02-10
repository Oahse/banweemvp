#!/bin/bash

echo "🧹 Cleaning Vite cache..."
rm -rf node_modules/.vite

echo "🧹 Cleaning dist folder..."
rm -rf dist

echo "✅ Cache cleared!"
echo ""
echo "Now restart your dev server with: npm run dev"
