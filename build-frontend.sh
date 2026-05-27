#!/bin/bash
set -e

echo "Installing dependencies..."
npm ci

echo "Building frontend with Vite only..."
npx vite build --config vite.config.ts

echo "Build complete!"
