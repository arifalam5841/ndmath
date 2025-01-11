#!/bin/bash
echo "Starting the update script..."

REPO_PATH="C:\Users\MD Arif Alam\Desktop\ndmath\ndmath"
echo "Changing directory to $REPO_PATH"
cd $REPO_PATH || { echo "Repository path not found."; exit 1; }

echo "Staging changes..."
git add .

echo "Committing changes..."
git commit -m "Button click updates"

echo "Pushing changes to GitHub..."
git push

echo "Finished the update script."

