#!/usr/bin/env bash
# Resets the demo repo between takes: closes every open PR whose branch starts with feat/
# (except the --keep numbers) and deletes those branches. Tests designed in a take stay in the
# linked project (linked folders can't archive them); later PRs leave them out (no file in the repo).
# usage: ./reset-take.sh <owner/repo> [--keep N] [--keep M]
set -euo pipefail

usage() { echo "usage: ./reset-take.sh <owner/repo> [--keep N]" >&2; exit 2; }
[ $# -ge 1 ] || usage
repo="$1"; shift
[[ "$repo" == */* ]] || usage
keep=()
while [ $# -gt 0 ]; do
  case "$1" in
    --keep) [ $# -ge 2 ] || usage; keep+=("$2"); shift 2 ;;
    *) usage ;;
  esac
done

kept() { local n; for n in "${keep[@]+"${keep[@]}"}"; do [ "$n" = "$1" ] && return 0; done; return 1; }

prs=$(gh pr list -R "$repo" --state open --limit 200 --json number,headRefName)
closed=0
while IFS=$'\t' read -r number branch; do
  [ -n "$number" ] || continue
  case "$branch" in feat/*) ;; *) continue ;; esac
  if kept "$number"; then echo "kept #$number ($branch)"; continue; fi
  gh pr close "$number" -R "$repo" --delete-branch >/dev/null
  echo "closed #$number ($branch) and deleted its branch"
  closed=$((closed + 1))
done < <(printf '%s' "$prs" | node -e 'let s="";process.stdin.on("data",d=>s+=d).on("end",()=>{for(const p of JSON.parse(s||"[]"))console.log(`${p.number}\t${p.headRefName}`)})')
echo "done: $closed PR(s) closed in $repo"
echo "Tests designed in this take stay in the project; later PRs don't show them (no file in the repo)."
