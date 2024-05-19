#!/bin/sh

# Backup package.json
cp package.json package.json.bak

# Remove loki from package.json
jq 'del(.devDependencies.loki)' package.json > temp.json && mv temp.json package.json

# Install dependencies
npm ci

# Restore package.json
mv package.json.bak package.json

# Install loki with force
npm install loki --force
