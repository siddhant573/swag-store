#!/usr/bin/env bash
# Resets the demo repo between takes: closes every open PR whose branch starts with feat/
# (except the --keep numbers) and deletes those branches.
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
echo "TODO: archive the take's tests in the linked project (waiting on linked-folder context review); nothing archived"
