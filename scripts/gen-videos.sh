#!/usr/bin/env bash
# Generuje 3 zapętlone abstrakcyjne wideo (Sora) jako tła kafelków.
# Każde wideo startuje od obecnego obrazu kafelka (input_reference).
set -u
cd /home/rodorn/WebstormProjects/FluxLab
KEY=$(grep '^OPENAI_API_KEY=' .env.local | cut -d= -f2-)

PROMPT="Mesmerizing cinematic abstract motion that evolves naturally from the reference image: glowing gradient forms slowly morphing, soft light streams drifting hypnotically, gentle depth and flow, seamless smooth looping motion, dark elegant atmosphere, minimalist, no text, no objects, no people"

declare -A JOBS=()
for v in web automation data; do
  # Klatka referencyjna — obecny obraz przeskalowany do rozmiaru wideo
  magick "public/abstract/$v.webp" -resize 720x1280^ -gravity center \
    -extent 720x1280 "/tmp/$v-ref.png" 2>/dev/null
  RESP=$(curl -s -X POST "https://api.openai.com/v1/videos" \
    -H "Authorization: Bearer $KEY" \
    -F "model=sora-2" \
    -F "prompt=$PROMPT" \
    -F "seconds=8" \
    -F "size=720x1280" \
    -F "input_reference=@/tmp/$v-ref.png;type=image/png")
  ID=$(echo "$RESP" | python3 -c "import sys,json; print(json.load(sys.stdin).get('id',''))" 2>/dev/null)
  JOBS[$v]=$ID
  echo "$v -> job '$ID'"
  [ -z "$ID" ] && echo "  ODPOWIEDZ: $RESP"
done

for v in web automation data; do
  ID=${JOBS[$v]}
  [ -z "$ID" ] && { echo "$v: brak job id — pomijam"; continue; }
  for i in $(seq 1 150); do
    ST=$(curl -s "https://api.openai.com/v1/videos/$ID" -H "Authorization: Bearer $KEY" \
      | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('status',''), d.get('progress',0))" 2>/dev/null)
    STATUS=$(echo "$ST" | cut -d' ' -f1)
    echo "$v [$ID]: $ST"
    if [ "$STATUS" = "completed" ]; then
      curl -s "https://api.openai.com/v1/videos/$ID/content" -H "Authorization: Bearer $KEY" \
        -o "public/abstract/$v.mp4"
      echo "$v: POBRANO ($(stat -c%s public/abstract/$v.mp4 2>/dev/null) B)"
      break
    fi
    [ "$STATUS" = "failed" ] && { echo "$v: NIEUDANE"; break; }
    sleep 10
  done
done
echo "=== KONIEC ==="
ls -la public/abstract/
