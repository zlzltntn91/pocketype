#!/bin/bash
set -u
LEARNINGS="/Users/zlamstn/Documents/tutorial-hannes/.claude/learnings.md"
PROJECT_DIR="/Users/zlamstn/Documents/tutorial-hannes"

mkdir -p "$(dirname "$LEARNINGS")"

{
  echo ""
  echo "## Session $(date '+%Y-%m-%d %H:%M')"
  echo ""
  echo "### Modified files"
  if git -C "$PROJECT_DIR" rev-parse --git-dir >/dev/null 2>&1; then
    git -C "$PROJECT_DIR" status --short
  else
    echo "(not a git repo)"
  fi
} >> "$LEARNINGS"
