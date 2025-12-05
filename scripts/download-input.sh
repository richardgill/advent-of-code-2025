#!/usr/bin/env bash
set -euo pipefail

year="${AOC_YEAR:-2025}"
day="${1:?Usage: download-input.sh <day> <part>}"
part="${2:?Usage: download-input.sh <day> <part>}"

day_padded=$(printf "%02d" "$day")
target_dir="src/days/${day_padded}.${part}/data"

mkdir -p "$target_dir"

aoc download -y "$year" -d "$day" --input-only -o -i "${target_dir}/input.txt"

echo "Downloaded input to ${target_dir}/input.txt"
