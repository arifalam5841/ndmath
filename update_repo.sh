#!/bin/bash
REPO_PATH="/path/to/your/repository"
cd $REPO_PATH

# Stage all changes
git add .

# Commit the changes
git commit -m "Button click updates"

# Push the changes to GitHub
git push
