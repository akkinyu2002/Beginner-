# Pipeline Script

## Command
- `npm run pipeline` to run lint, auto-format on lint failure, run tests, and auto-commit changes.
- `npm run pipeline -- --dry-run` to run pipeline checks without committing.

## Behavior
1. Run lint.
2. If lint fails, run format and retry lint.
3. Run tests.
4. Stage all files.
5. Commit automatically if there are changes and dry-run is not enabled.
