#!/usr/bin/env bash
set -euo pipefail

year="${AOC_YEAR:-2025}"
day="${1:?Usage: read-puzzle.sh <day> <part>}"
part="${2:?Usage: read-puzzle.sh <day> <part>}"

padded_day=$(printf "%02d" "$day")
data_dir="src/days/${padded_day}.${part}/data"

puzzle=$(aoc read -y "$year" -d "$day" | grep -v "Your puzzle answer was" | grep -v "Both parts of this puzzle are complete")

if [[ "$part" == "1" ]]; then
  puzzle=$(echo "$puzzle" | sed '/^--- Part Two ---$/,$d')
fi

mkdir -p "$data_dir"
echo "$puzzle" > "${data_dir}/puzzle.txt"

echo "$puzzle"
