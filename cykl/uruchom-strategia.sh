#!/usr/bin/env bash
# Dobowa strategia ruchu fluxlab.pl na Fable. Pisze cykl/plan-ruchu.md, który
# co godzinę wykonuje uruchom.sh na Opusie. Decyzja Pawła z 4.10.2026.
set -uo pipefail
export PATH="$HOME/.local/bin:/usr/local/bin:/usr/bin:/bin"
LOG="$HOME/Projekty/fluxlab-site/cykl/strategia.log"
cd "$HOME/Projekty/fluxlab-site" || exit 1
{
  echo "=== $(date '+%F %T') start"
  WYNIK=$(timeout 5400 claude --model claude-fable-5-1 --dangerously-skip-permissions \
    -p "$(cat "$HOME/Projekty/fluxlab-site/cykl/prompt-strategia.txt")" 2>&1)
  KOD=$?
  echo "$WYNIK" | tail -40
  echo "=== $(date '+%F %T') koniec, kod $KOD"
  # Limit tygodniowy: ponów co godzinę, aż plan powstanie (13 i 14.10 cykl został bez planu).
  if echo "$WYNIK" | grep -q "hit your weekly limit"; then
    systemd-run --user --on-active=1h --unit="fluxlab-strategia-ponow-$(date +%s)" \
      systemctl --user start fluxlab-strategia.service
    echo "=== limit, ponowna próba za 1 h"
  fi
} >> "$LOG" 2>&1
tail -n 1000 "$LOG" > "$LOG.tmp" && mv "$LOG.tmp" "$LOG"
