#!/usr/bin/env bash
# Raport zbiorczy co cztery godziny. Osobny od cyklu roboczego, bo praca ma
# isc non stop, a maile maja byc rzadkie i tresciwe.
set -uo pipefail
export PATH="$HOME/.local/bin:/usr/local/bin:/usr/bin:/bin"
LOG="$HOME/Projekty/fluxlab-site/cykl/raport.log"
cd "$HOME/Projekty/fluxlab-site" || exit 1
{
  echo "=== $(date '+%F %T') start raportu"
  timeout 2400 claude --model sonnet -p "$(cat "$HOME/Projekty/fluxlab-site/cykl/prompt-raport.txt")" 2>&1 | tail -30
  echo "=== $(date '+%F %T') koniec, kod $?"
} >> "$LOG" 2>&1
tail -n 1500 "$LOG" > "$LOG.tmp" && mv "$LOG.tmp" "$LOG"
