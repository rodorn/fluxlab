#!/usr/bin/env bash
# Generuje 3 jasne zapętlone wideo (Sora) — tła kafelków dla trybu jasnego.
set -u
cd /home/rodorn/WebstormProjects/FluxLab
KEY=$(grep '^OPENAI_API_KEY=' .env.local | cut -d= -f2-)

declare -A PROMPTS=(
  [web-light]="Bright airy abstract motion background, soft pastel violet and lavender gradient waves with gentle glowing light, clean light cream background, calm slow flow, minimalist, seamless looping motion, no text, no objects, no people"
  [automation-light]="Bright airy abstract motion background, soft pastel indigo and sky blue glowing particles drifting along light streams, clean light background, calm slow flow, minimalist, seamless looping motion, no text, no objects, no people"
  [data-light]="Bright airy abstract motion background, soft pastel emerald and mint green flowing data streams with gently rising light particles, clean light background, calm slow flow, minimalist, seamless looping motion, no text, no objects, no people"
)

declare -A JOBS=()
for v in web-light automation-light data-light; do
  RESP=$(curl -s -X POST "https://api.openai.com/v1/videos" \
    -H "Authorization: Bearer $KEY" \
    -F "model=sora-2" \
    -F "prompt=${PROMPTS[$v]}" \
    -F "seconds=8" \
    -F "size=720x1280")
  ID=$(echo "$RESP" | python3 -c "import sys,json; print(json.load(sys.stdin).get('id',''))" 2>/dev/null)
  JOBS[$v]=$ID
  echo "$v -> job '$ID'"
  [ -z "$ID" ] && echo "  ODPOWIEDZ: $RESP"
done

for v in web-light automation-light data-light; do
  ID=${JOBS[$v]}
  [ -z "$ID" ] && { echo "$v: brak job id"; continue; }
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
