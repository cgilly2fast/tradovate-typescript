Remove .md file prefixes

```
find docs/ -type f -name "*.md" -exec sh -c '
  for file; do
    newname="$(basename "$file" | sed "s/^[^.]*\.//")"
    mv "$file" "$(dirname "$file")/$newname"
  done
' sh {} +

```
