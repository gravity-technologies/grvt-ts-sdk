if [[ $(git status -s) ]]; then
  echo "FAILED: files changed"
  git status -s
  git --no-pager diff
  exit 1
else
  echo "PASSED: no files changed"
  exit 0
fi
