#!/usr/bin/env bash

# Set your repository owner and name
OWNER="adnanwahab"
REPO="homelab"

# Fetch the latest commit using GitHub CLI's API endpoint for commits
latest_commit_sha=$(gh api repos/$OWNER/$REPO/commits --jq '.[0].sha')

echo "The latest commit SHA for $OWNER/$REPO is: $latest_commit_sha"