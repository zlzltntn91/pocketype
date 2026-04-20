#!/bin/bash
set -u
LOG_DIR="/Users/zlamstn/Documents/tutorial-hannes/.claude/logs"
mkdir -p "$LOG_DIR"

INPUT="$(cat)"
SESSION_ID="$(jq -r '.session_id // "unknown"' <<< "$INPUT")"
SUBAGENT="$(jq -r '.tool_input.subagent_type // "agent"' <<< "$INPUT")"
DESC="$(jq -r '.tool_input.description // ""' <<< "$INPUT")"
RESPONSE="$(jq -r '
  (.tool_response.content // .tool_response // "")
  | if type == "array" then map(.text // .) | join("\n") else tostring end
' <<< "$INPUT")"
TS="$(date '+%Y-%m-%d %H:%M:%S')"

LOG_FILE="$LOG_DIR/session-$SESSION_ID.md"

{
  echo ""
  echo "## $TS — $SUBAGENT ($DESC)"
  echo ""
  echo "$RESPONSE"
  echo ""
} >> "$LOG_FILE"
