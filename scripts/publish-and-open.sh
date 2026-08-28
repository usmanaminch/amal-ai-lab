#!/bin/bash
set -e

URL="$1"
MESSAGE="$2"

if [ -z "$URL" ]; then
  echo "Missing URL."
  exit 1
fi

if [ -z "$MESSAGE" ]; then
  MESSAGE="Publish website update"
fi

echo "Checking git status..."
git status

echo "Adding changes..."
git add .

echo "Committing..."
git commit -m "$MESSAGE" || echo "Nothing new to commit."

echo "Pushing to GitHub..."
git push

echo "Waiting for Vercel to publish the page..."
echo "$URL"

for i in {1..40}; do
  CODE=$(curl -L -s -o /dev/null -w "%{http_code}" "$URL?check=$RANDOM")

  if [ "$CODE" = "200" ]; then
    echo "✅ Page is live. Opening now."
    open "$URL?live=$(date +%s)"
    exit 0
  fi

  echo "Still not live yet. HTTP $CODE. Waiting..."
  sleep 8
done

echo "❌ Vercel did not return 200 after waiting."
echo "Do NOT open yet. Check Vercel deployment or folder path."
exit 1
