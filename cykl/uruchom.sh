#!/usr/bin/env bash
# Godzinny cykl rozwoju strony fluxlab.pl. Uruchamiany przez timer systemd
# uzytkownika, wiec dziala takze przy zamknietym terminalu. Kazde uruchomienie
# to osobna sesja Claude, dokladnie tak jak przy cyklu zarobkowym.
set -uo pipefail
export PATH="$HOME/.local/bin:/usr/local/bin:/usr/bin:/bin"
LOG="$HOME/Projekty/fluxlab-site/cykl/przebieg.log"
cd "$HOME/Projekty/fluxlab-site" || exit 1
{
  echo "=== $(date '+%F %T') start"
  timeout 3000 claude --model sonnet -p "$(cat "$HOME/Projekty/fluxlab-site/cykl/prompt.txt")" 2>&1 | tail -40
  echo "=== $(date '+%F %T') koniec, kod $?"
} >> "$LOG" 2>&1
# Log nie moze rosnac bez konca.
tail -n 2000 "$LOG" > "$LOG.tmp" && mv "$LOG.tmp" "$LOG"
