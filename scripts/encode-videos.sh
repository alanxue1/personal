#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
VIDEOS_DIR="$ROOT_DIR/public/videos"

if ! command -v ffmpeg >/dev/null 2>&1; then
  echo "ffmpeg is required but not installed."
  exit 1
fi

if [ ! -d "$VIDEOS_DIR" ]; then
  echo "videos directory not found: $VIDEOS_DIR"
  exit 1
fi

shopt -s nullglob

inputs=("$VIDEOS_DIR"/*.mp4)

if [ "${#inputs[@]}" -eq 0 ]; then
  echo "no mp4 files found in $VIDEOS_DIR"
  exit 0
fi

for input in "${inputs[@]}"; do
  filename="$(basename "$input")"
  base="${filename%.mp4}"

  # Skip preview assets as inputs.
  if [[ "$base" == *"-preview" ]]; then
    continue
  fi

  temp_full_mp4="$VIDEOS_DIR/${base}.full.tmp.mp4"
  full_webm="$VIDEOS_DIR/${base}.webm"
  preview_mp4="$VIDEOS_DIR/${base}-preview.mp4"

  echo ""
  echo "Encoding: $filename"

  # 1) Re-encode full MP4 (replace original after success)
  ffmpeg -y -i "$input" \
    -c:v libx264 -crf 23 -preset slow \
    -vf "scale=-2:720" -movflags +faststart \
    -an \
    "$temp_full_mp4"

  mv "$temp_full_mp4" "$input"

  # 2) Full-quality WebM (VP9)
  ffmpeg -y -i "$input" \
    -c:v libvpx-vp9 -crf 30 -b:v 0 \
    -vf "scale=-2:720" \
    -an \
    "$full_webm"

  # 3) Low-quality preview MP4
  ffmpeg -y -i "$input" \
    -c:v libx264 -crf 35 -preset slow \
    -vf "scale=-2:480" -movflags +faststart \
    -an \
    "$preview_mp4"
done

echo ""
echo "Done. Encoded assets written to: $VIDEOS_DIR"
