#!/usr/bin/env bash
set -euo pipefail

year="${AOC_YEAR:-2025}"
day="${1:?Usage: check-answer.sh <day> <part> [answer]}"
part="${2:?Usage: check-answer.sh <day> <part> [answer]}"
answer="${3:-}"

# Zero-pad day for solution path
day_padded=$(printf "%02d" "$day")
solution_path="src/days/${day_padded}.${part}/index.ts"

# If answer not provided, run the solution code
if [[ -z "$answer" ]]; then
  if [[ ! -f "$solution_path" ]]; then
    echo "Error: Solution file not found at $solution_path" >&2
    exit 1
  fi
  echo "Running solution..." >&2
  answer=$(NO_COLOR=1 bun "$solution_path")
  echo "Got answer: ${answer}" >&2
fi

# Rate limiting: 1 minute between submissions per day+part
lockfile="/tmp/aoc-submit-ratelimit-d${day}p${part}"
now=$(date +%s)

if [[ -f "$lockfile" ]]; then
  last=$(cat "$lockfile")
  elapsed=$((now - last))
  if [[ $elapsed -lt 60 ]]; then
    remaining=$((60 - elapsed))
    echo "Rate limited. Waiting ${remaining}s..." >&2
    sleep "$remaining"
  fi
fi

# Try to fetch correct answer from already-solved puzzle
correct=$(aoc read -y "$year" -d "$day" 2>/dev/null | grep "Your puzzle answer was" | sed -n "${part}p" | sed 's/.*Your puzzle answer was \(.*\)\..*/\1/' || true)

echo "correct: $correct"

if [[ -n "$correct" ]]; then
  # Puzzle already solved - compare locally
  if [[ "$answer" == "$correct" ]]; then
    rm -f "$lockfile"
    echo "Correct!"
    exit 0
  else
    date +%s > "$lockfile"
    echo "Wrong answer. 123"
    exit 1
  fi
fi

# Puzzle not solved yet - submit answer
echo "Submitting answer to adventofcode.com..." >&2
response=$(aoc submit -y "$year" -d "$day" "$part" "$answer" 2>&1)

if echo "$response" | grep -qi "that's the right answer"; then
  rm -f "$lockfile"
  echo "Correct!"
  exit 0
elif echo "$response" | grep -qi "that's not the right answer"; then
  date +%s > "$lockfile"
  echo "Wrong answer."
  echo "$response" >&2
  exit 1
elif echo "$response" | grep -qi "you gave an answer too recently"; then
  echo "Rate limited by adventofcode.com. Try again later." >&2
  date +%s > "$lockfile"
  exit 1
elif echo "$response" | grep -qi "you don't seem to be solving the right level"; then
  echo "Wrong level - this part may already be solved or not yet unlocked." >&2
  exit 1
else
  echo "Unexpected response from adventofcode.com:" >&2
  echo "$response" >&2
  exit 1
fi
