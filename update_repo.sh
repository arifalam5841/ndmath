#!/bin/bash
echo "Starting the update script..."

# Correct path format for Bash (use forward slashes and quotes to handle spaces)
REPO_PATH="C:/Users/MD Arif Alam/Desktop/ndmath"
echo "Changing directory to $REPO_PATH"
cd "$REPO_PATH" || { echo "Repository path not found."; exit 1; }

echo "Staging changes..."
git add .

echo "Committing changes..."
git commit -m "Button click updates"

echo "Pushing changes to GitHub..."
git push

echo "Finished the update script."
